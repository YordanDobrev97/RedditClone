import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { api } from '../utils/request'

const CommentBox = ({ count, comment }) => {
  const [currentVotes, setVotes] = useState(comment.votes)

  const upVote = () => {
    api.put(`comment/upVote/${comment._id}`)
      .then(r => r.json())
      .then(() => setVotes((oldValue) => oldValue + 1))
  };

  const downVote = () => {
    api.put(`comment/downVote/${comment._id}`)
      .then(r => r.json())
      .then(() => setVotes((oldValue) => oldValue - 1))
  };

  return (
    <div key={comment._id}>
      <h3 className='text-gray-800 text-3xl font-semibold'>#{count}</h3>
      <p className='mt-2 text-gray-600'>{comment.content}</p>
      <div className='mt-3 flex justify-around'>
        <button onClick={upVote}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <p>{currentVotes}</p>
        <button onClick={downVote}>
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    </div>
  );
};

export default CommentBox