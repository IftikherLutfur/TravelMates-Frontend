/* eslint-disable react-hooks/rules-of-hooks */
import UserProfile from "@/components/UserProfile/UserPrfile";
import axios from "axios";
import { cookies } from "next/headers";

const page = async () => {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
        {
            headers: {
                Authorization: `${token}`,
            },
        }
    );

    const user = res.data.data; // ✅ FULL USER FROM DB
    console.log(user, "It is come fronm the userProfile page")
    return (
        <div>
            <UserProfile 
            email={user.email}
            fullName={user.name}
            />
        </div>
    );
};

export default page;