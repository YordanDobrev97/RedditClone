import { useContext } from 'react'
import AddComment from './AddComment'
import CommentBox from './CommentBox'
import AuthContext from '../context/authContext'

const CommentSection = ({ id, data }) => {
  const context = useContext(AuthContext)

  return (
    <div className='container'>
      <div className='max-w-lg m-6 mx-auto'>
        <h3>Comments</h3>

        <div className='max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20'>
          {data &&
            data.map((c, i) => {
              return (
                <div key={c._id}>
                  <CommentBox count={i + 1} comment={c}/>
                </div>
              );
            })}
        </div>

        {context.isAuthenticated && <AddComment postId={id} />}
      </div>
    </div>
  );
};

export default CommentSection