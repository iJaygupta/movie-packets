import React, { Component } from 'react';
import MovieList from '../../components/movies/movieList';
import DisplayMessage from '../../components/movies/displayMessage';
import { Navbar } from 'react-bootstrap';
import './search.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index'

class MovieContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        this.getMovieListing();

    }

    getMovieListing(page) {
        this.props.moviesAction.getMoviesList(page, (response) => {
        })
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('demo');
        if (this.isBottom(wrappedElement)) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.getMovieListing(this.state.page);
            })
            // document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    handleMovieSearch = (e) => {

        let searchKeyword = e.target.value;
        if (searchKeyword) {
            this.props.moviesAction.searchMovieList(searchKeyword, (response) => {
                console.log("searchMovieList ==> ", response)
            })
        } else {
            this.props.moviesAction.resetMovies(() => {
                this.getMovieListing();
            })

        }
    }

    render() {

        console.log("this.props ==>>", this.props)

        return (
            <div id="demo">
                <Navbar bg="dark" variant="dark" onScroll={this.listenScrollEvent}>

                    <div className="has-search">
                        <span className="form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search Here" onChange={this.handleMovieSearch} />
                    </div>
                    {/* <span class="glyphicon glyphicon-home">hjkjk</span> */}
                </Navbar>
                {this.props.movies && this.props.movies.length ? <MovieList movies={this.props.movies} /> : <DisplayMessage />}
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        movies: state.moviesData.movies,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        moviesAction: bindActionCreators(actions.movies, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
