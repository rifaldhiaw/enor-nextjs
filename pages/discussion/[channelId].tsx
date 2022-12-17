import { useRouter } from "next/router";

const Channel = () => {
  const channelId = useRouter().query.channelId;
  if (typeof channelId !== "string") {
    return null;
  }

  return <div>Channel {channelId}</div>;
};

export default Channel;
