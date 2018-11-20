import React from 'react';
import $ from 'jquery';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      terms: null
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value,
    });
  }

  search() {
    console.log("you're searching for: ", this.state.term)
    this.props.onSearch(this.state.term);
    $('#input').val('');
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input id='input' value={this.state.terms} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;