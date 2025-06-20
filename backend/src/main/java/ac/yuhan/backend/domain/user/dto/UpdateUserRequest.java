package ac.yuhan.backend.domain.user.dto;

import ac.yuhan.backend.domain.user.User;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
    private String major;

    public User toEntity() {
        User user = new User();
        user.setEmail(this.email);
        user.setMajor(this.major);

        return user;
    }
}
