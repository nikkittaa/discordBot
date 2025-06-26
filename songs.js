import axios from "axios";
import 'dotenv/config';


export default async function getSong(){
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(process.env.ID + ':' + process.env.CLIENT_SECRET).toString('base64');

    const headers = {
        'Authorization': 'Basic ' + credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    let token = null;
    const res = await axios.post(tokenEndpoint, data, { headers })
    
    token = res.data.access_token;
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); 
    const query = `https://api.spotify.com/v1/search?q=${randomChar}&type=track&limit=10`;

    const result = await fetch(query, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

    const songs = await result.json();
    const choose = Math.floor(Math.random()*songs.tracks.items.length);
    const selectedSong = {name : songs.tracks.items[choose].name};
    
    return selectedSong;

}
//getSong();