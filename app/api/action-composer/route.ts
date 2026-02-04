import AwsAi from "@/lib/awsAi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const userPrompt = body.prompt;
    const existingContent = body.existingContent || "";
    const awsAi = AwsAi.getInstance();
    const prompt = `
    You are a legal drafting assistant.
    Task: Write a formal response based on the user request.
    
    User Request: ${userPrompt}
    Context: ${existingContent}

    RULES:
    1. Use standard Markdown formatting (**bold**, # Headings, - lists).
    2. Do NOT use HTML tags.
    3. Do NOT use code blocks (\`\`\`).
    4. Keep the tone professional.
    `;
    try {
        const responseText = await awsAi.generateText(prompt);    
        return new NextResponse(JSON.stringify({ text: responseText }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Error generating text:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to generate text" }))
    }
}