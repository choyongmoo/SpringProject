package ac.yuhan.backend.domain.post.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class CreateCommentRequest {

    @NotBlank
    private String content;
}
