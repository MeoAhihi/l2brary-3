import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createGame,
  deleteGame,
  logGameActivity,
  submitGame,
} from "@/apis/game.api";
import { LogGameRequest } from "@/types/game/game.payload.dto";

/**
 * Custom hook to perform create game mutation.
 * @returns Mutation object for creating a game.
 */
export const useCreateGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => createGame(sessionId),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries to refresh the game list
      toast.success("Tạo game thành công");
      // Assumes you have access to a queryClient instance higher up in your React tree.
      queryClient.invalidateQueries({ queryKey: ["game-list", variables] });
    },
  });
};

/**
 * Custom hook to perform submit game mutation.
 * @returns Mutation object for submitting a game.
 */
export const useSubmitGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => submitGame(id),
    onSuccess: (data, variables, context) => {
      toast.success("Nộp game thành công");
      queryClient.invalidateQueries({ queryKey: ["game-detail", variables] });
      queryClient.invalidateQueries({ queryKey: ["game-list"] });
    },
    onError: (error: any) => {
      toast.error("Có lỗi xảy ra khi nộp game");
    },
  });
};

/**
 * Custom hook to perform delete game mutation.
 * @returns Mutation object for deleting a game.
 */
export const useDeleteGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteGame(id),
    onSuccess: (data, variables, context) => {
      toast.success("Xóa game thành công");
      queryClient.invalidateQueries({ queryKey: ["game-list"] });
    },
    onError: (error: any) => {
      toast.error("Có lỗi xảy ra khi xóa game");
    },
  });
};

/**
 * Custom hook to perform log game activity mutation.
 * @returns Mutation object for logging game activity.
 */
export const useLogGameActivityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ gameId, data }: { gameId: number; data: LogGameRequest }) =>
      logGameActivity(gameId, data),
    onSuccess: (data, variables, context) => {
      toast.success("Ghi nhật ký game thành công");
      queryClient.invalidateQueries({ queryKey: ["game", variables.gameId] });
    },
    onError: (error: any) => {
      toast.error("Có lỗi xảy ra khi ghi nhật ký game");
    },
  });
};
