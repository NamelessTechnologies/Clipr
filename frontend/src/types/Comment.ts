export default interface CommentModel {
  comment_id: number;
  parent_id: number | null;
  post_id: number;
  user_id: number;
  username: string;
  content: string;
  pfp_url: string;
  num_likes: number;
  liked: boolean;
}
