"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function Home() {
  const {data: session} = authClient.useSession.get();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onError: () => {
        window.alert("Something went wrong");
      },
      onSuccess: () => {
        window.alert("Sign up successful");
      }
    })
  }

  const onLogin = async () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong");
      },
      onSuccess: () => {
        window.alert("Sign up successful");
      }
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged In as {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>

      </div>
    )
  }


  return (
    <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-4 gap-y-4 p-4">
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <Button onClick={onLogin}>Login</Button>
        </div>
        <div className="flex flex-col gap-4 gap-y-4 p-4">
          <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <Button onClick={onSubmit}>Create User</Button>
        </div>
    </div>
  );
}
