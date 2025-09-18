import LogInMenu from "../logInForm/LogInMenu.jsx";
import PageTitle from "../pageTItle/PageTItle.jsx";
import "./landingPage.scss";

function LandingPage() {
  return (
    <div className="landingPageContainer" data-testid="landing-page-container">
      <PageTitle title="Cats Are Liars" />
      <LogInMenu />
      <div className="pageFooter"></div>
    </div>
  );
}

export default LandingPage;
