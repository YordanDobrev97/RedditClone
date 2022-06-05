import { useState, useEffect } from 'react'
import { api } from '../utils/request'

const Aside = ({ postHandler }) => {
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    api
      .get('communities')
      .then((r) => r.json())
      .then((data) => setCommunities(data));
  }, []);

  return (
    <div className='hidden md:block w-40 h-full shadow-md bg-white px-1 absolute'>
      <ul className='relative'>
        {communities &&
          communities.map((c) => {
            return (
              <li key={c.title} className='relative'>
                <button value={c.title} onClick={(e) => postHandler(e.target.value)} class='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out'>
                  {c.title}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Aside