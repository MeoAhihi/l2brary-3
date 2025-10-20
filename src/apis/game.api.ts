import axiosClient from "@/connectors/AxiosRestConnector";
import { LogGameRequest } from "@/types/game/game.payload.dto";
import {
  CreateGameResponse,
  GetGameListResponse,
  GetOneGameResponse,
  SubmitGameResponse,
} from "@/types/game/game.response.dto";

// Game API

// Create game
export const createGame = (sessionId: string) => {
  return axiosClient.post<CreateGameResponse>(
    "/game",
    {},
    { params: { sessionId } },
  );
};

// Get all games
export const getAllGames = (sessionId: string) => {
  return axiosClient.get<GetGameListResponse>("/game", {
    params: { sessionId },
  });
};

// Submit game
export const submitGame = (id: number) => {
  return axiosClient.post<SubmitGameResponse>(`/game/${id}/submit`);
};

// Get game by ID
export const getGameById = (id: number) => {
  return axiosClient.get<GetOneGameResponse>(`/game/${id}`);
};

// Delete game
export const deleteGame = (id: number) => {
  return axiosClient.delete(`/game/${id}`);
};

// Log game activity
export const logGameActivity = (id: number, data: LogGameRequest) => {
  return axiosClient.post<void>(`/game/${id}/logs`, data);
};
