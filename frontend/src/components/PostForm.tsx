import React from "react";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Textarea } from "./common/Textarea";

interface PostFormProps {
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    submitting: boolean;
    submitText: string;
    cancelText?: string;
    titlePlaceholder?: string;
    contentPlaceholder?: string;
}

export const PostForm: React.FC<PostFormProps> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
    onSubmit,
    onCancel,
    submitting,
    submitText,
    cancelText = "취소",
    titlePlaceholder = "게시글 제목을 입력하세요",
    contentPlaceholder = "게시글 내용을 작성하세요...",
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                label="제목"
                name="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                placeholder={titlePlaceholder}
            />

            <Textarea
                label="내용"
                name="content"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                required
                placeholder={contentPlaceholder}
            />

            <div className="flex gap-3">
                <Button
                    type="submit"
                    loading={submitting}
                    disabled={!title.trim() || !content.trim()}
                >
                    {submitText}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    {cancelText}
                </Button>
            </div>
        </form>
    );
}; 