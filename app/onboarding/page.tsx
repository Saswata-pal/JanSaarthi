"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Wallet, Calendar, Users, FileText, ArrowRight } from "lucide-react"

export default function Onboarding() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        studentType: "",
        income: "",
        age: "",
        gender: "",
        caste: "",
        reason: ""
    })

    const submit = async () => {
        // Validation
        if (!form.studentType || !form.income || !form.age || !form.gender || !form.caste) {
            alert("Please fill all required fields")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/onboarding", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            if (!response.ok) {
                throw new Error("Failed to save onboarding data")
            }

            router.push("/dashboard")
        } catch (error) {
            console.error("Error:", error)
            alert("Something went wrong. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center py-8 px-6">
            <div className="max-w-md w-full mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                        Complete Your Profile
                    </h1>
                    <p className="text-sm font-medium text-gray-500 tracking-wide">
                        Help us personalize your experience ✨
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6"
                >
                    <div className="space-y-3.5">
                        {/* Select Your Type */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                <User className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                                Select Your Type <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                value={form.studentType}
                                onChange={e => setForm({ ...form, studentType: e.target.value })}
                                className="onboarding-input"
                                required
                            >
                                <option value="">Select your type</option>
                                <option value="Student">Student</option>
                                <option value="Employee">Employee</option>
                                <option value="Businessman">Businessman</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Farmer">Farmer</option>
                            </select>
                        </div>

                        {/* Range of Income */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                <Wallet className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                                Range of Income <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., ₹20,000 - ₹50,000"
                                value={form.income}
                                onChange={e => setForm({ ...form, income: e.target.value })}
                                className="onboarding-input"
                                required
                            />
                        </div>

                        {/* Age & Gender - Side by side */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                                    Age <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={form.age}
                                    onChange={e => setForm({ ...form, age: e.target.value })}
                                    min="1"
                                    max="120"
                                    className="onboarding-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                    <Users className="w-3.5 h-3.5 mr-1.5 text-pink-600" />
                                    Gender <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    value={form.gender}
                                    onChange={e => setForm({ ...form, gender: e.target.value })}
                                    className="onboarding-input"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* Caste */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                <FileText className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                                Caste <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                value={form.caste}
                                onChange={e => setForm({ ...form, caste: e.target.value })}
                                className="onboarding-input"
                                required
                            >
                                <option value="">Select your caste</option>
                                <option value="SC">SC (Scheduled Caste)</option>
                                <option value="ST">ST (Scheduled Tribe)</option>
                                <option value="OBC">OBC (Other Backward Class)</option>
                                <option value="UR">UR (Unreserved/General)</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Reason (Optional) */}
                        <div>
                            <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                                <FileText className="w-3.5 h-3.5 mr-1.5 text-cyan-600" />
                                Your opinion about JanSaarthi <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                            </label>
                            <textarea
                                placeholder="Share your thoughts..."
                                value={form.reason}
                                onChange={e => setForm({ ...form, reason: e.target.value })}
                                rows={2}
                                className="onboarding-input resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={submit}
                            disabled={loading}
                            className="onboarding-submit-button"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <span>Save & Continue</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-xs text-gray-500 mt-4"
                >
                    🔒 Your information is secure and private
                </motion.p>
            </div>
        </div>
    )
}
