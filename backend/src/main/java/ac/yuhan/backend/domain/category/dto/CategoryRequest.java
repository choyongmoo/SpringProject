package ac.yuhan.backend.domain.category.dto;

import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String description;
}