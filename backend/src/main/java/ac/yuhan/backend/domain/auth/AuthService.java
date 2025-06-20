package ac.yuhan.backend.domain.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ac.yuhan.backend.domain.auth.dto.SigninRequest;
import ac.yuhan.backend.domain.auth.dto.SigninResponse;
import ac.yuhan.backend.domain.auth.dto.SignupRequest;
import ac.yuhan.backend.domain.user.User;
import ac.yuhan.backend.domain.user.UserRepository;
import ac.yuhan.backend.domain.user.UserService;
import ac.yuhan.backend.security.JwtTokenProvider;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider,
            UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @Transactional
    public SigninResponse signup(SignupRequest request, MultipartFile profileImage) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        if (profileImage != null && !profileImage.isEmpty()) {
            userService.uploadProfileImage(user, profileImage);
        }

        userRepository.save(user);

        String token = authenticate(request.getUsername(), request.getPassword());

        return new SigninResponse(token);
    }

    public SigninResponse signin(SigninRequest request) {
        String token = authenticate(request.getUsername(), request.getPassword());

        return new SigninResponse(token);
    }

    private String authenticate(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        return jwtTokenProvider.generateToken(authentication);
    }
}
