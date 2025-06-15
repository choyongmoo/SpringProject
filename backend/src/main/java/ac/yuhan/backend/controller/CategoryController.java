package ac.yuhan.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.yuhan.backend.domain.category.CategoryService;
import ac.yuhan.backend.domain.category.dto.CategoryResponse;
import ac.yuhan.backend.domain.category.dto.CategoriesResponse;
import ac.yuhan.backend.domain.category.dto.CreateCategoryRequest;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<CategoriesResponse> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{name}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable String name) {
        return ResponseEntity.ok(categoryService.getCategory(name));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        CategoryResponse category = categoryService.createCategory(request);
        return ResponseEntity.created(URI.create("/api/categories/" + category.getName()))
                .body(category);
    }

    @GetMapping("/{name}/posts")
    public ResponseEntity<PostsResponse> getAllPosts(@PathVariable String name) {
        return ResponseEntity.ok(categoryService.getAllPosts(name));
    }

}