
import "./logInMenu.scss";
import LoginButton from "./LoginButton";
import UserDisplay from "./userDisplay/UserDisplay";

function LogInMenu() {
  
  return (
    <div className="logInMenuContainer" data-testid="log-in-menu-container">
      <div className="logInMenu">
        <UserDisplay />
        <LoginButton />
    </div>
      
    </div>
  );
}
export default LogInMenu;
