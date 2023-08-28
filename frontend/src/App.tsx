import MainPage from "./components/pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/tasks/*">
        <Route path="" element={<Navigate to={"all"} />} />
        <Route path="all" element={<MainPage />} />
        <Route path="today" element={<MainPage />} />
        <Route path="week" element={<MainPage />} />
        <Route path="inbox" element={<MainPage />} />
        <Route path="work" element={<MainPage />} />
        <Route path="personal" element={<MainPage />} />
        <Route path="learning" element={<MainPage />} />
        <Route path="shopping" element={<MainPage />} />
        <Route path="fitness" element={<MainPage />} />
        <Route path="wishlist" element={<MainPage />} />
        <Route path="completed" element={<MainPage />} />
      </Route>
      {/* <Route path="*" element={<h1>no match</h1>} /> */}
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}

export default App;
