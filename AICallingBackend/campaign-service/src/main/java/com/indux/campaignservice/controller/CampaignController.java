package com.indux.campaignservice.controller;

import com.indux.campaignservice.dto.CampaignDTO;
import com.indux.campaignservice.service.CampaignService;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping("/{id}/start")
    public String startCampaign(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> request
    ) {
        String emailBody = null;
        String emailSubject = null;

        if (request != null) {
            emailBody = request.get("emailBody");
            emailSubject = request.get("emailSubject"); // ✅ NEW
        }

        return campaignService.startCampaign(id, emailBody, emailSubject);
    }

    @PostMapping
    public CampaignDTO createCampaign(@RequestBody CampaignDTO dto) {
        return this.campaignService.createCampaign(dto);
    }

    @GetMapping
    public List<CampaignDTO> getAllCampaigns() {
        return this.campaignService.getAllCampaign();
    }

    @GetMapping("/{id}")
    public CampaignDTO getCampaignById(@PathVariable Long id) {
        return campaignService.getCampaignById(id);
    }

    @PutMapping("/{id}/status")
    public CampaignDTO updateStatus(@PathVariable Long id, @RequestParam String status) {
        return this.campaignService.updateStatus(id, status);
    }

    @GetMapping("/count")
    public Map<String, Long> getCampaignCount() {
        return Map.of("count", campaignService.getCampaignCount());
    }
}