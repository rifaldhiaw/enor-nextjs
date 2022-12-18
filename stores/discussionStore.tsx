import create from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "../data/discussion";

export const useDiscussionStore = create(
  persist(
    () => ({
      selectedPost: null as null | Post,
      activeAccordion: [] as string[],
    }),
    { name: "discussion" }
  )
);

const { setState } = useDiscussionStore;

export const discussionStoreActions = {
  selectPost: (post: Post) => setState({ selectedPost: post }),
  unselectPost: () => setState({ selectedPost: null }),
  setActiveAccordion: (activeAccordion: string[]) =>
    setState({ activeAccordion }),
};
