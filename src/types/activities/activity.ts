export type ActivityCreatePayload = {
  name: string;
  point: number;
  category: string;
};

export type ActivityUpdatePayload = Partial<ActivityCreatePayload>;

export type ActivityResponseDto = {
  id: number;
  name: string;
  point: number;
  category: string;
};

export type ActivityCategory = string;

export type ActivitiesListResponse = ActivityResponseDto[];
