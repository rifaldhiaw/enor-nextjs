export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignee: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
};
