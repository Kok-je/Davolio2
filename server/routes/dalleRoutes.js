import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// ensure environment variables are populated
dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Davolio!' });
});

router.route('/').post(async (req, res) => {
    try {
        // prompt comes from frontend side
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        // get the image out of aiResponse
        const image = aiResponse.data.data[0].b64_json;
        // get image and sent back to frontend side
        res.status(200).json({ photo: image });

    } catch (error) {
        console.log(error);
        res.status(200).send(error?.response.data.error.message || 'Something broke you fool!');
    }
});

export default router;