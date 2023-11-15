import { Configuration, OpenAIApi } from "openai";
require('dotenv').config()

export class OpenAI {
    constructor(apikey) {
        this.openai = new OpenAIApi(new Configuration({apikey}))
    }
    async generateText(prompt, model, max_tokens, temperature=0.85) {
        try {

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}