import { Route, Routes } from "react-router";
import List from "./List";
import Detail from "./Detail";
import Add from "./Add";
import Edit from "./Edit";

export default function Router(){
    return(
        <Routes>
               <Route path="/" element={<List />} />
               <Route path="/add" element={<Add />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="/:id/edit" element={<Edit />} />
        </Routes>
    )
}