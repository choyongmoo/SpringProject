package ac.yuhan.backend.domain.post.dto;

import java.time.format.DateTimeFormatter;

import ac.yuhan.backend.domain.post.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostResponse {

    private Long id;

    private String title;

    private String content;

    private String authorName;

    private String createdAt;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.authorName = post.getAuthor().getUsername();
        this.createdAt = post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
    }
}
