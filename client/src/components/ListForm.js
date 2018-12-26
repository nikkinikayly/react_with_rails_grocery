import React from 'react';

class ListForm extends React.Component {
    defaultValues = { name: ''}
    state = { name: ''};

    componentDidMount() {
        if (this.props.id) {
            this.setState({...this.props})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const list = { ...this.state }
        this.props.submit(list)
        this.setState({ ...this.defaultValues })
      }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value, });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                name="name"
                placeholder="List Name"
                value={this.state.name}
                onChange={this.handleChange}
                />
                <button>Submit</button>
            </form>
        )
    }

}

export default ListForm;