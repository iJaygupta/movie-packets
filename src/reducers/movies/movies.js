
const movies = (state = {}, action) => {

    switch (action.type) {
        case 'init':
            return { page: '', totalPages: '', totalResults: 0, movies: [], movieDetails: {}, castDetails: {}, trailer: [] }

        case 'getMoviesList':
            let movies = (state.movies && state.movies.length) ? [...state.movies, ...action.movies] : action.movies;
            return { ...state, page: action.page, totalPages: action.totalPages, totalResults: action.totalResults, movies }

        case 'getMovieDetail':
            return { ...state, movieDetails: action.data }

        case 'getCastDetail':
            return { ...state, castDetails: action.data }

        case 'searchMovieList':
            return { ...state, movies: action.data }

        case 'resetMovies':
            return { ...state, movies: [] }

        case 'getTrailer':
            return { ...state, trailer: action.data }

        default:
            return state

    }

}

export default movies;

