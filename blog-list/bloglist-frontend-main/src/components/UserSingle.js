import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
const UserSingle = () => {
  const users = useSelector(state => state.allUser)
  const id = useParams().id
  const user = users.find(x => x.id === id)

  if(!user){
    return null
  }
  return(
    <div>
      <h2>{user.name}</h2>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
};

export default UserSingle;
