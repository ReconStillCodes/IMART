package com.example.Internship.repository;

import com.example.Internship.entity.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Integer> {

    List<ChatSession> findByUserIdOrderByCreatedAtDesc(Integer userId);
}
