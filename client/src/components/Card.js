import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { api } from '../utils/request'

const Card = ({ id, title, votes }) => {
  const [currentVotes, setVotes] = useState(votes);

  const upVote = () => {
    api
      .put(`post/upVote/${id}`)
      .then((r) => r.json())
      .then(() => setVotes((oldValue) => oldValue + 1));
  };

  const downVote = () => {
    api
      .put(`post/downVote/${id}`)
      .then((r) => r.json())
      .then(() => setVotes((oldValue) => oldValue - 1));
  };

  return (
    <div className='shadow-md bg-light-400 m-6 rounded-lg flex p-3 border-b border-gray-400'>
      <div className='flex flex-col flex-grow ml-4'>
        <div className='flex'>
          <span className='ml-1'>@user</span>
        </div>
        <Link
          className='text-lg font-medium mb-1 underline'
          to={`/posts/details/${id}`}
        >
          {title}
        </Link>
        <div className='flex mt-2'>
          <button onClick={upVote} className='text-sm font-semibold'>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <p>{currentVotes}</p>
          <button onClick={downVote} className='ml-2 text-sm font-semibold'>
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card