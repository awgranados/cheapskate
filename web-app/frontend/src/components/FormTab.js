import React from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import './FormTab.css';

function FormTab() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, description };
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/postForm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.text();
    console.log(responseJson);
  };
  

  return (
    <Box 
      className="form-tab-container"
      border={1} 
      borderRadius={4} 
      borderColor="gray" 
      p={2} 
      textAlign="left"
    >
      <Typography variant="h5" gutterBottom>
        Create a new post
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
        <TextField
          label="Description (optional)"
          value={description}
          onChange={handleDescriptionChange}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Box>
  );
}

export default FormTab;


