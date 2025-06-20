import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores";
import { postService } from "../services/postService";
import type { PostResponse, CommentResponse } from "../services/postService";

export function usePostPage() {
    const { postId } = useParams();
    const [comment, setComment] = useState("");
    const [post, setPost] = useState<PostResponse | null>(null);
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [isSigninOpen, setIsSigninOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            if (!postId) return;
            try {
                const postData = await postService.getPost(Number(postId));
                setPost(postData);
                const commentsData = await postService.getComments(Number(postId));
                setComments(commentsData.comments);
            } catch (error) {
                console.error('Failed to fetch post data:', error);
            }
        };
        fetchPostAndComments();
    }, [postId]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setIsSigninOpen(true);
            return;
        }
        if (!postId) return;
        try {
            await postService.createComment(Number(postId), { content: comment });
            const commentsData = await postService.getComments(Number(postId));
            setComments(commentsData.comments);
            setComment("");
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    return {
        comment,
        setComment,
        post,
        comments,
        isSigninOpen,
        setIsSigninOpen,
        handleSubmitComment,
    };
} 