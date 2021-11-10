import React, { Component, FC, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { StateFormat, rand, arrayObj } from "../constants/const";
// import { Roboto_700Bold } from "@expo-google-fonts/dev";

type Props = {
  gameState: StateFormat;
  addCookies: (value: number, cps: number, amount: number) => void;
};

export const CookieButton: FC<Props> = ({ gameState, addCookies }) => {
  const { width, height } = useWindowDimensions();
  const [array, setArray] = useState(arrayObj);
  const [row, setRow] = useState(rand());
  const [cell, setCell] = useState(rand());
  const [counter, setCounter] = useState(0);

  const setActive = (row_ID: number, cell_ID: number) => {
    if (row === row_ID && cell_ID === cell) {
      addCookies(1, gameState.cps, 2);
    }
  };

  useEffect(() => {
    const i = setInterval(() => {
      let row_ID = rand();
      let cell_ID = rand();

      while (row_ID === row && cell_ID === cell) {
        row_ID = rand();
        cell_ID = rand();
      }

      setRow(row_ID);
      setCell(cell_ID);
    }, 1000);

    return () => clearInterval(i);
  }, [row, cell]);

  return (
    <View>
      <View style={styles(width, height).chessview}>
        {array.map((item, row_ID) => {
          return (
            <View style={styles(width, height).row} key={row_ID}>
              {item.map((obj, cell_ID) => {
                return (
                  <View key={cell_ID} style={styles(width, height).cellview}>
                    {row_ID === row && cell_ID === cell ? (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles(width, height).container}
                        onPress={() => setActive(row_ID, cell_ID)}
                      >
                        <Image
                          style={styles(width, height).cookie}
                          source={require("./banana.png")}
                        />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
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
      backgroundColor: "transparent",
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
      width: 0.2 * width,
      height: 0.1 * height,
    },
    row: {
      width: 0.7 * width,
      flexDirection: "row",
      justifyContent: "space-around",
      height: 80,
      marginLeft: "auto",
      marginRight: "auto",
      borderColor: "white",
      borderWidth: 3,
      borderRadius: 5,
    },
    chessview: {
      alignItems: 'center',
      flex: 1,
      width: 40,
      height: 40,
      marginBottom: 300,
      marginTop: 10,
      marginLeft: 0.15 * width,
    },
    cellview: {
      flex: 1,
      width: 65,
      height: 75,
      backgroundColor: "black",
      borderLeftWidth: 3,
      borderColor: "white",
      borderRadius: 5,
    },
  });
