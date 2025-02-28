package com.example.Internship.service;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class SmartBotService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "http://localhost:8000/";
    private final JdbcTemplate jdbcTemplate;

    public SmartBotService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    };

    public String chat(String question){
        String data = chatQuery(question);

        if(data.equals("Sorry, we can't answer your question. Please try again!"))
            return "Sorry, we can't answer your question. Please try again!";

        System.out.println(data);

        return getAnswer(question, data);
    }

    public String chatQuery(String question){
        for (int attempt = 0; attempt < 5; attempt++) {
            String query = attemptGetQuery(question);
            if (!query.equals("No valid SQL query found")) {
                List<Map<String, Object>> response = executeQuery(query);
                if (!response.isEmpty() && !response.get(0).containsKey("error")) {
                    return response.toString();
                }
            }
            System.err.println("Attempt " + (attempt + 1) + ": Query generation failed.");
        }
        return "Sorry, we can't answer your question. Please try again!";

    }

    public String attemptGetQuery(String question){
        String query;
        int queryAttempt =  0;

        do{
            query = getQuery(question);
            if(!query.equals("No valid SQL query found"))
                break;
            queryAttempt++;
        }while(queryAttempt < 5);

        return query;
    }

    public String getQuery(String question){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("question", question);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(BASE_URL + "generate-query/", requestEntity, Map.class);
        String rawResponse = (response.getBody().get("response").toString());
        return extractQuery(rawResponse);
    }

    private String extractQuery(String text){
        Pattern pattern = Pattern.compile("```sql(.*?)```", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group(1).trim() : "No valid SQL query found";
    }

    public List<Map<String, Object>> executeQuery(String sqlQuery) {
        try {
            return jdbcTemplate.queryForList(sqlQuery);
        } catch (DataAccessException e) {
            System.err.println("Error executing SQL: " + e.getMessage());
            return List.of(Map.of("error", "Invalid SQL query or database issue."));
        }
    }

    public String getAnswer(String question, String data){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("question", question);
        requestBody.put("data", data);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(BASE_URL + "generate-answer/", requestEntity, Map.class);

        if (response.getBody() == null || !response.getBody().containsKey("response")) {
            return "Error: No valid response received from the chatbot.";
        }

        return extractAnswer(response.getBody().get("response").toString());
    }

    public String extractAnswer(String text){
        text = text.replaceAll("(?s)<think>.*?</think>", "").trim();
        return text;
    }
}

