import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
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
        <Jumbotron fluid className="jumbo desktop">
          <div className="overlay"></div>
          <Container>
            
          </Container>
        </Jumbotron>
      }
      { (page === "Home") && 
          <Jumbotron fluid className="jumbo-home desktop">
            <div className="overlay"></div>
            <Container className="header-content">
              
                <h1>GIFTr is the simple way to create and manage gift lists</h1>
                <div>
                  <Link to="/createnewlist"><Button className="btnCreateGiftList">Create A Gift List</Button></Link>
                  <Link to="/howitworks"><Button className="btnFindGiftList">How Does It Work</Button></Link>
                </div>
              
            </Container>
          </Jumbotron>
        
      }
    </Styles>
  </>
);
