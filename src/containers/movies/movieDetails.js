import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import CastList from '../../components/movies/castList';
import { CAST_MAX_NUM } from '../../config';
import { Row, Col, Navbar } from 'react-bootstrap';
import Poster from '../../components/movies/poster';
import MovieInfo from '../../components/movies/movieInfo';
import Player from '../../components/movies/player';


import { connect } from 'react-redux';
import actions from '../../actions/index.js';


class MovieDetail extends Component {

    componentDidMount() {

        this.props.moviesAction.getMovieDetail(this.props.match.params.id)
        this.props.moviesAction.getCastDetail(this.props.match.params.id)
        this.props.moviesAction.getTrailer(this.props.match.params.id)

    }

    render() {
        const { movie, casts, trailer } = this.props;
        console.log("this.props ==>>", this.props)

        // if (isFetcing_movie || isFetcing_casts || isFetcing_trailers) {
        //     return <p>loading...</p>
        // }
        if (movie && movie.hasOwnProperty('id')) {
            return (
                // <Grid fluid={false}>
                <div>
                    <Navbar bg="dark" variant="dark" style={{ "height": "60px" }}>

                    </Navbar>
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <Poster id={movie.id} path={movie.poster_path} responsive />
                        </Col>
                        <Col xs={12} sm={6} md={8}>
                            <MovieInfo movie={movie} />
                            {casts && casts.cast.length && <CastList data={casts.cast.slice(0, CAST_MAX_NUM)} />}
                            {trailer && trailer.length && trailer[0].key &&
                                <Col span={20} sm={24} xs={24} lg={20} md={20}>
                                    <Player url={trailer[0].key} />
                                </Col>
                            }

                        </Col>
                    </Row>

                </div>
                // </Grid>
            );
        } else
            return null;

    }
}

function mapStateToProps(state) {

    return {
        movie: state.moviesData.movieDetails,
        casts: state.moviesData.castDetails,
        trailer: state.moviesData.trailer,

    }
}

function mapDispatchToProps(dispatch) {

    return {
        moviesAction: bindActionCreators(actions.movies, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
