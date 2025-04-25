import { Text, View } from "react-native";
import Card from "@/components/Card";
import ImageCard from "@/components/ImageCard";
export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Edit app/index.tsx to edit this screen!.</Text>
            <Card title="New Card">
                <Text>This is a Card shown in the app.</Text>
            </Card>
            <ImageCard title="New ImageCard" imageUrl={require("../assets/images/cheeseburger.png")}>
                <Text>This is a ImageCard shown in the app.</Text>
            </ImageCard>
        </View>
    );
}