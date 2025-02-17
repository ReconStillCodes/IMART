package com.example.Internship.controller;

import com.example.Internship.dto.LoginRequest;
import com.example.Internship.dto.UserDto;
import com.example.Internship.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    //Build Post User REST API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUserDto = userService.createUser(userDto);
        return new ResponseEntity<>(savedUserDto, HttpStatus.CREATED);
    }

    //Build get User Rest Api
    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Integer userId){
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    //Build get all Rest Api
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Build update Rest Api
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Integer userId, @RequestBody UserDto userDto){
        UserDto user = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(user);
    }

    //Build Delete Rest API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("User Deleted Successfully");
    }

    //Build Get By Email & Password Rest API
    @PostMapping("/login")
    public ResponseEntity<UserDto> getUserByEmailAndPassword(@RequestBody LoginRequest loginRequest){
        UserDto user = userService.getUsetByEmailAndPassword(loginRequest);
        return ResponseEntity.ok(user);
    }
}
