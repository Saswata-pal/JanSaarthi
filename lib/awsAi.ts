import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

class AwsAi {
    private static instance: AwsAi;
    private client: BedrockRuntimeClient;
    private modelId = "us.meta.llama3-2-90b-instruct-v1:0"
    constructor(region: string) {
        this.client = new BedrockRuntimeClient({
            region,
        });
    }
    static getInstance() {
        if (!AwsAi.instance) {
            AwsAi.instance = new AwsAi("us-west-2");
        }
        return AwsAi.instance;
    }
    async generateText(userMessage: string): Promise<string> {
        const prompt = `
        <|begin_of_text|><|start_header_id|>user<|end_header_id|>
        ${userMessage}
        <|eot_id|>
        <|start_header_id|>assistant<|end_header_id|>`;
        const response = await this.client.send(
            new InvokeModelCommand({
                contentType: "application/json",
                body: JSON.stringify({ prompt }),
                modelId: this.modelId,
            })
        )
        const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));
        const responseText = nativeResponse.generation;

        return responseText;
    }
}
export default AwsAi;