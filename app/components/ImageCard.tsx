import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Image,
} from "react-native";

export type ImageCardProps = {
  title: string;
  imageUrl: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const ImageCard = ({ title, children, imageUrl, style }: ImageCardProps) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginBottom: 8,
    resizeMode: "cover",
  },
});

export default ImageCard;
