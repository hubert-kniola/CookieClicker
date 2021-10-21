import React, { Component, FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { StateFormat } from "../constants/const";
// import { Roboto_700Bold } from "@expo-google-fonts/dev";

type Props = {
  gameState: StateFormat;
  addCookies: (value: number) => void;
};

export const CookieButton: FC<Props> = ({ gameState, addCookies }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => addCookies(1)}>
        <Image style={styles.cookie} source={require('./banana.png')} />
      </TouchableOpacity>
      <Text style={styles.number1}>
        Bananów: {Math.round(gameState.cookies * 100) / 100}
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
    backgroundColor: "#ffff99",
  },
  number1: {
    textAlign: "center",
    fontSize: 30,
    color: 'white',
    // fontFamily: Roboto_700Bold,
    paddingTop: 15,
    backgroundColor: "#000000",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 3,
    width: '100%',
    fontWeight: "bold",
    // borderWidth: 5,
    // borderLeftColor: 'white',
    // borderRightColor: 'white',
    // borderTopColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  number2: {
    textAlign: "center",
    fontSize: 30,
    color: 'white',
    // fontFamily: Roboto_700Bold,
    paddingTop: 8,
    backgroundColor: "#000000",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 5,
    width: '100%',
    paddingBottom: 10,
    fontWeight: "bold",
    // borderWidth: 5,
    // borderLeftColor: 'white',
    // borderRightColor: 'white',
    // borderBottomColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cookie: {
    width: '90%',
    height: 362,
    marginTop: '15%',
    marginLeft: "auto",
    marginRight: "auto",
  },
});
