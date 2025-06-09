import { useState } from "react";
import ToolBar from "../toolBarComponents/toolBar/ToolBar";
import "./footer.scss"

function Footer() {
const [IsToolBarHidden, setIsToolBarHidden] = useState(true)


  const toggleToolBar = () => {
    IsToolBarHidden == true ? setIsToolBarHidden(false) : setIsToolBarHidden(true)
  }


  return(
      <div className="footerPanel">
        <button onClick={toggleToolBar}>Tool Bar</button>
        {!IsToolBarHidden && <ToolBar />}
      </div>
  )
}

export default Footer;
