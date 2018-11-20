import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListItems from './components/RepoListItem.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      fetched: false
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: '/repos',
      data: {username: term},
      success: (results) => {
        this.setState({
          repos: JSON.parse(results),
          fetched: !this.state.fetched
        });
      },
    });
  }

  handleClick(url) {
  }

  render () {
    if (this.state.fetched) {
      return (<div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
        <center><table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Repo Name</th> 
              <th>Repo URL</th>
            </tr>
           {this.state.repos.map((repo, index) => <RepoListItems key={index} repo={repo} handleClick={this.handleClick} />)} 
          </tbody>
        </table></center>
      </div>)
    } else {
      return (<div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
          // {this.state.repos.map((repo) => <RepoListItems repo={repo} />)} 

