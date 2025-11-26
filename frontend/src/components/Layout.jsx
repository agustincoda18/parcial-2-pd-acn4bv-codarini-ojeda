import Navbar from "./Navbar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">{children}</main>
    </div>
  );
}
