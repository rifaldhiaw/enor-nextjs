import { useRouter } from "next/router";
import { Descendant } from "slate";
import invariant from "tiny-invariant";
import { SlateInput } from "~/components/slate/SlateInput";
import { getAuthModel } from "~/data/pocketbase";
import { useAddMessage } from "~/domains/message/messageData";

export const PostReplyInput = () => {
  const router = useRouter();
  const channelId = router.query.channelId as string;
  const postId = router.query.postId as string;

  const addMessage = useAddMessage();

  return (
    <SlateInput
      value={[]}
      placeholder="Write a message..."
      onSubmit={(value: Descendant[]) => {
        const userData = getAuthModel();
        invariant(channelId, "channelId is required");
        invariant(userData, "userData is required");

        addMessage.mutate({
          channel: channelId,
          body: value,
          user: userData.id,
          parent: postId,
        });
      }}
    />
  );
};
