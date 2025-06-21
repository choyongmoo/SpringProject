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
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        return new UserResponse(user);
    }

    public UserResponse updateUser(String name, User user, UpdateUserRequest request) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("이 계정의 소유자가 아닙니다.");
        }
        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        user.setEmail(request.getEmail());
        return new UserResponse(userRepository.save(user));
    }

    public void deleteUser(String name, User user) {
        if (!user.getUsername().equals(name)) {
            throw new RuntimeException("이 계정의 소유자가 아닙니다.");
        }
        userRepository.delete(user);
    }
}
