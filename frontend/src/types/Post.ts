export default interface PostModel {
  post_id?: number;
  user_id?: number;
  title?: string;
  description?: string;
  datePosted?: Date;
  mediaType?: string;
  content?: string;
}
