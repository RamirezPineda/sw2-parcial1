import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import SuspenseContent from "./SuspenseContent";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

function PageContent() {
  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200">
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            <Route index path="/" element={<Dashboard />} />
            <Route path="*" element={<>PAGE 404</>} />
          </Routes>
        </Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}
export default PageContent;
