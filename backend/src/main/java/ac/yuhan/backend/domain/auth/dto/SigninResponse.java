package ac.yuhan.backend.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import ac.yuhan.backend.domain.user.dto.UserResponse;

@Data
@AllArgsConstructor
public class SigninResponse {

    private String token;

    private UserResponse user;
}
