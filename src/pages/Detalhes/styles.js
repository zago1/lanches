import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {
    justifyContent: "space-between"
  },
  renderViewContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between"
  },
  flatList: {
    paddingHorizontal: 15,
    marginBottom: 0
  },
  title: {
    color: "#777",
    fontSize: 18,
    fontWeight: "bold"
  },
  totalContainer: {
    backgroundColor: "#FFF",
    height: 62,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,

    borderTopWidth: 1,
    borderTopColor: "#DDD"
  },
  totalText: {
    color: "#F1F1F1",
    fontSize: 18,
    fontWeight: "bold"
  },
  itemSeparator: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  },
  addButton: {
    backgroundColor: "#f4511e",
    width: "100%",
    height: 38,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 3
  }
});

export default styles;
