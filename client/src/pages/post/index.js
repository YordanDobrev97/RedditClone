import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import { api } from '../../utils/request'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get('posts')
    .then(r => r.json())
    .then((data) => {
      setPosts(data)
    })
  }, [])

  return (
    <div>
      <div class='flex-row w-full'>
          {posts && posts.map((post) => {
            return (
              <Card id={post._id} title={post.title} votes={post.votes} />
            )
          })}
          </div>
		</div>
  )
}

export default Posts