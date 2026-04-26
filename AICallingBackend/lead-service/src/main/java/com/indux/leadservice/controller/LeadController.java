package com.indux.leadservice.controller;

import com.indux.leadservice.dto.LeadDTO;
import com.indux.leadservice.dto.PagedResponse;
import com.indux.leadservice.model.Lead;
import com.indux.leadservice.service.LeadService;
import com.indux.leadservice.util.ValidationResult;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ValidationResult uploadCSV(@RequestParam("file") MultipartFile file) {
        return leadService.processCSV(file);
    }

    @GetMapping({"", "/"})  
    public PagedResponse<LeadDTO> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return leadService.getAllLeadsPaginated(page, size);
    }

    @GetMapping("/count")
    public Map<String, Long> getLeadCount() {
        return Map.of("count", leadService.getLeadCount());
    }
}