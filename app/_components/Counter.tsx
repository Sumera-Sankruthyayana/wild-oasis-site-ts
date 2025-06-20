"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
}

export default function Counter({ users }: { users: User[] }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
