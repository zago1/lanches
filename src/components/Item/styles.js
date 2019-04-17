import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 5,
    marginHorizontal: 15,
    marginVertical: 10
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold"
  },
  description: {
    color: "#a1a1a1",
    fontSize: 14
  },
  price: {
    color: "#51a773",
    fontSize: 14
  }
});

export default styles;
