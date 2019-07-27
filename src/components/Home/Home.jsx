import React, { Component } from 'react'

import { base } from '../../base';
import Todo from '../Todo';

export class Home extends Component {
    state = {
        items: [],
        text: "",
        boops: "lol"

    }
    
    componentWillMount(){
        this.setState({items: base.syncState('items', {
            context: this,
            state: 'items'
        })})
    }

    componentWillUnmount(){
        base.removeBinding(this.state.items);
    }

    componentDidUpdate = () => {
        
    }

    updateChecked = (id) => {
        this.setState({ items: this.state.items.map(item => {
            if(item.id === id){
                item.isCompleted = !item.isCompleted;
            }
            return item;
        })});
    }

    updateDelete = (id) => {
        this.setState({ items: this.state.items.filter(item =>
            item.id !== id    
        )});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState( { items: this.state.items.concat({id: this.state.items.length+1, title: this.state.text, isCompleted: false})
        })
    }

    updateText = (event) => {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        className='form-control mr-sm-2'
                        type="text"
                        placeholder="Add Todo"
                        value={this.state.text}
                        onChange={this.updateText}
                    />
                </form>
                <Todo todo={this.state.items} updateChecked={this.updateChecked} onDelete={this.updateDelete}/>
            </React.Fragment>
        )
    }
}

export default Home
