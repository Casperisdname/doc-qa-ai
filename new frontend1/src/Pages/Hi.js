import { useRef, useState } from "react";
import frame from "../images/Frame11.png";

const BACKEND_URL = "https://doc-qa-ai-2.onrender.com"; // updated backend link

function Hi() {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    const question = prompt("Enter your question");
    if (!question) return;

    const formData = new FormData();
    formData.append("question", question);

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.answer || "No answer found");
    } catch (err) {
      console.error(err);
      alert("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="hi"
      id="upload"
      style={{ textAlign: "center", padding: "50px 20px" }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="frame" style={{ marginBottom: "20px" }}>
        <img
          src={frame}
          alt="Upload Frame"
          style={{ cursor: "pointer", maxWidth: "300px" }}
          onClick={handleClick}
        />
      </div>

      <p style={{ color: "white", fontSize: "18px" }}>
        Ask a question about your document
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "15px 50px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            minWidth: "140px",
          }}
        >
          {loading ? "Processing..." : "Ask AI"}
        </button>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "15px 50px", // SAME AS Ask AI
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            minWidth: "140px",
          }}
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>

      {response && (
        <div
          className="output-card"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "20px",
            borderRadius: "20px",
            maxWidth: "700px",
            margin: "30px auto 0",
            textAlign: "left",
            wordBreak: "break-word",
          }}
        >
          <strong>Answer:</strong>
          <p style={{ marginTop: "10px" }}>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Hi;
