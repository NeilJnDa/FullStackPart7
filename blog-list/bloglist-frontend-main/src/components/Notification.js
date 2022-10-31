import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const errorFlag = useSelector((state) => state.notification.isError);
  if (message === "") {
    return null;
  } else if (errorFlag) {
    //return <div className="error">{message}</div>;
    return <Alert variant='warning'>{message}</Alert>
  } else {
    //return <div className="notification">{message}</div>;
    return <Alert variant="primary">{message}</Alert>

  }
};
export default Notification;
