package ac.yuhan.backend.domain.user;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ac.yuhan.backend.domain.user.dto.UpdateUserRequest;
import ac.yuhan.backend.domain.user.dto.UserResponse;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getUser(String name) {
        User user = userRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user);
    }

    public UserResponse updateUser(String name, User user, UpdateUserRequest request, MultipartFile profileImage) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("You are not the owner of this account");
        }
        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setEmail(request.getEmail());
        if (profileImage != null && !profileImage.isEmpty()) {
            uploadProfileImage(user, profileImage);
        }
        return new UserResponse(userRepository.save(user));
    }

    public void deleteUser(String name, User user) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("You are not the owner of this account");
        }
        userRepository.delete(user);
    }

    public void uploadProfileImage(User user, MultipartFile profileImage) {
        try {
            String userDir = "uploads/" + user.getUsername();
            Files.createDirectories(Paths.get(userDir));

            String fileName = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
            Path targetPath = Paths.get(userDir, fileName);
            profileImage.transferTo(targetPath.toFile());

            if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
                Path oldPath = Paths.get(user.getProfileImageUrl().replace("/uploads/", "uploads/"));
                if (Files.exists(oldPath)) {
                    Files.delete(oldPath);
                }
            }

            String imagePath = "/uploads/" + user.getUsername() + "/" + fileName;
            user.setProfileImageUrl(imagePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save profile image");
        }
    }
}
