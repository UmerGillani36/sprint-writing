import React from "react";
import Attachment from "../svg/Attachment";
import "../../App.css";

const MessageForm = (handleSubmit, text, setText) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img" className="uploadImg">
        <Attachment />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
