package com.auspiciousodds.assignmentsubmission.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class Authority implements GrantedAuthority {
   private static final long serialVersionUID = 682971808519240062L;

   public Authority() {}

   public Authority(String authority) {
      this.authority = authority;
   }

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private String authority;

   @ManyToOne(optional = false)
   private User user;

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   @Override
   public String getAuthority() {
      return authority;
   }

   public void setAuthority(String authority) {
      this.authority = authority;
   }

   public User getUser() {
      return user;
   }

   public void setUser(User user) {
      this.user = user;
   }
}
