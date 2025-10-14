export type CreateArticlePayload = {
  thumbnail: string;
  title: string;
  tags?: string[];
  content: string;
};

export type GetAllArticlesPayload = {
  page?: number;
  limit?: number;
  searchTitle?: string;
  tags?: string[];
};

export type UpdateArticlePayload = Partial<CreateArticlePayload>;

export type ReviewArticlePayload = { isPublished: boolean };
