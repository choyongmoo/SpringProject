interface PostProps {
  id: number;
  title: string;
  author: string;
  category: string;
  content: string;
  timestamp: string;
}

export default function Post({ title, author, content, timestamp }: PostProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all duration-200 group">
      <div className="flex justify-between items-start">
        <h4 className="text-green-400 font-medium group-hover:text-green-300 transition-colors">{title}</h4>
        <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{timestamp}</span>
      </div>
      <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors line-clamp-2">{content}</p>
      <div className="flex items-center mt-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
        <span>Posted by {author}</span>
      </div>
    </div>
  );
}