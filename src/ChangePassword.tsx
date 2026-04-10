import React, { useState } from "react";

export default function ChangePassword({ onClose }: any) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const submit = async () => {
    const token = localStorage.getItem("token");
    await fetch("https://localhost:7154/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        oldPassword: oldPass,
        newPassword: newPass
      })
    });

    onClose();
  };
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Change Password</h2>
        <input type="password" placeholder="Old" onChange={e => setOldPass(e.target.value)} />
        <input type="password" placeholder="New" onChange={e => setNewPass(e.target.value)} />
        <button onClick={submit}>Save</button>
      </div>
    </div>
  );
}