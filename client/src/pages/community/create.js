import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/request'
import { useCookies } from 'react-cookie'

const CommunityCreate = () => {
  const [name, setName] = useState('')
  const [cookies] = useCookies(['jwt'])
  const navigation = useNavigate()

  const create = async () => {
    const res = await api.post('community/create', { title: name }, 
    {
      'Content-Type': 'application/json',
      'token': cookies?.jwt
    }).then(r => r.json())
    
    if (res?._id) {
      navigation(`/posts/create/${res._id}`)
    }
  }

  return (
    <div className='mt-12'>
       <div className="mb-6">
        <label for="community" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create Community</label>
        <input onChange={(e) => setName(e.target.value)} type="text" id="community" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter community name" required />

        <button
        type="button"
        className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        onClick={create}
        >
        Add
      </button>
      </div>
    </div>
  )
}

export default CommunityCreate