package com.example.Internship.repository;

import com.example.Internship.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByChatSessionIdOrderByCreatedAtAsc(Integer chatSessionId);
}
