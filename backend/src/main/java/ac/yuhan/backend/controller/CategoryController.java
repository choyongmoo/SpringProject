package ac.yuhan.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.yuhan.backend.domain.category.CategoryService;
import ac.yuhan.backend.domain.category.dto.CategoriesResponse;
import ac.yuhan.backend.domain.category.dto.CategoryPostsResponse;
import ac.yuhan.backend.domain.category.dto.CategoryResponse;
import ac.yuhan.backend.domain.category.dto.CreateCategoryRequest;
import ac.yuhan.backend.domain.category.dto.UpdateCategoryRequest;
import ac.yuhan.backend.domain.post.dto.CreatePostRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.security.SecurityUserDetails;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/category")
@Tag(name = "Category")
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
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<CategoryResponse> createCategory(
            @Valid @RequestBody CreateCategoryRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        CategoryResponse category = categoryService.createCategory(request, userDetails.getUser());
        return ResponseEntity.created(URI.create("/api/category/" + category.getName()))
                .body(category);
    }

    @PutMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable String name,
            @Valid @RequestBody UpdateCategoryRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        return ResponseEntity.ok(categoryService.updateCategory(name, request, userDetails.getUser()));
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable String name,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        categoryService.deleteCategory(name, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{name}/posts")
    public ResponseEntity<CategoryPostsResponse> getCategoryPosts(@PathVariable String name) {
        return ResponseEntity.ok(categoryService.getCategoryPosts(name));
    }

    @PostMapping("/{name}/posts")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<PostResponse> createPost(
            @PathVariable String name,
            @Valid @RequestBody CreatePostRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        PostResponse post = categoryService.createPost(name, request, userDetails.getUser());
        return ResponseEntity.created(URI.create("/api/posts/" + post.getId())).body(post);
    }

}