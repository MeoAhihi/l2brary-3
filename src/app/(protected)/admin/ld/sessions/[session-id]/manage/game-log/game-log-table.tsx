"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  id: number;
  name: string;
  avatar: string;
  internationalName: string;
  score: number;
  time: string;
  trials: number;
  homeworkScore: number;
  stampScore: number;
  hardwordScore: number;
}

interface GameLogTableProps {
  players: Player[];
  onPlayerChange?: (players: Player[]) => void;
}

export function GameLogTable({ players, onPlayerChange }: GameLogTableProps) {
  // Local state for editable fields if needed
  const [editablePlayers, setEditablePlayers] = useState(players);

  // Handle input changes for editable fields
  const handleInputChange = (
    id: number,
    field: keyof Player,
    value: string | number,
  ) => {
    const updatedPlayers = editablePlayers.map((player) =>
      player.id === id ? { ...player, [field]: value } : player,
    );
    setEditablePlayers(updatedPlayers);
    if (onPlayerChange) {
      onPlayerChange(updatedPlayers);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Tên</TableHead>
          <TableHead>Tên quốc tế</TableHead>
          <TableHead>Điểm</TableHead>
          <TableHead>Thời gian</TableHead>
          <TableHead>Lượt thử</TableHead>
          <TableHead>Điểm Homework</TableHead>
          <TableHead>Điểm Stamp</TableHead>
          <TableHead>Điểm Hardworking</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {editablePlayers.map((player) => (
          <GameLogTableRow
            key={player.id}
            {...player}
            handleInputChange={handleInputChange}
          />
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <select className="w-full rounded border px-2 py-1 text-sm">
              <option value="">Chọn thành viên</option>
              {editablePlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function GameLogTableRow({
  id,
  avatar = "",
  name = "",
  internationalName = "",
  score = 0,
  time = "",
  trials = 0,
  homeworkScore = 0,
  stampScore = 0,
  hardwordScore = 0,
  handleInputChange,
}: {
  id: number;
  avatar: string;
  name: string;
  internationalName: string;
  score: number;
  time: string;
  trials: number;
  homeworkScore: number;
  stampScore: number;
  hardwordScore: number;
  handleInputChange: (
    id: number,
    field: keyof Player,
    value: string | number,
  ) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <span>{name}</span>
      </TableCell>
      <TableCell>{internationalName || "-"}</TableCell>
      <TableCell>
        <input
          type="number"
          min={0}
          max={100}
          value={score}
          onChange={(e) =>
            handleInputChange(id, "score", Number(e.target.value))
          }
          className="w-16 rounded border px-2 py-1 text-right text-sm"
          placeholder="Điểm"
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={time || ""}
          onChange={(e) => handleInputChange(id, "time", e.target.value)}
          className="w-20 rounded border px-2 py-1 text-sm"
          placeholder="mm:ss"
        />
      </TableCell>
      <TableCell>
        <input
          type="number"
          min={0}
          value={trials || ""}
          onChange={(e) =>
            handleInputChange(id, "trials", Number(e.target.value))
          }
          className="w-12 rounded border px-2 py-1 text-right text-sm"
          placeholder="Lượt"
        />
      </TableCell>
      <TableCell className="text-center">{homeworkScore}</TableCell>
      <TableCell className="text-center">{stampScore}</TableCell>
      <TableCell className="text-center">{hardwordScore}</TableCell>
    </TableRow>
  );
}
