import React from "react";
import { Link } from "react-router";
import { Card } from "./common/Card";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        content: string;
        authorName: string;
        createdAt: Date;
    };
    categoryName: string;
    showDeleteButton?: boolean;
    onDelete?: (postId: number) => void;
    deletingPostId?: number | null;
}

export const PostCard: React.FC<PostCardProps> = ({
    post,
    categoryName
}) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <Link to={`/category/${categoryName}/${post.id}`} className="flex-1">
                    <div className="card-header">
                        <h3 className="card-title text-lg">{post.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span>작성자: {post.authorName}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="text-text-secondary line-clamp-3">
                        {post.content.length > 200
                            ? `${post.content.substring(0, 200)}...`
                            : post.content}
                    </div>
                </Link>
            </div>
        </Card>
    );
}; 