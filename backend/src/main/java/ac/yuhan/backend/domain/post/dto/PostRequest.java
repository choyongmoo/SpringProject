package ac.yuhan.backend.domain.post.dto;

import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String content;
    private Long categoryId;

}
