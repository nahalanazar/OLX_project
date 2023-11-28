import React, { createContext, useState } from "react";

// named context is imported with the same name
export const PostContext = createContext(null)

// children is inside props, so destructure it as {children}
function Post({ children }) {
  const [postDetails, setPostDetails] = useState('')  
    return (
        <PostContext.Provider value={{postDetails, setPostDetails}} >
            {children}
        </PostContext.Provider>
    )
}

export default Post