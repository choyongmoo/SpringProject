package ac.yuhan.backend.domain.post;

import ac.yuhan.backend.domain.post.dto.CommentResponse;
import ac.yuhan.backend.domain.post.dto.CommentsResponse;
import ac.yuhan.backend.domain.post.dto.CreateCommentRequest;
import ac.yuhan.backend.domain.post.dto.CreatePostRequest;
import ac.yuhan.backend.domain.post.dto.PostResponse;
import ac.yuhan.backend.domain.post.dto.PostsResponse;
import ac.yuhan.backend.domain.post.model.Comment;
import ac.yuhan.backend.domain.post.model.Post;
import ac.yuhan.backend.domain.post.repository.PostRepository;
import ac.yuhan.backend.domain.user.User;
import ac.yuhan.backend.domain.category.CategoryRepository;
import jakarta.transaction.Transactional;
import ac.yuhan.backend.domain.post.repository.CommentRepository;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, CategoryRepository categoryRepository,
            CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
    }

    public PostsResponse getAllPosts() {
        return new PostsResponse(postRepository.findAll().stream()
                .map(PostResponse::new)
                .collect(Collectors.toList()));
    }

    public PostResponse getPost(Long id) {
        return new PostResponse(postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found")));
    }

    @Transactional
    public PostResponse createPost(CreatePostRequest request, User author) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setCategory(categoryRepository.findById(request.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        post.setAuthor(author);

        return new PostResponse(postRepository.save(post));
    }

    public CommentsResponse getComments(Long id) {
        return new CommentsResponse(commentRepository.findByPostId(id).stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList()));
    }

    @Transactional
    public void createComment(Long id, CreateCommentRequest request, User author) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setAuthor(author);

        commentRepository.save(comment);
    }
}
