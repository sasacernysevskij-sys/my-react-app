// src/components/Authorize.tsx
import React, { useState } from "react";
interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string, bornDate: string) => void;
}

const Authorize: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bornDate, setBornDate] = useState("");

  const handleSubmit = () => {
    if (mode === "login") onLogin(username, password);
    else onRegister(username, password, bornDate);
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>Авторизация</button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setOpen(false)}>✖</button>
            <div className="mode-switch">
              <button onClick={() => setMode("login")}>Login</button>
              <button onClick={() => setMode("register")}>Register</button>
            </div>
            <div className="auth-form">
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {mode === "register" && (
                <input 
                  type="date" 
                  placeholder="Birth Date" 
                  value={bornDate} 
                  onChange={(e) => setBornDate(e.target.value)} 
                />
              )}
              <button onClick={handleSubmit}>{mode === "login" ? "Login" : "Register"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authorize;