import React from 'react'
import Img from "../../images/creator.png";

const User = (user , selectUser) => {
    const username = user.name;
  return (
    <div className="user_wrapper" onClick={() => selectUser(user)}>
        <div className="user_info">
            <div className="user_detail">
                <img src={user.avatar || Img} alt="avatar" className='avatar'/>
                <h4>{user.name}</h4>
                {console.log("username" + user.name)}
            </div>
            <div className={`user_status ${user.isOnline? 'online' : 'offline'}`}>
            </div>
        </div>
    </div>
  )
}

export default User