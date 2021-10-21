import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, FlatList, ScrollView  } from "react-native";
import { CookieButton } from "../components/Cookie";
import { Shop } from "../components/Shop";
import shops_json from "../data/shop.json";
import { StateFormat, ItemFormat } from "../constants/const";

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
     console.log(gameState);
   };

   const editState = (key: string, value: any) => {
     console.log(gameState);
     setGameState({
       ...gameState,
       [key]: value,
     });
     console.log(gameState);
   };

   const buyFromShop = (cost: number) => {
     gameState.shops.map((obj: ItemFormat, i: number) => {
       if (gameState.shops[i].cost === cost) {
         console.log(gameState.shops[i]);
         console.log(cost);
         editState("amount_owned", (state: StateFormat) => {
           const amount_owned = state.amount_owned.map(
             (item: number, j: number) => {
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
     });
   };

   const calcCPS = () => {
     let individual = gameState.shops.map((a: ItemFormat) => {
       const ind = a.clicks_per_second * gameState.amount_owned[a.id];
       return ind;
     });
     let output = 0;
     individual.map((i: number) => {
       output += i;
     });
     editState("cps", output);
     addCookies(output);
     console.log('cps:');
     console.log(gameState);
   };

  // useEffect(() => {
  //    setInterval(calcCPS, 6000);
  //  }, []);

  return (
    <View style={styles.container}>
      <CookieButton gameState={gameState} addCookies={addCookies}/>
      <Shop gameState={gameState} buyFromShop={buyFromShop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff99",
  },
});
