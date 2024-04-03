import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.reimaginehome.ai/v1/generate_image', {
                image_url: "https://example.com/image.png",
                mask_urls: [
                    "https://example.com/segment1.png",
                    "https://example.com/segment2.png"
                ],
                mask_category: "furnishing",
                space_type: "ST-INT-003",
                design_theme: "DT-INT-008",
                masking_element: "",
                color_preference: "green,yellow,black",
                material_preference: "",
                landscaping_preference: "",
                generation_count: 3,
                additional_prompt: "add floral pattern",
                webhook_url: "https://example.com/mywebhook/endpoint"
            }, {
                headers: {
                    'api-key': '{{66095c56de31a56778e0b85f}}',
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