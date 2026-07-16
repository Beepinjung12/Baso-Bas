import config from "@/app/config";


export function getRoomImageUrl(image) {

  if (!image) {
    return "/default-room.jpg";
  }


  // New Cloudinary object format
  if (typeof image === "object" && image.url) {
    return image.url;
  }


  // Cloudinary string URL
  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }


  // Old local image fallback
  if (typeof image === "string") {
    return `${config.apiUrl}${image}`;
  }


  return "/default-room.jpg";
}



export function getAllRoomImageUrls(images = []) {

  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }


  return images.map((image)=>{

    return getRoomImageUrl(image);

  });

}