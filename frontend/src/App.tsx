import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AddSubscription from "./pages/AddSubscription";
import MySubscriptions from "./pages/MySubscriptions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/subscriptions" element={<AddSubscription />} />
          <Route path="/my-subscriptions" element={<MySubscriptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
