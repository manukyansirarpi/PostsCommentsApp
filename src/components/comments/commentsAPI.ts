import { CommentI} from "./commentsSlice";

export function fetchComments(postId: number) : Promise<CommentI[]> {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then((res) => res.json());
  }
  