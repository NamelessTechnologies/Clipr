import { Sidebar } from '../components/Sidebar';

function Home() {
  const foundUser = localStorage.getItem('user');
  var userInfo;
  var uid;

  if (foundUser) {
    userInfo = JSON.parse(foundUser);
    uid = userInfo["user_id"];
    console.log(uid);
  }
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className='text-white'>The Nameless</h1>
        <h1 className= 'text-white'>{uid ? "ID "+uid+" currently logged in!" : ""}</h1>
      </div>
    </div>
  );
}

export default Home;
