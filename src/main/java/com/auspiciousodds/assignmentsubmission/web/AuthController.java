package com.auspiciousodds.assignmentsubmission.web;

import com.auspiciousodds.assignmentsubmission.domain.Assignment;
import com.auspiciousodds.assignmentsubmission.domain.User;
import com.auspiciousodds.assignmentsubmission.dto.AuthCredentialsRequest;
import com.auspiciousodds.assignmentsubmission.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

   @Autowired
   private AuthenticationManager authenticationManager;

   @Autowired
   private JwtUtil jwtUtil;

   @PostMapping("login")
   public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
      try {
         Authentication authenticate = authenticationManager
               .authenticate(
                     new UsernamePasswordAuthenticationToken(
                           request.getUsername(), request.getPassword()
                     )
               );

         User user = (User) authenticate.getPrincipal();
         user.setPassword(null);

         return ResponseEntity.ok()
               .header(
                     HttpHeaders.AUTHORIZATION,
                     jwtUtil.generateToken(user)
               )
               .body(user);
      } catch (BadCredentialsException ex) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
      }
   }

   @GetMapping("validate")
   public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
      try {
         Boolean isValidToken = jwtUtil.validateToken(token, user);
         return ResponseEntity.ok(isValidToken);
      } catch (ExpiredJwtException e) {
         return ResponseEntity.ok(false);
      }
   }

//   @GetMapping("logout")
//   public ResponseEntity<?> logout () {
//      ResponseCookie cookie = ResponseCookie.from("jwt", "")
//            .domain(domain)
//            .path("/")
//            .maxAge(0)
//            .build();
//      return ResponseEntity.ok()
//            .header(HttpHeaders.SET_COOKIE, cookie.toString()).body("ok");
//   }

}
