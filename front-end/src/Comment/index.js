import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "../UserProvider";

const Comment = ({ comment, emitEditComment, emitDeleteComment }) => {
  const user = useUser();
  const decodedJwt = jwt_decode(user.jwt);
  const { id, createdDate, createdBy, text } = comment;

  const [commentRelativeTime, setCommentRelativeTime] = useState("");
  useEffect(() => {
    updateCommentRelativeTime();
  }, []);

  function updateCommentRelativeTime() {
    if (createdDate) {
      dayjs.extend(relativeTime);
      setCommentRelativeTime(dayjs(createdDate).fromNow());
    }
  }

  return (
    <>
      <div className="comment-bubble">
        <div
          className="d-flex align-items-center"
          style={{ fontWeight: "500" }}
        >
          <div>{createdBy.name}</div>
          {decodedJwt.sub === createdBy.username ? (
            <>
              <Button
                onClick={() => emitEditComment(id)}
                size="sm"
                variant="link"
              >
                edit
              </Button>
              <Button
                onClick={() => emitDeleteComment(id)}
                size="sm"
                variant="link"
              >
                delete
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>{text}</div>
      </div>

      <div
        style={{ marginTop: "-1.2em", marginLeft: "1.4em", fontSize: "12px" }}
      >
        {commentRelativeTime ? `Posted ${commentRelativeTime}` : ""}
      </div>
    </>
  );
};

export default Comment;
