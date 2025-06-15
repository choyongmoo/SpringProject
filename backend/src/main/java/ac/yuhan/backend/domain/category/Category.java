package ac.yuhan.backend.domain.category;

import java.util.ArrayList;
import java.util.List;

import ac.yuhan.backend.domain.post.model.Post;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import lombok.Data;
import jakarta.persistence.CascadeType;

@Entity
@Table(name = "categories")
@Data
public class Category {

    @Id
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();
}
