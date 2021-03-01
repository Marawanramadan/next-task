import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Home =(props) => {
  
  // async componentDidMount() {
  //   const result = await axios.get(
  //     `http://80.240.21.204:1337/news?skip=8&limit=5`
  //   );
  //   console.log(result.data.news);
  //   this.setState({ news: result.data.news });
  // }
//  loadNext = async ()=>{
//     const result = await axios.get(
//       `http://80.240.21.204:1337/news?skip=8&limit=5`
//     );
//     console.log(result.data.news);
//     this.setState(prevState=> {
//     return {...prevState,news: prevState.news.concat(result.data.news) }})
// }


  
    console.log(props.props.news)
    return (
      <div>
        <Container>
          <Row>
            <Col lg={4}>
              <h1>first column</h1>
            </Col>
            <Col lg={4}>
            {/* <InfiniteScroll
                dataLength={props.news.length}
                hasMore={true}
                next={this.loadNext}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >*/}
                {
                  
                  props.props.news.map((info) => {
                  return (
                    <div key={info._id}>
                      <h1>{info.source.title}</h1>
                      <img src={info.source.url} />
                    </div>
                  );
                }) 
                }
              {/* </InfiniteScroll>  */}
            </Col>
            <Col lg={4}>third column</Col>
          </Row>
        </Container>
      </div>
    );
  }


Home.getInitialProps = async (ctx) =>{
  const results = await axios.get(`http://80.240.21.204:1337/news?skip=8&limit=5`)
  const news = results.data.news
  return {
    props : {news}
  }
}
export default Home;
