import React, { Component, FC } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { StateFormat } from "../constants/const";
// import { Roboto_700Bold } from "@expo-google-fonts/dev";

type Props = {
  gameState: StateFormat;
  addCookies: (value: number, cps: number, amount: number) => void;
};

export const CookieButton: FC<Props> = ({ gameState, addCookies }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles(width, height).container}
        onPress={() => addCookies(1, gameState.cps, 2)}
      >
        <Image
          style={styles(width, height).cookie}
          source={require("./banana.png")}
        />
      </TouchableOpacity>
      <Text style={styles(width, height).number1}>
        Bananów: {Math.round(gameState.cookies * 100) / 100}
      </Text>
      <Text style={styles(width, height).number2}>
        CPS: {Math.round(gameState.cps * 100) / 100}
      </Text>
    </View>
  );
};

const styles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      textAlign: "center",
      backgroundColor: "#ffff99",
    },
    number1: {
      textAlign: "center",
      fontSize: 20,
      color: "white",
      // fontFamily: Roboto_700Bold,
      paddingTop: 15,
      backgroundColor: "#000000",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: -0.05 * height,
      width: 0.9 * width,
      fontWeight: "bold",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderWidth: 3,
      borderTopColor: "white",
      borderLeftColor: "white",
      borderRightColor: "white",
      borderBottomColor: "black",
    },
    number2: {
      textAlign: "center",
      fontSize: 20,
      color: "white",
      // fontFamily: Roboto_700Bold,
      paddingTop: 0.01 * height,
      backgroundColor: "#000000",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: 5,
      marginTop: -0.01 * height,
      width: 0.9 * width,
      paddingBottom: 10,
      fontWeight: "bold",
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
    cookie: {
      width: 0.9 * width,
      height: 0.5 * height,
      marginTop: -0.09 * height,
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
