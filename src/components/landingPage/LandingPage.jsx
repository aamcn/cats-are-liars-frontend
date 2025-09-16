import LogInForm from "../logInForm/LogInForm.jsx";
import "./landingPage.scss";

function LandingPage() {
  return (
    <div className="landingPageContainer" data-testid="landing-page-container">
      <div className="main-title-container">
        <h1 className="main-title" aria-label="Cats Are Liars">
          Cats Are Liars
        </h1>
      </div>
      <LogInForm />
      <div className="pageFooter"></div>
    </div>
  );
}

export default LandingPage;
