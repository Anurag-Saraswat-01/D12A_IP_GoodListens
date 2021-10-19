import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import querystring from 'query-string'
import './index.css';
import { auth, provider, getAuth, database } from './components/Firebase';
import { useState, useEffect } from 'react';
import AboutUs from './components/AboutUs';


function App() {
  const [songSearchData, setSongSearchData] = useState([]);
  const [accesstoken, setAccesstoken] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("English");
  const refresh_token = "AQARwB4kcc2WGbbRcpuusCC0dccDVFqSwWh7ea6ewTY5-lYsJAcV8gB0u29DAJDk__QSKOqRfTL2Zo5A_AJ0NaS157pFBhvuD2qcN8jXNc9088_K5W4hUXVLVtXxHTStO8Q"

  const TOKEN = "https://accounts.spotify.com/api/token";
  
  const client_id = "e92ebaa8a3d1456fb1ab78acfe75fec7"
  const client_secret = "f2cdafb887294ee1a158d5905cc89f4d"
  
  // console.log("This is to be copied: "+btoa(client_id + ":" + client_secret))
  //Refreshing access token
  function refreshAccessToken(){
      const headers = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              // 'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic '+btoa(client_id +":"+ client_secret)
          }
      };
      const data = {
          'grant_type': 'client_credentials',
          'refresh_token': refresh_token,
          'client_id': client_id
      };
      axios.post(TOKEN, querystring.stringify(data), headers)
      .then(response=>{
          console.log(response.data);
          setAccesstoken(response.data.access_token)
          getSearchData(response.data.access_token)
      })
      .catch(error=> console.log(error))
  }
  
  const getSearchData = async (access_token) => {
      var track = searchTerm.replace(/ /g, "%20");
      const type = "track" //artist, album 
      const market = "US";
      const limit = "1";
      const offset = "0"
      const search_url = `https://api.spotify.com/v1/search?q=${track}&type=${type}&market=${market}&limit=${limit}&offset=${offset}`
  
      const headers = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+access_token
          }
      }
      const response = await axios.get(search_url, headers)
      if (response.data) {
        setSongSearchData(response.data)
      }
      // .then(response=>{
      //   console.log(response.data);
      //   setSongSearchData(response.data)
      // })
      // .catch(error=>console.log(error))
  }
  useEffect(() => {
    if (searchTerm.length > 0) {
      refreshAccessToken()
    }
  }, [searchTerm])

  // Login with Google Accounts
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

  // logout function 
  const logout = () => {
    auth.signOut(getAuth)
      .then(() => {
        setUser(null)
      })
    console.log(user.uid)
  }

  // Accesssing data from database
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
    refreshAccessToken();
    // useEffect(() => {
    //   refreshAccessToken(searchTerm);
    // }, [])
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