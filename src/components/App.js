import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import MovieContainer from '../containers/movies/movieContainer'
import DisplayMsg from './movies/displayMessage';
import MovieDetail from '../containers/movies/movieDetails';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App" >
        <Switch>

          {/* <Route exact path="/" component={SearchContainer} /> */}
          <Route exact path="/" component={MovieContainer} />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="*" component={DisplayMsg} />
        </Switch>
      </div>
    );
  }

}

export default App;
