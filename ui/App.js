import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';
import { Movies } from './Movies';
import { methodCall } from './methods';

class App extends Component {
  state = {
    search: '',
    moviesSearch: [],
  };

  onSearch = ({ target: { value: search } }) => {
    this.setState(
      () => ({ search }),
      () => {
        this.searchMovies();
      }
    );
  };

  searchMovies = () => {
    methodCall('moviesSearch', this.state.search)
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          return;
        }
        const { results: moviesSearch } = data;
        this.setState(() => ({
          moviesSearch,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.searchMovies();
  }

  render() {
    return (
      <Fragment>
        <div>
          <input onChange={this.onSearch} value={this.state.search} />
        </div>
        <div>{this.state.search}</div>
        <div>
          {this.state.moviesSearch && (
            <Movies movies={this.state.moviesSearch} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default hot(module)(App);
