import { PaginatedResponse } from "../api";
import { RefUserDto } from "../user/ref-user.dto";

export type ArticleResponseDto = {
  id: string;
  thumbnail: string;
  title: string;
  content: string;
  author: RefUserDto;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArticleListItemDto = {
  id: string;
  title: string;
  author: RefUserDto;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArticleListResponse = PaginatedResponse<ArticleListItemDto>;
