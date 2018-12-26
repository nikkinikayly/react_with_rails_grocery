import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import List from './List';
import { Header, Segment } from 'semantic-ui-react';
import ListForm from './ListForm';



class Lists extends React.Component {
    state = {
        lists: [], showForm: false
    }
    
    componentDidMount() {
        axios.get('/api/lists')
        .then( res => {
            this.setState({lists: res.data})
        })
    }

    toggleForm = () => {
        this.setState( state => {
            return { showForm: !state.showForm }
        })
    }

    form = () => {
        return <ListForm submit={this.submit} />
    }

    submit = (list) => {
        axios.post('/api/lists', { list } )
        .then( res => {
            this.setState({lists: [res.data, ...this.state.lists], showForm: false })
        })
    }

    renderLists = () => {
        return this.state.lists.map(p => {
          return (
              <Segment key={p.id}>
                <Link to={`/lists/${p.id}`}>{p.name}</Link>
                <button onClick={this.deleteList}>Delete</button>
            </Segment>
          )
        })
      }

      deleteList = (id) => {
        axios.delete(`/api/lists/${id}`)
        .then ( res => {
          const { lists } = this.state
          this.setState({ lists: lists.filter( t => t.id !== id)})
        })
      }

    render(){
        const {showForm} = this.state
        return (
            <div>
                <Header as="h1">Lists</Header>
                <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Add List'}</button>
                {showForm ? this.form() : this.renderLists()}
            </div>
        )
    }
}

export default Lists;

