export default interface Comment {
    id: number,
    parent_id: number,
    post_id: number,
    user_id: number,
    content: string
}