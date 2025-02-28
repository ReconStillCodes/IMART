package com.example.Internship.controller;

import com.example.Internship.service.SmartBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/smart-bot")
public class SmartBotController {

    @Autowired
    private SmartBotService smartBotService;

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody String question){
        String result = smartBotService.chat(question);
        return ResponseEntity.ok(result);
    }
}
