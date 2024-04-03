import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.reimaginehome.ai/v1/create_mask', {
                image_url: "https://example.com/image.png",
                webhook_url: "https://example.com/mywebhook/endpoint"
            }, {
                headers: {
                    'api-key': '{{api-key}}', // Replace with your actual API key
                    'Content-Type': 'application/json'
                }
            });

            // Send the response from the external API back to the client
            res.status(200).json(response.data);
        } catch (error) {
            // Handle errors
            res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        // Handle any other HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
