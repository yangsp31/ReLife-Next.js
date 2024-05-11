import { CardContent, Card } from "@/components/ui/card";
import bgImage from "/path/to/1.gif";
import image2 from "/path/to/2.png";
import image3 from "/path/to/3.png"; 
import image4 from "/path/to/4.png";

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <h2 className="text-4xl font-bold mb-8 text-black">Resources</h2>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div>
          <Card className="bg-white">
            <div className="relative">
              <img
                alt="REimagine logo"
                className="w-full h-72 object-cover"
                src={image2}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
              />
            </div>
            <CardContent className="space-y-2 p-4">
              <h5 className="text-lg font-bold">REimagine ai</h5>
              <p className="text-sm text-gray-500">Stylodod AI</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white">
            <div className="relative">
              <img
                alt="DALL-E 2 logo"
                className="w-full h-72 object-cover"
                src={image3}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
              />
            </div>
            <CardContent className="space-y-2 p-4">
              <h5 className="text-lg font-bold">DALL E2</h5>
              <p className="text-sm text-gray-500">OpenAI</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white">
            <div className="relative">
              <img
                alt="Panorama"
                className="w-full h-72 object-cover"
                src={image4}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
              />
            </div>
            <CardContent className="space-y-2 p-4">
              <h5 className="text-lg font-bold">Panorama</h5>
              <p className="text-sm text-gray-500">Cityscape</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}