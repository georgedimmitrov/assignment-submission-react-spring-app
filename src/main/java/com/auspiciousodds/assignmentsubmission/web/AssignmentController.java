package com.auspiciousodds.assignmentsubmission.web;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.dto.AssignmentResponseDto;
import com.auspiciousodds.assignmentsubmission.service.AssignmentService;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "https://assignments.coderscampus.com"},
      allowCredentials = "true")
public class AssignmentController {

   @Autowired
   private AssignmentService assignmentService;

   @PostMapping("")
   public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
      Assignment newAssignment = assignmentService.save(user);

      return ResponseEntity.ok(newAssignment);
   }

   @GetMapping("")
   public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user) {
      Set<Assignment> assignments = assignmentService.findByUser(user);
      return ResponseEntity.ok(assignments);
   }

   @GetMapping("{assignmentId}")
   public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId,
         @AuthenticationPrincipal User user) {
      Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
      AssignmentResponseDto assignmentResponseDto = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
      return ResponseEntity.ok(assignmentResponseDto);
   }

   @PutMapping("{assignmentId}")
   public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
         @RequestBody Assignment assignment,
         @AuthenticationPrincipal User user) {
      Assignment updatedAssignment = assignmentService.save(assignment);
      return ResponseEntity.ok(updatedAssignment);
   }
}
