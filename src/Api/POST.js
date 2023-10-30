import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { Get_User_Token } from "../utils/storageItems";

export async function POST_API(End_Point, data) {
  let Token = await Get_User_Token();

  try {
    const response = await axios.post(
      baseURL + End_Point,
      data,

      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function GET_API(End_Point) {
  let Token = await Get_User_Token();
  console.log(baseURL + End_Point);
  try {
    const response = await axios.get(
      baseURL + End_Point,

      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
