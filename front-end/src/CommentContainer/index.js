import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Comment from "../Comment";
import ajax from "../services/fetchService";
import { useUser } from "../UserProvider";

const CommentContainer = (props) => {
  const { id } = props;
  const user = useUser();
  const emptyComment = {
    id: null,
    text: "",
    assignmentId: id,
    user: user.jwt,
  };

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(emptyComment);

  useEffect(() => {
    ajax(`/api/comments?assignmentId=${id}`, "GET", user.jwt).then(
      (commentsResponse) => {
        setComments(commentsResponse);
      }
    );
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function handleEditComment(commentId) {
    const comment = comments.find((comment) => comment.id === commentId);
    const commentCopy = {
      id: comment.id,
      text: comment.text,
      assignmentId: comment.assignment.id,
      user: user.jwt,
    };
    setComment(commentCopy);
  }

  function handleDeleteComment(commentId) {
    ajax(`/api/comments/${commentId}`, "DELETE", user.jwt).then((msg) => {
      const commentsCopy = [...comments];
      const i = commentsCopy.findIndex((comment) => comment.id === commentId);
      commentsCopy.splice(i, 1);
      setComments(commentsCopy);
    });
  }

  function submitComment() {
    if (comment.id) {
      ajax(`/api/comments/${comment.id}`, "PUT", user.jwt, comment).then(
        (commentDbData) => {
          const commentsCopy = [...comments];
          const i = commentsCopy.findIndex(
            (comment) => comment.id === commentDbData.id
          );
          commentsCopy[i] = commentDbData;
          setComments(commentsCopy);
          setComment(emptyComment);
        }
      );
    } else {
      ajax(`/api/comments`, "POST", user.jwt, comment).then((commentDbData) => {
        const commentsCopy = [...comments];
        commentsCopy.push(commentDbData);
        setComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  return (
    <>
      <div className="mt-4">
        <textarea
          className="d-block mb-2"
          name="comment"
          id="comment"
          cols="40"
          rows="6"
          onChange={(e) => updateComment(e.target.value)}
          value={comment.text}
        ></textarea>
        <Button onClick={() => submitComment()}>Post Comment</Button>
      </div>

      <div className="mt-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            emitEditComment={handleEditComment}
            emitDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
