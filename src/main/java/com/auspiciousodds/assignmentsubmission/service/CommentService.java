package com.auspiciousodds.assignmentsubmission.service;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.Comment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.dto.CommentDto;
import com.auspiciousodds.assignmentsubmission.repository.AssignmentRepository;
import com.auspiciousodds.assignmentsubmission.repository.CommentRepository;
import com.auspiciousodds.assignmentsubmission.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
   @Autowired
   private CommentRepository commentRepository;

   @Autowired
   private AssignmentRepository assignmentRepository;

   public Comment save(CommentDto commentDto, User user) throws Exception {
      Comment comment = new Comment();
      comment.setText(commentDto.getText());
      comment.setCreatedBy(user);
      Assignment assignment = assignmentRepository.findById(commentDto.getAssignmentId())
            .orElseThrow(() -> new Exception("Assignment not found - " + commentDto.getAssignmentId()));
      comment.setAssignment(assignment);
      comment.setCreatedDate(LocalDateTime.now());
      return commentRepository.save(comment);
   }

   public Set<Comment> getCommentsByAssignmentId(String assignmentId) {
      Set<Comment> comments = commentRepository.findByAssignmentId(Long.parseLong(assignmentId));
      return comments;
   }
}
