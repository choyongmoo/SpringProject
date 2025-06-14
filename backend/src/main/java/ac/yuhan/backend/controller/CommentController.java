package ac.yuhan.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ac.yuhan.backend.domain.comment.CommentService;
import ac.yuhan.backend.domain.comment.dto.CommentRequest;
import ac.yuhan.backend.domain.comment.dto.CommentResponse;
import ac.yuhan.backend.security.CustomUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    //댓글 생성
    @PostMapping
    public ResponseEntity<CommentResponse> create(@RequestBody CommentRequest request) {
        return ResponseEntity.ok(new CommentResponse(commentService.createComment(request)));
    }

    //댓글 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(
            commentService.getCommentsByPostId(postId)
                .stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList())
        );
    }

    //댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<CommentResponse> update(
            @PathVariable Long id,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        
        Long userId = userDetails.getUserId();

        return ResponseEntity.ok(
            new CommentResponse(commentService.updateComment(id, request, userId))
        );
    }
}