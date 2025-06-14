package ac.yuhan.backend.domain.comment.dto;

import java.time.LocalDateTime;

import ac.yuhan.backend.domain.comment.Comment;
import lombok.Getter;

@Getter
public class CommentResponse {
    private Long id;
    private String content;
    private String authorName;
    private Long postId;
    private LocalDateTime createdAt;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.authorName = comment.getAuthor().getUsername();
        this.postId = comment.getPost().getId();
        this.createdAt = comment.getCreatedAt();
    }
}