import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🤖 Smart ATS
      </div>

      <div className="nav-links">
        <span>Dashboard</span>
        <span>Resume Analyzer</span>
        <span>Reports</span>
      </div>
    </nav>
  );
}

export default Navbar;