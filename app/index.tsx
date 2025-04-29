import { Text, View } from "react-native";
import HomePage from "@/HomePage";
import Card from "@/components/Card";
import ImageCard from "@/components/ImageCard";
 function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <HomePage/>

        </View>
    );
}
export default Index