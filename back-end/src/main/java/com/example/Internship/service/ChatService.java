package com.example.Internship.service;

import com.example.Internship.dto.ChatDto;
import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.entity.Chat;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ChatMapper;
import com.example.Internship.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    @Autowired
    ChatRepository repo;

    @Autowired
    ChatMapper chatMapper;

    public ChatDto createChat(ChatDto chatDto){
        Chat chat = chatMapper.mapToChat(chatDto);
        Chat savedChat = repo.save(chat);
        return chatMapper.mapToChatDto(savedChat);
    }

    public ChatDto getChatById(int id){
        Chat chat = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Chat does not Exist with id : " + id));
        return chatMapper.mapToChatDto(chat);
    }

    public List<ChatDto> getChatBySessionId(int sessionId){
        List<Chat> chatList = repo.findByChatSessionIdOrderByCreatedAtAsc(sessionId);
        return chatList.stream().map((chat)->chatMapper.mapToChatDto(chat)).collect(Collectors.toList());
    }

}
