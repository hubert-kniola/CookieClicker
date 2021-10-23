import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { StateFormat, ItemFormat } from "../constants/const";

type Props = {
  gameState: StateFormat;
  buyFromShop: (cost: number) => void;
};

export const Shop: FC<Props> = ({ gameState, buyFromShop }) => {
  const buy = (cost: number) => {
    if (gameState.cookies > cost) {
      buyFromShop(cost);
    }
  };

  return (
    <View>
      <FlatList
        data={gameState.shops}
        keyExtractor={(item) => item.cost}
        renderItem={({ item }) => (
          <ListItem
            cost={item.cost}
            cps={item.clicks_per_second}
            id={item.id}
            buy={buy}
            amountOwned={gameState.amountOwned}
          />
        )}
      />
    </View>
  );
};

type ItemProps = {
  cost: number;
  cps: number;
  id: number;
  buy: (cost: number) => void;
  amountOwned: number[];
};

export const ListItem: FC<ItemProps> = ({
  cost,
  cps,
  id,
  buy,
  amountOwned,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity activeOpacity={isDisabled ? 1 : 0.5} onPress={() => buy(cost)}>
      <View style={styles(width, height, isDisabled).container}>
        <Text style={styles(width, height, isDisabled).text1}>
          Koszt: {cost}, CPS: {cps}
        </Text>
        <Text style={styles(width, height, isDisabled).text2}>
          Kupionych: {amountOwned[id]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (width: number, height: number, isDisabled: boolean) =>
  StyleSheet.create({
    container: {
      padding: 2,
      flex: 2,
      textAlign: "center",
      backgroundColor: "#ffff99",
      marginTop: 0.02 * height,
    },
    text1: isDisabled
      ? {
          width: 0.5 * width,
          padding: 3,
          textAlign: "center",
          fontSize: 15,
          color: "black",
          // fontFamily: Roboto_700Bold,
          fontWeight: "bold",
          backgroundColor: "#b19102",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          marginRight: "auto",
          marginLeft: "auto",
        }
      : {
          width: 0.5 * width,
          paddingTop: 3,
          textAlign: "center",
          fontSize: 15,
          color: "black",
          borderWidth: 4,
          borderTopColor: 'black',
          borderLeftColor: 'black',
          borderRightColor: 'black',
          borderBottomColor: '#fccf10',
          // fontFamily: Roboto_700Bold,
          fontWeight: "bold",
          backgroundColor: "#fccf10",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          marginRight: "auto",
          marginLeft: "auto",
        },
    text2: isDisabled
      ? {
          width: 0.5 * width,
          padding: 3,
          textAlign: "center",
          fontSize: 15,
          color: "black",
          // fontFamily: Roboto_700Bold,
          fontWeight: "bold",
          backgroundColor: "#b19102",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: 2,
        }
      : {
          width: 0.5 * width,
          paddingBottom: 1,
          textAlign: "center",
          fontSize: 15,
          color: "black",
          // fontFamily: Roboto_700Bold,
          fontWeight: "bold",
          backgroundColor: "#fccf10",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginRight: "auto",
          marginLeft: "auto",
        },
  });
