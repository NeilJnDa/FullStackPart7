import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const errorFlag = useSelector((state) => state.notification.isError);
  if (message === "") {
    return null;
  } else if (errorFlag) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="notification">{message}</div>;
  }
};
export default Notification;
