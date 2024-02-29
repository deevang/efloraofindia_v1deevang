import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import style from './Comment.module.css'
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? `${style.inputContainer}` : `${style.commentContainer}`}>
        {comment.id === 1 ? (
          <>
            
            <input
              type="text"
              className={`${style.inputContainer__input} ${style.first_input}`}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <Action
              className={`${style.reply} ${style.comment}`}
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <div className={style.commentBox}>
              <p className={style.userName}>UserName</p>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
              >
                {comment.name}
              </span>
            </div>
            
            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                
                  <Action
                    className={style.reply}
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className={style.reply}
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                  
                    className={style.reply}
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className={style.reply}
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className={style.reply}
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className={style.inputContainer}>
            <input
              type="text"
              className={style.inputContainer__input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className={style.reply} type="REPLY" handleClick={onAddComment} />
            <Action
              className={style.reply}
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;