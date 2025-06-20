import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { Category } from "./pages/category/Category";
import { Post } from "./pages/category/Post";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/category/:categoryName">
          <Route index element={<Category />} />
          <Route path=":postId" element={<Post />} />
        </Route>
      </Route>
    </Routes>
  );
}
