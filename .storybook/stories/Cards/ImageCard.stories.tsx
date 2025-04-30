import React from "react";
import { Text } from "react-native";
import ImageCard from "@/components/ImageCard";

const ImageCardStory = () => (
  <ImageCard
    title="From Storybook"
    imageUrl={require("../../../assets/images/cheeseburger.png")}
  >
    <Text>This is a ImageCard shown in Storybook.</Text>
  </ImageCard>
);
export default {
  title: "ImageCard",
  component: ImageCard,
};
export const Default = ImageCardStory;
