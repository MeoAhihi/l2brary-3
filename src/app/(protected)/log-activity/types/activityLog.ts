export type ActivityLogProps = {
  datetime: Date;
  memberName: string;
  sender: "user" | "system" | string;
  actionName: string;
};
