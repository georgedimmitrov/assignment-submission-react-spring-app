package com.auspiciousodds.assignmentsubmission.repository;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

   Set<Assignment> findByUser(User user);

}
