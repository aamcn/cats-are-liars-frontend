import LogInForm from "./LogInForm";
import styles from "./css/landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.pageTitle}>
        <h1>Cats Are Liars</h1>
      </div>
      <div className={styles.formContainer}>
        <LogInForm />
      </div>
      <div className={styles.pageFooter}></div>
    </div>
  );
}

export default LandingPage;
