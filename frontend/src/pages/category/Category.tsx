import { useParams, Link } from 'react-router';
import { categories } from '../../data/mockData';

export default function Category() {
  const { categoryId } = useParams();
  const category = categories.find(cat => cat.id === Number(categoryId));

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p>The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-6 group"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
        <p className="text-gray-400 mb-4">{category.description}</p>
        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {category.memberCount} members
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {category.latestPosts.length} posts
          </span>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Latest Posts</h2>
        {category.latestPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <Link to={`/category/${category.id}/post/${post.id}`} className="group">
                <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">{post.title}</h3>
              </Link>
              <span className="text-sm text-gray-400">{post.timestamp}</span>
            </div>
            <p className="text-gray-300 mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              <Link
                to={`/category/${category.id}/post/${post.id}`}
                className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-2 group"
              >
                <span>Read More</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}