import React, { useState, createContext } from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/700.css';
import { Checkbox, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const initialGlobalState = {
  // count: 0,
  items: [],
};

// Create a Context for the (global) State
const GlobalState = createContext();

class Global extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial (global) State
    this.state = {
      globals: initialGlobalState || {},
    };
  }

  // Expose the setGlobals function to the Globals object
  componentDidMount() {
    GlobalState.set = this.setGlobalState;
  }

  setGlobalState = (data = {}) => {
    const { globals } = this.state;

    // Loop over the data items by key, only updating those which have changed
    Object.keys(data).forEach((key) => {
      globals[key] = data[key];
    });

    // Update the state with the new State
    this.setState(globals);
  };

  render() {
    const { globals } = this.state;
    const { Root } = this.props;

    return (
      // Pass the current value of GlobalState, based on this components' State, down
      <GlobalState.Provider value={globals}>
        <Root />
      </GlobalState.Provider>
    );
  }
}

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);

// Create an example component which both renders and modifies the GlobalState
function SomeComponent() {
  // const { count } = useGlobalState();
  const { items } = useGlobalState();
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // create array that holds new items
  // const [todo, setTodo] = useState([]);

  // Create a function which mutates GlobalState
  // function incrementCount() {
  //   GlobalState.set({
  //     count: count + 1,
  //   });
  // }

  // add item
  function addItem() {
    if (!newTodo) {
      return;
    }
    setEditing(false);

    const item = {
      value: newTodo,
      completed: false,
    };
    GlobalState.set({
      items: [...items, item],
    });

    // setTodo((oldTodo) => [...oldTodo, item]);

    setNewTodo('');
  }

  // delete item
  function deleteItem(id) {
    console.log(items);
    const newArray = items.filter((item) => items.indexOf(item) !== id);
    GlobalState.set({
      items: newArray,
    });
  }

  // edit item
  function handleEdit(id) {
    setEditing(true);
    const filteredItems = items.filter((item) => items.indexOf(item) !== id);
    const selectedItem = items.find((item) => items.indexOf(item) === id);
    // const selectedItem = items.find((item) => items.indexOf(item) === id);
    GlobalState.set({
      items: filteredItems,
    });
    setNewTodo(selectedItem.value);
  }

  function handleCheck(id) {
    GlobalState.set({
      items: items.map((item) => {
        if (items.indexOf(item) !== id) {
          return item;
        } else {
          return {
            ...item,
            completed: !item.completed,
          };
        }
      }),
    });
  }

  return (
    <div>
      <div className="pages">
        <Link to="/">
          <Button variant="contained" className="page-button">
            <Typography className="page-font">todo list</Typography>
          </Button>
        </Link>
        <Link to="/newpage1">
          <Button variant="contained" className="page-button">
            <Typography className="page-font">new page 1</Typography>
          </Button>
        </Link>
        <Link to="/newpage2">
          <Button variant="contained" className="page-button">
            <Typography className="page-font">new page 2</Typography>
          </Button>
        </Link>
        <Link to="/newpage3">
          <Button variant="contained" className="page-button">
            <Typography className="page-font">new page 3</Typography>
          </Button>
        </Link>
      </div>
      <div className="wrapper">
        <div></div>
        <div className="">
          {/* <div onClick={incrementCount}>{count}</div> */}
          <Typography variant="h2" className="todo-title">
            todo list
          </Typography>
          <div className="todo-add-items">
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              type="text"
              placeholder="Add an item..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button variant="contained" onClick={() => addItem()}>
              {editing ? 'update' : 'add'}
            </Button>
          </div>
          <ul>
            {items.map((item, index) => {
              return (
                <Typography key={index} className="todo-text">
                  <li>
                    <div className="todo-tasks">
                      <Checkbox
                        checked={item.completed}
                        onChange={() => handleCheck(index)}
                        {...label}
                      />
                      <span
                        style={
                          item.completed
                            ? { textDecoration: 'line-through' }
                            : {}
                        }
                      >
                        {item.value}
                      </span>
                    </div>
                    <div className="interactButtons">
                      <Button
                        variant="contained"
                        className="editButton"
                        disabled={editing}
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(index)}
                        size="small"
                      >
                        edit
                      </Button>
                      <Button
                        variant="contained"
                        className="deleteButton"
                        disabled={editing}
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteItem(index)}
                        size="small"
                      >
                        delete
                      </Button>
                    </div>
                  </li>
                </Typography>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default function ProofConcept() {
  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return <Global Root={() => <SomeComponent />} />;
}

// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;
