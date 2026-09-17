import { useState } from "react";
import { mockUser } from '@/shared/api/mock/users.mock';

export function AuthForm() {
  const [badgeNumber, setBadgeNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (badgeNumber === mockUser.badgeNumber && password === "123456") {
        console.log("Авторизация прошла успешно!");
         return;
    }
   console.log("Неверный номер жетона или пароль.");
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