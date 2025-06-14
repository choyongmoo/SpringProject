import { useState } from 'react';
import ModalLayout from './ModalLayout';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import Button from '../common/Button';

interface AddCategoryModalProps {
  onClose: () => void;
}

export default function AddCategoryModal({ onClose }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add category logic
    console.log('Add category data:', formData);
    onClose();
  };

  return (
    <ModalLayout title="Add Category" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <FormTextarea
          id="description"
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
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
            Add Category
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 