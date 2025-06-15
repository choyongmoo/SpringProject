import { useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../common/Button";
import Input from "../common/Input";
import { postService } from "../../services/postService";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  onSuccess?: () => void;
}

export default function AddPostModal({ isOpen, onClose, categoryName, onSuccess }: AddPostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postService.createPost({ title, content, categoryName });
      setTitle("");
      setContent("");
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title={`Add Post in ${categoryName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          multiline
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />

        <div className="flex gap-4 mt-8 mb-4">
          <Button variant="secondary" type="button" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" fullWidth>
            Add Post
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 