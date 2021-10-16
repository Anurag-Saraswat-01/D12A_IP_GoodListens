var access_token = "BQBJeimBsPZAfo82oOeyj52Y6H3Apqekh4gPVHeyPWPZAwPwa5nl5b9N1TdZjraUDkdxJ0RIDht7pnN9aZt6SIZfnyJu8YFhlvfffjlJkuaWYOTbBmwp3vEHiQghiT2ZjcMpAdIwqrbbkgafPCbjbMELMQgQLTWxewK4Gs_LrKdLq7DWdQ"
var refresh_token = "AQARwB4kcc2WGbbRcpuusCC0dccDVFqSwWh7ea6ewTY5-lYsJAcV8gB0u29DAJDk__QSKOqRfTL2Zo5A_AJ0NaS157pFBhvuD2qcN8jXNc9088_K5W4hUXVLVtXxHTStO8Q"

var new_access_token = null;
var new_refresh_token = null;

const TOKEN = "https://accounts.spotify.com/api/token";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const code = "AQDFAZ2sG65Kn7lix2_FNmoTZlf1t1quPf7Q0M6nsrSOQaOweQ4UWCX5odUoA5xyYkOceCJuJV6J2jvKi5Wzdc4raIUytAa35-hRZYVXFE4d_hnupd6NUSHMJSjWa8Uvx8plLyWkGrsfQJOarVSknPSly8thJHRtsj-pbwIfJLfa4Zr5n8D3Q6wZ7IZejDjJ2qKM3JAdlMLHd6toFg"
const state = "RMDhxal9unJMbRjh"
var client_id = "e92ebaa8a3d1456fb1ab78acfe75fec7"
var client_secret = "f2cdafb887294ee1a158d5905cc89f4d"
var redirect_uri = "http://localhost:8888/callback"

console.log("This is to be copied: "+btoa(client_id + ":" + client_secret))
//will refresh the token
// async function refreshAccessToken() {
//     const refresh_url = "https://accounts.spotify.com/api/token"
//     const response = await fetch(refresh_url, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             "Authorization": "Basic ZTkyZWJhYThhM2QxNDU2ZmIxYWI3OGFjZmU3NWZlYzc6ZjJjZGFmYjg4NzI5NGVlMWExNThkNTkwNWNjODlmNGQ="
//         },
//         body: {
//             "grant_type	": "refresh_token",
//             "refresh_token": `${refresh_token}`,
//             "client_id": "e92ebaa8a3d1456fb1ab78acfe75fec7"
//         },
//     });
//     if ( this.status == 200 ){
//         const data = await response.json();
//         console.log(data);
//     }
//     else {
//         console.log("cant find data");
//     }
// }

async function getSearchData(track, access_token) {
    track = track.replace(/ /g, "%20");
    type = "track" //artist, album 
    market = "US";
    limit = "1";
    offset = "0"
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
    console.log(data);
    console.log(data.tracks.items[0]);
    console.log("Song Name: ")
    console.log(data.tracks.items[0].name);
    console.log("Artist Name: ");
    console.log(data.tracks.items[0].artists[0].name);
    console.log("Album Type: ");
    console.log(data.tracks.items[0].album.album_type);
    console.log("Album Name: ");
    console.log(data.tracks.items[0].album.name);
    console.log("Release Date: ");
    console.log(data.tracks.items[0].album.release_date);
    console.log("Spotify URL: ");
    console.log(data.tracks.items[0].uri);
    console.log("Image urls: ");
    console.log(data.tracks.items[0].album.images);
    console.log("Id")
    console.log(data.tracks.items[0].id);
}
// refreshAccessToken();
// getSearchData("Blinding Lights");





// function requestAuthorization(){
//     let url = AUTHORIZE;
//     url += "?client_id=" + client_id;
//     url += "&response_type=code";
//     url += "&redirect_uri=" + encodeURI(redirect_uri);
//     url += "&show_dialog=true";
//     url += "&scope=user-read-private user-read-email";
//     window.location.href = url; // Show Spotify's authorization screen
// }

// function fetchAccessToken( code ){
//     let body = "grant_type=authorization_code";
//     body += "&code=" + code; 
//     body += "&redirect_uri=" + encodeURI(redirect_uri);
//     body += "&client_id=" + client_id;
//     body += "&client_secret=" + client_secret;
//     callAuthorizationApi(body);
// }

function refreshAccessToken(){
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            console.log("access token: "+data.access_token)
            var new_access_token = data.access_token;
            getSearchData("Life Goes on", new_access_token)
        }
        if ( data.refresh_token  != undefined ){
            var new_refresh_token = data.refresh_token;
        }
    }
    else {
        console.log("Failed to fetch data");
        console.log(this.responseText);
    }
}

// requestAuthorization();
// fetchAccessToken(code);
refreshAccessToken();

