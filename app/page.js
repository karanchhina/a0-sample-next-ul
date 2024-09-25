'use client'

import { useState, useEffect } from "react";

export default function Home() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch(`/api/auth/me`);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setUser(data.user);
      } else {
        console.error('Not authenticated');
      }
    };

    fetchSession();
  }, []);


  return (
    <div className="flex flex-col p-5 text-2xl gap-4">
      {user ?
        <>
          <p> Hello, {user} </p>
          <p> <a href="/api/auth/logout" className="text-blue-600 hover:underline">Logout</a> </p>
        </>
        :
        <>
          <p> Hello, Stranger </p>
        <p> <a href="/api/auth/login" className="text-blue-600 hover:underline">Login</a> </p>
        </>
      }
    </div>
  );
}
