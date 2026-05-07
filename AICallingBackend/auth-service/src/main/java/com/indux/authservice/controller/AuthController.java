package com.indux.authservice.controller;

import com.indux.authservice.dto.LoginRequestDTO;
import com.indux.authservice.dto.SignupRequestDTO;
import com.indux.authservice.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequestDTO request) {

        return authService.signup(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO request) {

        return authService.login(request);
    }
}