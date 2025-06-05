import LogInForm from "../logInForm/LogInForm.jsx";
import "./landingPage.scss";

function LandingPage() {
  return (
    <div className="landingPageContainer">
      <div className="pageTitle">
        <h1>Cats Are Liars</h1>
      </div>
      <div className="logInFormContainer">
        <LogInForm />
      </div>
      <div className="pageFooter"></div>
    </div>
  );
}

export default LandingPage;
