import LogInForm from "../logInForm/LogInForm.jsx";
import PageTitle from "../pageTItle/PageTItle.jsx";
import "./landingPage.scss";

function LandingPage() {
  return (
    <div className="landingPageContainer" data-testid="landing-page-container">
      <PageTitle title="Cats Are Liars" />
      <LogInForm />
      <div className="pageFooter"></div>
    </div>
  );
}

export default LandingPage;
