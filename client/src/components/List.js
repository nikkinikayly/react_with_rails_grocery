import React from 'react'
import axios from 'axios'
import ListForm from './ListForm';
import ItemForm from'./ItemForm';
import { Link } from 'react-router-dom';

class List extends React.Component {
  state = { list: {}, edit: false, showForm: false }

  componentDidMount() {
    axios.get(`/api/lists/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ list: res.data })
      })
  }

  toggleEdit = () => {
    this.setState(state => {
      return { edit: !this.state.edit }
    })
  }

  showList = () => {
    const { list: { name } } = this.state
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }

  edit = () => {
    return <ListForm {...this.state.list} submit={this.submit} />
  }

  submit = (list) => {
    axios.put(`/api/lists/${this.props.match.params.id}`, { list })
      .then(res => {
        this.setState({ list: res.data, edit: false })
      })
  }
  

 
  toggleForm = () => {
    this.setState( state => {
        return { showForm: !state.showForm }
    })
}
form = () => {
  return <ItemForm submit={this.submit} />
}


  render() {
    const { edit } = this.state
    return (
      <div>
        {edit ? this.edit() : this.showList()}
        <button onClick={this.toggleEdit}>{ edit ? 'Cancel' : 'Edit' }</button>
        <button><Link to={`/lists/${this.props.match.params.id}/items`}>View Items</Link></button>
      </div>
    )
  }

}

export default List;