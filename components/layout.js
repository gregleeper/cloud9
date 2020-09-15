import Nav from "./nav";
import useAmplifyAuth from "../lib/useAmplifyAuth";

const Layout = ({ children }) => {
  const amplifyUser = useAmplifyAuth();

  return (
    <div>
      <Nav
        user={amplifyUser.state.user}
        isManager={amplifyUser.state.isManager}
        isStaff={amplifyUser.state.isStaff}
      />
      <div className="bg-food min-h-screen px-24"> {children}</div>
    </div>
  );
};

export default Layout;
