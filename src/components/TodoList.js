import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TodoList = () => {

    const [newTaskName, setNewTaskName] = useState("")
    const [list, setList] = useState({
        tasks : []
    })

    const url = "http://localhost:3001/tasks"

    useEffect(() => {
        axios.get(url)
             .then((res) => {
                 setList({
                     tasks: res.data
                 })
             })         
    }, list)

    const addTask = () => {
        setList({
            tasks : [
                ...list.tasks,
                {
                    id: Math.max(0, ...list.tasks.map(t => t.id)) + 1,
                    name: newTaskName,
                    done: false
                }
            ]
        })
        setNewTaskName("")
    }

    const deleteTask = (id) => {
        setList({
            tasks: list.tasks.filter(task => task.id !== id)
        })
    }

    return (
    <>
        <ul className="list-group">
            <li className="list-group-item active">Lista de Compras</li>

            {
                list.tasks.map( task => 
                    <li key={task.id} className="list-group-item">
                        {task.name}
                        <button className="btn btn-danger float-end"
                            onClick={ () => deleteTask(task.id)} >
                            &#10006;
                        </button>
                    </li>
                    )
            }

        </ul>

        <input type="text" className="form-control mt-2"
               placeholder="Ingrese un nuevo item de compra"
               value={newTaskName}
               onChange={ (evt) => {
                    setNewTaskName(evt.target.value)
               } }
        />

        <button className="btn btn-primary float-end mt-1"
                onClick={ () => addTask() } >
                    Agregar Tarea
        </button>
    
    </>)
}

export default TodoList