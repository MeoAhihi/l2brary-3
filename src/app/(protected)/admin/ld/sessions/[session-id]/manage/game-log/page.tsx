"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Plus, Save, Target, Trophy, X } from "lucide-react";
import Head from "next/head";
// import { useParams } from "next/navigation";
import { useState } from "react";
import { GameLogTable } from "./game-log-table";

// Mock data for top performers
const topPerformers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatars/01.png",
    score: 95,
    gamesPlayed: 3,
    rank: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatars/02.png",
    score: 92,
    gamesPlayed: 3,
    rank: 2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "/avatars/03.png",
    score: 88,
    gamesPlayed: 2,
    rank: 3,
  },
];

export default function GameLogPage() {
  // const params = useParams();

  const [players /*setPlayers*/] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "/avatars/01.png",
      internationalName: "John Doe",
      score: 95,
      time: "12:30",
      trials: 2,
      homeworkScore: 10,
      stampScore: 5,
      hardwordScore: 3,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/avatars/02.png",
      internationalName: "Jane Smith",
      score: 92,
      time: "13:10",
      trials: 1,
      homeworkScore: 9,
      stampScore: 4,
      hardwordScore: 2,
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/avatars/03.png",
      internationalName: "Mike Johnson",
      score: 88,
      time: "12:50",
      trials: 3,
      homeworkScore: 8,
      stampScore: 3,
      hardwordScore: 1,
    },
  ]);

  return (
    <>
      <Head>
        <title>Game Log | Admin | L2brary</title>
        <meta
          name="description"
          content="Record and manage game results for the session"
        />
      </Head>
      <div className="space-y-6">
        {/* Add New Game */}
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Ghi điểm Trò chơi
            </CardTitle>
            <Button variant="default">
              <FileUp className="h-4 w-4 mr-2" />
              Nhập file Excel/CSV
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              {/* Game Log Entry Table */}
              <div className="overflow-x-auto">
                <GameLogTable players={players} />
              </div>
            </div>
            <div className="flex flex-row gap-3 justify-end">
              <Button variant="outline">
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Lưu điểm
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer) => (
                <div
                  key={performer.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={performer.avatar} />
                        <AvatarFallback>
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {performer.rank <= 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {performer.rank}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {performer.gamesPlayed} games played
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">{performer.score}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Average score
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Rank #{performer.rank}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
