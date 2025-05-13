import LogInForm from "./LogInForm";
import styles from "./css/landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPageContainer}>
      <h1 className={styles.pageTitle}>Cats Are Liars</h1>
      <div className={styles.formContainer}>
        <LogInForm />
      </div>
      <div className={styles.pageFooter}>
      </div>
    </div>
  );
}

export default LandingPage;
