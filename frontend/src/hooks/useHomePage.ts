import { useState, useEffect } from "react";
import { useAuthStore } from "../stores";
import { categoryService } from "../services/categoryService";
import type { CategoryResponse } from "../services/categoryService";

export function useHomePage() {
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryService.getAllCategories();
            setCategories(response.categories);
        };
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddCategoryClick = () => {
        if (!isAuthenticated) {
            setIsSigninOpen(true);
            return;
        }
        setIsAddCategoryOpen(true);
    };

    const refreshCategories = async () => {
        const response = await categoryService.getAllCategories();
        setCategories(response.categories);
    };

    return {
        isAddCategoryOpen,
        setIsAddCategoryOpen,
        isSigninOpen,
        setIsSigninOpen,
        categories,
        setCategories,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        filteredCategories,
        handleAddCategoryClick,
        refreshCategories,
    };
} 