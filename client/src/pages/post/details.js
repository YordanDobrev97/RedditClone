import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CommentSection from "../../components/CommentSection"
import { api } from "../../utils/request"

const Details = () => {
  const [post, setPost] = useState({})
  const params = useParams()

  useEffect(() => {
    api
      .get(`posts/${params.id}`)
      .then((r) => r.json())
      .then((post) => setPost(post));
  }, []);

  return (
    <div>
      <div className='container border-2 w-2/3 m-auto p-4'>
        <div className='max-w-lg m-auto'>
          <h2 className='text-center font-medium leading-tight text-4xl mt-0 mb-2 text-black-600'>{post.title}</h2>
          <p className='text-gray-700 text-base mb-4'>{post.content}</p>
        </div>
      </div>

      <CommentSection id={post._id} data={post.comments} />
    </div>
  );
};

export default Details;
