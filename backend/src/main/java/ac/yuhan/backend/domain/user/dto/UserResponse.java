package ac.yuhan.backend.domain.user.dto;

import ac.yuhan.backend.domain.user.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String major;

    public static UserResponse from(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setMajor(user.getMajor());
        
        return dto;
    }
}
