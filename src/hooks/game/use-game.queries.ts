import { useQuery } from "@tanstack/react-query";

import { getAllGames, getGameById } from "@/apis/game.api";

/**
 * Custom hook to fetch all games for a given session.
 * @param sessionId The session ID to fetch games for
 */
export const useGameListQuery = (sessionId: string) => {
  return useQuery({
    queryKey: ["game-list", sessionId],
    queryFn: () => getAllGames(sessionId),
    select: (data) => data.data,
    enabled: !!sessionId,
  });
};

/**
 * Custom hook to fetch a single game by its ID.
 * @param gameId The ID of the game to fetch
 */
export const useGameByIdQuery = (gameId: number) => {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGameById(gameId),
    select: (data) => data.data,
    enabled: gameId !== undefined,
  });
};
