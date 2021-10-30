import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

import jumboImage from "../../assets/jumboImage2.png";
import jumboImage2 from "../../assets/jumboImage3.png";

import "./Jumbo.css";

const Styles = styled.div`
  .jumbo {
    background: url(${jumboImage});
    background-size: cover;
    color: #ccc;
    position: relative;
    height: 200px;
    z-index: -2;
  }
  .jumbo-home {
    background: url(${jumboImage2});
    background-size: cover;
    color: #ccc;
    position: relative;
    min-height: 100%;
    width: 100%;
    z-index: 0;
    
  }
`;

export const Jumbo = ({page}) => (
  <>
    <Styles>
      { !page &&
        <div className="jumbo desktop">
          <div className="overlay"></div>
          <Container>
            
          </Container>
        </div>
      }
      { (page === "Home") && 
          <div className="jumbo-home">
            <div className="overlay"></div>
            <Container className="header-content">
              
                <h1 className="home-text">GIFTr is the simple way to create and manage gift lists</h1>
                <div className="home-buttons">
                  <Link to="/giftlists"><Button className="btnCreateGiftList">How Does It Work</Button></Link>
                  <Link to="/howitworks"><Button className="btnFindGiftList">Make A GIFTr List</Button></Link>
                </div>
              
            </Container>
          </div>
        
      }
    </Styles>
  </>
);
