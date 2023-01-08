package com.auspiciousodds.assignmentsubmission.web;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.Comment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.dto.CommentDto;
import com.auspiciousodds.assignmentsubmission.service.CommentService;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "https://assignments.coderscampus.com"},
      allowCredentials = "true")
public class CommentController {

   @Autowired
   private CommentService commentService;

   @PostMapping("")
   public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto,
         @AuthenticationPrincipal User user) {
      try {
         Comment comment = commentService.save(commentDto, user);
         return ResponseEntity.ok(comment);
      } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity.status(500).body("Could not create comment");
      }
   }

   @PutMapping("{commentId}")
   public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto) {
      try {
         Comment comment = commentService.saveUpdatedComment(commentDto);
         return ResponseEntity.ok(comment);
      } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity.status(500).body("Could not updated comment");
      }
   }

   @GetMapping("")
   public ResponseEntity<Set<?>> getCommentsByAssignment(@RequestParam String assignmentId) {
      Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);

      return ResponseEntity.ok(comments);
   }
}
