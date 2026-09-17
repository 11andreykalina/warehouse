import { useState } from "react";

export function AuthForm() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Badge Number:", badgeNumber, "Password:", password);
  };


return (
    <form onSubmit={handleSubmit}>
        <div>Exit</div>

        <input
            type="text"
            placeholder="Badge Number"
            value={badgeNumber}
            onChange={(event) => setBadgeNumber(event.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Войти</button>
    </form>
);
}