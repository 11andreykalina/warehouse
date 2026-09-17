import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { mockUser } from "@/shared/api/mock/users.mock";

import { setAuthenticated } from "@/shared/lib/auth";

export function AuthForm() {
  const navigate = useNavigate();

  const [badgeNumber, setBadgeNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (badgeNumber === mockUser.badgeNumber && password === "123456") {
      setAuthenticated();
      navigate("/");
      return;
    }
    console.log("Неверный номер жетона или пароль.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Exit</div>

      <input
        type="text"
        placeholder="Номер жетона"
        value={badgeNumber}
        onChange={(event) => setBadgeNumber(event.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Войти</button>
    </form>
  );
}
