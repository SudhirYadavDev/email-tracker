package com.indux.campaignservice.client;

import com.indux.campaignservice.dto.LeadDTO;
import com.indux.campaignservice.dto.LeadPageResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class LeadClient {

    private final RestTemplate restTemplate;
    private final HttpServletRequest request;

    public LeadClient(RestTemplate restTemplate,
                      HttpServletRequest request) {

        this.restTemplate = restTemplate;
        this.request = request;
    }

    public List<LeadDTO> getAllLeads() {

        String url = "http://localhost:8081/api/leads?page=0&size=1000";

        String token = request.getHeader("Authorization");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        LeadPageResponse response = restTemplate.exchange(
                url,
                org.springframework.http.HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<LeadPageResponse>() {}
        ).getBody();

        return response.getContent();
    }
}