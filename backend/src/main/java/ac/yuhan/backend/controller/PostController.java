package ac.yuhan.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.PostService;
import ac.yuhan.backend.domain.post.dto.PostRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    //새 게시글 생성
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        Post post = toEntity(request);
        Post created = postService.createPost(post, request.getCategoryId(), request.getAuthorId());
        return ResponseEntity.ok(new PostResponse(created));
    }

    //모든 게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> responses = postService.getAllPosts()
            .stream()
            .map(PostResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    //특정 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
            .map(PostResponse::new)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    //특정 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long id, @RequestBody PostRequest request) {
        Post post = toEntity(request);
        try {
            Post updated = postService.updatePost(id, post, request.getCategoryId());
            return ResponseEntity.ok(new PostResponse(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //특정 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    private Post toEntity(PostRequest request) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        return post;
    }
}
