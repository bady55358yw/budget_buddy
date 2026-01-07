import { Outlet, useLoaderData } from "react-router-dom";

// 引入 utilities
import { fetchData } from "../utilities";

// 引入一般組件
import Nav from "../components/Nav";
import Login from "../components/Login";

// --- 底下開始撰寫 ---

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();

  return (
    <div
      id="layout"
      className="relative px-12 pb-12 flex flex-col min-h-screen h-full"
    >
      {/* Header bg */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/header_bg.png`}
        alt="header_bg"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw]"
      />

      <Nav userName={userName} />

      {userName ? (
        <main className="flex flex-col mt-12 space-y-40 flex-1">
          <Outlet />
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
}
