import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Components/Features/Layout/LayoutComponent";
import MainRouting from "./Routing/MainRouting";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <Router>
          <Layout>
            <MainRouting />
          </Layout>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
