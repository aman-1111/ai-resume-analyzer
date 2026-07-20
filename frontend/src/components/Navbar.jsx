import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Navbar({
  scrollToTop,
  scrollToUpload,
  scrollToReport,
}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={scrollToTop}
      >
        🤖 Smart ATS
      </div>

      <div className="nav-links">

        <span onClick={scrollToTop}>
          Dashboard
        </span>

        <span onClick={scrollToUpload}>
          Resume Analyzer
        </span>

        <span onClick={scrollToReport}>
          Reports
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;