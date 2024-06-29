export type Comment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    fullName: string;
    id: number;
    username: string;
  };
};
