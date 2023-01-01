### Assignment Submission Application using Spring, React and MySQL

Authentication is achieved via a JWT token issued upon logging in

In order to run this app locally, you have to:
1. rename `example-application.properties` to `application.properties` 
2. create a MySQL db and add its name and a user with permission to access it to `application.properties`
3. run back-end (standard Spring boot app, run `AssignmentSubmissionApplication.java`)
4. change directory to `front-end` and run `npm install`
5. `npm start` and visit `http://localhost:3000`
6. To login you can create a user and push it into the users table, the password needs to be encoded, you can use "PasswordEncoderTest" to generate a password
```
   INSERT INTO users(cohort_start_date, password, username)
   VALUES ("2022-01-01", "encoded_pass", "username");
   ```
7.Then insert into "authority" table
```
INSERT INTO authority (authority, user_id)
VALUES ("ROLE_STUDENT", 1 or SELECT id FROM users WHERE ...);
```
8. Login with credentials