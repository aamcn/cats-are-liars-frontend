import LogInForm from "./LogInForm";

function LandingPage() {

const t = localStorage.getItem("username").replaceAll('"', '')

    return(
        <div>
            <div>
                <h1>Cats Are Liars</h1>
                <LogInForm />
                {t && <p>Welcome back {t}</p>}
            </div>
        </div>
    )
}

export default LandingPage;