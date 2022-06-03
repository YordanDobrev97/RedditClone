import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
        <div className="flex w-full max-w-screen-lg">
          <div className="flex flex-col w-64 py-4 pr-3">
            <Link to='/' className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300">Home</Link>
          </div>
          <div className="flex flex-col flex-grow border-l border-r border-gray-300">
            <div className="flex-grow h-0 overflow-auto">
              <div className="flex items-center w-full border-b border-gray-300">
                <div className="flex flex-col flex-grow ml-4">
                  <div className="flex">
                    <span className="ml-1">@username</span>
                  </div>
                  <p className="mt-1">
                    <Link to='/posts/1'>Theme title</Link>
                  </p>
                  <div className="flex mt-2">
                    <button
                      type="button"
                      className="border h-10 border-gray-200 text-gray-400 rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <button
                      type="button"
                      className="border h-10 border-gray-200 text-gray-400 rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    >
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
