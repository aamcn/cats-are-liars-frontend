import "./toolBar.scss";

function ToolBar({ formToggle, formNames, toggleToolBar }) {
  return (
    <div onClick={toggleToolBar} className="toolBar">
      {formNames.map((name) => {
        return (
          <button className="formToggleButton" onClick={formToggle} value={name}>
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default ToolBar;
