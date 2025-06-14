import { useState } from 'react';
import ModalLayout from './ModalLayout';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import Button from '../common/Button';

interface AddPostModalProps {
  onClose: () => void;
  categoryId: number;
  categoryName: string;
}

export default function AddPostModal({ onClose, categoryId, categoryName }: AddPostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add post logic
    console.log('Add post data:', { ...formData, categoryId });
    onClose();
  };

  return (
    <ModalLayout title={`Add Post to ${categoryName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="title"
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <FormTextarea
          id="content"
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          minHeight="150px"
        />

        <hr className="border-gray-700 my-6" />

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Add Post
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 