package ac.yuhan.backend.domain.category.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateCategoryRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String description;
}
