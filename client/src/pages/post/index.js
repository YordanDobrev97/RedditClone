import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import Aside from '../../components/Aside'
import { api } from '../../utils/request'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api
      .get('posts')
      .then((r) => r.json())
      .then((data) => setPosts(data));
  }, []);

  const communityPostHandler = (community) => {
    api.get(`community/${community}`)
      .then(r => r.json())
      .then((data) => setPosts(data.posts))
  }

  return (
    <div className='flex row'>
      <Aside postHandler={communityPostHandler}/>
      <div className='flex-row max-w-3xl max-w-md max-w-2xl m-auto'>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id}>
                <Card id={post._id} title={post.title} votes={post.votes} />
              </div>
            )
          })}
      </div>
    </div>
  );
};

export default Posts;
