import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"
import {Form, Button, FormControl } from "react-bootstrap"
import InputGroup from "react-bootstrap/InputGroup";

const NewCommentForm = ({blog})=>{
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const AddComment = (event) =>{   
        event.preventDefault()
        dispatch(addComment({blog, comment: input}))
        setInput("")
    }
    return(
        <div>
            <Form onSubmit={AddComment}>
                <InputGroup>
                    <FormControl
                        name="comment"
                        type="text"
                        value={input}
                        onChange={({ target }) => setInput(target.value)}
                        placeholder="Your comment here"
                    />
                    <Button variant="primary" type="submit">Add comment</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default NewCommentForm