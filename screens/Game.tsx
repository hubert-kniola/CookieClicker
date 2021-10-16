import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { CookieButton } from "../components/Cookie";
import { Shop } from "../components/Shop";
import shops_json from "../components/shop.json";
import { StatusBar } from "expo-status-bar";

type StateFormat = {
  cookies: number;
  cps: number;
  amount_owned: number[];
  shops: any;
};

export const Game = () => {
  const stateInit = {
    cookies: 0,
    cps: 0,
    amount_owned: [0, 0, 0, 0, 0],
    shops: shops_json,
  };

  const [gameState, setGameState] = useState<StateFormat>(stateInit);

  const addCookies = (value: number) => {
    setGameState({
      ...gameState,
      cookies: gameState.cookies + value,
    });
  };

  const editState = (key: string, value: any) => {
    setGameState({
      ...gameState,
      [key]: value,
    });
  };

  const buyFromShop = (cost: number) => {
    for (let i = 0; i < gameState.shops.length; i++) {
      if (gameState.shops[i].cost === cost) {
        editState("amount_owned", (state: any) => {
          const amount_owned = state.amount_owned.map(
            (item: any, j: number) => {
              if (j === i) {
                return item + 1;
              } else {
                return item;
              }
            }
          );
          return { amount_owned };
        });
        editState("cookies", gameState.cookies - cost);
      }
    }
  };

  const calcCPS = () => {
    let individual = gameState.shops.map((a: any) => {
      const ind = a.clicks_per_second * gameState.amount_owned[a.id];
      return ind;
    });
    let output = 0;
    individual.map((i: number) => {
      output += i;
    });
    editState("cps", output);
    addCookies(output);
  };

  useEffect(() => {
    setInterval(calcCPS, 6000);
  }, []);

  return (
    <View style={styles.container}>
      <CookieButton gameState={gameState} addCookies={addCookies} />
      <Shop gameState={gameState} buyFromShop={buyFromShop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
});
