export default interface CommentModel {
  id: number;
  parent_id: number;
  post_id: number;
  user_id: number;
  content: string;
}
