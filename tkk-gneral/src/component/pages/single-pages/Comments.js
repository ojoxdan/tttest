import React, { useEffect, useState, useContext } from "react";
import commentIconImg from "../../../images/comment-icon.PNG";
import { AlertContext } from "../../context/alertContext/AlertState";
import { AuthContext } from "../../context/authContext/AuthState";
import { PostContext } from "./posts/PostState";

const Comments = (props) => {
  const [comment, setComment] = useState(null);
  const [reply, setReply] = useState(null);
  const [postComments, setPostcomments] = useState([]);
  const [postId, setPostId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userId, setUserId] = useState(null);

  const authCxt = useContext(AuthContext);
  const alertCxt = useContext(AlertContext);
  const postCxt = useContext(PostContext);
  useEffect(() => {
    if (authCxt.token && authCxt.user) {
      setUserId(authCxt.user._id);
      setFirstName(authCxt.user.firstName);
      setLastName(authCxt.user.lastName);
      if (props.post._id) {
        setPostId(props.post._id);
      }
      getPostComents();
    }
  }, [authCxt.token, props.post]);

  const getPostComents = () => {
    if (props.post._id) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/api/comments/${props.post._id}`, true);
      //  xml respones text to get all comment ;
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let pc = JSON.parse(xhr.responseText).success;
              if (pc) {
                setPostcomments(pc);
              }
            }
          }
        }
      };
      xhr.send();
    }
  };

  const createPostCommet = () => {
    if (!authCxt.token)
      return alertCxt.setAlert(
        "danger",
        "You need to log in to post a comment"
      );
    if (postId && comment) {
      let dataForm = new FormData();
      dataForm.append("postid", postId);
      dataForm.append("userfirstname", firstName);
      dataForm.append("userlastname", lastName);
      dataForm.append("comment", comment);
      dataForm.append("postuserid", userId);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/comments`, true);
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let pc = JSON.parse(xhr.responseText).success;
              if (pc) {
                getPostComents();
                alertCxt.setAlert(
                  "success",
                  "Your comment has been posted"
                );
              }
            }
          }
        } else {
          console.log(xhr.responseText, " the not 200 status else block ");
        }
      };
      xhr.setRequestHeader("x-auth-user", authCxt.token);
      xhr.send(dataForm);
    }
  };

  const replyComment = (commentid) => {
    if (postId && reply) {
      console.log(" ok lets reply now");
      let dataForm = new FormData();
      dataForm.append("postid", postId);
      dataForm.append("commentid", commentid);
      dataForm.append("userfirstname", firstName);
      dataForm.append("userlastname", lastName);
      dataForm.append("replytext", reply);
      dataForm.append("postuserid", userId);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/reply-comment`, true);
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let pc = JSON.parse(xhr.responseText).success;
              if (pc) {
                getPostComents();
              }
            }
          }
        } else {
          console.log(xhr.responseText, " the not 200 status else block ");
        }
      };
      xhr.setRequestHeader("x-auth-user", authCxt.token);
      xhr.send(dataForm);
    }
  };
  const likePost = () => {
    if (!authCxt.token) return alertCxt.setAlert(
      "danger",
      "You need to log in to like a post"
    );
    console.log("this ought to be liked ");
    if (postId) {
      console.log(" ok lets reply now");
      let dataForm = new FormData();
      dataForm.append("postid", postId);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/likes`, true);
      xhr.onload = () => {
        console.log(xhr.responseText, " the entire response text ");
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              let pc = JSON.parse(xhr.responseText).success;
              if (pc) {
                console.log(pc, "the post has been liked ");
              }
            }
          }
        } else {
          console.log(xhr.responseText, " the not 200 status else block ");
        }
      };
      xhr.setRequestHeader("x-auth-user", authCxt.token);
      xhr.send(dataForm);
    }
  };
  return (
    <div className="product-comments-section">
      <div className="product-comments-header">
        <a
          className="mr-3"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            likePost();
          }}
        >
          {props.post && props.post.post_likes}{" "}
          <i className="fa fa-hand-peace"></i> Likes
        </a>
        <span className="mr-3">
          {postComments.length}
          <i className="fa fa-comment-dots"></i> Comments
        </span>
        <span className="mr-3">
          <i className="fa fa-share-alt-square"></i> Share
        </span>
      </div>
      <div className="product-comments-body">
        <a href="#" className="show-previous-comments">
          See previous comments
        </a>
        {/* single comment starts  */}

        {postComments &&
          postComments.map((c, key) => (
            <div className="single-comment" key={key}>
              <div className="row" key={c._id}>
                <div className="col-lg-1 col-md-2">
                  <img src={commentIconImg} alt="" className="img-fluid" />
                </div>
                <div className="col-lg-2 col-md-4">
                  <h6>{c.userFirstName}</h6>
                </div>
                <div className="col-lg-9 col-md-6">
                  <p>{c.commentText}</p>
                </div>
                <div className="col-md-4 text-center">
                  <a
                    className="reply-btn"
                    data-toggle="collapse"
                    href={`${"#replyContainer" + c._id}`}
                    role="button"
                    aria-expanded="false"
                  >
                    Reply
                  </a>
                </div>
              </div>
              {c.commentReplies &&
                c.commentReplies.map((r, key) => (
                  <div className="row replies" key={key}>
                    <div className="col-md-10 offset-md-2">
                      <div className="single-reply">
                        <div className="row">
                          <div className="col-lg-2 col-md-2">
                            <img
                              src={commentIconImg}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-lg-3 col-md-4">
                            <h6>{r.userFirstName}</h6>
                          </div>
                          <div className="col-lg-7 col-md-6">
                            <p>{r.replyText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div
                className="row mb-3 collapse"
                id={`${"replyContainer" + c._id}`}
              >
                <div className="col-md-8 offset-md-4">
                  <div className="reply-to-comment">
                    <form onSubmit={(e) => e.preventDefault()} action="">
                      <div className="form-field">
                        <img
                          className="img-fluid icon"
                          src={commentIconImg}
                          alt=""
                        />
                        <input
                          type="text"
                          name="reply"
                          className="input-field"
                          placeholder="Add a reply"
                          onChange={(el) => setReply(el.target.value)}
                          onKeyUp={(el) =>
                            el.keyCode === 13 && replyComment(c._id)
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* single comment ends here  */}

        <div className="add-a-comment mb-3">
          <form
            action=""
            id="comment-form"
            onSubmit={(e) => e.preventDefault()}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-field">
              <img className="img-fluid icon" src={commentIconImg} alt="" />
              <input
                type="text"
                name="reply"
                id="reply"
                className="input-field"
                placeholder="Add a comment"
                onChange={(el) => {
                  setComment(el.target.value);
                }}
                onKeyUp={(el) => {
                  if (el.keyCode === 13) {
                    createPostCommet();
                  }
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
