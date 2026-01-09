import React from "react";
import { Link, Form } from "react-router-dom";

// 引入 icon
import { UserMinusIcon } from "@heroicons/react/24/outline";

// --- 底下開始撰寫 ---

export default function Nav(props) {
  const { userName } = props;

  function checkDeleteUser(e) {
    if (!window.confirm("確定要刪除使用者？")) {
      e.preventDefault();
    }
  }

  return (
    <nav id="navbar" className=" flex justify-between py-6">
      <Link
        to="/"
        className="text-lightAccent1 flex items-center gap-1 group z-20"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
          alt="logo"
          width={32}
        />
        <span className="text-xl text-gray-900 font-semibold">Buddy Budget</span>
      </Link>

      {userName && (
        <Form method="post" action="/logout" onSubmit={checkDeleteUser}>
          <button
            id="deleteUserBtn"
            className="btn-warning-lighter items-center gap-1"
          >
            <span>刪除帳戶</span>
            <UserMinusIcon width={18} />
          </button>
        </Form>
      )}
    </nav>
  );
}
