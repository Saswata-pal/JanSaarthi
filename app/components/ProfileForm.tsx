"use client";

import { useForm } from "react-hook-form";
import { ProfileFormData } from "@/types/Profile";

export default function ProfileForm() {
    const {
        register,
        handleSubmit,
    } = useForm<ProfileFormData>();

    const onSubmit = async (data: ProfileFormData) => {
        await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(data),
        });

        alert("Profile Saved!");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto space-y-4 p-6 shadow-lg rounded-xl"
        >
            <h2 className="text-2xl font-bold">
                Complete Your Profile
            </h2>

            {/* Category */}
            <select
                {...register("category")}
                className="w-full border p-2 rounded"
            >
                <option value="">Select Category</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Businessman</option>
                <option>Unemployed</option>
                <option>Farmer</option>
            </select>

            {/* Income */}
            <input
                placeholder="Source of Income"
                {...register("incomeSource")}
                className="w-full border p-2 rounded"
            />

            {/* Age */}
            <input
                type="number"
                placeholder="Age"
                {...register("age", { valueAsNumber: true })}
                className="w-full border p-2 rounded"
            />

            {/* Gender */}
            <select
                {...register("gender")}
                className="w-full border p-2 rounded"
            >
                <option value="">
                    Select Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
            </select>

            {/* Optional Section */}
            <div className="border-t pt-4">
                <p className="font-semibold">
                    Optional (Non-Preferable)
                </p>

                <input
                    placeholder="Caste"
                    {...register("caste")}
                    className="w-full border p-2 rounded mt-2"
                />
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}
