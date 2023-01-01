package com.auspiciousodds.assignmentsubmission.repository;

import com.auspiciousodds.assignmentsubmission.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
   Optional<User> findByUsername(String username);
}
