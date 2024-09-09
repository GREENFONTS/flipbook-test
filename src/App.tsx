import "./App.css";
import { Routes, Route } from "react-router-dom";
import SharedFlipbook from "./FlipBookPage";
import HomeLayout from "./HomeLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/flipbook/:id" element={<SharedFlipbook />} />
    </Routes>
  );
}

export default App;
