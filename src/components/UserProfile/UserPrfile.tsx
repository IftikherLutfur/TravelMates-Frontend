/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

const UserProfile = ({ user }: {user:any}) => {
    const {
        profileImage,
        fullName,
        travelInterests,
        visitedCountries,
        bio
    } = user || {};

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
                {/* Profile Image */}
                <Image 
                    src={profileImage} 
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-28 h-28 rounded-full object-cover border"
                />

                {/* Name */}
                <h2 className="text-2xl font-semibold mt-4">{fullName}</h2>

                {/* Bio */}
                <p className="text-gray-600 mt-2 text-center">{bio}</p>

                {/* Travel Interests */}
                <div className="mt-4 w-full">
                    <h3 className="font-semibold text-lg">Travel Interests</h3>
                    <p className="text-gray-700">
                        {travelInterests?.length > 0 
                            ? travelInterests.join(", ") 
                            : "No travel interests added"}
                    </p>
                </div>

                {/* Visited Countries */}
                <div className="mt-4 w-full">
                    <h3 className="font-semibold text-lg">Visited Countries</h3>
                    <p className="text-gray-700">
                        {visitedCountries?.length > 0 
                            ? visitedCountries.join(", ") 
                            : "No countries visited yet"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
