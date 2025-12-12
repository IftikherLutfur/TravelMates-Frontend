"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        travelInterests: "",
        visitedCountries: "",
        currentLocation: "",
        profileImage: "",
    });

    const [imagePreview, setImagePreview] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle image upload to Cloudinary / ImgBB
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagePreview(URL.createObjectURL(file));

        const form = new FormData();
        form.append("image", file);

        // ImgBB upload endpoint
        const API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: "POST",
            body: form,
        });

        const data = await res.json();
        setFormData({ ...formData, profileImage: data.data.url });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registration Data:", formData);
        // TODO: Send registration data to backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6 text-center">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block mb-1 font-medium">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 mt-2 rounded object-cover"
                            />
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block mb-1 font-medium">Bio / About</label>
                        <textarea
                            name="bio"
                            rows={3}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Travel Interests */}
                    <div>
                        <label className="block mb-1 font-medium">Travel Interests (e.g., Hiking, Food Tours)</label>
                        <input
                            type="text"
                            name="travelInterests"
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Visited Countries */}
                    <div>
                        <label className="block mb-1 font-medium">Visited Countries</label>
                        <input
                            type="text"
                            name="visitedCountries"
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Bangladesh, India, Nepal"
                        />
                    </div>

                    {/* Current Location */}
                    <div>
                        <label className="block mb-1 font-medium">Current Location</label>
                        <input
                            type="text"
                            name="currentLocation"
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Dhaka, Bangladesh"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
