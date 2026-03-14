package smartbiz.smartbiz.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import smartbiz.smartbiz.dto.LoginRequest;
import smartbiz.smartbiz.dto.LoginResponse;
import smartbiz.smartbiz.dto.RegisterRequest;
import smartbiz.smartbiz.entity.User;
import smartbiz.smartbiz.entity.UserRole;
import smartbiz.smartbiz.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {
        // prevent duplicates email
        if (userRepository.findByEmail(request.email()) != null) {
            // throw new RuntimeException("Email already exists");
            return "Email already exist";
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.CUSTOMER);

        userRepository.save(user);
        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null) {
            // throw new RuntimeException("User not found");
            return new LoginResponse("User not found", "");
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            // throw new RuntimeException("Invalid password");
            return new LoginResponse("Invalid password", "");
        }

        return new LoginResponse("Login successful", user.getRole().name());
    }
}