import React from "react";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Modal } from "./common/Modal";
import { Textarea } from "./common/Textarea";

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    description: string;
    onNameChange: (name: string) => void;
    onDescriptionChange: (description: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitting: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    isOpen,
    onClose,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    onSubmit,
    submitting,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="새 카테고리 생성"
            size="md"
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    label="카테고리명"
                    name="name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    required
                    placeholder="카테고리명을 입력하세요"
                    helperText="카테고리명은 자동으로 URL 친화적인 형태로 변환됩니다"
                />

                <Textarea
                    label="설명"
                    name="description"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    required
                    placeholder="카테고리에 대한 설명을 입력하세요"
                />

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        loading={submitting}
                        disabled={!name.trim() || !description.trim()}
                    >
                        카테고리 생성
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        취소
                    </Button>
                </div>
            </form>
        </Modal>
    );
}; 