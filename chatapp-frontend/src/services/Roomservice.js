import { baseURL, httpClient } from "../config/AxiosHelper"; // Fix: correct casing (was "axiosHelper")

// Create a new room
// POST /api/v1/rooms?roomname=<name>   body: plain-text roomId
export const createroomapi = async (roomid, roomname) => {
  const response = await httpClient.post(
    `/api/v1/rooms?roomname=${encodeURIComponent(roomname)}`,
    roomid,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  return response.data;
};

// Get room name by roomId
// GET /api/v1/rooms/{roomId}/roomname
export const getroomnamebyroomid = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}/roomname`);
  return response.data;
};

// Join an existing room
// GET /api/v1/rooms/{roomId}
export const joinroomapi = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
  return response.data;
};

// Get paginated messages for a room
// GET /api/v1/rooms/{roomId}/messages?size=50&page=0
export const getmessages = async (roomId, size = 50, page = 0) => {
  const response = await httpClient.get(
    `/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};