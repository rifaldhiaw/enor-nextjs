export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: "online" | "away" | "offline";
};

export type Channel = {
  id: string;
  name: string;
  purpose: string;
  members: User[];
  messages: Message[];
};

type Message = {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
};
