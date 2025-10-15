export type CountUserByRankItem = {
  rank: string;
  count: number;
};

export type CountUserByRankResponse = CountUserByRankItem[];
export type CountUserByGenderItem = {
  gender: string;
  count: number;
};

export type CountUserByGenderResponse = CountUserByGenderItem[];

export type CountUserByAgeItem = {
  age: number;
  count: number;
};

export type CountUserByAgeResponse = CountUserByAgeItem[];
