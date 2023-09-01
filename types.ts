import { CSSProperties, FunctionComponent } from "react";
import { IconType } from "react-icons";
export interface Service {
  Icon: IconType;
  title: string;
  about: string;
  url?: string;
  tags?: string[];
}

export interface Skill {
  Icon: IconType;
  name: string;
  level: string;
}

export interface IProject {
  name: string;
  description: string;
  image_path: string;
  deployed_url: string;
  github_url: string;
  category: Category[];
  key_techs: string[];
}

export interface Snippet {
  language: string;
  environment: string;
  description: string;
  snippet: string;
}

export interface Container {
  title: string;
  environment: string;
  description: string;
}

export interface CryptoWallet {
  network: string;
  symbol: string;
  address: string;
  url: string;
  image: string;
}

export interface SupportMe {
  title: string;
  url: string;
  image: string;
}

export interface SideBarIcon {
  Icon: IconType;
  title: string;
  url: string;
  style?: CSSProperties;
}

export type Category = "THREE.js" | "Rokoko" | "blockchain" | "Ableton" | "Github" | "Hubspot" | "wordpress" | "ue5" | "YouTube" 
