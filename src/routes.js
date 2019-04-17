import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Lanches from "./pages/Lanches";
import Detalhes from "./pages/Detalhes";

const AppContainer = createStackNavigator(
  {
    Lanches: {
      screen: Lanches,
      navigationOptions: {
        title: "Lanches",
        headerTintColor: "#F1F1F1",
        headerStyle: {
          backgroundColor: "#f4511e"
        }
      }
    },
    Detalhes: {
      screen: Detalhes
    }
  },
  {
    initialRouteName: "Lanches"
  }
);

export default createAppContainer(AppContainer);
