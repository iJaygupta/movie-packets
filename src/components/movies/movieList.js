import React, { Component } from 'react';
import Poster from "./poster.js";
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';


export default class MovieList extends Component {

  render() {
    const style = {
      display: 'flex',
      flexWrap: 'wrap'
    }

    let movies = this.props.movies.filter(function (movie) {
      return movie.poster_path != null;
    }).map(function (movie) {
      return (
        <Col xs={8} sm={4} md={3} key={movie.id} >
          <Link to={'/movie/' + movie.id} ><Poster info id={movie.id} path={movie.poster_path} title={movie.title} voteAverage={movie.vote_average} release_date={movie.release_date} responsive /></Link>
        </Col>
      );
    });

    return (
      // <Grid fluid={false}>
      <div>
        <Row style={style}>
          {movies}
        </Row>
      </div>
      // </Grid>
    );
  }
}

