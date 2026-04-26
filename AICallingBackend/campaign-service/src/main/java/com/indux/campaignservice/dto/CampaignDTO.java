package com.indux.campaignservice.dto;

import com.indux.campaignservice.dto.LeadDTO;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CampaignDTO {
    private Long id;
    private String name;
    private String region;
    private String language;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;

    private String emailSubject;
    private String emailBody;

    private List<LeadDTO> leads;
}