import { Box, Center, Flex } from "@mantine/core";
import { ChannelHeader } from "../common/ChannelHeader";

import { LiveKitRoom } from "@livekit/react-components";
import { Room } from "livekit-client";
import { useRouter } from "next/router";

import "@livekit/react-components/dist/index.css";
import { useEffect, useRef, useState } from "react";
import "react-aspect-ratio/aspect-ratio.css";
import invariant from "tiny-invariant";
import Loading from "~/components/common/Loading";
import { getAuthModel } from "~/data/pocketbase";

export const VoiceRoomView = () => {
  return (
    <Box h="100%">
      <ChannelHeader />
      <Flex h="calc(100% - 60px)" align="stretch">
        <RoomPage />
      </Flex>
    </Box>
  );
};

const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
invariant(liveKitUrl, "NEXT_PUBLIC_LIVEKIT_URL is not set");

export const RoomPage = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const userData = getAuthModel();
  invariant(userData);

  const token = useLiveKitToken({
    identity: userData.id,
    name: userData.name ?? "Anonymous",
    roomName: channelId,
  });

  if (!token) {
    return (
      <Center w="100%">
        <Loading />
      </Center>
    );
  }

  return (
    <div className="roomContainer">
      <LiveKitRoom
        url={liveKitUrl}
        token={token}
        onConnected={(room) => onConnected(room)}
      />
    </div>
  );
};

async function onConnected(room: Room) {
  await room.localParticipant.setCameraEnabled(true);
  await room.localParticipant.setMicrophoneEnabled(true);
}

const useLiveKitToken = (params: {
  identity: string;
  name: string;
  roomName: string;
}) => {
  const [token, setToken] = useState<string | null>(null);

  // is fetching token useRef
  const isFetchingToken = useRef(false);

  useEffect(() => {
    if (isFetchingToken.current || !!token) return;
    isFetchingToken.current = true;

    const getConferenceToken = async () => {
      const response = await fetch("/api/livekit-auth", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      isFetchingToken.current = false;
      return data.token;
    };

    getConferenceToken().then((token) => setToken(token));
  }, [params, token]);

  return token;
};
