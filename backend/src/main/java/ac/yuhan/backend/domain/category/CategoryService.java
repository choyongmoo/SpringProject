package ac.yuhan.backend.domain.category;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ac.yuhan.backend.domain.category.dto.CategoriesResponse;
import ac.yuhan.backend.domain.category.dto.CategoryResponse;
import ac.yuhan.backend.domain.category.dto.CreateCategoryRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import ac.yuhan.backend.domain.post.repository.PostRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;

    public CategoryService(CategoryRepository categoryRepository, PostRepository postRepository) {
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
    }

    public CategoriesResponse getAllCategories() {
        return new CategoriesResponse(categoryRepository.findAll().stream()
                .map(CategoryResponse::new)
                .collect(Collectors.toList()));
    }

    public CategoryResponse getCategory(String name) {
        return new CategoryResponse(
                categoryRepository.findById(name).orElseThrow(() -> new RuntimeException("Category not found")));
    }

    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsById(request.getName())) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return new CategoryResponse(categoryRepository.save(category));
    }

    public PostsResponse getAllPosts(String name) {
        return new PostsResponse(postRepository.findByCategoryName(name).stream()
                .map(PostResponse::new)
                .collect(Collectors.toList()));
    }
}
