import React from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';

function FormTab() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}, Description: ${description}`);
  };

  return (
    <Box 
      border={1} 
      borderRadius={4} 
      borderColor="grey.400" 
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
