import api from '../../lib/request';
import apiPaths from '../../lib/api';
import { API_KEY, API_KEY_ALT } from '../../config';

// const API_KEY = '?api_key=4d4ed145d3584846f5922b6a467e1f85';


const movies = {
    getMoviesList: function (page, callback) {
        let fetchMoviesUrl = apiPaths.getMoviesList + API_KEY;
        if (page) {
            fetchMoviesUrl = fetchMoviesUrl + `&page=${page}`;
        }
        return dispatch => {
            api.setMethod('GET').sendRequest(fetchMoviesUrl, null, false, function (response) {
                dispatch({
                    type: 'getMoviesList',
                    page: response.data.page,
                    totalPages: response.data.total_pages,
                    totalResults: response.data.total_results,
                    movies: response.data.results
                });
                callback({ data: response.data.results });
            }, dispatch)
        }
    },
    getMovieDetail: function (movieId, callback) {
        const fetchMovieDetailUrl = apiPaths.getMovieDetail + movieId + API_KEY;

        return dispatch => {
            api.setMethod('GET').sendRequest(fetchMovieDetailUrl, null, false, function (response) {
                dispatch({
                    type: 'getMovieDetail',
                    data: response.data
                });
                callback(response.data);
            }, dispatch)
        }
    },
    getCastDetail: function (movieId, callback) {
        const fetchCastDetailUrl = apiPaths.getMovieDetail + movieId + apiPaths.getCastDetail + API_KEY;

        return dispatch => {
            api.setMethod('GET').sendRequest(fetchCastDetailUrl, null, false, function (response) {
                dispatch({
                    type: 'getCastDetail',
                    data: response.data
                });
                callback(response.data);
            }, dispatch)
        }
    },
    searchMovieList: function (searchKeyword, callback) {
        const searchMovieUrl = apiPaths.searchMovieList + searchKeyword + API_KEY_ALT;

        return dispatch => {
            api.setMethod('GET').sendRequest(searchMovieUrl, null, false, function (response) {
                dispatch({
                    type: 'searchMovieList',
                    data: response.data.results
                });
                callback(response.data);
            }, dispatch)
        }
    }




}

export default movies;

