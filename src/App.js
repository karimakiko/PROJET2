import Home from "./componenet/home/Home.jsx";
import Login from "./componenet/login/Login.jsx";
import List from "./componenet/list/List.jsx";
import Single from "./componenet/Single/Single.jsx";
import New from "./componenet/new/New.jsx";
import Form from "./componenet/form/Form.jsx";
import ListAbs from "./componenet/listAbs/listAbs.jsx";
import NewAbs from "./componenet/NewAbs/NewAbs.jsx";
import FormAbs from "./componenet/formAbs/formAbs.jsx";
import SingleAbs from "./componenet/SingleAbs/SingleAbs.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route path="Edit/:userId" element={<Form />} />
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="/Demandes"> 
              <Route path="Absence"> 
                <Route path="Edit/:userId" element={<FormAbs/>} /> 
                <Route index element={<ListAbs />} />{/*works*/}
                <Route path=":userId" element={<SingleAbs />} /> 
                <Route path="new" element={<NewAbs />} /> {/*works*/}
              </Route>
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
