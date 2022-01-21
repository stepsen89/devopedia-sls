import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthNav from "./AuthNav";

export default function Header() {
  return (
    <div className='flex justify-end p-6 md:justify-end md:space-x-10'>
      <AuthNav />
    </div>
  );
}
