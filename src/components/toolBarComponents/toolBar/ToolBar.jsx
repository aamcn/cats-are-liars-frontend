import "./toolBar.scss";

function ToolBar({ formToggle, formNames, toggleToolBar }) {
  return (
    <div onClick={toggleToolBar} className="toolBar" data-testid="tool-bar-container">
      {formNames.map((name) => {
        return (
          <button className="formToggleButton" onClick={formToggle} value={name} key={name}>
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default ToolBar;
