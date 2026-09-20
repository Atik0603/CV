export interface Project {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string[];  // array of bullet points, remember?
  mediaUrl: string;
  mediaType: "image" | "video";
  color?: string;
  links: {
    label: string;
    url: string;
    
  }[];
}