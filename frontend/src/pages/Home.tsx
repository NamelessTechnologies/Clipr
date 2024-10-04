import { Sidebar } from '../components/Sidebar';

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className='text-white'>The Nameless</h1>

      </div>
    </div>
  );
}

export default Home;
