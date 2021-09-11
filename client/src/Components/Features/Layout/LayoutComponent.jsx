import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/actions/userActions";
import Login from "../../Pages/Login/LoginComponent";
import Footer from "../Footer/FooterComponent";
import Header from "../Header/HeaderComponent";

const Layout = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
   if (token) dispatch(getUser());
  }, []);
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "./";
  };

  return (
    <div>
      <button className="btn" onClick={() => logout()}>
        logout
      </button>
      <Header />
      {localStorage.getItem("jwtToken") ? (
        children
      ) : (
        <Login errors={user.errors} />
      )}
      <Footer />
    </div>
  );
};
export default Layout;
