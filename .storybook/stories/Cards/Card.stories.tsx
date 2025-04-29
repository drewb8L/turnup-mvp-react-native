import React from "react";
import { Text } from "react-native";
import Card from "../../../app/components/Card";

const CardStory = () => (
  <Card title="From Storybook">
    <Text>This is a Card shown in Storybook.</Text>
  </Card>
);

export default {
  title: "Card",
  component: Card,
};

export const Default = CardStory;
