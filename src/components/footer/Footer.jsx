import { useState } from "react";
import ToolBar from "../toolBarComponents/toolBar/ToolBar";
import "./footer.scss";
import PawIcon from "../../assets/svg/paw.svg?react";


function Footer({ formToggle, formNames }) {
  const [IsToolBarHidden, setIsToolBarHidden] = useState(true);

  const toggleToolBar = () => {
    IsToolBarHidden == true
      ? setIsToolBarHidden(false)
      : setIsToolBarHidden(true);
  };

  return (
    <div className="footerPanel">
      
      <button className="toolBarToggleButton" onClick={toggleToolBar}><PawIcon height="7vh" width="7vh" /></button>
      {!IsToolBarHidden && (
        <ToolBar
          formNames={formNames}
          toggleToolBar={toggleToolBar}
          formToggle={formToggle}
        />
      )}
    </div>
  );
}

export default Footer;
