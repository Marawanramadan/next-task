import styles from "../styles/Home.module.css";
import axios from "axios";
import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Navbar, Nav, Button, NavDropdown, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import dateFormat from 'dateformat';
import Image from 'next/image'

const Home = (props) => {


  const button1Style = {
    width: '100px',
    borderRadius: '30px',
    margin: "0px 30px",
    padding: '5px 15px',
    color: 'white',
    backgroundColor: 'transparent',
    border: '1px solid white',
    fontWeight: 'bold'
  }

  const button2Style = {
    width: '100px',
    borderRadius: '30px',
    margin: "0px 30px",
    padding: '5px 15px',
    color: '#00a47c',
    backgroundColor: 'white',
    fontWeight: 'bold'
  }
  const searchStyle = {
    lineHeight: '2rem',
    margin: 'auto',
    width: '300px',
    borderRadius: '20px',
    border: 'none'
  }

  return (

    <div>
    
      <div>
        <Navbar style={{ backgroundColor: '#00a47c' }} expand="lg">
          <Container>
            <Navbar.Brand style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }} href="#home">Newsbuzz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto ml-auto">
                <input className={styles.search} style={searchStyle} type="text" placeholder="Search league or team"></input>
              </Nav>
              <Form inline>
                <Button style={button1Style} variant="outline-success">Login</Button>
                <Button style={button2Style} variant="outline-success">Register</Button>

              </Form>
            </Navbar.Collapse>
          </Container>

        </Navbar>
        <Row style={{marginRight:'0px'}}>
          <Col style={{padding:'0px'}} lg={4} xs={0}>
          </Col>
          <Col style={{padding:'0px'}} lg={4} xs={12}>
            {props.props == null ? <div>
              <h4>Someting is wrong,We are working on it</h4>
              <Image
                src="/server-down.svg"
                alt="Server down"
                width={500}
                height={500}
              />
            </div> :
              props.props.news.map((info) => {
                return (
                  <div key={info._id}>
                    <Card className={styles.card} style={{ padding: '10px', marginTop: '25px', width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '30px' }}>
                      <Row>
                        <Col className={styles.cardImage} style={{ maxWidth: '12%' }} lg={3} sm={3} xs={3}>
                          <Card.Img  variant="top" style={{ borderRadius: '50%' }} src={info.source.url} />

                        </Col>
                        <Col lg={8} sm={8} xs={8}>
                          <Card.Body style={{ padding: '0px' }}>
                            <Card.Title>{info.source.title}</Card.Title>

                          </Card.Body>
                        </Col>
                        <Col lg={2} sm={2} xs={2}>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ float: 'right' }} width="24" height="24" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18" /><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" /></svg>
                        </Col>
                      </Row>
                      <Row>
                        <Card.Body>
                          <Card.Text>
                            {info.title}

                          </Card.Text>
                        </Card.Body>
                      </Row>
                      <Row>
                        <Card.Body>
                          <Card.Text>
                            {dateFormat(info.created_at, "dddd, dS mmmm yyyy")}
                            <span> AT {info.created_at.split("T")[1].split(".")[0]}</span>

                          </Card.Text>
                        </Card.Body>
                      </Row>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>{info.keywords.length == 0 ? <p>No Keywords</p> : info.keywords.map(key => {
                          return <span style={{
                            color: '#00a47c',
                            padding: '5px 10px',
                            marginRight: '5px',
                            marginTop: '10px!important',
                            borderRadius: '15px',
                            border: '1px solid #00a47c'
                          }} id={key._id}> {key.name}</span>
                        })}</ListGroupItem>

                      </ListGroup>

                    </Card>
                  </div>
                );
              })
            }
          </Col>
          <Col style={{padding:'0px'}} lg={3} xs={0}></Col>
        </Row>
      </div>


    </div>
  );
}


Home.getInitialProps = async () => {
  try {
    const results = await axios.get(`http://80.240.21.204:1337/news?skip=2`)
    const news = results.data.news
    return {
      props: { news }
    }
  } catch (error) {
    return {
      props: null
    }

  }
}
export default Home;
