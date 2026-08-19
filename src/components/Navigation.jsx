import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      justifyContent: "center",
      borderBottom: "1px solid #ddd",
      flexWrap: "wrap"
    }}>
      <Link to="/">Home</Link>
      <Link to="/child-profile">Child Profile</Link>
      <Link to="/speech-assessment">Speech Assessment</Link>
      <Link to="/ai-stories">AI Stories</Link>
      <Link to="/ai-songs">AI Songs</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/health">Health</Link>
    </nav>
  );
}