package ac.yuhan.backend.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import ac.yuhan.backend.domain.post.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
}
