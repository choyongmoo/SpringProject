import { useCallback, useEffect, useState } from "react";
import type {
  PostCommentsResponse,
  PostResponse,
} from "../services/postService";
import { getPost, getPostComments } from "../services/postService";

export const usePost = (id: number) => {
  const [post, setPost] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getPost(id);
      setPost(response);
    } catch {
      setError("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
};

export const usePostComments = (id: number) => {
  const [postComments, setPostComments] = useState<PostCommentsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostComments = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getPostComments(id);
      setPostComments(response);
    } catch {
      setError("Failed to fetch post comments");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments]);

  return {
    postComments,
    loading,
    error,
    refetch: fetchPostComments,
  };
};
