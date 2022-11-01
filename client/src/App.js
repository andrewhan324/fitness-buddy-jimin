import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

function App() {

  const [user, setUser ] = useState({

  });
  const navigate = useNavigate();

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject); 
  //   setUser(userObject); 
  // }

  // useEffect(() => {
  //  /* global google */
  //  google.accounts.id.initialize({
  //   client_id: "479595284669-rhqn5ta5sifu9a950ue0fek8ulstplu6.apps.googleusercontent.com",
  //   callback: handleCallbackResponse
  //  });

  //  google.accounts.id.renderButton(
  //   document.getElementById("signInDiv"),{
  //     theme: "outline", size: "large"
  //   }
  //  );
  // }, []);

  return (
    <Container fluid>
    
      <Container className = "main-box">
        <Container>
          <Row style ={{marginBottom: "2rem", marginTop: "1rem"}}>
            <Col>
              <h1>Fitness Buddy</h1>
            </Col>
          </Row>

          <Row style ={{marginBottom: "2rem"}}>
            <Col>
              <img src="main.avif" style ={{width:"100%"}}/>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/videos")}
              >
                VIDEOS
              </Button>
            </Col>          
          </Row>
        </Container>
        
      </Container>
      


   
    </Container>
  );
}

export default App;
