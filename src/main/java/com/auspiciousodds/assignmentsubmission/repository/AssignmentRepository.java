package com.auspiciousodds.assignmentsubmission.repository;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

   Set<Assignment> findByUser(User user);

   @Query("SELECT a FROM Assignment a " +
         "WHERE (a.status = 'submitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer)) " +
         "OR a.codeReviewer = :codeReviewer")
   Set<Assignment> findByCodeReviewer(User codeReviewer);

   Set<Assignment> findByStatusEquals(String status);
}
