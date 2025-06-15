import Card from "../common/Card";
import type { CommentResponse } from "../../services/postService";

interface ReplyCardProps {
  reply: CommentResponse;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <Card variant="secondary" className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-white">{reply.authorName}</span>
            <span>•</span>
            <span>{reply.createdAt}</span>
          </div>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap">{reply.content}</p>
      </div>
    </Card>
  );
} 