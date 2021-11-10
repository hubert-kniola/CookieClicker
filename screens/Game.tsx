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
import { AdMobBanner, AdMobRewarded, AdMobInterstitial } from "expo-ads-admob";

type ButtonProps = {
  onPress: (x?: any) => void;
  title: string;
};

const Button: FC<ButtonProps> = ({ onPress, title }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Pressable
      style={styles(width, height).button}
      onPress={() => onPress(stateInit)}
    >
      <Text style={styles(width, height).text}>{title}</Text>
    </Pressable>
  );
};

export const Game = () => {
  const androidBannerId = "ca-app-pub-3940256099942544/6300978111";
  const androidInterId = "ca-app-pub-3940256099942544/8691691433";
  const androidRewardedId = "ca-app-pub-3940256099942544/5224354917";
  const { width, height } = useWindowDimensions();
  const [gameState, setGameState] = useState<StateFormat>(stateInit);
  const [modalVisible, setModalVisible] = useState(false);

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

  const calculateCPS = () => {
    let individual = gameState.shops.map((a: ItemFormat) => {
      const ind = a.clicks_per_second * gameState.amountOwned[a.id];
      return ind;
    });
    let output = 0;
    individual.map((i: number) => {
      output += i;
    });
    addCPS(output);
    addCookies(output, 0, 0);
  };

  useEffect(() => {
    const initInterAds = setInterval(async () => {
      try {
        AdMobInterstitial.setAdUnitID(androidInterId);
        await AdMobInterstitial.requestAdAsync({
          servePersonalizedAds: false,
        });
        await AdMobInterstitial.showAdAsync();
      } catch {
        (e: any) => console.log(e);
      }
    }, 50000);

    return () => {
      clearInterval(initInterAds);
    };
  }, []);

  useEffect(() => {
    //setInterval(calcCPS, 1000);
    const initRewardAds = async () => {
      try {
        await AdMobRewarded.setAdUnitID(androidRewardedId);

        AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
          console.log("Loaded");
        });
        AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
          console.log("FailedToLoad")
        );
        AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
          console.log("Rewarded");
          setModalVisible(false);
        });
        AdMobRewarded.addEventListener("rewardedVideoDidPresent", () => {
          console.log("Presented");
        });
        AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () =>
          console.log("FailedToPresent")
        );
        AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
          console.log("Dismissed");
          addCPS(1000);
        });
      } catch {
        (e: any) => console.log(e.message);
      }
    };

    initRewardAds();
    return () => {
      AdMobRewarded.removeAllListeners();
    };
  }, [gameState]);

  const pressToGetReward = async () => {
    try {
      //addCPS(1000);
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
      //setIsButtonBlocked(true);
    } catch {
      (e: any) => console.log(e.message);
    }
  };

  return (
    <View style={styles(width, height).container}>
      <AdMobBanner
        style={styles(width, height).banner}
        bannerSize="banner"
        adUnitID={androidBannerId}
        servePersonalizedAds={false}
      />
      <View style={styles(width, height).buttonRowMain}>
      <Button title={"Nowa Gra"} onPress={setGameState} />
      <Button title={"Nagroda"} onPress={() => setModalVisible(true)} />
      </View>
      <CookieButton gameState={gameState} addCookies={addCookies} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles(width, height).centeredView}>
          <View style={styles(width, height).modalView}>
            <Text style={styles(width, height).modalText}>
              Czy chcesz obejrzeć reklamę w celu zdobycia dodatkowych kliknięć?
            </Text>
            <View style={styles(width, height).buttonRow}>
              <Pressable
                style={styles(width, height).button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles(width, height).textStyle}>Nie chce</Text>
              </Pressable>
              <Pressable
                style={styles(width, height).button}
                onPress={() => pressToGetReward()}
              >
                <Text style={styles(width, height).textStyle}>Chętnie</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Shop gameState={gameState} buyFromShop={buyFromShop} />
    </View>
  );
};

const styles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#ffff99",
      height: height * 1.05,
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
      marginTop: 0.009 * height,
      marginLeft: 0.04 * width,
      borderWidth: 3,
      borderTopColor: "black",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
    },
    banner: {
      marginTop: 40,
      marginBottom: 20,
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "black",
      fontWeight: "bold",
      marginLeft: "auto",
      marginRight: "auto",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 3,
      borderTopColor: "black",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    buttonRow: {
      flexDirection: "row",
    },
    buttonRowMain: {
      flexDirection: "row",
      marginBottom: 5,
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
