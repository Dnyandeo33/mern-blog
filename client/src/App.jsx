import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterCom from './components/FooterCom';
import Header from './components/Header';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import SinglePost from './components/SinglePost';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdatePost from './pages/UpdatePost';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<SinglePost />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;
