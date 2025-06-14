package ac.yuhan.backend.domain.user;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
            .map(user -> {
                user.setUsername(updatedUser.getUsername());
                user.setEmail(updatedUser.getEmail());
                user.setMajor(updatedUser.getMajor());
                return userRepository.save(user);
            }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUserByUsername(String username, User updatedUser) {
        return userRepository.findByUsername(username)
            .map(user -> {
                user.setEmail(updatedUser.getEmail());
                user.setMajor(updatedUser.getMajor());
                return userRepository.save(user);
            }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteUserByUsername(String username) {
        userRepository.findByUsername(username)
            .ifPresentOrElse(
                user -> userRepository.deleteById(user.getId()),
                () -> { throw new RuntimeException("User not found"); }
            );
    }
}
