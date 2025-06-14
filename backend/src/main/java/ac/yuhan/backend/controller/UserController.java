package ac.yuhan.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.yuhan.backend.domain.user.User;
import ac.yuhan.backend.domain.user.UserService;
import ac.yuhan.backend.domain.user.dto.UpdateUserRequest;
import ac.yuhan.backend.domain.user.dto.UserResponse;
import ac.yuhan.backend.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 내 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyInfo(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(401).build();
        }

        String username = jwtTokenProvider.getAuthentication(token).getName();

        return userService.getUserByUsername(username)
                .map(user -> ResponseEntity.ok(UserResponse.from(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    // 내 정보 수정
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateMyInfo(HttpServletRequest request, @RequestBody UpdateUserRequest updateRequest) {
        String token = jwtTokenProvider.resolveToken(request);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(401).build();
        }

        String username = jwtTokenProvider.getAuthentication(token).getName();

        User updatedUser = userService.updateUserByUsername(username, updateRequest.toEntity());
        return ResponseEntity.ok(UserResponse.from(updatedUser));
    }

    // 내 계정 삭제
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyAccount(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(401).build();
        }

        String username = jwtTokenProvider.getAuthentication(token).getName();
        userService.deleteUserByUsername(username);

        return ResponseEntity.noContent().build();
    }
}
