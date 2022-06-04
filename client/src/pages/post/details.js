import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import { api } from '../../utils/request'

const Details = () => {
  const [post, setPost] = useState({})
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [notification, setNotification] = useState(false)

  const params = useParams()

  useEffect(() => {
    api.get(`posts/${params.id}`)
      .then(r => r.json())
      .then((post) => {
        setPost(post)
      })
    
    api.get('comments').then(r => r.json())
      .then((comments) => {
        setComments(comments)
      })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    
    await api.post('comment/create', {postId: post._id, content: comment}).then(r => r.json())
    setComment('')
    setNotification(true)

    setTimeout(() => {
      setNotification(false)
    }, 5000)
  }

  return (
    <div className='mt-12'>
      <Card id={post._id} title={post.title} votes={post.votes}/>
      <p className='max-w-md m-3'>{post.content}</p>
      <div className='max-w-lg m-6'>
        <h3>Comments</h3>

        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          {comments && comments.map((c, i) => {
            return (
              <div key={c._id}>
                <h3 class="text-gray-800 text-3xl font-semibold">#{(i + 1)}</h3>
                <p className="mt-2 text-gray-600">{c.content}</p>
              </div>
            )
          })}
        </div>
    </div>
      
    {notification && (
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p class="font-bold">Succesfully added</p>
    </div>)}

      <div class="max-w-lg shadow-md">
        <form onSubmit={onSubmit} class="w-full p-4">
          <label class="block mb-2">
            <span class="text-gray-600">Add a comment</span>
            <textarea onChange={(e) => setComment(e.target.value)} value={comment} class="block w-full mt-1 rounded" rows="3"></textarea>
          </label>
          <button class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">Add</button>
        </form>
      </div>

    </div>
  )
}

export default Details