import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedFlipbook from "./FlipBookPage";
import HomeLayout from "./HomeLayout";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/flipbook/:id" element={<SharedFlipbook />} />
        </Routes>
      </div>
  );
}

export default App;
