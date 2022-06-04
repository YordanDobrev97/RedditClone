import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

const Card = ( { id, title, votes }) => {
  return (
    <div className="flex w-50 p-3 border-b border-gray-300">
					<span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
					<div className="flex flex-col flex-grow ml-4">
						<div className="flex">
							<span className="ml-1">@user</span>
						</div>
            <Link className="text-lg font-medium mb-1 underline" to={`/posts/details/${id}`}>
              {title}
            </Link>
						<div className="flex mt-2">
							<button className="text-sm font-semibold">
                <FontAwesomeIcon icon={faThumbsUp}/>
              </button>
              <p>{votes}</p>
							<button className="ml-2 text-sm font-semibold">
                <FontAwesomeIcon icon={faThumbsDown}/>
              </button>
						</div>
					</div>
				</div>
  );
};

export default Card;
