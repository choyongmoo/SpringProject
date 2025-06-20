package ac.yuhan.backend.domain.comment;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ac.yuhan.backend.domain.comment.dto.CommentResponse;
import ac.yuhan.backend.domain.comment.dto.CreateCommentRequest;
import ac.yuhan.backend.domain.comment.dto.UpdateCommentRequest;
import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.PostRepository;
import ac.yuhan.backend.domain.user.User;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public CommentResponse getComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return new CommentResponse(comment);
    }

    @Transactional
    public void createComment(Long postId, CreateCommentRequest request, User author) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setAuthor(author);

        commentRepository.save(comment);
    }

    @Transactional
    public CommentResponse updateComment(Long id, UpdateCommentRequest request, User author) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getAuthor().equals(author)) {
            throw new RuntimeException("You have no permission to update this comment");
        }
        comment.setContent(request.getContent());

        return new CommentResponse(commentRepository.save(comment));
    }

    @Transactional
    public void deleteComment(Long id, User author) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getAuthor().equals(author)) {
            throw new RuntimeException("You have no permission to delete this comment");
        }
        commentRepository.delete(comment);
    }
}
