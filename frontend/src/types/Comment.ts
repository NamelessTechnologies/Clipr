export default interface CommentModel {
    user_id: number;
    username: string;
    pfp_url: string;
    liked: boolean;
    num_likes: number;
    content: string;
  }
  