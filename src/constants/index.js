import { Platform, Dimensions } from "react-native";

export const USER_TOKEN = "USER_TOKEN";
export const IOS = Platform.OS === "ios";
export const SEEN_INTRO = "SEEN_INTRO";
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
