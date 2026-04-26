package com.indux.campaignservice.service;

import com.indux.campaignservice.client.EmailClient;
import com.indux.campaignservice.client.LeadClient;
import com.indux.campaignservice.client.SmsClient;
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
    private final SmsClient smsClient;

    public CampaignService(CampaignRepository campaignRepository,
                           LeadClient leadClient,
                           EmailClient emailClient, SmsClient smsClient) {
        this.campaignRepository = campaignRepository;
        this.leadClient = leadClient;
        this.emailClient = emailClient;
        this.smsClient = smsClient;
    }

    public String startCampaign(Long campaignId) {

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign Not Found!"));

        List<LeadDTO> leads = leadClient.getAllLeads();

        for (LeadDTO lead : leads) {
            if (!lead.getRegion().equalsIgnoreCase(campaign.getRegion())) {
                continue;
            }

            String subject = campaign.getEmailSubject();

            String body = campaign.getEmailBody()
                    .replace("{name}", lead.getName());

            emailClient.sendEmail(
                    lead.getEmail(),
                    subject,
                    body
            );

            smsClient.sendSms(
                    lead.getPhone(),
                    "Hi " + lead.getName() + ", this is an SMS campaign!"
            );
        }

        campaign.setStatus("RUNNING");
        campaignRepository.save(campaign);

        return "Campaign started and emails & SMS sent!";
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
                .filter(lead -> lead.getRegion().equalsIgnoreCase(campaign.getRegion()))
                .collect(Collectors.toList());

        CampaignDTO dto = mapToDTO(campaign);
        dto.setLeads(leads);
        return dto;
    }

    public CampaignDTO updateStatus(Long id, String status) {
        Campaign campaign = this.campaignRepository.findById(id).orElseThrow(() -> new RuntimeException("Campaign Not Found!"));
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