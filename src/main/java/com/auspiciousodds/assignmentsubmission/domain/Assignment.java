package com.auspiciousodds.assignmentsubmission.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity // will create table called 'assignment'
public class Assignment {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;

   private Integer number;
   private String status;
   private String githubUrl;
   private String branch;
   private String codeReviewVideoUrl;

   @ManyToOne(optional = false)
   private User user;

   @ManyToOne
   private User codeReviewer;

   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public Integer getNumber() {
      return number;
   }

   public void setNumber(Integer number) {
      this.number = number;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   }

   public String getGithubUrl() {
      return githubUrl;
   }

   public void setGithubUrl(String githubUrl) {
      this.githubUrl = githubUrl;
   }

   public String getBranch() {
      return branch;
   }

   public void setBranch(String branch) {
      this.branch = branch;
   }

   public String getCodeReviewVideoUrl() {
      return codeReviewVideoUrl;
   }

   public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
      this.codeReviewVideoUrl = codeReviewVideoUrl;
   }

   public User getUser() {
      return user;
   }

   public void setUser(User user) {
      this.user = user;
   }

   public User getCodeReviewer() {
      return codeReviewer;
   }

   public void setCodeReviewer(User codeReviewer) {
      this.codeReviewer = codeReviewer;
   }
}
