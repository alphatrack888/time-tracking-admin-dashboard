# Admin dashboard

React/Vite, built into an ARM64 image and served by container Nginx.
The existing Ubuntu host Nginx terminates HTTPS and proxies to
`127.0.0.1:8081`. Compose creates its own default network; no shared
`web` network or Caddy is required.

## GitHub Actions

PRs targeting `main` run `npm ci`, lint, and a production build.
Pushes to `main` also publish the `prod` Docker image for `linux/arm64`
to `shfayetwt/time-tracking-admin-dashboard`, tagged `latest` and the commit SHA.
Deployment uses the exact image digest from that run, waits for container health,
and checks HTTP on `127.0.0.1:8081`. Releases are serialized.
Failure fails the workflow; automatic rollback is not configured.

The production API URL is baked into the image:
`https://api.alphatrack.app/api/v1`. A GitHub secret named `VITE_BASE_URL`
is not consumed by this workflow. No runtime frontend `.env` is needed.

## Repository secrets

Add these under Settings > Secrets and variables > Actions > Secrets:

| Name | Value |
| --- | --- |
| `DOCKERHUB_USERNAME` | Account with push access to the image repository |
| `DOCKERHUB_TOKEN` | Docker Hub write token |
| `HETZNER_HOST` | Ubuntu server IP or hostname |
| `HETZNER_SSH_KEY` | Deployment user's SSH private key |
| `ADMIN_DEPLOY_PATH` | `/home/deploy/admin-dashboard-docker` for the setup below |
| `HETZNER_SSH_USER` | Optional; defaults to `deploy` |

The path must be absolute. The SSH user needs Docker access and access to the
directory. Docker Compose v2 must support `up --wait --wait-timeout`.
The server must have curl and be able to pull the image (public image, or an
existing Docker Hub login for the deployment user).

## One-time server preparation

The current public admin site serves files directly from
`/var/applications/time-tracking-admin-dashboard/dist`. Prepare the new
container alongside it before changing the public route.

First investigate the unexplained root-owned obfuscated Node processes seen
in the server inspection. Their origin has not been established.

On Ubuntu as root, check whether port 8081 is already occupied:

```sh
ss -lntp 'sport = :8081'
```

If a listener is present, resolve the conflict before proceeding. Do not stop
an unknown service. If choosing another port, update Compose, the workflow's
HTTP check, and the host Nginx route together.

Create the new directory:

```sh
install -d -o deploy -g deploy -m 0755 /home/deploy/admin-dashboard-docker
```

From a local terminal in this repository, copy the production Compose file
(replace SERVER_IP with the actual server address):

```sh
scp docker-compose.yml deploy@SERVER_IP:/home/deploy/admin-dashboard-docker/docker-compose.yml
```

The file contains only runtime configuration; no source or Dockerfile is
required on the server. The workflow expects this file to exist and does not
overwrite it. For future Compose changes, copy the reviewed file again.

## First deployment and Nginx cutover

1. Set the repository secrets and copy Compose as above.
2. Merge/push the workflow to `main`. Wait for all three jobs to succeed.
   This starts the new container; the public domain still serves the old dist.
3. On the server, verify the new container:

```sh
sudo -u deploy -H sh -c 'cd /home/deploy/admin-dashboard-docker && docker compose ps'
curl --fail --show-error --max-time 15 http://127.0.0.1:8081/ -o /dev/null
```

4. Back up the active host Nginx site as root. Keep the printed backup path:

```sh
admin_site=$(readlink -f /etc/nginx/sites-enabled/admin)
admin_backup="${admin_site}.before-docker.$(date +%Y%m%d%H%M%S)"
cp -p "$admin_site" "$admin_backup"
printf 'Backup: %s\n' "$admin_backup"
```

5. Edit that admin site. In its HTTPS server block, replace the static
   `location /` handling with this block. Remove or adapt any other locations
   that still serve the old dist (for example a separate assets location).
   The old server-level `root` can be removed. Keep existing server names,
   certificate directives, and the HTTP-to-HTTPS redirect.

```nginx
location / {
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

6. Validate before reloading:

```sh
nginx -t && systemctl reload nginx
curl --fail --show-error --max-time 20 https://admin.alphatrack.app/ -o /dev/null
```

Verify browser login, authenticated pages, reports, assets, and refreshing a
nested route. Container health only confirms the web server responds.

After these pass, the old admin PM2 process can be stopped separately.
Keep the old dist and Nginx backup until the migration is accepted. Do not
stop the company process or change backend routing. The workflow does not
edit host Nginx, stop PM2, or modify certificates.

## Rollback

For the first migration, restore the Nginx backup to its original site file,
validate with `nginx -t`, and reload. The retained dist can serve the previous
site again.

For subsequent image releases, from the same Compose directory use a previous
successful commit tag:

```sh
export ADMIN_IMAGE=shfayetwt/time-tracking-admin-dashboard:<previous-commit-sha>
compose_admin() {
  printf 'services:\n  admin-dashboard:\n    image: %s\n' "$ADMIN_IMAGE" |
    docker compose -f docker-compose.yml -f - "$@"
}
compose_admin pull admin-dashboard
compose_admin up -d --no-build --no-deps --wait --wait-timeout 120 admin-dashboard
curl --fail --show-error --max-time 15 http://127.0.0.1:8081/ -o /dev/null
```

The digest/tag override is supplied over stdin. A plain `docker compose up`
uses the Compose file's `latest` image instead; use the override to select a
specific rollback release. The next successful main push deploys its new image.
