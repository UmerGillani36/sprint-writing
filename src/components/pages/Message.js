import React, { useEffect, useRef } from "react";
import Moment from "react-moment";

const Message = (msg) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  }, [msg]);

  return <div className="">
    
  </div>;
};

export default Message;
