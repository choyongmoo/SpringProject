package ac.yuhan.backend.domain.post.dto;

import java.time.format.DateTimeFormatter;

import ac.yuhan.backend.domain.post.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentResponse {

    private Long id;

    private String content;

    private String authorName;

    private String createdAt;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.authorName = comment.getAuthor().getUsername();
        this.createdAt = comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
    }
}
