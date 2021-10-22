import axios from 'axios'
import querystring from 'query-string'

const SearchAPI = () => {
    const refresh_token = "AQARwB4kcc2WGbbRcpuusCC0dccDVFqSwWh7ea6ewTY5-lYsJAcV8gB0u29DAJDk__QSKOqRfTL2Zo5A_AJ0NaS157pFBhvuD2qcN8jXNc9088_K5W4hUXVLVtXxHTStO8Q"

    const TOKEN = "https://accounts.spotify.com/api/token";

    const client_id = "e92ebaa8a3d1456fb1ab78acfe75fec7"
    const client_secret = "f2cdafb887294ee1a158d5905cc89f4d"

    console.log("This is to be copied: " + btoa(client_id + ":" + client_secret))

    //Refreshing access token

    const refreshAccessToken = (track) => {
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
                getSearchData(track, response.data.access_token)
            })
            .catch(error => console.log(error))
    }

    const getSearchData = (track, access_token) => {
        track = track.replace(/ /g, "%20");
        const type = "track" //artist, album 
        const market = "US";
        const limit = "1";
        const offset = "0"
        const search_url = `https://api.spotify.com/v1/search?q=${track}&type=${type}&market=${market}&limit=${limit}&offset=${offset}`

        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }
        axios.get(search_url, headers)
            .then(response => response)
            .catch(error => console.log(error))
    }

    return (
        <div>
        </div>
    )
}

export default SearchAPI
