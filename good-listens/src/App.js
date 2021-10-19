import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
// import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import querystring from 'query-string'
import './index.css';
import { auth, provider, getAuth, database } from './components/Firebase';
import { useState, useEffect } from 'react';
import AboutUs from './components/AboutUs';

// Subsequent queries will use persistence, if it was enabled successfully

function App() {
  const [songSearchData, setSongSearchData] = useState([]);
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
  function refreshAccessToken() {
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
      }
    };
    const data = {
      'grant_type': 'client_credentials',
      'refresh_token': refresh_token,
      'client_id': client_id
    };
    axios.post(TOKEN, querystring.stringify(data), headers)
      .then(response => {
        console.log(response.data);
        getSearchData(response.data.access_token)
      })
      .catch(error => console.log(error))
  }

  const getSearchData = async (access_token) => {
    var track = searchTerm.replace(/ /g, "%20");
    const type = "track" //artist, album 
    const market = "US";
    const limit = "12";
    const offset = "0"
    const search_url = `https://api.spotify.com/v1/search?q=${track}&type=${type}&market=${market}&limit=${limit}&offset=${offset}`

    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }
    const response = await axios.get(search_url, headers)
    if (response.data) {
      let limit = response.data.tracks.limit;
      let arr = []
      for (let i = 0; i < limit; i++) {
        arr.push({
          id: response.data.tracks.items[i].id,
          name: response.data.tracks.items[i].name,
          album_type: response.data.tracks.items[i].album.type,
          album: response.data.tracks.items[i].album.name,
          artist: response.data.tracks.items[i].artists[0].name,
          image: response.data.tracks.items[i].album.images[1].url,
          language: "English",
          release_date: response.data.tracks.items[i].album.release_date,
          url: response.data.tracks.items[i].uri
        })
      }
      setSongSearchData(arr)
      if (searchTerm.length === 0) {
        setSongSearchData([])
      }
      console.log(arr);
      console.log(response.data);
    }
    // .then(response=>{
    //   console.log(response.data);
    //   setSongSearchData(response.data)
    // })
    // .catch(error=>console.log(error))
  }

  //Will refresh the accesstoken and search data if there is something in the searchbox
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
    // enableIndexedDbPersistence(db)
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
            url: songs[song].url,
            user_rating: ('user_rating' in songs[song] ? songs[song].user_rating : null)
          })
        }
        setData(arr)
      } else {
        alert("No data")
      }
    })
  }

  //updating user rating
  const updateRating = (songid, rating) => {
    // const songid = "a055cd69-ad9c-4563-a49a-7696f097bc4f"
    const db = database.getDatabase()
    const dbRef = database.ref(db)
    const data = {}
    data["spotify/" + songid + `/user_rating/${user.uid}`] = rating
    database.update(dbRef, data)
    getData()
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
    <div className="container-fluid" onLoad={getData}>
      <Header logo={logo} user={user} setlang={setLanguage} login={login} logout={logout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table dataArr={data} setlang={setLanguage} filteredData={data.filter(data => data.language === language)}
        searchResults={songSearchData} lang={language} searchTerm={searchTerm} updateRating={updateRating} user={user} />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;

// code=AQDFAZ2sG65Kn7lix2_FNmoTZlf1t1quPf7Q0M6nsrSOQaOweQ4UWCX5odUoA5xyYkOceCJuJV6J2jvKi5Wzdc4raIUytAa35-hRZYVXFE4d_hnupd6NUSHMJSjWa8Uvx8plLyWkGrsfQJOarVSknPSly8thJHRtsj-pbwIfJLfa4Zr5n8D3Q6wZ7IZejDjJ2qKM3JAdlMLHd6toFg
// state=RMDhxal9unJMbRjh

