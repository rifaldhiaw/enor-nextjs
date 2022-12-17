import create from "zustand";
import { Post } from "../data/discussion";

export const useDiscussionStore = create(() => ({
  selectedPost: null as null | Post,
}));

const { setState } = useDiscussionStore;

export const discussionActions = {
  selectPost: (post: Post) => setState({ selectedPost: post }),
  unselectPost: () => setState({ selectedPost: null }),
};
