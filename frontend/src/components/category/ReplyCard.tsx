import Card from "../common/Card";
import type { Reply } from "../../data/replies";

interface ReplyCardProps {
  reply: Reply;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <Card variant="secondary" className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-white">{reply.author}</span>
            <span>•</span>
            <span>{reply.createdAt}</span>
          </div>
          <button className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{reply.likes}</span>
          </button>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap">{reply.content}</p>
      </div>
    </Card>
  );
} 