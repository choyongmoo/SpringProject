package ac.yuhan.backend.domain.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
public interface PostRepository  extends JpaRepository<Post, Long>{
    List<Post> findByCategoryId(Long categoryId);
    List<Post> findByTitleContaining(String keyword);
    List<Post> findByAuthorUsername(String username);
}
