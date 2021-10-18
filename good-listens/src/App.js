import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {refreshAccessToken, getSearchData} from './components/SearchAPI'
import { auth, provider, getAuth, database } from './components/Firebase';
import { useState, useEffect } from 'react';
import AboutUs from './components/AboutUs';


function App() {
  const [songData, setSongData] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("English");


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
    console.log(user.uid)
  }

  const getData = () => {
    const db = database.getDatabase()
    const dbRef = database.ref(db)
    database.get(database.child(dbRef, "spotify/")).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val())
        const songs = snapshot.val()
        // console.log(songs)
        let arr = []
        for (let song in songs) {
          arr.push({
            id: song,
            name: songs[song].name,
            album_type: songs[song].album_type,
            album: songs[song].album,
            artist: songs[song].artist,
            image: songs[song].image,
            language: songs[song].language,
            release_date: songs[song].release_date,
            url: songs[song].url
          })
        }
        // console.log(arr[0].language)
        setData(arr)
      } else {
        alert("No data")
      }
    })
  }

  // so that user remains logged in after refresh
  useEffect(() => {
    auth.onAuthStateChanged(getAuth, (user) => {
      if (user) {
        setUser(user)
      }
    })
  })
  // Will return the search result in the main page
  const search = () => {
    console.warn(searchTerm);
    setSongData(refreshAccessToken(searchTerm))
  }
  return (
    <div className="container-fluid" onLoad={getData}>
      <Header logo={logo} user={user} setlang={setLanguage} login={login} logout={logout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
      <Table rock={rock} setlang={setLanguage} filteredData={data.filter(data => data.language === language )} lang={language} />
      
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;

// code=AQDFAZ2sG65Kn7lix2_FNmoTZlf1t1quPf7Q0M6nsrSOQaOweQ4UWCX5odUoA5xyYkOceCJuJV6J2jvKi5Wzdc4raIUytAa35-hRZYVXFE4d_hnupd6NUSHMJSjWa8Uvx8plLyWkGrsfQJOarVSknPSly8thJHRtsj-pbwIfJLfa4Zr5n8D3Q6wZ7IZejDjJ2qKM3JAdlMLHd6toFg
// state=RMDhxal9unJMbRjh