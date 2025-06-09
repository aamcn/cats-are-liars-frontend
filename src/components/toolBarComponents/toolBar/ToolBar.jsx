import ToolBarButtons from "../toolBarButtons/ToolBarButtons.jsx";
import "./toolBar.scss"

function ToolBar({formToggle, formNames}){

    return(
        <div className="toolBar">
            {formNames.map(name => {
                return <button onClick={formToggle} value={name}>{name}</button>
            })}
        </div>
    )
}

export default ToolBar;