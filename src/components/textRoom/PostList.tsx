import { Box, useMantineTheme } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { memo, useEffect, useRef } from "react";
import { Descendant } from "slate";
import { MessagesResponse, UsersRecord } from "~/../pocketbase.types";
import { emptySlateContent } from "~/components/slate/SlateComponent";
import { useAllMessagesInChannel } from "~/domains/message/messageData";
import { PostDetail } from "./Post";

const PostList = (props: {
  focusPost?: string;
  messages: MessagesResponse<Descendant[], unknown>[];
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const theme = useMantineTheme();
  const messages = props.messages;

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 106,
    overscan: 3,
  });

  const isAtBottomCheck = () => {
    if (!parentRef.current) return false;
    const el = parentRef.current;
    const atBottom =
      Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) <= 10.0;

    return atBottom;
  };

  useEffect(() => {
    if (messages.length === 0) return;

    // interate scrollToBottom using requestAnimationFrame until isAtBottomCheck is true
    let requestAnimationFrameId = requestAnimationFrame(function loop() {
      if (!isAtBottomCheck()) {
        virtualizer.scrollToIndex(messages.length - 1, {
          align: "end",
        });
        requestAnimationFrameId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(requestAnimationFrameId);
      }
    });
  }, [virtualizer, messages.length]);

  const onCommentClick = (messageId: string) => {
    router.push({
      pathname: "/team/[channelId]",
      query: {
        channelId,
        postId: messageId,
      },
    });
  };

  return (
    <Box
      ref={parentRef}
      w="100%"
      maw="700px"
      h="100%"
      pt="lg"
      px="xs"
      sx={{
        alignSelf: "center",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.colors.gray[4],
          borderRadius: "8px",
        },
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const message = messages[virtualItem.index];

          return (
            <div
              key={message.id}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <PostDetail
                withBorder
                postedAt={message.created}
                body={message.body ?? emptySlateContent}
                replyCount={message.replySummary?.count ?? 0}
                author={{
                  name: message.expand?.user.name, //TODO: get user name
                  image: (message.expand?.user as UsersRecord).avatar ?? "",
                }}
                selected={message.id === props.focusPost}
                sx={{
                  marginTop: "8px",
                }}
                onCommentClick={() => {
                  onCommentClick(message.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export const PostListContainer = (props: { focusPost?: string }) => {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const messagesResp = useAllMessagesInChannel(channelId);
  const messages = messagesResp.data ?? [];

  return <PostList focusPost={props.focusPost} messages={messages} />;
};

const PostListMemo = memo(PostListContainer);

export { PostListMemo as PostList };
