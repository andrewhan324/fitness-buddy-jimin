import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { Button , Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import YoutubeEmbed from './utils/YoutubeEmbed';
import axios from "axios";

function Videos() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  const [comment, setComment] = useState({
    title: "",
    description: "",
  });

  const [comments, setComments] = useState([]);

  const [updatedComment, setUpdatedComment] = useState({}); 

  useEffect(() => {
    axios.get("/comments")
    .then((res) => {
      setComments(res.data);
    })
    .catch((err) => console.log(err));
  }, [comments]);

  const deleteComment = (id) => {
    axios.delete(`/delete/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setComment(prev => {
      return({
        ...prev,
        [name]: value,
      })
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(comment);
    axios.post("/create", comment)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    handleClose();
  }

  const updateComment = (comment) => {
    setUpdatedComment(comment);
    handleShow2();
  }

  const handleChange2 = (event) => {
    const {name, value} = event.target;

    setUpdatedComment(prev =>{
      return ({
        ...prev,
        [name]: value,
      });
    });
    console.log(updatedComment);
  };

  const saveUpdatedComment = () => {
    axios.put(`/update/${updatedComment._id}`, updatedComment)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
    handleClose2();
  };

  




  const navigate = useNavigate();

   return (
    <Container fluid>
    
      <Container className = "main-box">
        <Container>
          <Row style ={{marginBottom: "2rem"}}>
            <h3  style ={{marginTop: "1rem"}}>Workout Demonstration </h3>     
          </Row>
          <Row style ={{marginBottom: "2rem"}}>
          <Accordion defaultActiveKey="0" className = "acc">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Squat</Accordion.Header>
                <Accordion.Body>
                  <YoutubeEmbed embedId="UI-5VE9cVHs"/> 
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Push-Up</Accordion.Header>
                <Accordion.Body>
                  <YoutubeEmbed embedId="fuIDJgrC0YA"/>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Chin-Up</Accordion.Header>
                <Accordion.Body>
                  <YoutubeEmbed embedId="gzwDOACOUrg"/>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Deadlift</Accordion.Header>
                <Accordion.Body>
                  <YoutubeEmbed embedId="4JLyPRplC6g"/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>

          <Row style ={{marginBottom: "2rem"}}>
            <h3 style ={{marginBottom: "1rem"}}> Comments </h3>   
            <div className ="overflow-auto comment-box">
            {comments ? (
              <>
                {comments.map((comment) => {
                  return (
                    <div 
                      key = {comment._id}
                      style={{ 
                      border: "solid white 1px", 
                      borderRadius:"8px", 
                      marginBottom:"1rem",
                      padding: "1rem"}}>
                      <h4>{comment.title}</h4>
                      <p>{comment.description}</p>
                      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                        <Button 
                        onClick={() => updateComment(comment)}
                        variant ="outline-warning" style = {{width: "100%", marginRight: "1rem"}}>
                          UPDATE
                        </Button>
                        <Button onClick={() => deleteComment(comment._id)} variant ="outline-danger" style = {{width: "100%"}}>
                          DELETE
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : ""}
            </div>  
          </Row>


          
          <Row>
            <Col>
              <Button 
                onClick={handleShow}
                variant ="outline-success" style = {{width: "100%", marginBottom: "1rem"}}>
                WRITE COMMENT
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="outline-dark"
                onClick={()=>navigate(-1)}
              >
                BACK
              </Button>
            </Col>          
          </Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Write a comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Control 
                    name="title"
                    placeholder="title"
                    style={{marginBottom:"1rem"}}
                    onChange={handleChange}
                    />
                  <Form.Control 
                    name="description"
                    placeholder="description"
                    style={{marginBottom:"1rem"}}
                    onChange={handleChange}
                    />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                CLOSE
              </Button>
              <Button variant="outline-primary" onClick={handleClick}>
                WRITE
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Write a comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Control 
                    value={updatedComment.title ? updatedComment.title:""}
                    name="title"
                    placeholder="title"
                    style={{marginBottom:"1rem"}}
                    onChange={handleChange2}
                    />
                  <Form.Control 
                    value={updatedComment.description ? updatedComment.description:""}
                    name="description"
                    placeholder="description"
                    style={{marginBottom:"1rem"}}
                    onChange={handleChange2}
                    />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose2}>
                CLOSE
              </Button>
              <Button variant="outline-prminary" onClick={saveUpdatedComment}>
                UPDATE
              </Button>
            </Modal.Footer>
          </Modal>
          
        </Container>
        
      </Container>
      


   
    </Container>
  );
}

export default Videos;