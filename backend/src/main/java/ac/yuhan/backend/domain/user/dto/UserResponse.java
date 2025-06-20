package ac.yuhan.backend.domain.user.dto;

import java.time.LocalDateTime;

import ac.yuhan.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    private String username;

    private String email;

    private LocalDateTime createdAt;

    public UserResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
    }
}
