import { Box, useMantineTheme } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useTextRoomStore } from "~/stores/textRoomStore";
import { PostDetail } from "./Post";

export const PostList = (props: { focusPost?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const theme = useMantineTheme();

  const posts = useTextRoomStore((s) => s.posts);

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
  });

  // scroll to last message on mount
  useLayoutEffect(() => {
    virtualizer.scrollToIndex(posts.length - 1, {
      align: "end",
    });
  }, [virtualizer, posts.length]);

  // scroll after 10ms to fix somehow initial scroll does not scroll to the end
  useEffect(() => {
    const id = setTimeout(() => {
      virtualizer.scrollToIndex(posts.length - 1, {
        align: "end",
      });
    }, 100);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          backgroundColor: theme.colors.gray[5],
          borderRadius: "8px",
        },
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
                    pathname: "/team/[channelId]",
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
