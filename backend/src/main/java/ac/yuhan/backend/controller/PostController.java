package ac.yuhan.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.yuhan.backend.domain.post.PostService;
import ac.yuhan.backend.domain.post.dto.CommentsResponse;
import ac.yuhan.backend.domain.post.dto.CreateCommentRequest;
import ac.yuhan.backend.domain.post.dto.CreatePostRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import ac.yuhan.backend.security.SecurityUserDetails;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<PostsResponse> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        PostResponse post = postService.createPost(request, userDetails.getUser());
        return ResponseEntity.created(URI.create("/api/posts/" + post.getId()))
                .body(post);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<CommentsResponse> getComments(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getComments(id));
    }

    @PostMapping("/{id}/comments")
    @PreAuthorize("isAuthenticated()")
    public void createComment(@PathVariable Long id,
            @Valid @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        postService.createComment(id, request, userDetails.getUser());
    }
}
