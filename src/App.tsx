import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <h1>TODOs</h1>
      <TodoList />
    </>
  )
}


class Todo {
  title: string
  content: string
  done: boolean

  constructor(title:string, content: string, done: boolean = false) {
    this.title=title
    this.content=content
    this.done=done
  }
}

const TodoList: React.FC<{}> = () => {
  let [todos, setTodos] = useState(()=>JSON.parse(localStorage.getItem("todos")??"[]"))
  useEffect(()=>{
    console.log("Setting todos")
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos] )

  return (
    <>
      {
        todos.map((todo: Todo,index: number) => (
          <TodoItem 
            title={todo.title}
            content={todo.content}
            done={todo.done}
            setDone={(done) => {
              let new_todos=[...todos]
              new_todos[index].done=done
              setTodos(new_todos)
            }}
          />
        ))
      }

      <AddTodo addTodo={(todo)=>{
        let new_todos=[...todos]
        new_todos.push(todo)
        console.log("about to set todo to",new_todos)
        setTodos(new_todos)
      }} />
    </>
  )
  
}

interface AddTodoArgs {
  addTodo: (todo: Todo) => void
}

const AddTodo: React.FC<AddTodoArgs> = ({ addTodo }) => {
  const [ editing, setEditing ] = useState(false)
  const [ todo, setTodo ] = useState(new Todo("",""))

  return (
    <>
      <div onClick={()=>{
        if(editing==false) setEditing(true)
      }}>
          {
            editing?
              <AddTodoEditor 
                setTodo={(newTodo)=>{setTodo(newTodo)}} 
                doneEditing={() => {
                  console.log("Adding todo",todo)
                  addTodo(todo)
                  setEditing(false)
                }}/>
              :
              <AddTodoButton />
          }
      </div>
    </>
  )
}

interface AddTodoEditorArgs {
  setTodo: (todo: Todo) => void
  doneEditing: ()=>void
}
const AddTodoEditor: React.FC<AddTodoEditorArgs> = ({ setTodo, doneEditing }) => {
  const [ title, setTitle ] = useState("")
  const [ content, setContent] = useState("")

  return (
    <>
      <form>
        <h3>Title</h3>
        <input type='text' value={title} title='Title' onChange={(e)=>{
          setTitle(e.target.value)
          setTodo(new Todo(title,content))
        }} />
        <br />
        <h3>Content</h3>
        <input type='text' value={content} title='Content' onChange={(e)=>{
          setContent(e.target.value)
          setTodo(new Todo(title,content))
        }} />
      </form>

      <button onClick={()=>doneEditing()}>Done</button>
    </>
  )
}

const AddTodoButton: React.FC<{}> = () => {
  return (
    <div className='card add-todo-button'>
      <h1>+</h1>
    </div>
  )
}

interface TodoItemArgs {
  title: string
  content: string
  done: boolean
  setDone: (done: boolean) => void
}

const TodoItem: React.FC<TodoItemArgs> = ({ title , content, done, setDone }) => {
  
  return (
    <>
      <div className="todo-item card" onClick={() => {
        setDone(!done)
      }}>
        <div className='todo-checkbox'>
          <CheckBox done={done} />
        </div>
        <h3 className='todo-title'>{title}</h3>
        <p className='todo-content'>{content}</p>
      </div>
    </>
  )
}

interface CheckboxArgs {
  done: boolean
}

const CheckBox: React.FC<CheckboxArgs> = ({done}) => {
  const r=10
  const border=2

  const dark=useMediaQuery('(prefers-color-scheme: dark)')
  const light=!dark

  // const foreground=light?"black":"white"
  // const background=light?"white":"black"
  return (
    <>
      <svg width={2*(r+border)} height={2*(r+border)}>
        <circle r={r} cx={r+border} cy={r+border} 
          fill={done ? "#11DD11":"transparent"} 
          stroke={light?"#AAAAAA":"#AAAAAA"} stroke-width={border} 
        />
      </svg>
    </>
  )
}

export default App
