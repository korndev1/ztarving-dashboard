"use client";

import React, { useState } from "react";
import Loading from "../Loading";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../ChangeLanguage";
import { Colors } from "@/Constant/Colors";
import { authService } from "@/lib/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterClient() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      const body = {
        userName,
        password,
      };
      console.log(body);
      
      const response = await authService.registerAdmin(body);

      if (response.status == 200) {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } 
    } catch (err: any) {
      console.error("fetch user error", err.statusCode);
      if(err.statusCode == 400) {
        //handle error empty request
      } else if(err.statusCode == 401){
        //handle error already username
      }
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col">
      {loading && <Loading />}
      <div className="absolute right-[10px] top-[20px]">
        <ChangeLanguage />
      </div>

      <p style={{ color: Colors.primary }} className="text-[100px]">
        {t("register")}
      </p>

      <div
        style={{ backgroundColor: Colors.primary }}
        className="flex justify-center items-center p-5 w-100 h-60 rounded-[20px] flex-col "
      >
        <input
          style={{ color: Colors.white }}
          type="email"
          placeholder="Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white"
          required
        />
        <input
          style={{ color: Colors.white }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white mt-5"
          required
        />
      </div>
      <button
        style={{ backgroundColor: Colors.primary }}
        className="bg-white w-100 mt-5 p-5 rounded-[10px]"
        onClick={() => handleRegister()}
      >
        {t("register")}
      </button>
    </div>
  );
}
