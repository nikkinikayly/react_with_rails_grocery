import React from 'react';
import axios from 'axios';
import ItemForm from './ItemForm'
import { Link } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

class Items extends React.Component {
    state = {items: [], showForm: false}

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

    form = () => {
        return <ItemForm submit={this.submit} />
    }

    submit = (item) => {
        axios.post(`/api/lists/${this.props.match.params.id}/items`, { item } )
        .then( res => {
            this.setState({items: [res.data, ...this.state.lists], showForm: false})
        })
    }

     renderItems = () => {
    return this.state.items.map(p => {
      return (
          <Segment key={p.id}>
            <Link to={`/lists/${p.id}/items/${p.items.id}`}>{p.items.name}</Link>
        </Segment>
      )
    })
  }

    // addItem = (item) => {
    //     axios.post(`/api/lists/${this.props.match.params.id}/items`, { item } )
    //     .then( res => {
    //         this.setState({items: [res.data, ...this.state.items], showForm: false })
    //     })
    // }

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