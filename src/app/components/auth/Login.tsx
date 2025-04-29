"use client";

import { useTranslation } from "react-i18next";
import ChangeLanguage from "@/app/components/ChangeLanguage";
import { Colors } from "@/Constant/Colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService, loginAdmin } from "@/lib/services/authService";
import Loading from "../Loading";
import Modal from "../Modal";
import { ACCESS_TOKEN } from "@/Constant/localStorage";

export default function LoginClient() {
  const { t } = useTranslation();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const body = {
        userName,
        password,
      };
      const response = await authService.loginAdmin(body);

      if (response.statusCode == 200) {
        const token = response.access_token
        localStorage.setItem(ACCESS_TOKEN,token)

        setTimeout(() => {
          router.push("/users");
          setLoading(false)          

        }, 1500);
      } else if(response.statusCode == 403) {
        setError(true)
        setLoading(false)
      }else if(response.statusCode == 400) {
        setError(true)
        setLoading(false)
      }
    } catch (err: any) {
      console.error("fetch user error", err);
      setLoading(false);
      setError(true);
      setTextError(err.message || "Something went wrong");
      // setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col">
      {loading && <Loading />}
      <div className="absolute right-[10px] top-[20px]">
        <ChangeLanguage />
      </div>

      <p style={{ color: Colors.primary }} className="text-[100px]">
        {t("login")}
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
        onClick={() => handleLogin()}
      >
        {t("login")}
      </button>
      <button
        style={{ color: Colors.primary }}
        className="bg-white w-100 mt-1"
        onClick={() => router.push('/register')}
      >
        {t("register")}
      </button>
      <Modal isOpen={error} onClose={() => setError(false)}>
        <h2 className="text-xl font-bold mb-4 text-red-500">
          {userName === "" &&
            password === "" &&
            "Username and Password is Empty"}
          {userName !== "" && password !== "" && "Something went wrong"}
          {userName === "" && password !== "" && t("username_empty")}
          {password == "" && userName !== "" && t("password_empty")}
        </h2>
        <p className="mb-4 text-red-500">
          {userName === "" &&
            password === "" &&
            "Please input username and password"}
          {userName !== "" &&
            password !== "" &&
            "Username and Password are wrong \nplease check and type again"}
          {userName === "" && password !== "" && t("username_empty_desc")}
          {password == "" && userName !== "" && t("password_empty_desc")}
        </p>
        <button
        style={{backgroundColor:Colors.primary}}
          onClick={() => setError(false)}
          className="text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
