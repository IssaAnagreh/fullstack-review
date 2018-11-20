import React from 'react';

const RepoListItems = (props) => (
  <tr> 
  	<td>{props.repo.username}</td>
  	<td>{props.repo.name}</td>
  	<td onClick={() => {props.handleClick(props.repo.url)}}> <a href={props.repo.url} target="_blank">{props.repo.url}</a></td>
  </tr>
)

export default RepoListItems;