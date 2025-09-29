import axiosClient from "@/connectors/AxiosRestConnector";
import { ApplyEnrollmentPayload } from "@/types/enrollment/payload";

export const applyForEnrollment = async (payload: ApplyEnrollmentPayload) => {
  const { data } = await axiosClient.post("/enrollment", payload);

  return data;
};
