import LogInForm from "./LogInForm";

function LandingPage() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <div>
        <h1>Cats Are Liars</h1>
        <LogInForm />
        {username && <p>Welcome back {username}</p>}
      </div>
    </div>
  );
}

export default LandingPage;
