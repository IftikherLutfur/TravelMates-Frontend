import { getRawToken } from "@/lib/auth-utils";
import axios from "axios";

const getOwnUser = async () => {
    const token = await getRawToken();

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data.data; // ✅ user return
};

export default getOwnUser;

export const myTravel = async () => {
   const token = await getRawToken();

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/travel/myTravels`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
   console.log(res)
    return res.data.data;
}
