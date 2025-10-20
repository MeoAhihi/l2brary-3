import axiosClient from "@/connectors/AxiosRestConnector";

export async function getUsersByRank() {
  const response = await axiosClient.get("/demographic/rank");
  return response;
}

export async function getUsersByGender() {
  const response = await axiosClient.get("/demographic/gender");
  return response;
}

export async function getUsersByAge() {
  const response = await axiosClient.get("/demographic/age");
  return response;
}
