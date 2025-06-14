package ac.yuhan.backend.domain.auth.dto;

import ac.yuhan.backend.domain.user.User;
import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String password;
    private String email;
    private String major;

    public User toEntity(String endcodedPassword) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(endcodedPassword);
        user.setEmail(email);
        user.setMajor(major);
        
        return user;
    }
}
