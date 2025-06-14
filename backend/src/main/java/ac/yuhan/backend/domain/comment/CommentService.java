package ac.yuhan.backend.domain.comment;

import java.util.List;

import org.springframework.stereotype.Service;

import ac.yuhan.backend.domain.comment.dto.CommentRequest;
import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.PostRepository;
import ac.yuhan.backend.domain.user.User;
import ac.yuhan.backend.domain.user.UserRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public Comment createComment(CommentRequest request) {
        User author = userRepository.findById(request.getAuthorId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(request.getPostId())
            .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = Comment.builder()
            .content(request.getContent())
            .author(author)
            .post(post)
            .build();

        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, CommentRequest request, Long userId) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if (!comment.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("You are not the author of this comment");
        }
        
        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public boolean isAuthor(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        return comment.getAuthor().getId().equals(userId);
    }
}