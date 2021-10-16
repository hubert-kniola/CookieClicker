import React, { Component, FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { StateFormat } from "../constants/const";

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
    backgroundColor: "#1a1a1a",
  },
  number1: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 15,
    backgroundColor: "#40ff00",
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '20%',
    marginTop: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  number2: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 15,
    backgroundColor: "#40ff00",
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '20%',
    paddingBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cookie: {
    width: "60%",
    height: '26rem',
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
