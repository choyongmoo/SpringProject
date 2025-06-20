package ac.yuhan.backend.domain.category.dto;

import java.util.List;
import java.util.stream.Collectors;

import ac.yuhan.backend.domain.category.Category;
import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CategoryPostsResponse extends CategoryResponse {

    private List<PostResponse> posts;

    public CategoryPostsResponse(Category category, List<Post> posts) {
        super(category);
        this.posts = posts.stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());
    }

}
