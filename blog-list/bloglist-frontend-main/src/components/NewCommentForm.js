import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"
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
            <form onSubmit={AddComment}>
                <input 
                    name="comment"
                    type="text"
                    value={input}
                    onChange={({ target }) => setInput(target.value)}
                    placeholder="Your comment here"
                />
            <button type="submit">Add comment</button>
        </form>
        </div>
    )
}

export default NewCommentForm