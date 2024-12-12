export default interface MessageModel {
  id: number;
  convo_id: number;
  content: string;
  datesent: Date;
  user_id: number;
  user_pfp: string;
}
