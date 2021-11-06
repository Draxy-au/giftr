import React from 'react';

import api from "../../api/user.api";

export const Test = () => {

  const handleRemoveImageClick = async () => {
    
    const defaultImage = {
      newFileName: '50.png',
    };

    console.log(defaultImage);
    try {
      const tester = await api.post('/upload/newd', defaultImage);
      console.log(tester);
      alert(tester);
    } catch (err) {
      console.log("error setting default image: ", err);
    }
    
  }

  return (
    <div>
      <button onClick={() => handleRemoveImageClick()}>Hi</button>
    </div>
  )
}
