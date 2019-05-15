import React, { Component } from 'react';
import classes from './App.module.css';

import Header from '../components/Header/Header';
import PostsList from '../components/PostsList/PostsList';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      twentyStories: [],
      start: 0,
      end: 20,
    };
  }

  componentDidMount() {
    this.getTopStories();
    setInterval(() => { this.getTopStories() }, 30000);
  }

  getTopStories = () => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(res => 
        this.setState({
          topStoriesIds: res.data
        })
      ).then(() => this.getTwentyStories(this.state.start, this.state.end))
  }

  getTwentyStories = (s, e) => {
    this.state.topStoriesIds.slice(s, e)
    .map(str => axios.get(`https://hacker-news.firebaseio.com/v0/item/${str}.json?print=pretty`)
      .then(this.setState({
        twentyStories: [],
      }))
      .then(res => this.setState({
        twentyStories: [...this.state.twentyStories, res.data],
      }))
    )
  }

  loadMoreStories = async () => {
    await this.state.topStoriesIds.slice(this.state.start, this.state.end)
    .map(str => axios.get(`https://hacker-news.firebaseio.com/v0/item/${str}.json?print=pretty`)
      .then(this.setState({twentyStories: []}))
      .then(res => this.setState({twentyStories: [...this.state.twentyStories, res.data] }))
    )
    this.setState({
      start: this.state.start + 20,
      end: this.state.end + 20
    })
  }

  loadPrevStories = async () => {
    await this.state.topStoriesIds.slice(this.state.start, this.state.end)
    .map(str => axios.get(`https://hacker-news.firebaseio.com/v0/item/${str}.json?print=pretty`)
      .then(this.setState({twentyStories: []}))
      .then(res => this.setState({twentyStories: [...this.state.twentyStories, res.data] }))
    )
    this.setState({
      start: this.state.start - 20,
      end: this.state.end - 20
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header refresh={this.getTopStories}/>
        <div className={classes.PageContent}>
          <PostsList stories={this.state.twentyStories} page={this.state.start}/>
          <div className={classes.BtnsHolder}>
            <button disabled={this.state.start === 0} onClick={this.loadPrevStories}>Prev</button>
            |
            <button onClick={this.loadMoreStories}>More</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;