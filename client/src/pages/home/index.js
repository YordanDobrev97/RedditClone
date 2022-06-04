import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import Posts from "../post"

const HomePage = () => {
  return (
    <div className="mt-8">
      <Posts />
    </div>
  );
};

export default HomePage;
