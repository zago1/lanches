import { StyleSheet, StatusBar, Platform } from "react-native";

const statusBarHeight = Platform.OS === "ios" ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flatList: {
    marginTop: 10,
    paddingHorizontal: 15
  },
  itemSeparator: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  }
});

export default styles;
