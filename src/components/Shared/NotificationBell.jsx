import { useState } from "react";
import { Badge, IconButton, Popover, CircularProgress } from "@mui/material";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "../../Redux/api/notificationApi";

dayjs.extend(relativeTime);

// A dropdown only needs "enough" recent items to be useful, not the whole
// history (that's what the full /notifications page is for) — 20 is also
// what feeds the badge count below, capped at a "9+" display regardless of
// how many actually come back, so a wider fetch here doesn't need a wider
// display anywhere.
const DROPDOWN_LIMIT = 20;
// No push/websocket channel exists for this dashboard (see Phase 7 decision
// in the integration plan) — polling is the whole mechanism for "live".
const POLL_INTERVAL_MS = 45_000;

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading } = useGetNotificationsQuery(
    { page: 1, limit: DROPDOWN_LIMIT },
    { pollingInterval: POLL_INTERVAL_MS }
  );
  const [markNotificationRead] = useMarkNotificationReadMutation();
  const [markAllNotificationsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsReadMutation();

  const notifications = data?.data?.data ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const open = Boolean(anchorEl);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleItemClick = async (notification) => {
    if (notification.isRead) return;
    try {
      await markNotificationRead(notification._id).unwrap();
    } catch {
      toast.error("Couldn't mark that notification as read. Please try again.");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead().unwrap();
    } catch {
      toast.error("Couldn't mark all notifications as read. Please try again.");
    }
  };

  const handleViewAll = () => {
    handleClose();
    navigate("/notifications");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          bgcolor: "#f0f0f0",
          "&:hover": { bgcolor: "#E0E1E2" },
          width: 40,
          height: 40,
        }}
      >
        <Badge
          badgeContent={unreadCount > 9 ? "9+" : unreadCount}
          invisible={unreadCount === 0}
          color="error"
        >
          <PiBellSimpleRingingBold fontSize={22} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="w-[380px] max-h-[480px] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e6e6e6]">
            <p className="font-medium text-[#1c1c1c]">Notifications</p>
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={isMarkingAll || unreadCount === 0}
              className="text-sm text-[#3F80AE] font-medium disabled:text-[#a0a0a0] disabled:cursor-not-allowed hover:underline"
            >
              Mark all read
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <CircularProgress size={24} />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <p className="text-[#6b7280] text-sm">
                  You&apos;re all caught up — no notifications yet.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification._id}
                  type="button"
                  onClick={() => handleItemClick(notification)}
                  className={`w-full text-left px-4 py-3 border-b border-[#f0f0f0] hover:bg-[#f7f9fb] transition-colors ${
                    notification.isRead ? "" : "bg-[#EAF3FA]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!notification.isRead && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#3F80AE] shrink-0" />
                    )}
                    <div className={notification.isRead ? "pl-4" : ""}>
                      <p className="font-medium text-sm text-[#1c1c1c]">
                        {notification.title}
                      </p>
                      <p className="text-sm text-[#4b5563] line-clamp-2">
                        {notification.body}
                      </p>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {dayjs(notification.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="text-center text-sm font-medium text-[#3F80AE] py-3 border-t border-[#e6e6e6] hover:bg-[#f7f9fb]"
          >
            View all
          </button>
        </div>
      </Popover>
    </>
  );
}
