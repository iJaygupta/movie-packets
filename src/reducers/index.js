import { combineReducers } from 'redux'
import movies from '../reducers/movies/movies'


export const application = combineReducers({
    moviesData: movies
})

export const initialState = {
    movies: movies({}, { type: "init " }),
}
 