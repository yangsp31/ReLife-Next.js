//이미지 박스를 클릭하면 이미지를 업로드하고, 버튼을 클릭하면 example주소로 가는 코드
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = () => {
    window.open('\showSingleImage\page.js', '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto py-12 md:py-16 bg-gradient-to-r from-[#e0b0ff] to-[#add8e6]">
      <div className="flex items-center justify-center">
        <label htmlFor="upload-image" className="cursor-pointer">
          <img
            alt="Placeholder"
            className="rounded-xl"
            height="500"
            src={selectedImage || '/placeholder.svg'}
            style={{
              aspectRatio: "500/500",
              objectFit: "cover",
            }}
            width="500"
          />
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="flex flex-col items-start justify-center space-y-6">
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="category">
            Select Category
          </Label>
          <Select className="w-full" id="category">
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="illustration">Illustration</SelectItem>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="print">Print</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="space-type">
            Select Space Type
          </Label>
          <Select className="w-full" id="space-type">
            <SelectTrigger>
              <SelectValue placeholder="Select Space Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="design-theme">
            Select Design Theme
          </Label>
          <Select className="w-full" id="design-theme">
            <SelectTrigger>
              <SelectValue placeholder="Select Design Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="vintage">Vintage</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="color-preference">
            Select Color Preference
          </Label>
          <Select className="w-full" id="color-preference">
            <SelectTrigger>
              <SelectValue placeholder="Select Color Preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="vibrant">Vibrant</SelectItem>
              <SelectItem value="pastel">Pastel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          type="button"
          onClick={handleGenerateClick} 
        >
          Generate
        </Button>
      </div>
    </div>
  )
}
