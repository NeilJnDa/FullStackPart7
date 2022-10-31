import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
// Usage:
//      const ref = useRef()
//      <Toggle buttonLabel = 'XX' ref = {ref}> <YYY> </Toggle>
//      ...
//      ref.current.toggleVisiblity()
// A toggle button to opotionally display content
// The content YYY can be accessed by {props.children}
// toggleVisibility() function exposed to parent.

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { marginTop: 5, display: visible ? "none" : "" };
  const showWhenVisible = { marginTop: 5, display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  //Customize value exposes to parent
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn btn-primary" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn btn-light" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});
Toggle.displayName = "Toggle";
Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Toggle;
