package com.indux.campaignservice.service;

import com.indux.campaignservice.client.EmailClient;
import com.indux.campaignservice.client.LeadClient;
import com.indux.campaignservice.dto.CampaignDTO;
import com.indux.campaignservice.dto.LeadDTO;
import com.indux.campaignservice.model.Campaign;
import com.indux.campaignservice.repository.CampaignRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final LeadClient leadClient;
    private final EmailClient emailClient;

    public CampaignService(CampaignRepository campaignRepository,
                           LeadClient leadClient,
                           EmailClient emailClient) {
        this.campaignRepository = campaignRepository;
        this.leadClient = leadClient;
        this.emailClient = emailClient;
    }

    public String startCampaign(Long campaignId, String dynamicBody, String dynamicSubject) {

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign Not Found!"));

        List<LeadDTO> leads = leadClient.getAllLeads();

        String subject = (dynamicSubject != null && !dynamicSubject.isBlank())
                ? dynamicSubject
                : (campaign.getEmailSubject() != null
                ? campaign.getEmailSubject()
                : "Default Subject");

        String template = (dynamicBody != null && !dynamicBody.isBlank())
                ? dynamicBody
                : campaign.getEmailBody();

        if (template == null || template.isBlank()) {
            template = "Hello {name}, this is a default campaign message.";
        }

        if (dynamicBody != null && !dynamicBody.isBlank()) {
            campaign.setEmailBody(dynamicBody);
        }
        if (dynamicSubject != null && !dynamicSubject.isBlank()) {
            campaign.setEmailSubject(dynamicSubject);
        }
        campaignRepository.save(campaign);

        for (LeadDTO lead : leads) {

            if (lead.getRegion() == null ||
                    campaign.getRegion() == null ||
                    !lead.getRegion().equalsIgnoreCase(campaign.getRegion())) {
                continue;
            }

            String name = (lead.getName() != null) ? lead.getName() : "Customer";

            String body = template.replace("{name}", name);

            try {
                emailClient.sendEmail(
                        lead.getEmail(),
                        subject,
                        body
                );

            } catch (Exception e) {
                System.out.println("Error sending to: " + lead.getEmail());
                e.printStackTrace();
            }
        }

        campaign.setStatus("RUNNING");
        campaignRepository.save(campaign);

        return "Campaign started and emails sent!";
    }

    public CampaignDTO createCampaign(CampaignDTO dto) {
        Campaign campaign = this.mapToEntity(dto);
        Campaign saved = this.campaignRepository.save(campaign);
        return this.mapToDTO(saved);
    }

    public List<CampaignDTO> getAllCampaign() {
        return campaignRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CampaignDTO getCampaignById(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign Not Found!"));

        List<LeadDTO> leads = leadClient.getAllLeads()
                .stream()
                .filter(lead ->
                        lead.getRegion() != null &&
                                campaign.getRegion() != null &&
                                lead.getRegion().equalsIgnoreCase(campaign.getRegion()))
                .collect(Collectors.toList());

        CampaignDTO dto = mapToDTO(campaign);
        dto.setLeads(leads);
        return dto;
    }

    public CampaignDTO updateStatus(Long id, String status) {
        Campaign campaign = this.campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign Not Found!"));

        campaign.setStatus(status);
        Campaign updated = this.campaignRepository.save(campaign);
        return this.mapToDTO(updated);
    }

    public long getCampaignCount() {
        return campaignRepository.count();
    }

    private CampaignDTO mapToDTO(Campaign campaign) {
        CampaignDTO dto = new CampaignDTO();
        dto.setId(campaign.getId());
        dto.setName(campaign.getName());
        dto.setRegion(campaign.getRegion());
        dto.setLanguage(campaign.getLanguage());
        dto.setStatus(campaign.getStatus());
        dto.setStartDate(campaign.getStartDate());
        dto.setEndDate(campaign.getEndDate());
        dto.setEmailSubject(campaign.getEmailSubject());
        dto.setEmailBody(campaign.getEmailBody());
        return dto;
    }

    private Campaign mapToEntity(CampaignDTO dto) {
        Campaign campaign = new Campaign();
        campaign.setName(dto.getName());
        campaign.setRegion(dto.getRegion());
        campaign.setLanguage(dto.getLanguage());
        campaign.setStatus(dto.getStatus());
        campaign.setStartDate(dto.getStartDate());
        campaign.setEndDate(dto.getEndDate());
        campaign.setEmailSubject(dto.getEmailSubject());
        campaign.setEmailBody(dto.getEmailBody());
        return campaign;
    }
}