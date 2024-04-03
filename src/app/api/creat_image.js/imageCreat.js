curl --location 'https://api.reimaginehome.ai/v1/generate_image' \
--header 'api-key: {{api-key}}' \
--header 'Content-Type: application/json' \
--data '{
"image_url": "https://example.com/image.png",
    "mask_urls": [
    "https://example.com/segment1.png",
    "https://example.com/segment2.png"
],
    "mask_category": "furnishing",
    "space_type": "ST-INT-003",
    "design_theme": "DT-INT-008",
    "masking_element": "",
    "color_preference": "green,yellow,black",
    "material_preference": "",
    "landscaping_preference": "",
    "generation_count": 3,
    "additional_prompt": "add floral pattern",
    "webhook_url": "https://example.com/mywebhook/endpoint"
}'