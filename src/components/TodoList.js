import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TodoList = () => {

    const [newTaskName, setNewTaskName] = useState(() => "")
    const [tasks, setTasks] = useState(() => [])
    const [loading, setLoading] = useState(() => true)

    const url = "http://localhost:8000/tasks"

    useEffect(() => {
        setTimeout(() => {
            axios.get(url)
            .then((res) => {
                setTasks( res.data )
                setLoading(() => false)
            })         
        }, 3000)
    }, [tasks])

    const addTask = () => {
        axios({
            method: 'post',
            url: url,
            data: {
                id: Math.max(0, ...tasks.map(t => t.id)) + 1,
                name: newTaskName,
                done: false
            }
        }) 
        setNewTaskName("")
    }

    const deleteTask = (id) => {
        axios.delete(`${url}/${id}`)
    }

    const checkTask = (id, name) => {
        axios({
            method: 'put',
            url: `${url}/${id}`,
            data: {
                id: id,
                name: name,
                done: true
            }
        }) 
    }

    return (
    <>
        <ul className="list-group">
            <li className="list-group-item active">Lista de Compras</li>

            {
                loading ? <li className="list-group-item text-center">
                            <div className="spinner-border"></div>
                          </li>

                : tasks.map( task => 
                    <li key={task.id} className="list-group-item" style={task.done ? {backgroundColor: "limegreen"} : {backgroundColor: "white"}}>
                        {task.name}
                        <button className="btn btn-danger float-end"
                            onClick={ () => deleteTask(task.id)} >
                            &#10006;
                        </button>
                        <button className="btn btn-info float-end"
                            onClick={ () => checkTask(task.id, task.name)} >
                            &#10004;
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