package com.auspiciousodds.assignmentsubmission.service;

import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
   @Autowired
   private UserRepository userRepository;

   public Optional<User> findUserByUsername(String username) {
      return userRepository.findByUsername(username);
   }
}
