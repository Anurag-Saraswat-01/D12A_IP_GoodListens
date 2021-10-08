import Header from './components/Header'
import logo from './images/logo.png';
import bgimage from './images/music2.jpg';

function App() {
  return (
    <div className="container-fluid">
      <Header logo={logo} />
      <div className="bg-image">
        <img src={bgimage} alt="" width="100%" height="auto" />
      </div>
    </div>
  );
}

export default App;
