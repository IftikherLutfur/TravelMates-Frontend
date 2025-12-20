/* eslint-disable react-hooks/rules-of-hooks */
import UserProfile from "@/components/UserProfile/UserPrfile";
import axios from "axios";
import { cookies } from "next/headers";
const userData = {
    profileImage: "https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/535779979_2241541259641273_2460970773337803536_n.jpg?_nc_cat=105&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u2qHoArMXvEQ7kNvwFsJDpD&_nc_oc=AdkGXaOwPl8yy7Qxl4mT8S1sF9TZvc5wcaow6xXDMIqLXnxF2i4ii-PjNS7ZSwyDxyY&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=gzWsV0FMGwMYz1jUngFGdg&oh=00_AfnmL9ym7Bzccthu-fiLmBFhnG3GmoXAqNTOzsNahYJVIQ&oe=6941AF7F",
    fullName: "Iftikher Lutfur Abdullah",
    travelInterests: ["Hiking", "Photography", "Food Tours"],
    visitedCountries: ["Bangladesh", "India"],
    bio: "Travel lover, foodie, and adventure seeker."
};

<UserProfile user={userData} />



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
    console.log(user, "hellooo")
    return (
        <div>
            <UserProfile user={userData} />
        </div>
    );
};

export default page;