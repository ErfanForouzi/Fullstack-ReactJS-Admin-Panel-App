import { Route, Routes } from "react-router";
import PeopleRouter from "@/components/people/Router";
import PostsRouter from "@/components/posts/Router";
import Dashboard from "@/components/user/Dashboard";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/people/*" element={<PeopleRouter />} />
      <Route path="/posts/*" element={<PostsRouter />} />
    </Routes>
  );
}
