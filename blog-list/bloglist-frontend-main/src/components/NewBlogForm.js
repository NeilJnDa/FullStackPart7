import { useState } from "react";
import {Form, Button, FormGroup, FormLabel } from "react-bootstrap"

const NewBlogForm = ({ createNewBlog }) => {
  //Create new
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleCreateNew = (event) => {
    event.preventDefault();
    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <div>
      <h2>Create New</h2>
      <Form onSubmit={handleCreateNew}>
        <FormGroup>
          <FormLabel>Title:</FormLabel>
          <Form.Control
            name="Title"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="Blog Title"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Author:</FormLabel>
          <Form.Control
            name="Author"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="Name"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Url:</FormLabel>
          <Form.Control
            name="Url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="http://...."
          />
        </FormGroup>
        <Button variant='primary' type="submit">Create</Button>
      </Form>
    </div>
  );
};
export default NewBlogForm;
