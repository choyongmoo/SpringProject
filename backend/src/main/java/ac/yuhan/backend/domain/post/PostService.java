package ac.yuhan.backend.domain.post;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ac.yuhan.backend.domain.comment.Comment;
import ac.yuhan.backend.domain.comment.CommentRepository;
import ac.yuhan.backend.domain.comment.dto.CommentResponse;
import ac.yuhan.backend.domain.comment.dto.CommentsResponse;
import ac.yuhan.backend.domain.comment.dto.CreateCommentRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import ac.yuhan.backend.domain.post.dto.UpdatePostRequest;
import ac.yuhan.backend.domain.user.User;
import jakarta.transaction.Transactional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public PostsResponse getAllPosts() {
        return new PostsResponse(postRepository.findAll().stream()
                .map(PostResponse::new)
                .collect(Collectors.toList()));
    }

    public PostResponse getPost(Long id) {
        return new PostResponse(postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found")));
    }

    @Transactional
    public PostResponse updatePost(Long id, UpdatePostRequest request, User author) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getAuthor().equals(author)) {
            throw new RuntimeException("You are not the author of this post");
        }
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        return new PostResponse(postRepository.save(post));
    }

    @Transactional
    public void deletePost(Long id, User author) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getAuthor().equals(author)) {
            throw new RuntimeException("You are not the author of this post");
        }
        postRepository.deleteById(id);
    }

    public CommentsResponse getComments(Long id) {
        return new CommentsResponse(commentRepository.findByPostId(id).stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList()));
    }

    @Transactional
    public CommentResponse createComment(Long id, CreateCommentRequest request, User author) {
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found")));
        comment.setAuthor(author);
        return new CommentResponse(commentRepository.save(comment));
    }
}
