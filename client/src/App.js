
import './App.css';
import { Provider, useSelector } from 'react-redux';
import store from './Redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Components/Features/Layout/LayoutComponent';
import MainRouting from './Routing/MainRouting';
import backgroundImage from './images/tech-background.jpeg'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App"
        style={{
          background: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Router>
          <Layout >
            <MainRouting />
          </Layout>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
