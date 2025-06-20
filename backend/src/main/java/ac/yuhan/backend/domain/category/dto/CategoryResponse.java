package ac.yuhan.backend.domain.category.dto;

import ac.yuhan.backend.domain.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryResponse {

    private String name;

    private String description;

    public CategoryResponse(Category category) {
        this.name = category.getName();
        this.description = category.getDescription();
    }
}
