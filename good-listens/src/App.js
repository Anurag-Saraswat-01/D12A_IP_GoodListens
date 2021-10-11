import Header from './components/Header'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase, { auth, provider, getAuth } from './components/Firebase';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null)

  const login = () => {
    auth.signInWithPopup(getAuth, provider)
      .then((result) => {
        const user = result.user
        setUser(user)
      })
    console.log(user)
  }

  const logout = () => {
    auth.signOut(getAuth)
      .then(() => {
        setUser(null)
      })
    console.log(user)
  }

  // so that user remains logged in after refresh
  useEffect(() => {
    auth.onAuthStateChanged(getAuth, (user) => {
      if (user) {
        setUser(user)
      }
    })
  })

  return (
    <div className="container-fluid">
      <Header logo={logo} user={user} login={login} logout={logout} />
      <Table rock={rock} />
    </div>
  );
}

export default App;
