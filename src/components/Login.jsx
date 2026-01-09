import React, { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

// 引入 icon
import { UserPlusIcon, LightBulbIcon } from "@heroicons/react/24/outline";

// 引入 toast
import { toast } from "react-toastify";

// 引入 utilities
import { createUser, verifyInput, preExisting } from "../utilities";

import { ReactComponent as LoginCover } from "../assets/login_cover.svg";

// --- 底下開始撰寫 ---

export default function Login() {
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  // action 移動到自己的組件做，因為無法內聯 POST
  // 處理新增帳戶
  function handelSubmit(e) {
    e.preventDefault(); // 避免表單提交刷新頁面
    const result = verifyInput(nameRef.current.value, emailRef.current.value);

    if (result.nameErrorMsg === null && result.mailErrorMsg === null) {
      createUser(nameRef.current.value);
      navigate("/");
      return toast.success(`${nameRef.current.value} 歡迎使用！`);
    } else {
      setNameMsg(result.nameErrorMsg);
      setEmailMsg(result.mailErrorMsg);
    }
  }

  // 處理新增範本
  function handleClick() {
    preExisting();
    navigate("/");
    return toast.success("Charlie 歡迎使用！");
  }

  return (
    <section className="flex-1 relative flex justify-end h-full px-48">
      <div className="">
        <div className="mb-8 w-[420px] space-y-8">
          <div className="flex flex-col gap-y-3 text-6xl mt-12 mb-4 font-bold whitespace-nowrap">
            <h1 className="text-gray-800">你還在煩惱如何</h1>
            <h1 className="text-primary">管理金錢？</h1>
          </div>

          <p className="text-xl text-gray-500">
            一步一步帶你開始記帳存錢，在下方輸入基本資料就開始吧！
          </p>
        </div>

        <Form method="post" onSubmit={handelSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex gap-4 items-center">
                <label
                  htmlFor=""
                  className="text-base whitespace-nowrap"
                >
                  你的名字
                </label>
                <input
                  type="text"
                  name="userName"
                  ref={nameRef}
                  className="input-primary"
                />
              </div>
              <p className="ml-20 text-warning text-sm">{nameMsg}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-4 items-center">
                <label
                  htmlFor=""
                  className="text-base whitespace-nowrap"
                >
                  你的信箱
                </label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  className="input-primary"
                />
              </div>
              <p className="ml-20 text-warning text-sm">{emailMsg}</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClick}
                className="btn-primary-gradient flex items-center gap-1 w-auto self-center"
                type="button"
              >
                <span>範本</span>
                <LightBulbIcon width={24} />
              </button>
              <button
                className="btn-primary-gradient flex items-center gap-1 w-auto self-center"
                type="submit"
              >
                <span>新增帳戶</span>
                <UserPlusIcon width={24} />
              </button>
            </div>
          </div>
        </Form>
      </div>

      <div className="absolute -bottom-12 -left-12 w-full max-w-[400px] overflow-hidden">
        <LoginCover className="w-full h-auto block" />
      </div>
    </section>
  );
}
