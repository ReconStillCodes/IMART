package com.example.Internship.controller;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.service.ChatSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-sessions")
public class ChatSessionController {

    @Autowired
    ChatSessionService chatSessionService;

    @PostMapping
    public ResponseEntity<ChatSessionDto> createChatSession(@RequestBody ChatSessionDto chatSessionDto){
        ChatSessionDto savedChatSessionDto = chatSessionService.createChatSession(chatSessionDto);
        return new ResponseEntity<>(savedChatSessionDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatSessionDto> getChatSessionById(@PathVariable("id") int id){
        ChatSessionDto chatSessionDto = chatSessionService.getChatSessionById(id);
        return ResponseEntity.ok(chatSessionDto);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<ChatSessionDto>> getChatSessionByUserId(@PathVariable("userId") int userId){
        List<ChatSessionDto> chatSessionDtoList = chatSessionService.getByUserId(userId);
        return ResponseEntity.ok(chatSessionDtoList);
    }

}
