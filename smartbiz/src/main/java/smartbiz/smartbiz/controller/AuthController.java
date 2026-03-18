package smartbiz.smartbiz.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import smartbiz.smartbiz.dto.LoginRequest;
import smartbiz.smartbiz.dto.LoginResponse;
import smartbiz.smartbiz.dto.RegisterRequest;
import smartbiz.smartbiz.entity.User;
import smartbiz.smartbiz.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    //get current user
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long userId) {
        return authService.getUserById(userId);
    }

}
