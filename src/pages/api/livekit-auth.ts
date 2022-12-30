import { AccessToken } from "livekit-server-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

type Data = {
  token: string;
};

const liveKitApiKey = process.env.LIVEKIT_API_KEY;
const liveKitSecretKey = process.env.LIVEKIT_SECRET_KEY;

invariant(liveKitApiKey, "LIVEKIT_API_KEY is required");
invariant(liveKitSecretKey, "LIVEKIT SECRET KEY is required");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { roomName, name, identity } = req.body;

  const at = new AccessToken(liveKitApiKey, liveKitSecretKey, {
    identity: identity,
    name: name,
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  res.status(200).json({ token: token });
}
