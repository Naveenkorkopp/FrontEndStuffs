import React, {Component} from 'react';
import './todoapp.css';


class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            todolist: []
        }
    }

    // To add New ToDos
    addTodos = () => {

        var data = this.state.todolist || [];
        const key = this.state.key;
        const value = document.querySelector('input[name="addText"]').value;
        if (value == '') {
            alert("Please add some text !")
            return
        }
        data.push({
            'id': key,
            'todo': value,
            'isCompleted': false
        });

        const newKey = key + 1;
        this.setState({
            key: newKey,
            todolist: data
        })
    }

    // To delete old Todos
    deleteToDo = (id) => {

        var data = this.state.todolist || [];
        const newData = [];

        data.map((todo) => {
            if (todo.id != id) {
                newData.push(todo)
            }
        });

        this.setState({
            todolist: newData
        })
        
    }

    // To Mark Todos as Completed
    completeTodo(id) {

        var data = this.state.todolist || [];

        data.map((todo) => {
            if(todo.id === id){
                todo.isCompleted = true;
            }
        });

        this.setState({
            todolist: data
        })
    }

    // List out the Todos
    listTodos(data) {
        return  (data.map((todo)  => 
                <tr>
                    <td>
                        <p>{todo.todo}</p>
                        <button class="sayCompleted" onClick={()=> this.completeTodo(todo.id)}>complete</button>
                        <button class="sayDelete" onClick={()=> this.deleteToDo(todo.id)}>delete</button>
                    </td>
                    {
                        todo.isCompleted ? 
                        <td className="completed">Completed</td>: 
                        <td className="pending">Pending</td>
                    }
                </tr>
            )
        );
    }
    
    render() {
        const data = this.state.todolist || [];

        return (
            <div>
                <div class="myForm">
                    <input  type='text' name='addText' />
                    <button class='addNote' onClick={this.addTodos}>ADD NOTE</button>
                </div>
                <div>
                    <table id="toDoListTable">
                    <tr>
                        <th>To Do List</th>
                        <th>Status</th>
                    </tr>
                        {this.listTodos(data)}
                    </table>
                </div>
            </div>
        );
    }
}

export default TodoApp;
