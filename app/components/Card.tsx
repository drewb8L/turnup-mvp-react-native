import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type CardProps = {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

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
});
