package ac.yuhan.backend.domain.comment.dto;

import java.time.LocalDateTime;

import ac.yuhan.backend.domain.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentResponse {

    private Long id;

    private String content;

    private String authorName;

    private LocalDateTime createdAt;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.authorName = comment.getAuthor().getUsername();
        this.createdAt = comment.getCreatedAt();
    }
}
