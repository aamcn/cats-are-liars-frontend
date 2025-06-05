import "./footer.scss"

function Footer({ handleToggleDisplay }) {
  return(
       <div className="footerPanel">
        <button className="footerButton" onClick={handleToggleDisplay}>
          Add Feeding
        </button>
    </div>
  )
}

export default Footer;
