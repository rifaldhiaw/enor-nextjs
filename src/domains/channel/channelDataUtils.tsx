import { ChannelsResponse } from "~/../pocketbase.types";

export const groupChannelsByTeam = (channels: ChannelsResponse[]) => {
  const teams: Record<string, ChannelsResponse[]> = {};

  channels.forEach((channel) => {
    if (!teams[channel.team]) {
      teams[channel.team] = [];
    }

    teams[channel.team].push(channel);
  });

  return teams;
};
