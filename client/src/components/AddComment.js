import { useState } from 'react'
import Notification from './Notification'
import { api } from '../utils/request'

const AddComment = ({ postId }) => {
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    await api.post('comment/create', { postId, content: comment })
    setComment('')
    setNotification(true)

    setTimeout(() => {
      setNotification(false)
    }, 5000)
  };

  return (
    <div className='max-w-lg shadow-md'>
      <form onSubmit={onSubmit} className='w-full p-4'>
        <label className='block mb-2'>
          <span className='text-gray-600'>Add a comment</span>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className='block w-full mt-1 rounded'
            rows='3'
          ></textarea>
        </label>
        <button className='px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded'>
          Add
        </button>
      </form>

      {notification && (
        <Notification
          value='Your comment has been added successfully'
          color='blue'
          />
      )}
    </div>
  );
};

export default AddComment