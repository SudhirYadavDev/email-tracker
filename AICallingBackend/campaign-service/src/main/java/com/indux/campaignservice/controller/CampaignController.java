package com.indux.campaignservice.controller;

import com.indux.campaignservice.dto.CampaignDTO;
import com.indux.campaignservice.service.CampaignService;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping({"/api/campaigns"})
public class CampaignController {
    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService1) {
        this.campaignService = campaignService1;
    }

    @PostMapping("/{id}/start")
    public String startCampaign(@PathVariable Long id) {
        return campaignService.startCampaign(id);
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

    @PutMapping({"/{id}/status"})
    public CampaignDTO updateStatus(@PathVariable Long id, @RequestParam String status) {
        return this.campaignService.updateStatus(id, status);
    }

    @GetMapping("/count")
    public Map<String, Long> getCampaignCount() {
        return Map.of("count", campaignService.getCampaignCount());
    }
}