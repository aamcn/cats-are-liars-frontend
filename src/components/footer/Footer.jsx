import { useState } from "react";
import ToolBar from "../toolBarComponents/toolBar/ToolBar";
import "./footer.scss"

function Footer({ formToggle, formNames }) {
const [IsToolBarHidden, setIsToolBarHidden] = useState(true)


  const toggleToolBar = () => {
    IsToolBarHidden == true ? setIsToolBarHidden(false) : setIsToolBarHidden(true)
  }

  return(
      <div className="footerPanel">
        <button onClick={toggleToolBar}>Tool Bar</button>
        {!IsToolBarHidden && <ToolBar formNames={formNames} toggleToolBar={toggleToolBar} formToggle={formToggle}/>}
      </div>
  )
}

export default Footer;
