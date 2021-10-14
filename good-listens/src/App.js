import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase, { auth, provider, getAuth } from './components/Firebase';
import { useState, useEffect } from 'react';
import CardView from './components/CardView';

function App() {
  const [user, setUser] = useState(null)
  const [input, setInput] = useState("");

  const login = () => {
    auth.signInWithPopup(getAuth, provider)
      .then((result) => {
        if (result.user) {
          const user = result.user
          setUser(user)  
        }
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

  const search = () => {
  }
  
  return (
    <div className="container-fluid">
      <Header logo={logo} user={user} login={login} logout={logout} setInput={setInput} />
      <Table rock={rock} />
      {/* <CardView  rock={rock} /> */}
      <Footer/>
    </div>
  );
}

export default App;

// code=AQDFAZ2sG65Kn7lix2_FNmoTZlf1t1quPf7Q0M6nsrSOQaOweQ4UWCX5odUoA5xyYkOceCJuJV6J2jvKi5Wzdc4raIUytAa35-hRZYVXFE4d_hnupd6NUSHMJSjWa8Uvx8plLyWkGrsfQJOarVSknPSly8thJHRtsj-pbwIfJLfa4Zr5n8D3Q6wZ7IZejDjJ2qKM3JAdlMLHd6toFg
// state=RMDhxal9unJMbRjh