package com.indux.campaignservice.client;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class EmailClient {

    private final RestTemplate restTemplate;
    private final HttpServletRequest request;

    public EmailClient(RestTemplate restTemplate,
                       HttpServletRequest request) {

        this.restTemplate = restTemplate;
        this.request = request;
    }

    public void sendEmail(String to, String subject, String body) {

        String url = "http://localhost:8083/api/email/send";

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("to", to);
        requestBody.put("subject", subject);
        requestBody.put("body", body);

        String token = request.getHeader("Authorization");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);

        HttpEntity<Map<String, String>> entity =
                new HttpEntity<>(requestBody, headers);

        restTemplate.postForObject(url, entity, String.class);
    }
}