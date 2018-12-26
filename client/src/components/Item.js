import React from 'react'
import axios from 'axios'
import ListForm from './ListForm';
import ItemForm from'./ItemForm';
import { Link } from 'react-router-dom';

class Item extends React.Component {
  state = { item: {name: '', price: ''}, edit: false, showForm: false }

  componentDidMount() {
    axios.get(`/api/lists/${this.props.match.params.id}/items/${this.state.id}`)
      .then(res => {
        this.setState({ item: res.data })
      })
  }

  toggleEdit = () => {
    this.setState(state => {
      return { edit: !this.state.edit }
    })
  }

  showItem = () => {
    const { item: { name } } = this.state
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }

  edit = () => {
    return <ItemForm {...this.state.item} submit={this.submit} />
  }

  submit = (item) => {
    axios.put(`/api/lists/${this.props.match.params.id}/items/${this.state.id}`, { item })
      .then(res => {
        this.setState({ item: res.data, edit: false })
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
        <p>{this.state.price}</p>
      </div>
    )
  }

}

export default Product