import LogInForm from "./LogInForm";
import styles from "./css/landingPage.module.css"


function LandingPage() {
  const username = localStorage.getItem("username");

  return (
      <div className={styles.landingPageContainer}>
        <h1 className={styles.pageTitle}>Cats Are Liars</h1>
        {username && <h3 className={styles.welcomeMessage}>Welcome back {username}</h3>}
        <LogInForm />
        
      </div>
    
  );
}

export default LandingPage;
