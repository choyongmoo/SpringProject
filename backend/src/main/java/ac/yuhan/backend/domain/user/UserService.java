package ac.yuhan.backend.domain.user;

import org.springframework.stereotype.Service;

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

    public UserResponse updateUser(String name, User user, UpdateUserRequest request) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("You are not the owner of this account");
        }
        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setEmail(request.getEmail());
        return new UserResponse(userRepository.save(user));
    }

    public void deleteUser(String name, User user) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("You are not the owner of this account");
        }
        userRepository.delete(user);
    }
}
