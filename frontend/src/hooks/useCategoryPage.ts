import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores";
import { categoryService } from "../services/categoryService";
import type { CategoryResponse } from "../services/categoryService";
import type { PostResponse } from "../services/postService";

export function useCategoryPage() {
    const { categoryName } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddPostOpen, setIsAddPostOpen] = useState(false);
    const [isSigninOpen, setIsSigninOpen] = useState(false);
    const [category, setCategory] = useState<CategoryResponse | null>(null);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchCategoryAndPosts = async () => {
            if (!categoryName) return;
            try {
                const categoryData = await categoryService.getCategory(categoryName);
                setCategory(categoryData);
                const postsData = await categoryService.getAllPosts(categoryName);
                setPosts(postsData.posts);
            } catch (error) {
                console.error('Failed to fetch category data:', error);
            }
        };
        fetchCategoryAndPosts();
    }, [categoryName]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddPostClick = () => {
        if (!isAuthenticated) {
            setIsSigninOpen(true);
            return;
        }
        setIsAddPostOpen(true);
    };

    const refreshPosts = async () => {
        if (!category) return;
        const postsData = await categoryService.getAllPosts(category.name);
        setPosts(postsData.posts);
    };

    return {
        categoryName,
        searchQuery,
        setSearchQuery,
        isAddPostOpen,
        setIsAddPostOpen,
        isSigninOpen,
        setIsSigninOpen,
        category,
        setCategory,
        posts,
        setPosts,
        isAuthenticated,
        filteredPosts,
        handleAddPostClick,
        refreshPosts,
    };
} 