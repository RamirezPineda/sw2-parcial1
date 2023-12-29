import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SWRConfig } from "swr";

import Layout from "./components/Layout";
// import { useEffect } from "react"

function App() {
  // useEffect(() => {
  //   const response = fetch('http://localhost:8000/sales/10000').then(response => response.json()).then(data => console.log(data))
  //   console.log(response);
  //   return () => {
  //   }
  // }, [])

  return (
    <>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </>
  );
}

export default App;
