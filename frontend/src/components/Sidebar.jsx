import "./Sidebar.css";

function Sidebar({
  scrollToTop,
  scrollToUpload,
  scrollToReport,
  scrollToSuggestions,
  scrollToInterview,
  scrollToSettings,
}) {

  const menu = [
    {
      icon: "📊",
      title: "Dashboard",
      action: scrollToTop,
    },
    {
      icon: "📄",
      title: "Resume Analysis",
      action: scrollToUpload,
    },
    {
      icon: "📈",
      title: "ATS Report",
      action: scrollToReport,
    },
    {
      icon: "💡",
      title: "Suggestions",
      action: scrollToSuggestions,
    },
    {
      icon: "🎯",
      title: "Interview",
      action: scrollToInterview,
    },
    {
      icon: "⚙️",
      title: "Settings",
      action: scrollToSettings,
    },
  ];

  return (
    <aside className="sidebar">

      <div
        className="sidebar-logo"
        onClick={scrollToTop}
      >
        🤖 Smart ATS
      </div>

      <ul className="sidebar-menu">

        {menu.map((item) => (

          <li
            key={item.title}
            onClick={item.action}
          >

            <span>{item.icon}</span>

            <span>{item.title}</span>

          </li>

        ))}

      </ul>

      <div className="sidebar-footer">
        AI Resume Analyzer v1.0
      </div>

    </aside>
  );
}

export default Sidebar;