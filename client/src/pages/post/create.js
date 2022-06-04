import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../utils/request'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const params = useParams()
  const navigation = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const res = await api.post('posts/create', 
      {communityId: params.communityId, title, content}
    ).then(r => r.json())
    
    if (res?._id) {
      navigation(`/posts/details/${res._id}`)
    }
  }

  return (
    <div className='mt-12'>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form onSubmit={onSubmit}>
                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Title <span class="text-red-500">*</span></label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} class="border-2 border-gray-300 p-2 w-full" name="title" id="title" value={title} required />
                        </div>

                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Content <span class="text-red-500">*</span></label>
                            <textarea onChange={(e) => setContent(e.target.value)} class="border-2 border-gray-300 p-2 w-full" name="content" id="content"></textarea>
                        </div>

                        <div class='mb-4'>
                        <button class="bg-gray-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-gray-700 transition duration-300">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePost