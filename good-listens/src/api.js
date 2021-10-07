
const root_url = "http://ws.audioscrobbler.com/2.0"
const api_key = "4a16f1c32796c466a1347458ab1626f4"
async function getData(track, artist) {
    track = track.replace(/ /g, "_")
    artist = artist.replace(/ /g, "_")
    const url = `${root_url}/?method=track.getInfo&api_key=${api_key}&artist=${artist}&track=${track}&format=json`
    console.log(url)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    data = await response.json()
    console.log(data.track)
    console.log(data.track.album.title, data.track.album.image[1]["#text"], data.track.artist.name, data.track.name, data.track.url)
}