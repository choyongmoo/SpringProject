package ac.yuhan.backend.domain.post.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String categoryName;
}
