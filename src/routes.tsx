import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Offers } from "./screens/Offers";
import { Administration } from "./screens/Administration";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Offers />} />
        <Route path="/adminstration" element={<Administration />} />
      </Routes>
    </BrowserRouter>
  );
}
