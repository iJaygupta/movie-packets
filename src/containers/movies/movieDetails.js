import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import CastList from '../../components/movies/castList';
import { CAST_MAX_NUM } from '../../config';
import { Row, Col } from 'react-bootstrap';
import Poster from '../../components/movies/poster';
import MovieInfo from '../../components/movies/movieInfo';

import { connect } from 'react-redux';
import actions from '../../actions/index.js';


class MovieDetail extends Component {

    componentDidMount() {

        this.props.moviesAction.getMovieDetail(this.props.match.params.id, function (response) {
        })
        this.props.moviesAction.getCastDetail(this.props.match.params.id, function (response) {
        })
    }
 
    render() {
        const { movie, casts, trailers, isFetcing_movie, isFetcing_casts, isFetcing_trailers } = this.props;
        console.log("this.props ==>>", this.props)

        // if (isFetcing_movie || isFetcing_casts || isFetcing_trailers) {
        //     return <p>loading...</p>
        // }
        if (movie && movie.hasOwnProperty('id')) {
            return (
                // <Grid fluid={false}>
                <div>
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <Poster id={movie.id} path={movie.poster_path} responsive />
                        </Col>
                        <Col xs={12} sm={6} md={8}>
                            <MovieInfo movie={movie} />
                            {casts && casts.cast.length && <CastList data={casts.cast.slice(0, CAST_MAX_NUM)} />}
                        </Col>
                    </Row>
                    <Row>
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
        casts: state.moviesData.castDetails
    }
}

function mapDispatchToProps(dispatch) {

    return {
        moviesAction: bindActionCreators(actions.movies, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
