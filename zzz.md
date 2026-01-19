#### How it got linked and why we have to use this to clean input field after clickm on add i am making a todo using react
```
        <input type="text" onChange={handleChange} value={todo} className='w-1/2 bg-white h-10 rounded-lg outline-none' />
  const handleChange = (e)=>{
   setTodo(e.target.value)
  }

  ````

#### why an empty array where re all tasks going

  ```
  const [todos, setTodos] = useState([])   //an array of all todos

  ````
 ####why to map and return explain this 
  ```
            {todos.map(item=>{

           return<div className="todo flex">
````