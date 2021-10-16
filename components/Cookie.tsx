import React, { Component, FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { StateFormat } from "../constants/const";
import { Roboto_700Bold } from "@expo-google-fonts/dev";

import cookie_png from "../assets/cookie.png";

type Props = {
  gameState: StateFormat;
  addCookies: (value: number) => void;
};

export const CookieButton: FC<Props> = ({ gameState, addCookies }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => addCookies(1)}>
        <Image style={styles.cookie} source={cookie_png} />
      </TouchableOpacity>
      <Text style={styles.number1}>
        Cookies: {Math.round(gameState.cookies * 100) / 100}
      </Text>
      <Text style={styles.number2}>
        CPS: {Math.round(gameState.cps * 100) / 100}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "#e7c28d",
  },
  number1: {
    textAlign: "center",
    fontSize: 30,
    color: 'white',
    fontFamily: Roboto_700Bold,
    paddingTop: 15,
    backgroundColor: "#915c3a",
    marginRight: "auto",
    marginLeft: "auto",
    width: 270,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  number2: {
    textAlign: "center",
    fontSize: 30,
    color: 'white',
    fontFamily: Roboto_700Bold,
    paddingTop: 15,
    backgroundColor: "#915c3a",
    marginRight: "auto",
    marginLeft: "auto",
    width: 270,
    paddingBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cookie: {
    width: 320,
    height: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
