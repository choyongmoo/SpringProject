import React from "react";
import { Button } from "./common/Button";
import { Card } from "./common/Card";
import { Textarea } from "./common/Textarea";

interface CommentCardProps {
    comment: {
        id: number;
        content: string;
        authorName: string;
        createdAt: Date;
    };
    isEditing: boolean;
    editingContent: string;
    onEdit: (commentId: number, content: string) => void;
    onUpdate: (commentId: number) => void;
    onCancelEdit: () => void;
    onDelete: (commentId: number) => void;
    onContentChange: (content: string) => void;
    isAuthor: boolean;
    updatingComment: boolean;
    deletingCommentId: number | null;
}

export const CommentCard: React.FC<CommentCardProps> = ({
    comment,
    isEditing,
    editingContent,
    onEdit,
    onUpdate,
    onCancelEdit,
    onDelete,
    onContentChange,
    isAuthor,
    updatingComment,
    deletingCommentId,
}) => {
    return (
        <Card>
            <div className="flex items-start gap-3">
                <div className="avatar-sm bg-bg-tertiary flex items-center justify-center text-text-secondary font-semibold">
                    {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-text-primary">
                                {comment.authorName}
                            </span>
                            <span className="text-sm text-text-secondary">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {isAuthor && (
                            <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onUpdate(comment.id)}
                                            loading={updatingComment}
                                            disabled={!editingContent.trim()}
                                        >
                                            저장
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={onCancelEdit}
                                            disabled={updatingComment}
                                        >
                                            취소
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onEdit(comment.id, comment.content)}
                                        >
                                            수정
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(comment.id)}
                                            loading={deletingCommentId === comment.id}
                                        >
                                            삭제
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="space-y-3">
                            <Textarea
                                value={editingContent}
                                onChange={(e) => onContentChange(e.target.value)}
                                placeholder="댓글을 수정하세요..."
                                className="min-h-[80px]"
                            />
                        </div>
                    ) : (
                        <p className="text-text-primary whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}; 