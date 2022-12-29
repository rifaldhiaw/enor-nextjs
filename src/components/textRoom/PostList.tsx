import { Box, useMantineTheme } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { memo, useEffect, useRef } from "react";
import { MessagesResponse, UsersRecord } from "~/../pocketbase.types";
import { useAllMessagesInChannel } from "~/domains/message/messageData";
import { PostDetail } from "./Post";

const PostList = (props: {
  focusPost?: string;
  messages: MessagesResponse[];
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
    overscan: 50,
  });
  useEffect(() => {
    if (messages.length === 0) return;

    const id = setTimeout(() => {
      virtualizer.scrollToIndex(messages.length - 1, {
        align: "end",
      });
    }, 100);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  return (
    <Box
      ref={parentRef}
      w="100%"
      maw="700px"
      h="100%"
      pt="lg"
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
                body={message.body as JSON}
                author={{
                  name: message.expand?.user.name, //TODO: get user name
                  image: (message.expand?.user as UsersRecord).avatar ?? "",
                }}
                selected={message.id === props.focusPost}
                sx={{
                  marginTop: "8px",
                }}
                onCommentClick={() => {
                  return router.push({
                    pathname: "/team/[channelId]",
                    query: {
                      channelId,
                      postId: messages[virtualItem.index].id,
                    },
                  });
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
