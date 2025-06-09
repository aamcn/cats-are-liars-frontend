import ToolBarButtons from "../toolBarButtons/ToolBarButtons.jsx";
import "./toolBar.scss"

function ToolBar({}){

    return(
        <div className="toolBar">
            <ToolBarButtons  buttonText="Add Feeding"/>
            <ToolBarButtons  buttonText="Add Cat"/>
            <ToolBarButtons  buttonText="Add Feeder"/>
            <ToolBarButtons  buttonText="Update Cat"/>
        </div>
    )
}

export default ToolBar;