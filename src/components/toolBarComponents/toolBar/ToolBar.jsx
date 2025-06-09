import ToolBarButtons from "../toolBarButtons/ToolBarButtons.jsx";
import "./toolBar.scss"

function ToolBar({formToggle, formNames, toggleToolBar}){

    return(
        <div onClick={toggleToolBar} className="toolBar">
            {formNames.map(name => {
                return <button onClick={formToggle} value={name}>{name}</button>
            })}
        </div>
    )
}

export default ToolBar;