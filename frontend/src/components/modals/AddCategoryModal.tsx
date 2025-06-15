import { useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../common/Button";
import Input from "../common/Input";
import { categoryService } from "../../services/categoryService";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedName = name.trim().replace(/\s+/g, '_').toLowerCase();
      await categoryService.createCategory({ name: formattedName, description });
      setName("");
      setDescription("");
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Add Category">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          multiline
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />

        <div className="flex gap-4 mt-8 mb-4">
          <Button variant="secondary" type="button" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" fullWidth>
            Add Category
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 