package com.example.Internship.mapper;

import com.example.Internship.dto.ChatSessionDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.ChatSession;
import com.example.Internship.entity.User;
import com.example.Internship.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatSessionMapper {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    public ChatSessionDto mapToChatSessionDto(ChatSession chatSession){
        return new ChatSessionDto(
                chatSession.getId(),
                chatSession.getUser().getId(),
                chatSession.getTitle(),
                chatSession.getCreatedAt(),
                chatSession.getUpdatedAt()
        );
    }

    public ChatSession mapToChatSession(ChatSessionDto chatSessionDto){
        UserDto userDto = userService.getUserById(chatSessionDto.getUserId());
        User user = userMapper.mapToUser(userDto);

        return new ChatSession(
                chatSessionDto.getId(),
                user,
                chatSessionDto.getTitle(),
                chatSessionDto.getCreatedAt(),
                chatSessionDto.getUpdatedAt()
        );
    }
}
