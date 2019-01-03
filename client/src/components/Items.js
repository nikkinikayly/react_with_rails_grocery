import React from 'react';
import axios from 'axios';
import ItemForm from './ItemForm'
import { Header, Segment, Button, Icon } from 'semantic-ui-react';

class Items extends React.Component {
    state = {items: [], showForm: false, edit: false}

    componentDidMount() {
    axios.get(`/api/lists/${this.props.match.params.id}/items`)
      .then(res => {
        this.setState({ items: res.data })
      })
    }

    toggleForm = () => {
        this.setState( state => {
            return { showForm: !state.showForm }
        })
    }

    toggleEditForm = () => {
        this.setState( state => {
            return { edit: !this.state.edit }
        })
    }

    edit = () => {
        return <ItemForm {...this.state.item} submit={this.submit} />
    }

    form = () => {
        return <ItemForm submit={this.submit} />
    }

    submit = (item) => {
        axios.post(`/api/lists/${this.props.match.params.id}/items/`, { item } )
        .then( res => {
            this.setState({items: [res.data, ...this.state.items], showForm: false})
        })
    }

     renderItems = () => {
    return this.state.items.map(p => {
      return (
          <Segment key={p.id}>
            <Header as="h3">{p.name}: ${p.price}</Header>
            <Button 
                color="blue"
                size="small"
                onClick={() => this.toggleEditForm}
                style={{marginLeft: '16px'}}
            >Edit</Button>
            <Button 
                icon
                color="red"
                size="small"
                onClick={() => this.deleteItem(p.id)}
                style={{marginLeft: '16px'}}
            >
            <Icon name="trash" />
            </Button>
        </Segment>
      )
    })
  }

  deleteItem = (id) => {
      axios.delete(`/api/lists/${this.props.match.params.id}/items/${id}`)
      .then ( res => {
          const { items } = this.state
          this.setState({ items: items.filter( t => t.id !== id)})
      })
  }

    render() {
        const { showForm } = this.state
        return (
          <div> 
              <Header as="h1">List</Header>
              <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Add Item' }</button>
              {showForm ? this.form() : this.renderItems()}
          </div>
        )
      }

}

export default Items;