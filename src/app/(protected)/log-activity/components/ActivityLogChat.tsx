import React from "react";

import { ActivityLogProps } from "../types/activityLog";

const ActivityLogChat = ({
  datetime,
  memberName,
  actionName,
  sender,
}: ActivityLogProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-xs flex-col">
        <div className="text-muted-foreground mb-1 text-xs">
          {sender !== "user" && sender}
        </div>
        <div className="bg-muted text-foreground w-full rounded-lg px-4 py-2 text-center">
          {`${memberName} đã ${actionName}`}
        </div>
        <div className="text-muted-foreground mt-1 self-end text-xs">
          {new Date(datetime).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogChat;
