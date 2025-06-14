import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import NotFound from "../pages/errors/NotFound";
import Post from "../pages/category/post/Post";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/category/:categoryId/">
          <Route index element={<Category />} />
          <Route path="post/:postId" element={<Post />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}