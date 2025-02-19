import { Route, Routes} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import NoMatch from "./components/nomatch/noMatch";
import PostUser from "./components/postUser/postUser";
import UpdateUser from "./components/updateUser/updateUser";
import Header from "./components/header/header";
import ViewUser from "./components/viewUser/viewUser";

function App() {
  return (
    <>
    <Header></Header>
     <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/user" element={<PostUser></PostUser>}></Route>
      <Route path="/user/:id" element={<UpdateUser></UpdateUser>}></Route>
       <Route path="/view/:id" element={<ViewUser></ViewUser>}></Route>
      <Route path="*" element={<NoMatch></NoMatch>}></Route>
     </Routes>
    </>
  );
}

export default App;

