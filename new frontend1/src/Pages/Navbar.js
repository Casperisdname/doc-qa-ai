import q from "../images/Q&A Ss.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={q} />
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#who">For Who</a>
        <a href="#how">How it Works</a>
        <a href="#hero">Documentation</a>
      </div>
      <div className="nav-btn">
        <button>
          <a href="#upload" style={{ color: "white", textDecoration: "none" }}>
            Upload Docs
          </a>
        </button>
      </div>
    </div>
  );
}
export default Navbar;
