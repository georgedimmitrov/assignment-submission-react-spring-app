package com.auspiciousodds.assignmentsubmission.service;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.Comment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.dto.CommentDto;
import com.auspiciousodds.assignmentsubmission.repository.AssignmentRepository;
import com.auspiciousodds.assignmentsubmission.repository.CommentRepository;
import java.time.LocalDateTime;
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

   public Comment saveUpdatedComment(CommentDto commentDto) throws Exception {
      Comment dbComment = commentRepository.findById(commentDto.getId())
            .orElseThrow(() -> new Exception("Comment to be updated not found in DB."));
      dbComment.setText(commentDto.getText());
      return commentRepository.save(dbComment);
   }

   public Set<Comment> getCommentsByAssignmentId(String assignmentId) {
      Set<Comment> comments = commentRepository.findByAssignmentId(Long.parseLong(assignmentId));
      return comments;
   }

   public void delete(Long commentId) {
      commentRepository.deleteById(commentId);
   }
}
