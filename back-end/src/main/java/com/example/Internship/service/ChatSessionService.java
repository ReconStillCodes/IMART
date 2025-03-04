package com.example.Internship.service;

import com.example.Internship.dto.CartDto;
import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.ChatSession;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ChatSessionMapper;
import com.example.Internship.repository.ChatSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatSessionService{

    @Autowired
    ChatSessionRepository repo;

    @Autowired
    ChatSessionMapper chatSessionMapper;

    public ChatSessionDto createChatSession(ChatSessionDto chatSessionDto){
        ChatSession chatSession = chatSessionMapper.mapToChatSession(chatSessionDto);
        ChatSession savedChatSession = repo.save(chatSession);
        return chatSessionMapper.mapToChatSessionDto(savedChatSession );
    }

    public ChatSessionDto getChatSessionById(int id){
        ChatSession chatSession = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Cart does not Exist with id : " + id));
        return chatSessionMapper.mapToChatSessionDto(chatSession);
    }

    public List<ChatSessionDto> getByUserId(Integer userId){
        List<ChatSession> chatSessionList = repo.findByUserIdOrderByCreatedAtDesc(userId);
        return chatSessionList.stream().map((chatSession ) -> chatSessionMapper.mapToChatSessionDto(chatSession)).collect(Collectors.toList());
    }


}
