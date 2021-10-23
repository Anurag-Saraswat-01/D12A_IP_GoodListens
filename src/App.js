import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
import AboutUs from './components/AboutUs';
import { useState, useEffect } from 'react';
import { auth, provider, getAuth, database } from './components/Firebase';
import { ref, set } from "firebase/database";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import querystring from 'query-string'


// Subsequent queries will use persistence, if it was enabled successfully

function App() {
  const [songSearchData, setSongSearchData] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("English");
  const [sortBy, setSortBy] = useState('name')
  const refresh_token = "AQARwB4kcc2WGbbRcpuusCC0dccDVFqSwWh7ea6ewTY5-lYsJAcV8gB0u29DAJDk__QSKOqRfTL2Zo5A_AJ0NaS157pFBhvuD2qcN8jXNc9088_K5W4hUXVLVtXxHTStO8Q"

  const TOKEN = "https://accounts.spotify.com/api/token";

  const client_id = "e92ebaa8a3d1456fb1ab78acfe75fec7"
  const client_secret = "f2cdafb887294ee1a158d5905cc89f4d"

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
        try {
          arr.push({
            id: response.data.tracks.items[i].id,
            name: response.data.tracks.items[i].name,
            album_type: response.data.tracks.items[i].album.type,
            album: response.data.tracks.items[i].album.name,
            artist: response.data.tracks.items[i].artists[0].name,
            image: response.data.tracks.items[i].album.images[1].url,
            language: "English",
            release_date: response.data.tracks.items[i].album.release_date,
            url: response.data.tracks.items[i].uri,
            user_rating: null
          })
          setSongSearchData(arr)
          if (searchTerm.length === 0) {
            setSongSearchData([])
          }

        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  //Will refresh the accesstoken and search data if there is something in the searchbox
  useEffect(() => {
    if (searchTerm.length > 0) {
      refreshAccessToken()
    }
  }, [searchTerm])


  //Inserting data into Firebase on clicking the searchResults
  const insertData = async (track) => {
    const db = database.getDatabase()
    set(ref(db, "spotify/" + track.id), {
      album: track.album_name,
      image: track.image,
      artist: track.artist,
      release_date: track.release_date,
      album_type: track.album_type,
      name: track.name,
      language: "English",
      url: track.url,
      user_rating: {},
    });
    console.log("Data added successfully");
  }

  // Login with Google Accounts
  const login = () => {
    auth.signInWithPopup(getAuth, provider)
      .then((result) => {
        if (result.user) {
          const user = result.user
          setUser(user)
        }
      })
  }

  // logout function 
  const logout = () => {
    auth.signOut(getAuth)
      .then(() => {
        setUser(null)
      })
  }

  // Accesssing data from database
  const getData = () => {
    const db = database.getDatabase()
    const dbRef = database.ref(db)
    database.onValue(database.child(dbRef, "spotify/"), (snapshot) => {
      if (snapshot.exists()) {
        const songs = snapshot.val()
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

        switch (sortBy) {
          case 'name':
            setData(arr.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`)))
            break;

          case 'artist':
            setData(arr.sort((a, b) => `${a.artist}`.localeCompare(`${b.artist}`)))
            break;

          case 'user':
            arr = arr.filter(data => data.user_rating && user.uid in data.user_rating)
            setData(arr.sort((a, b) => b.user_rating[user.uid] - a.user_rating[user.uid]))
            break;

          case 'average':
            const calcRating = (data) => {
              let avg
              if (data.user_rating) {
                let totalUsers = Object.keys(data.user_rating).length
                let sum = 0
                for (let rating in data.user_rating) {
                  sum += data.user_rating[rating]
                }
                avg = sum / totalUsers
              } else {
                avg = 0
              }
              return avg
            }
            setData(arr.sort((a, b) => calcRating(b) - calcRating(a)))
            break;

          default:
            break;
        }
      } else {
        alert("No data")
      }
    })
  }

  //updating user rating
  const updateRating = (songid, rating) => {
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

  useEffect(() => {
    getData()
  }, [sortBy])

  return (
    <Router>
      <div className="container-fluid" onLoad={getData}>
        <Header logo={logo} user={user} setlang={setLanguage} login={login} logout={logout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Route path="/D12A_IP_GoodListens" exact render={() => (
          <Table dataArr={data} setlang={setLanguage} filteredData={data.filter(data => data.language === language)} setSortBy={setSortBy}
            searchResults={songSearchData} searchTerm={searchTerm} updateRating={updateRating} user={user} insert={insertData} />
        )} />
        <Route path="/D12A_IP_GoodListens/about" component={AboutUs} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
