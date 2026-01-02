import Image from "next/image";

type Review = {
    id: string;
    comment: string;
    rating: number;
};

const UserProfile = ({
    profileImage,
    fullName,
    email,
    visitedCountries = [],
    upcomingPlans = [],
    reviews = [],
    isOwnProfile = false,
}: {
    profileImage?: string;
    fullName: string;
    email: string;
    visitedCountries?: string[];
    upcomingPlans?: string[];
    reviews?: Review[];
    isOwnProfile?: boolean;
}) => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
                {/* Profile Image */}
                <Image
                    src={profileImage || "/default-avatar.png"}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full border object-cover"
                />

                <h2 className="text-2xl font-semibold mt-4">{fullName}</h2>
                <p className="text-gray-600">{email}</p>

                {/* Edit Profile */}
                {isOwnProfile && (
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Visited Countries */}
            <div className="mt-6">
                <h3 className="font-semibold text-lg">Visited Countries</h3>
                <p>
                    {visitedCountries.length > 0
                        ? visitedCountries.join(", ")
                        : "No countries visited yet"}
                </p>
            </div>

            {/* Upcoming Plans */}
            <div className="mt-6">
                <h3 className="font-semibold text-lg">Upcoming Plans</h3>
                <p>
                    {upcomingPlans.length > 0
                        ? upcomingPlans.join(", ")
                        : "No upcoming plans"}
                </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
                <h3 className="font-semibold text-lg">Reviews</h3>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border p-3 rounded mt-2">
                            <p className="text-sm">{review.comment}</p>
                            <p className="text-xs text-gray-500">
                                Rating: ⭐ {review.rating}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
