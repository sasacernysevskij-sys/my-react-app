import React, { useState } from "react";
export default function Authorize({ onLoginSuccess, onClose }: any) {
  const [mode, setMode] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [born, setBorn] = useState("");
  const submit = async () => {
    const url =
      mode === "login"
        ? "https://localhost:7154/api/auth/login"
        : "https://localhost:7154/api/auth/register";
    const body =
      mode === "login"
        ? { userName, password }
        : { userName, password, userBornDate: born };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      alert("Error");
      return;
    }
    const data = await res.json();
    if (mode === "login") {
      localStorage.setItem("token", data.token);
      onLoginSuccess(data.userName);
    }
    onClose();
  };
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>{mode}</h2>
        <input placeholder="User" onChange={e => setUserName(e.target.value)} />
        <input type="password" placeholder="Pass" onChange={e => setPassword(e.target.value)} />
        {mode === "register" && (
          <input type="date" onChange={e => setBorn(e.target.value)} />
        )}
        <button onClick={submit}>Submit</button>
        <p onClick={() => setMode(mode === "login" ? "register" : "login")}>
          Switch
        </p>
      </div>
    </div>
  );
}