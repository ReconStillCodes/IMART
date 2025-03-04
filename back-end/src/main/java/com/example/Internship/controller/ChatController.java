package com.example.Internship.controller;

import com.example.Internship.dto.ChatDto;
import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatDto> createChat(@RequestBody ChatDto chatDto){
        ChatDto savedChatDto = chatService.createChat(chatDto);
        return new ResponseEntity<>(savedChatDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatDto> getChatById(@PathVariable("id") int id){
        ChatDto chatDto = chatService.getChatById(id);
        return ResponseEntity.ok(chatDto);
    }

    @GetMapping("/sessionId/{sessionId}")
    public ResponseEntity<List<ChatDto>> getChatBySessionId(@PathVariable("sessionId") int sessionId){
        List<ChatDto> chatDtoList = chatService.getChatBySessionId(sessionId);
        return ResponseEntity.ok(chatDtoList);
    }

}
