import Header from './components/Header'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <div className="container-fluid">
      <Header logo={logo} />
      <Table rock = {rock} />
    </div>
  );
}

export default App;
