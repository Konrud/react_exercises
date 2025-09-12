import { memo, useCallback, useState } from "react";
import "./ListsKeysMemoisation.css";
import type { Todo } from "../types/Todo";

/*
Practise:
* Rendering lists with unique keys.

* Seeing what happens if you use the wrong key.

* Preventing unnecessary re-renders with React.memo.
*/

function shuffleArr<T>(arr: T[]) {
  const tempArr = arr.slice();
  for (let i = tempArr.length - 1; i >= 0; i--) {
    const ranIndx = parseInt((Math.random() * (i + 1)).toString());
    const tempVal = tempArr[i];
    tempArr[i] = tempArr[ranIndx];
    tempArr[ranIndx] = tempVal;
  }
  return tempArr;
}

export interface TodoItemProps {
  todo: Todo;
  onRemoveClick: (todoId: string) => void;
  onComplete: (todoId: string, isComplete: boolean) => void;
}

export const TodoItem: React.FC<TodoItemProps> = memo(
  ({ todo, onRemoveClick, onComplete }) => {
    console.log(`\nRendering: ${todo.text}\n`);

    return (
      <li
        className={`c-todos-list__item${
          todo.isComplete ? " c-todos-list__item--complete" : ""
        }`}
      >
        <p>{todo.text}</p>
        <div>
          <button onClick={() => onRemoveClick(todo.id)}>Remove</button>
        </div>
        <div>
          <input
            type="checkbox"
            name="complete"
            aria-label="completed"
            checked={todo.isComplete}
            onChange={(e) => {
              onComplete(todo.id, e.currentTarget.checked);
            }}
          />
        </div>
      </li>
    );
  }
);

export const ListsKeysMemoisation: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return Array.from(
      { length: 3, 0: "Learn React", 1: "Practice TypeScript", 2: "Build something fun" },
      (value, key) => {
        return { id: key.toString(), text: value, isComplete: false };
      }
    );
  });

  const addTodo = useCallback(function addTodo() {
    setTodos((prevTodos) => {
      const maxId = Math.max(...prevTodos.map((item) => Number(item.id)), 0);
      const newTodoId = (maxId + 1).toString();

      return [
        ...prevTodos,
        { id: newTodoId, text: `New Todo ${newTodoId}`, isComplete: false },
      ];
    });
  }, []);

  const removeTodo = useCallback(function RemoveTodo(todoId: string) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todoItem) => todoItem.id !== todoId);
      return newTodos;
    });
  }, []);

  const shuffleTodos = useCallback(function shuffleTodos() {
    setTodos((prevTodos) => {
      const shuffledTodos = shuffleArr(prevTodos);
      return shuffledTodos;
    });
  }, []);

  const completeTodo = useCallback(function completeTodo(todoId: string, isComplete: boolean) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((item) => {
        if (item.id === todoId) {
          return { ...item, isComplete };
        }
        return item;
      });

      return newTodos;
    });
  }, []);

  return (
    <div className="l-todos-container">
      <h2 className="c-todos-container-title">Todos</h2>

      <div>
        <ul className="c-todos-list">
          {todos.map((todoData) => {
            return (
              <TodoItem
                key={todoData.id}
                todo={todoData}
                onRemoveClick={removeTodo}
                onComplete={completeTodo}
              />
            );
          })}
        </ul>
      </div>

      <hr />

      <div className="l-todos-container__buttons">
        <button onClick={addTodo} className="c-todo-button">
          Add Todo
        </button>

        <button onClick={shuffleTodos} className="c-todo-button">
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default ListsKeysMemoisation;
