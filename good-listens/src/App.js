import Header from './components/Header'
import Footer from './components/Footer'
import logo from './images/logo.png';
import Table from "./components/Table";
import rock from "./images/rock.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase, { auth, provider, getAuth } from './components/Firebase';
import { useState, useEffect } from 'react';

function App() {
  const [songData, setSongData] = useState([]);
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const refresh_token = "AQARwB4kcc2WGbbRcpuusCC0dccDVFqSwWh7ea6ewTY5-lYsJAcV8gB0u29DAJDk__QSKOqRfTL2Zo5A_AJ0NaS157pFBhvuD2qcN8jXNc9088_K5W4hUXVLVtXxHTStO8Q"
  const TOKEN = "https://accounts.spotify.com/api/token";
  const client_id = "e92ebaa8a3d1456fb1ab78acfe75fec7"
  const client_secret = "f2cdafb887294ee1a158d5905cc89f4d"

  var album = null;
  const getSearchData = async (track, access_token) => {
    track = track.replace(/ /g, "%20");
    var type = "track" //artist, album 
    var market = "US";
    var limit = "1";
    var offset = "0"
    const search_url = `https://api.spotify.com/v1/search?q=${track}&type=${type}&market=${market}&limit=${limit}&offset=${offset}`
    console.log(search_url);
    const response = await fetch(search_url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+access_token
        },
    });
    const data = await response.json();
    setSongData(data)
    console.log(data);
    console.log(data.tracks.items[0]);
    console.log("Song Name: ")
    console.log(data.tracks.items[0].name);
    console.log("Artist Name: ");
    console.log(data.tracks.items[0].artists[0].name);
    console.log("Album Type: ");
    console.log(data.tracks.items[0].album.album_type);
    console.log("Album Name: ");
    album = data.tracks.items[0].album.name;
    console.log(data.tracks.items[0].album.name);
    console.log("Release Date: ");
    console.log(data.tracks.items[0].album.release_date);
    console.log("Spotify URL: ");
    console.log(data.tracks.items[0].uri);
    console.log("Image urls: ");
    console.log(data.tracks.items[0].album.images);
  }


// Refreshes the access token and searches the song on spotify api
  const refreshAccessToken = () => {
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // eslint-disable-next-line no-undef
    xhr.setRequestHeader('Authorization', 'Basic ' + buf.toString(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = () => {
      console.log(this.status);
      if ( this.status === 200 ){
      var data = JSON.parse(this.responseText);
      console.log(data);
      if ( data.access_token !== undefined ){
        console.log("access token: "+data.access_token)
        var new_access_token = data.access_token;
        return new_access_token
      }
      // if ( data.refresh_token  !== undefined ){
      //     // var new_refresh_token = data.refresh_token;
      // }
    }
    else {
        console.log("Failed to fetch data");
        console.log(this.responseText);
    }
  }
}


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

  // Will return the search result in the main page
  const search = () => {
    console.warn(searchTerm);
    var token = refreshAccessToken();
    getSearchData("In the End", token);
  }

  console.log(album);
  console.log(songData);
  return (
    <div className="container-fluid">
      <Header logo={logo} user={user} login={login} logout={logout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
      <Table rock={rock} />
      {/* <CardView  rock={rock} /> */}
      <Footer/>
    </div>
  );
}

export default App;

// code=AQDFAZ2sG65Kn7lix2_FNmoTZlf1t1quPf7Q0M6nsrSOQaOweQ4UWCX5odUoA5xyYkOceCJuJV6J2jvKi5Wzdc4raIUytAa35-hRZYVXFE4d_hnupd6NUSHMJSjWa8Uvx8plLyWkGrsfQJOarVSknPSly8thJHRtsj-pbwIfJLfa4Zr5n8D3Q6wZ7IZejDjJ2qKM3JAdlMLHd6toFg
// state=RMDhxal9unJMbRjh