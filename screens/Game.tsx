import React, { useEffect, useState, FC, useCallback } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
  Modal,
} from "react-native";
import { CookieButton } from "../components/Cookie";
import { Shop } from "../components/Shop";
import { StateFormat, ItemFormat } from "../constants/const";
import { stateInit } from "../constants/const";
import {
  AdMobBanner,
  AdMobRewarded,
} from "expo-ads-admob";

type ButtonProps = {
  setGameState: (x: StateFormat) => void;
  title: string;
};

const Button: FC<ButtonProps> = ({ setGameState, title }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Pressable
      style={styles(width, height).button}
      onPress={() => setGameState(stateInit)}
    >
      <Text style={styles(width, height).text}>{title}</Text>
    </Pressable>
  );
};

export const Game = () => {
  const androidBannerId = "ca-app-pub-3121452947741059/2364429643";
  const { width, height } = useWindowDimensions();
  const [gameState, setGameState] = useState<StateFormat>(stateInit);
  const initRewardAds = async () => {
    await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/6300978111");
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  const addCookies = (value: number, cps: number, amount: number) => {
    setGameState({
      ...gameState,
      cookies: gameState.cookies + value + cps * amount,
    });
  };

  const addCPS = (value: number) => {
    setGameState({
      ...gameState,
      cps: gameState.cps + value,
    });
  };

  const incrementAmountOwned = (value: number[]) => {
    gameState.amountOwned = value;
    setGameState({
      ...gameState,
    });
  };

  const overrideCookies = (value: number) => {
    gameState.cookies = value;
    setGameState({
      ...gameState,
    });
  };

  const editNumber = (state: StateFormat, i: number) => {
    return state.amountOwned.map((item: number, j: number) => {
      if (j === i) {
        return item + 1;
      } else {
        return item;
      }
    });
  };

  const buyFromShop = (cost: number) => {
    gameState.shops.map((obj: StateFormat, i: number) => {
      if (parseInt(gameState.shops[i].cost) === cost) {
        incrementAmountOwned(editNumber(gameState, i));
        overrideCookies(gameState.cookies - cost);
        addCPS(gameState.shops[i].clicks_per_second);
      }
    });
  };

  const calcCPS = () => {
    let individual = gameState.shops.map((a: ItemFormat) => {
      const ind = a.clicks_per_second * gameState.amountOwned[a.id];
      return ind;
    });
    let output = 0;
    individual.map((i: number) => {
      output += i;
    });
    //editState("cps", output);
    //addCookies(output);
  };

  //useEffect(() => {
  //    //setInterval(calcCPS, 1000);
  // }, []);

  return (
    <View style={styles(width, height).container}>
      <AdMobBanner
        style={styles(width, height).banner}
        bannerSize="fullBanner"
        adUnitID={"ca-app-pub-3940256099942544/6300978111"}
        servePersonalizedAds={false}
      />
      <Button title={"Nowa Gra"} setGameState={setGameState}></Button>
      <CookieButton gameState={gameState} addCookies={addCookies} />
      <Shop gameState={gameState} buyFromShop={buyFromShop} />
    </View>
  );
};

const styles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#ffff99",
      height: height,
      width: width,
    },
    button: {
      width: 0.2 * width,
      height: 0.05 * height,
      padding: 2,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 6,
      color: "black",
      fontWeight: "bold",
      backgroundColor: "#fccf10",
      borderRadius: 15,
      marginRight: "auto",
      marginTop: 0.005 * height,
      marginLeft: 0.04 * width,
      borderWidth: 3,
      borderTopColor: "black",
      borderLeftColor: "black",
      borderRightColor: "black",
      borderBottomColor: "transparent",
    },
    banner: {
      width:'100%',
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "black",
      fontWeight: "bold",
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
