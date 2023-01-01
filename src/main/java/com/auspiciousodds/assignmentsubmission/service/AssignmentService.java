package com.auspiciousodds.assignmentsubmission.service;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.enums.AssignmentStatusEnum;
import com.auspiciousodds.assignmentsubmission.enums.AuthorityEnum;
import com.auspiciousodds.assignmentsubmission.repository.AssignmentRepository;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

   @Autowired
   private AssignmentRepository assignmentRepository;

   public Assignment save(User user) {
      Assignment assignment = new Assignment();
      assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
      assignment.setNumber(findNextAssignmentToSubmit(user));
      assignment.setUser(user);

      return assignmentRepository.save(assignment);
   }

   private Integer findNextAssignmentToSubmit(User user) {
      Set<Assignment> assignments = assignmentRepository.findByUser(user);
      if (assignments == null) {
         return 1;
      }
      Optional<Integer> nextAssignmentNumOpt = assignments.stream()
            .sorted((a1, a2) -> {
               if (a1.getNumber() == null) {
                  return 1;
               }
               if (a2.getNumber() == null) {
                  return 1;
               }
               return a2.getNumber().compareTo(a1.getNumber());
            })
            .map(assignment -> {
               if (assignment.getNumber() == null) {
                  return 1;
               }
               return assignment.getNumber() + 1;
            })
            .findFirst();
      return nextAssignmentNumOpt.orElse(1);
   }

   public Set<Assignment> findByUser(User user) {
      boolean hasCodeReviewerRole = user.getAuthorities()
            .stream()
            .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
            .count() > 0;
      if (hasCodeReviewerRole) {
         Set<Assignment> byStatusEquals =
               assignmentRepository.findByStatusEquals(AssignmentStatusEnum.SUBMITTED.getStatus());
         Set<Assignment> byCodeReviewer = assignmentRepository.findByCodeReviewer(user);
         return assignmentRepository.findByCodeReviewer(user);
      }
      return assignmentRepository.findByUser(user);
   }

   public Optional<Assignment> findById(Long assignmentId) {
      return assignmentRepository.findById(assignmentId);
   }

   public Assignment save(Assignment assignment) {
      return assignmentRepository.save(assignment);
   }
}
