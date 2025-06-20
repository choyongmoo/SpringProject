package ac.yuhan.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ac.yuhan.backend.domain.user.UserService;
import ac.yuhan.backend.domain.user.dto.UpdateUserRequest;
import ac.yuhan.backend.domain.user.dto.UserResponse;
import ac.yuhan.backend.security.SecurityUserDetails;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<UserResponse> getUser(@PathVariable String name) {
        return ResponseEntity.ok(userService.getUser(name));
    }

    @PutMapping(value = "/{name}", consumes = "multipart/form-data")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String name,
            @AuthenticationPrincipal SecurityUserDetails userDetails,
            @RequestPart("data") @Valid UpdateUserRequest request,
            @RequestPart(value = "file", required = false) MultipartFile profileImage) {
        return ResponseEntity.ok(userService.updateUser(name, userDetails.getUser(), request, profileImage));
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String name,
            @AuthenticationPrincipal SecurityUserDetails userDetails) {
        userService.deleteUser(name, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }
}
