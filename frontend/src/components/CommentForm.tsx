import React from "react";
import { Button } from "./common/Button";
import { Card } from "./common/Card";
import { Textarea } from "./common/Textarea";

interface CommentFormProps {
    content: string;
    onContentChange: (content: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    submitting: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({
    content,
    onContentChange,
    onSubmit,
    onCancel,
    submitting,
}) => {
    return (
        <Card className="mb-6">
            <form onSubmit={onSubmit} className="space-y-4">
                <Textarea
                    label="댓글 내용"
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    required
                    placeholder="댓글을 작성하세요..."
                />

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        loading={submitting}
                        disabled={!content.trim()}
                    >
                        댓글 작성
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        취소
                    </Button>
                </div>
            </form>
        </Card>
    );
}; 