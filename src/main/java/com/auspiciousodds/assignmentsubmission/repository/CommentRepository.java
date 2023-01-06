package com.auspiciousodds.assignmentsubmission.repository;

import com.auspiciousodds.assignmentsubmission.domain.Comment;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

   @Query("SELECT c FROM Comment c WHERE c.assignment.id = :assignmentId")
   Set<Comment> findByAssignmentId(Long assignmentId);
}
