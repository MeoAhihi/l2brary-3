"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

// Generic type để có thể reuse cho nhiều loại score khác nhau
// Yêu cầu phải có 'id' field để identify records
type ScoreData = Record<string, unknown> & { id: string };

interface ScoreContextType<T extends ScoreData = ScoreData> {
  // Edit mode state
  isEditScoreMode: boolean;
  setIsEditScoreMode: (isEdit: boolean) => void;

  // Score data management
  scores: T[];
  setScores: (scores: T[]) => void;
  originalScores: T[];

  // Utility methods
  hasChanges: boolean;
  resetScores: () => void;
  updateScore: (id: string, updates: Partial<T>) => void;
}

interface ScoreProviderProps<T extends ScoreData = ScoreData> {
  children: ReactNode;
  initialScores: T[];
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = <T extends ScoreData = ScoreData>({
  children,
  initialScores,
}: ScoreProviderProps<T>) => {
  const [isEditScoreMode, setIsEditScoreMode] = useState(false);
  const [scores, setScores] = useState<T[]>(initialScores);
  const [originalScores] = useState<T[]>(initialScores);

  // Check if there are any changes
  const hasChanges = useMemo(() => {
    return JSON.stringify(scores) !== JSON.stringify(originalScores);
  }, [scores, originalScores]);

  // Reset scores to original
  const resetScores = () => {
    setScores(originalScores);
    setIsEditScoreMode(false);
  };

  // Update a specific score by id
  const updateScore = (id: string, updates: Partial<T>) => {
    setScores((prev) =>
      prev.map((score) =>
        (score as unknown as { id: string }).id === id
          ? { ...score, ...updates }
          : score,
      ),
    );
  };

  const value: ScoreContextType<T> = {
    isEditScoreMode,
    setIsEditScoreMode,
    scores,
    setScores,
    originalScores,
    hasChanges,
    resetScores,
    updateScore,
  };

  return (
    <ScoreContext.Provider value={value as ScoreContextType}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = <T extends ScoreData = ScoreData>() => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScoreContext must be used within a ScoreProvider");
  }
  return context as ScoreContextType<T>;
};
