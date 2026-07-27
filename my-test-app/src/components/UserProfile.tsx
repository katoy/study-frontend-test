import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div role="alert">Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div data-testid="user-profile">
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
