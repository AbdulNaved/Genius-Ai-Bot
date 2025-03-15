import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from "ai";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const images: string[] = reqBody.data?.images
      ? JSON.parse(reqBody.data.images)
      : [];
    const imageParts = filesArrayToGenerativeParts(images);
    const messages: Message[] = reqBody.messages;

    let modelName: string;
    let promptWithParts: any;

    if (imageParts.length > 0) {
      modelName = "gemini-1.5-flash"; // Use flash model for images
      const prompt =
        messages.filter((msg) => msg.role === "user").pop()?.content || "";
      promptWithParts = [prompt, ...imageParts];
    } else {
      modelName = "gemini-1.5-pro-latest"; // Use latest text model
      promptWithParts = buildGoogleGenAIPrompt(messages);
    }

    // Initialize Generative AI
    const apiKey = process.env.GOOGLE_API_KEY || "";
    if (!apiKey) {
      console.error("GOOGLE_API_KEY is not set");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
      });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log("MODEL NAME:", modelName);
    console.log("PROMPT WITH PARTS:", promptWithParts);

    const streamingResponse = await model.generateContentStream({
      contents: promptWithParts,
    });

    return new StreamingTextResponse(
      GoogleGenerativeAIStream(streamingResponse),
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// Helper function to format text prompts
function buildGoogleGenAIPrompt(messages: Message[]) {
  return messages
    .filter((msg) => msg.role === "user" || msg.role === "assistant")
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));
}

// Helper function to process images
function filesArrayToGenerativeParts(images: string[]) {
  return images.map((imageData) => {
    const base64Data = imageData.split(",")[1] || "";
    const mimeType = imageData.match(/data:(.*?);base64/)?.[1] || "image/png";

    return {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };
  });
}
