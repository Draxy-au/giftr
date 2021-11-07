import React from "react";
import { Jumbo } from "../Jumbo/Jumbo";

import './HowItWorks.css';

export const HowItWorks = () => {
  return (
    <>
      <Jumbo />
      <div className="yourlist-container">
        <div className="yourlist">
          <div className="title">
            <h1>How It Works</h1>
          </div>
          <div className="how">
            
            <p>Once you have created an account, head to 'Your Lists'.</p>
            <p>Here you can create your lists and when they are ready, share them with friends and family.</p>
            
            <p>To Create a list, press the 'Create A New List' button.</p>
            
            <p>Select one of the GIFTr list types, and start entering in the details for the list.</p>
            
            <p>When you have entered in the details, press the 'Create New List!' button.</p>
            
            <p>Now choose your new list and press the 'Add Gift' button to get started adding gift ideas.</p>
            
            <p>When you are ready to share your GIFTr List, press the 'Share GIFTr List' button.</p>
            <p>Click the GIFTr List shareable link to copy it to your clipboard, and you can send it to friends and family!</p>
          </div>
        </div>
      </div>
    </>
  );
};
