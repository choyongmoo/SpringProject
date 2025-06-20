package ac.yuhan.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ac.yuhan.backend.domain.auth.AuthService;
import ac.yuhan.backend.domain.auth.dto.SigninRequest;
import ac.yuhan.backend.domain.auth.dto.SigninResponse;
import ac.yuhan.backend.domain.auth.dto.SignupRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/signup", consumes = "multipart/form-data")
    public ResponseEntity<SigninResponse> signup(
            @RequestPart("data") @Valid SignupRequest request,
            @RequestPart(value = "file", required = false) MultipartFile profileImage) {
        return ResponseEntity.ok(authService.signup(request, profileImage));
    }

    @PostMapping("/signin")
    public ResponseEntity<SigninResponse> signin(@Valid @RequestBody SigninRequest request) {
        return ResponseEntity.ok(authService.signin(request));
    }
}