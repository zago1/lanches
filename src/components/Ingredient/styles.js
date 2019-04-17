import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold"
  },
  price: {
    color: "#51a773",
    fontSize: 14
  },
  actionContainer: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});

export default styles;
