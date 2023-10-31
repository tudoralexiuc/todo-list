import React, { useState, createContext } from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/700.css';
import { TextField, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const initialGlobalState = {
  // count: 0,
  todo2: [],
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
  const { todo2 } = useGlobalState();
  const [newTodo, setNewTodo] = useState('');

  // create array that holds new items
  // const [todo, setTodo] = useState([]);

  // Create a function which mutates GlobalState
  // function incrementCount() {
  //   GlobalState.set({
  //     count: count + 1,
  //   });
  // }

  function addItem() {
    if (!newTodo) {
      return;
    }

    const item = {
      value: newTodo,
    };
    GlobalState.set({
      todo2: [...todo2, item],
    });

    // setTodo((oldTodo) => [...oldTodo, item]);

    setNewTodo('');
  }

  function deleteItem(id) {
    console.log(todo2);
    const newArray = todo2.splice(id, 1);
    GlobalState.set({
      todo2: newArray,
    });
  }

  return (
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
            add
          </Button>
        </div>
        <ul>
          {todo2.map((item, index) => {
            return (
              <Typography className="todo-text">
                <li key={index}>
                  {item.value}
                  <Button
                    variant="outlined"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={() => deleteItem(index)}
                    size="small"
                  >
                    delete
                  </Button>
                </li>
              </Typography>
            );
          })}
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default function ProofConcept() {
  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return <Global Root={() => <SomeComponent />} />;
}

// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;
