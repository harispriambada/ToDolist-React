import { useState } from "react";

const ItemTodo = [
  {
    id: 1,
    todo: "memakan roti",
    condition: false,
  },
  {
    id: 2,
    todo: "memakan roti",
    condition: false,
  },
  {
    id: 3,
    todo: "memakan roti",
    condition: false,
  },
];
function App() {
  const [todoItems, setTodoItem] = useState(ItemTodo);
  const [inputTodo, setInputTodo] = useState("");

  function onDelete(todo) {
    setTodoItem((todoItems) =>
      todoItems.filter((todoItem) => todoItem.id !== todo)
    );
    console.log(todo);
  }
  function addTodo(todo) {
    setTodoItem((todoItems) => [...todoItems, todo]);
  }
  function handleDone(id) {
    setTodoItem((todoItems) =>
      todoItems.map((todoitem) =>
        todoitem.id === id
          ? { ...todoitem, condition: !todoitem.condition }
          : todoitem
      )
    );
  }

  return (
    <div className="container">
      <FormInput
        inputTodo={inputTodo}
        setInputTodo={setInputTodo}
        addTodo={addTodo}
      />

      <ItemList todoItems={todoItems} onDelete={onDelete} onDone={handleDone} />
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormInput({ inputTodo, setInputTodo, addTodo }) {
  function handleSubmit(e) {
    e.preventDefault();
    const id = new Date();
    const neTodo = {
      id,
      todo: inputTodo,
      status: false,
    };
    setInputTodo("");
    addTodo(neTodo);
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="descr">
        <label>description</label>
        <br></br>
        <input
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <Button className="button">Add</Button>
      </div>
    </form>
  );
}

function ItemList({ todoItems, onDelete, onDone }) {
  return todoItems.map((todo) => (
    <Item todoItem={todo} onDelete={onDelete} onDone={onDone} />
  ));
}
function Item({ todoItem, onDelete, onDone }) {
  return (
    <div className="input">
      <input
        type="checkbox"
        value={todoItem.condition}
        onChange={() => onDone(todoItem.id)}
      />
      <input
        value={todoItem.todo}
        className={todoItem.condition ? `todo line` : `todo`}
        type="text"
      />
      <button className="button" onClick={() => onDelete(todoItem.id)}>
        Delete
      </button>
    </div>
  );
}
export default App;
