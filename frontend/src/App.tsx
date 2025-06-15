import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CategoryLayout from './layouts/CategoryLayout';
import Category from './pages/category/Category';
import Post from './pages/category/Post';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/category/:categoryName" element={<CategoryLayout />}>
          <Route index element={<Category />} />
          <Route path=":postId" element={<Post />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
