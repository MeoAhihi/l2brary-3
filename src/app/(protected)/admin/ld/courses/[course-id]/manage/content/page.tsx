import { Metadata } from "next";
// import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  ChevronDown,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Course Content | Admin | L2brary",
  description: "Manage course content, modules, and curriculum",
};

// interface ContentPageProps {
//     params: Promise<{
//         "course-id": string;
//     }>;
// }

// Mock data for course content
const modules = [
  {
    id: 1,
    title: "Introduction to Physics",
    description: "Basic concepts and principles of physics",
    status: "published",
    lessons: [
      {
        id: 1,
        title: "What is Physics?",
        type: "video",
        duration: "15 min",
        status: "published",
      },
      {
        id: 2,
        title: "Scientific Method",
        type: "document",
        duration: "10 min",
        status: "draft",
      },
      {
        id: 3,
        title: "Units and Measurements",
        type: "quiz",
        duration: "20 min",
        status: "published",
      },
    ],
  },
  {
    id: 2,
    title: "Mechanics",
    description: "Study of motion and forces",
    status: "draft",
    lessons: [
      {
        id: 4,
        title: "Newton's Laws",
        type: "video",
        duration: "25 min",
        status: "published",
      },
      {
        id: 5,
        title: "Kinematics",
        type: "document",
        duration: "30 min",
        status: "draft",
      },
    ],
  },
  {
    id: 3,
    title: "Thermodynamics",
    description: "Heat, energy, and entropy",
    status: "published",
    lessons: [
      {
        id: 6,
        title: "Temperature and Heat",
        type: "video",
        duration: "20 min",
        status: "published",
      },
      {
        id: 7,
        title: "First Law of Thermodynamics",
        type: "document",
        duration: "15 min",
        status: "published",
      },
    ],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    case "draft":
      return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
    case "archived":
      return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4 text-blue-600" />;
    case "document":
      return <FileText className="h-4 w-4 text-green-600" />;
    case "quiz":
      return <LinkIcon className="h-4 w-4 text-purple-600" />;
    case "image":
      return <Image className="h-4 w-4 text-orange-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export default function ContentPage(/*{ params }: ContentPageProps*/) {
  // const { "course-id": courseId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Course Content</h2>
          <p className="text-muted-foreground">
            Manage modules, lessons, and course materials
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Content
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {modules.length}
              </div>
              <div className="text-muted-foreground text-sm">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {modules.reduce(
                  (acc, module) => acc + module.lessons.length,
                  0,
                )}
              </div>
              <div className="text-muted-foreground text-sm">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {modules.filter((m) => m.status === "published").length}
              </div>
              <div className="text-muted-foreground text-sm">
                Published Modules
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12.5 hrs</div>
              <div className="text-muted-foreground text-sm">
                Total Duration
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {modules.map((module) => (
          <Collapsible key={module.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(module.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Module
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Lesson
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="hover:bg-accent flex items-center justify-between rounded-lg border p-3 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getContentTypeIcon(lesson.type)}
                          <div>
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-muted-foreground text-sm">
                              {lesson.type} • {lesson.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(lesson.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="mb-2 h-6 w-6" />
              <span>Add New Module</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Video className="mb-2 h-6 w-6" />
              <span>Upload Video</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="mb-2 h-6 w-6" />
              <span>Create Document</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
