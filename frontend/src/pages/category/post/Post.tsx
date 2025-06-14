import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { getPostById, getCategoryByPostId, getAdjacentPosts } from '../../../data/mockData';
import AddButton from '../../../components/common/AddButton';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export default function Post() {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState('');

  // Get post and category data from mock data
  const post = getPostById(Number(postId));
  const category = getCategoryByPostId(Number(postId));
  const { prev, next } = getAdjacentPosts(Number(postId));
  const [comments, setComments] = useState<Comment[]>([]);

  // Update comments when post changes
  useEffect(() => {
    if (post) {
      setComments(post.comments);
      setNewComment(''); // Clear comment input when changing posts
    }
  }, [post]);

  if (!post || !category) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-gray-400">The post you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: 'Current User', // TODO: Replace with actual user
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

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
        <Link to={`/category/${category.id}`} className="group">
          <h1 className="text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
            {category.name}
          </h1>
        </Link>
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

      {/* Post Navigation */}
      <div className="flex justify-between mb-6">
        {prev ? (
          <Link
            to={`/category/${category.id}/post/${prev.id}`}
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div>
              <div className="text-sm text-gray-500">Previous Post</div>
              <div className="font-medium">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {next ? (
          <Link
            to={`/category/${category.id}/post/${next.id}`}
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group text-right"
          >
            <div>
              <div className="text-sm text-gray-500">Next Post</div>
              <div className="font-medium">{next.title}</div>
            </div>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Post Content */}
      <article className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <span>Posted by {post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.timestamp}</span>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Comments ({comments.length})</h2>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
          />
          <div className="mt-4 flex justify-end">
            <AddButton
              fullWidth
              variant="dark"
            >
              Add Comment
            </AddButton>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span className="font-medium text-white">{comment.author}</span>
                <span className="mx-2">•</span>
                <span>{comment.timestamp}</span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}