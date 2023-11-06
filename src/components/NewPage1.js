import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NewPage1() {
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
      <Typography variant="h2" className="todo-title">
        New Page 1
      </Typography>
    </div>
  );
}

export default NewPage1;
