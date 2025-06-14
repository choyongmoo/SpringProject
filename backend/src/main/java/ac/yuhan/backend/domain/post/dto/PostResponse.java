package ac.yuhan.backend.domain.post.dto;

import ac.yuhan.backend.domain.post.Post;
import lombok.Data;

@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String categoryName;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.categoryName = post.getCategory() != null ? post.getCategory().getName() : null;
    }
}
