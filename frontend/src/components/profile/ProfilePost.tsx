

function ProfilePost(props: {post_url: string}) {

    return (
        <img src={props.post_url} className="w-60 h-72 rounded-xl"></img>
      );
}


export default ProfilePost;