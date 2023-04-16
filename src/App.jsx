import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import DetailPage from "./pages/details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
