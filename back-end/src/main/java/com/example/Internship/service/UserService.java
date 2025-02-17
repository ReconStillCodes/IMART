package com.example.Internship.service;

import com.example.Internship.dto.LoginRequest;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.User;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.UserMapper;
import com.example.Internship.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    public String encodePassword(String password){
        return passwordEncoder.encode(password);
    }

    public boolean matchPassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public UserDto createUser(UserDto userDto) {
        User user = userMapper.mapToUser(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(user);
        return userMapper.mapToUserDto(savedUser);
    }

    public UserDto getUserById(Integer userId) {
        User user = userRepository.findById(userId).
                orElseThrow(
                        () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
                );
        return userMapper.mapToUserDto(user);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> userMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    public UserDto updateUser(Integer userId, UserDto updatedUserDto) {
        User user = userRepository.findById(userId).
                orElseThrow(
                        () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
                );


        if (!passwordEncoder.matches(updatedUserDto.getPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(updatedUserDto.getPassword()));
        }else{
            user.setPassword(updatedUserDto.getPassword());
        }

        user.setUsername(updatedUserDto.getUsername());
        user.setEmail(updatedUserDto.getEmail());
        user.setAddress(updatedUserDto.getAddress());
        user.setRole(updatedUserDto.getRole());

        User savedUser = userRepository.save(user);
        return userMapper.mapToUserDto(savedUser);
    }

    public void deleteUser(Integer userId) {
        User user = userRepository.findById(userId).
                orElseThrow(
                        () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
                );

        userRepository.delete(user);
    }

    public UserDto getUsetByEmailAndPassword(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if(user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new ResourceNotFoundException("User Credential is Invalid");
        }

        return userMapper.mapToUserDto(user);
    }


}
