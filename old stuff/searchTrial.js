var access_token = "BQAm-dR5cVv5WdLD2V2xrSMOiCZKogfEIqmie47JKrhFfgfQwFMyWaBAes1EWZT-BxyXHhQXaHUtfRTB8L0TQiRLhAapG7hBtCLai8vfzMUWZ8WxaDQgc9W6-M9j2xp8A8cQzbOk0ROSvkjynRb7UzVNhnvFpXPN9qxpoBBxakeUkqvK7w"
var refresh_token = "AQCnjYBZVihp7RCU_S_60SPBIG9DNZWZJOfqbwP5701HHqkfmhPk_SgBwV9e1bd2XktqTbO99li-52FmWikOcEyhvqQzf1IJKAabqIeqooM-JzGSkWm0vD_CPM-pNS_61HI"




//will refresh the token
async function refreshAccessToken() {
    const refresh_url = "https://accounts.spotify.com/api/token"
    const response = await fetch(refresh_url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic e92ebaa8a3d1456fb1ab78acfe75fec7:f2cdafb887294ee1a158d5905cc89f4d"
        },
        body: {
            "grant_type	": "refresh_token",
            "refresh_token": "AQCnjYBZVihp7RCU_S_60SPBIG9DNZWZJOfqbwP5701HHqkfmhPk_SgBwV9e1bd2XktqTbO99li-52FmWikOcEyhvqQzf1IJKAabqIeqooM-JzGSkWm0vD_CPM-pNS_61HI"
        },
    });
    const new_data = await response.json();
    console.log(new_data);
}

async function getSearchData(track) {
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
            "Authorization": `Bearer ${access_token}`
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
    // console.log(data.track.items.album.name);
}
refreshAccessToken();
getSearchData("Blinding Lights");



