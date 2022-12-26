import create from "zustand";
import { Post, post100 } from "../data/discussion";

export const useTextRoomStore = create(() => ({
  posts: post100,
}));

const { setState } = useTextRoomStore;

export const textRoomStoreActions = {
  addNewPost: (post: Post) => {
    setState((state) => ({
      posts: [...state.posts, post],
    }));
  },
  updatePost: (post: Post) => {
    setState((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    }));
  },
  deletePost: (postId: string) => {
    setState((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
    }));
  },
};
