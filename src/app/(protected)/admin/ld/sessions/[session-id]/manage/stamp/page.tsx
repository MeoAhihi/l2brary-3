"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Plus, Stamp, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { getStampTypes, getStudentStamps } from "@/apis/ld.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StampType, StudentStamp } from "@/types/ld.types";

const queryClient = new QueryClient();

export default function StampPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <StampPage />
    </QueryClientProvider>
  );
}

function StampPage() {
  const { "session-id": sessionId } = useParams();
  const [selectedStamp, setSelectedStamp] = useState<StampType | null>(null);

  // Set the first stamp type as selected by default when loaded

  const { data: stampTypes = [] } = useQuery({
    queryKey: ["stampTypes", sessionId],
    queryFn: () => getStampTypes(),
  });

  const { data: students = [] } = useQuery({
    queryKey: ["studentStamps", sessionId],
    queryFn: () => getStudentStamps(),
  });

  // Create a map for stampTypeId to icon/color for StudentStampCard
  const stampTypesMapObj = new Map(
    stampTypes.map((stampType: StampType) => [
      stampType.id,
      {
        icon: stampType.icon,
        color: stampType.color,
      },
    ]),
  );

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Quick Stamp - Left 3/4 */}
        <div className="w-full lg:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Stamp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row flex-wrap gap-2">
                {stampTypes.map((stampType) => {
                  const Icon = stampType.icon;
                  const isSelected = selectedStamp?.id === stampType.id;

                  return (
                    <Button
                      key={stampType.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`flex items-center gap-2 ${
                        isSelected ? "border-primary border-2" : ""
                      }`}
                      onClick={() => setSelectedStamp(stampType)}
                    >
                      <Icon className={`h-5 w-5 ${stampType.color}`} />
                      {stampType.name}
                    </Button>
                  );
                })}
              </div>

              {selectedStamp && (
                <div className="bg-muted mt-4 rounded-lg p-4">
                  <p className="text-muted-foreground text-sm">
                    Selected:{" "}
                    <span className="font-medium">{selectedStamp.name}</span>
                  </p>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-md mb-2 font-semibold">Students</h3>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                  {students.map((student: StudentStamp) => (
                    <Card
                      key={student.id}
                      className="flex flex-col items-center"
                    >
                      <Avatar className="mb-1 h-10 w-10">
                        {student.avatar ? (
                          <AvatarImage
                            src={student.avatar}
                            alt={student.name}
                          />
                        ) : (
                          <AvatarFallback className="text-lg font-bold">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="max-w-[60px] truncate text-center text-xs">
                        {student.name}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List with Stamps - Right 1/4 */}
        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Stamps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student: StudentStamp) => (
                  <StudentStampCard
                    key={student.id}
                    student={student}
                    icon={stampTypesMapObj.get(student.stampTypeId)?.icon}
                    iconColor={stampTypesMapObj.get(student.stampTypeId)?.color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Extract the student stamp display to a component

function StudentStampCard({
  student,
  icon: Icon = Stamp,
  iconColor = "text-yellow-600",
}: {
  student: StudentStamp;
  icon?: React.ElementType;
  iconColor?: string;
}) {
  return (
    <div
      key={student.id}
      className="flex flex-row justify-between gap-2 rounded-lg border p-4"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-5 w-5">
          <AvatarImage src={student.avatar} />
          <AvatarFallback>
            {student.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-muted-foreground text-sm">
            {student.internationalName}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${iconColor}`} />
            <span className="font-medium">{student.stamps}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
