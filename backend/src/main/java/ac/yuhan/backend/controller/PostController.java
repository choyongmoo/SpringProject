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

import ac.yuhan.backend.domain.comment.dto.CommentResponse;
import ac.yuhan.backend.domain.comment.dto.CommentsResponse;
import ac.yuhan.backend.domain.comment.dto.CreateCommentRequest;
import ac.yuhan.backend.domain.post.PostService;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.UpdatePostRequest;
import ac.yuhan.backend.security.SecurityUserDetails;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/post")
@Tag(name = "Post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePostRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        return ResponseEntity.ok(postService.updatePost(id, request, userDetails.getUser()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<Void> deletePost(@PathVariable Long id,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        postService.deletePost(id, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<CommentsResponse> getComments(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getComments(id));
    }

    @PostMapping("/{id}/comments")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long id,
            @Valid @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        CommentResponse comment = postService.createComment(id, request, userDetails.getUser());
        return ResponseEntity.created(URI.create("/api/comments/" + comment.getId())).body(comment);
    }
}
