export type ReferenceSessionDto = {
  id: number;
  thumbnail?: string;
  title: string;
  course: {
    id: string;
    title: string;
    description: string;
  };
};
