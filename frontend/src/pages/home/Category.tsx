import { Link } from 'react-router';
import Post from './Post';
import AddButton from '../../components/common/AddButton';

interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  content: string;
  timestamp: string;
}

interface CategoryProps {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  latestPosts: Post[];
  onAddPost: (categoryId: number) => void;
}

export default function Category({ id, name, description, memberCount, latestPosts, onAddPost }: CategoryProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-200">
      {/* Category Header */}
      <div className="mb-4">
        <Link to={`/category/${id}`} className="group">
          <h2 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors">{name}</h2>
          <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">{description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
            <span>{memberCount} members</span>
          </div>
        </Link>
      </div>

      {/* Latest Posts */}
      <div className="space-y-4">
        {/* Add Post Button */}
        <AddButton
          onClick={() => onAddPost(id)}
          fullWidth
          variant="dark"
        >
          Add Post
        </AddButton>

        {latestPosts.map((post) => (
          <Link key={post.id} to={`/category/${id}/post/${post.id}`} className="block">
            <Post {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
} 