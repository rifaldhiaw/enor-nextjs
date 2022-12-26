import { Box } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef } from "react";
import { useTextRoomStore } from "~/stores/textRoomStore";
import { PostDetail } from "./Post";

export const PostList = (props: { focusPost?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const posts = useTextRoomStore((s) => s.posts);

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
  });

  // scroll to last message on mount
  useLayoutEffect(() => {
    virtualizer.scrollToIndex(posts.length - 1);
  }, []);

  // scroll to last message on new message
  useLayoutEffect(() => {
    virtualizer.scrollToIndex(posts.length - 1);
  }, [posts.length]);

  return (
    <Box
      ref={parentRef}
      bg="white"
      w="100%"
      h="100%"
      pt="lg"
      style={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const post = posts[virtualItem.index];

          return (
            <Box
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              sx={(theme) => ({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              })}
            >
              <PostDetail
                {...posts[virtualItem.index]}
                selected={post.id === props.focusPost}
                onCommentClick={() => {
                  return router.push({
                    pathname: "/discussion/[channelId]",
                    query: {
                      channelId,
                      postId: posts[virtualItem.index].id,
                    },
                  });
                }}
              />
            </Box>
          );
        })}
      </div>
    </Box>
  );
};
