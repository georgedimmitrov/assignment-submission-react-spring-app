package com.auspiciousodds.assignmentsubmission.dto;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.enums.AssignmentEnum;
import com.auspiciousodds.assignmentsubmission.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
   private Assignment assignment;
   private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
   private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

   public AssignmentResponseDto(Assignment assignment) {
      this.assignment = assignment;
   }

   public Assignment getAssignment() {
      return assignment;
   }

   public void setAssignment(Assignment assignment) {
      this.assignment = assignment;
   }

   public AssignmentEnum[] getAssignmentEnums() {
      return assignmentEnums;
   }

   public AssignmentStatusEnum[] getStatusEnums() {
      return statusEnums;
   }
}
