package com.example.Internship.mapper;

import com.example.Internship.dto.ChatDto;
import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.Chat;
import com.example.Internship.entity.ChatSession;
import com.example.Internship.entity.User;
import com.example.Internship.service.ChatSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {

    @Autowired
    ChatSessionService chatSessionService;

    @Autowired
    ChatSessionMapper chatSessionMapper;

    public ChatDto mapToChatDto(Chat chat){
        return new ChatDto(
                chat.getId(),
                chat.getChatSession().getId(),
                chat.getMessage(),
                chat.getReply(),
                chat.getCreatedAt(),
                chat.getUpdatedAt()
        );
    }

    public Chat mapToChat(ChatDto chatDto){
        ChatSessionDto chatSessionDto = chatSessionService.getChatSessionById(chatDto.getSessionId());
        ChatSession chatSession = chatSessionMapper.mapToChatSession(chatSessionDto);

        return new Chat(
                chatDto.getId(),
                chatSession,
                chatDto.getMessage(),
                chatDto.getReply(),
                chatDto.getCreatedAt(),
                chatDto.getUpdatedAt()
        );
    }


//    public ChatSession mapToChatSession(ChatSessionDto chatSessionDto){
//        UserDto userDto = userService.getUserById(chatSessionDto.getUserId());
//        User user = userMapper.mapToUser(userDto);
//
//        return new ChatSession(
//                chatSessionDto.getId(),
//                user,
//                chatSessionDto.getTitle(),
//                chatSessionDto.getCreatedAt(),
//                chatSessionDto.getUpdatedAt()
//        );
//    }
}
