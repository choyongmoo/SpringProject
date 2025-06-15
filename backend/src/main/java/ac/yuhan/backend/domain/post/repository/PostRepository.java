package ac.yuhan.backend.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ac.yuhan.backend.domain.post.model.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryName(String categoryName);
}
