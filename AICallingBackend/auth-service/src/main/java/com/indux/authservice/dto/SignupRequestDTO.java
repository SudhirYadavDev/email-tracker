package com.indux.authservice.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupRequestDTO {

    private String name;
    private String email;
    private String password;
    private String confirmPassword;
}