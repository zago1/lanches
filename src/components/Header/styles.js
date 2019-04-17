import { StyleSheet, StatusBar, Platform } from "react-native";

const statusBarHeight = Platform.OS === "ios" ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ef7326",
    height: 58 + statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  titleContainer: {},
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default styles;
