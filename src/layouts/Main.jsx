import { Outlet, useLoaderData } from "react-router-dom";

// 引入 utilities
import { fetchData } from "../utilities";

// 引入一般組件
import Nav from "../components/Nav";

// --- 底下開始撰寫 ---

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();

  return (
    <div id="layout" className="relative px-12 md:px-24 pb-24">
      {/* Nav bg */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/nav_bg.png`}
        alt="nav_bg"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw]"
      />

      <Nav userName={userName} />

      <main className="mt-12 space-y-40">
        <Outlet />
      </main>
    </div>
  );
}
