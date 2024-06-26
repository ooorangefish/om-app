const baseUrl = "http://localhost:3001";

export type Song = {
  id: string;
  title: string;
  duration: string;
  album_id: string;
  artist_id: string;
};

const getSongs = async () => {
  return await fetch(baseUrl + "/songs").then((res) => res.json());
};

const addSong = async (songData: Song) => {
  return await fetch(baseUrl + "/addSong", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songData),
  }).then((res) => res.json());
};

const get = async (path: string) => {
  return await fetch(baseUrl + path).then((res) => res.json());
};

const add = async (path: string, data: any) => {
  return await fetch(baseUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const upload = async (path: string, formData: FormData) => {
  return await fetch(baseUrl + path, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};

const getArtists = async () => {
  return await fetch(baseUrl + "/artists").then((res) => res.json());
};

const deleteArtist = async (id: string) => {
  return await fetch(baseUrl + `/deleteArtist/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export { getArtists, deleteArtist, getSongs, addSong, upload, add, get };
