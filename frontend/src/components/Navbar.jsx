import "./Navbar.css";

function Navbar({
  scrollToTop,
  scrollToUpload,
  scrollToReport,
}) {
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
      </div>
    </nav>
  );
}

export default Navbar;