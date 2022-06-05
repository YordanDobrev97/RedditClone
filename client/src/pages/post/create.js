import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Notification from '../../components/Notification'
import { api } from '../../utils/request'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [communities, setCommunities] = useState([])
  const [selectCommunity, setSelectCommunity] = useState('')
  const [notification, setNotification] = useState(false)

  const params = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    api
      .get('communities')
      .then((r) => r.json())
      .then((data) => setCommunities(data));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!params.communityId && !selectCommunity) {
      return setNotification(true);
    }

    const res = await api
      .post('posts/create', {
        communityId: params.communityId || selectCommunity,
        title,
        content,
      })
      .then((r) => r.json());

    if (res?._id) {
      navigation(`/posts/details/${res._id}`);
    }
  };

  return (
    <div className='mt-12'>
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
          <div className='p-6 bg-white border-b border-gray-200'>
            <form onSubmit={onSubmit}>
              {!params.communityId && (
                <div className='dropdown row relative'>
                  <select
                    onChange={(e) => setSelectCommunity(e.target.value)}
                    className='bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'
                  >
                    <option className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>
                      Select community
                    </option>
                    {communities &&
                      communities.map((c) => {
                        return (
                          <option
                            key={c?._id}
                            value={c._id}
                            className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                          >
                            {c.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
              <div className='mb-4'>
                <label className='text-xl text-gray-600'>
                  Title <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  onChange={(e) => setTitle(e.target.value)}
                  className='border-2 border-gray-300 p-2 w-full'
                  name='title'
                  id='title'
                  value={title}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='text-xl text-gray-600'>
                  Content <span className='text-red-500'>*</span>
                </label>
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  className='border-2 border-gray-300 p-2 w-full'
                  name='content'
                  id='content'
                ></textarea>
              </div>

              <div className='mb-4'>
                <button className='bg-gray-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-gray-700 transition duration-300'>
                  Add
                </button>
              </div>
            </form>
            {notification && (
              <Notification
                value='Please select a community before adding your post'
                color='red'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
