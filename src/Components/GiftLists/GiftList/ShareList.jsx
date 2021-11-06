import React from 'react'
import './ShareList.css'

export const ShareList = ({url}) => {

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    alert('Copied to clipboard!');
  }

  return (
    <>
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>Share GIFTr List</h1>
          </div>
          <div className="info">
            <p>To share the list, use the following URL.</p>
            <p>Click the url to copy to clipboard!</p>
            <p>
              <div className="shareurl" onClick={()=>handleClick()}>{url}</div>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
