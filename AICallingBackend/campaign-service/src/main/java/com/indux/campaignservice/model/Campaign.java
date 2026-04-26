package com.indux.campaignservice.model;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "campaigns" )
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String region;
    private String language;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;

    private String emailSubject;
    @Column(length = 5000)
    private String emailBody;
}
