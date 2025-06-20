package ac.yuhan.backend.domain.category;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ac.yuhan.backend.domain.category.dto.CategoriesResponse;
import ac.yuhan.backend.domain.category.dto.CategoryResponse;
import ac.yuhan.backend.domain.category.dto.CreateCategoryRequest;
import ac.yuhan.backend.domain.category.dto.UpdateCategoryRequest;
import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.PostRepository;
import ac.yuhan.backend.domain.post.dto.CreatePostRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import ac.yuhan.backend.domain.user.User;
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
    public CategoryResponse createCategory(CreateCategoryRequest request, User author) {
        if (categoryRepository.existsById(request.getName())) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setAuthor(author);
        return new CategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(String name, User author) {
        Category category = categoryRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        if (!category.getAuthor().equals(author)) {
            throw new RuntimeException("You have no permission to delete this category");
        }
        categoryRepository.deleteById(name);
    }

    @Transactional
    public CategoryResponse updateCategory(String name, UpdateCategoryRequest request, User author) {
        Category category = categoryRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        if (!category.getAuthor().equals(author)) {
            throw new RuntimeException("You have no permission to update this category");
        }
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        return new CategoryResponse(categoryRepository.save(category));
    }

    public PostsResponse getAllPosts(String name) {
        return new PostsResponse(postRepository.findByCategoryName(name).stream()
                .map(PostResponse::new)
                .collect(Collectors.toList()));
    }

    @Transactional
    public PostResponse createPost(String name, CreatePostRequest request, User author) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setCategory(
                categoryRepository.findById(name).orElseThrow(() -> new RuntimeException("Category not found")));
        post.setAuthor(author);
        return new PostResponse(postRepository.save(post));
    }
}
