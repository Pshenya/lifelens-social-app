import { Models } from "appwrite"
import { Link } from "react-router-dom";

type TrendingPostProps = {
  post: Models.Document;
}

const TrendingPost = ({ post }: TrendingPostProps) => {
  return (
    <Link to={`/posts/${post.$id}`}>
      <div className="w-36 h-36 rounded-xl bg-dark-3 overflow-hidden">
        <img src={post.imageUrl} className="w-full transition-all duration-300 hover:scale-105"/>
      </div>
    </Link>
  )
}

export default TrendingPost
