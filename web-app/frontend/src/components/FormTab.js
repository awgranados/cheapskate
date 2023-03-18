import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import './FormTab.css';
import { useAuth0 } from "@auth0/auth0-react";

function FormTab() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [lists, setLists] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const userID = user.sub.split("|")[1];
  // const userID = "63f009188b72c75ea17fee76";
  console.log(userID);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLists();
    }
  }, [isAuthenticated]);

  const fetchLists = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lists/${encodeURIComponent(userID)}`);
    const data = await response.json();
    console.log(data);
    setLists(data);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedList) {
      alert('Please select a list');
      return;
    }
    const selectedListItem = lists.find(list => list.list === selectedList);
    const items = { title: title, desc: description, selectedList: selectedListItem._id };
    console.log("Data to be posted: ", items);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/postForm/${encodeURIComponent(userID)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });
    const responseJson = await response.text();
    setTitle('');
    setDescription('');
    setSelectedList('');
  };
  

  if (isAuthenticated){
    return(
      <Box
      className="form-tab-container"
      border={1}
      borderRadius={4}
      borderColor="gray"
      p={2}
      textAlign="left"
    >
      <Typography variant="h5" gutterBottom>
        Add a New Game
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Select
          labelId="list-select-label"
          id="list-select"
          value={selectedList}
          onChange={handleListChange}
          displayEmpty
          className="list-select"
          fullWidth
          margin="normal"
          variant="outlined"

        >
          <MenuItem value="" enabled>
            Select List
          </MenuItem>
          {lists.map((list) => {
            return (
              <MenuItem key={list._id} value={list.list}>
                {list.list}
              </MenuItem>
            );
          })}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Box>
    );
  }
  return (
    <div>
      Log in. Now.
    </div>
  );
}

export default FormTab;
