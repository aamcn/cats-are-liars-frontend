import "./logInMenu.scss";
import LoginButton from "../loginButton/LoginButton";
import LoggedInUserMessage from "../loggedInUserMessage/LoggedInUserMessage";
import LogoutButton from "../../navbar/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function LogInMenu() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="logInMenuContainer" data-testid="log-in-menu-container">
      <div className="logInMenu">
        {isAuthenticated && <LoggedInUserMessage />}
        {!isAuthenticated && (
          <div className="generic-welcome-container">
            <div className="generic-welcome-title-container">
              <h2 className="generic-welcome-title">Welcome</h2>
            </div>
            <p className="login-prompt">Please log in or sign up to continue</p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}
export default LogInMenu;
