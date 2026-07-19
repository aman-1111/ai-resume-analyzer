import "./Sidebar.css";

function Sidebar() {
  const menu = [
    { icon: "📊", title: "Dashboard" },
    { icon: "📄", title: "Resume Analysis" },
    { icon: "📈", title: "ATS Report" },
    { icon: "💡", title: "Suggestions" },
    { icon: "🎯", title: "Interview" },
    { icon: "⚙️", title: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🤖 Smart ATS
      </div>

      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li key={item.title}>
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