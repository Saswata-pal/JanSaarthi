import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    try {
        // Create onboarding record
        await prisma.onboarding.create({
            data: {
                userId: session.user.id,
                studentType: body.studentType,
                income: body.income,
                age: Number(body.age),
                gender: body.gender,
                caste: body.caste || null,
                reason: body.reason || null
            }
        })

        // Update user isOnboarded status
        await prisma.user.update({
            where: { id: session.user.id },
            data: { isOnboarded: true }
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error("Onboarding error:", error)
        return Response.json({ error: "Failed to save onboarding data" }, { status: 500 })
    }
}
