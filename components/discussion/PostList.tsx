import { Box } from "@mantine/core";
import { usePrevious } from "@mantine/hooks";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { post100 } from "../../data/discussion";
import { discussionStoreActions } from "../../stores/discussionStore";
import { PostDetail } from "./Post";

export const PostList = (props: { focusPost?: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const channelId = router.query.channelId as string;

  // previous post id with usePrevious hook
  const prevPostId = usePrevious(props.focusPost);

  const virtualizer = useVirtualizer({
    count: post100.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 10,
  });

  useEffect(() => {
    if (!props.focusPost) return;

    const targetId = props.focusPost ? props.focusPost : prevPostId;
    const index = post100.findIndex((post) => post.id === targetId);
    if (index === -1) return;

    // timeout for the virtualizer to render the post
    const id = setTimeout(() => {
      virtualizer.scrollToIndex(index, {
        align: "start",
      });
    }, 50);

    return () => clearTimeout(id);
  }, [!!props.focusPost]);

  return (
    <Box
      ref={parentRef}
      bg="white"
      w="100%"
      h="100%"
      py="lg"
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
          const post = post100[virtualItem.index];

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
                {...post100[virtualItem.index]}
                selected={post.id === props.focusPost}
                onCommentClick={() => {
                  if (!props.focusPost) {
                    discussionStoreActions.setShowPostOverlay(true);
                  }
                  return router.push({
                    pathname: "/discussion/[channelId]",
                    query: {
                      channelId,
                      postId: post100[virtualItem.index].id,
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
