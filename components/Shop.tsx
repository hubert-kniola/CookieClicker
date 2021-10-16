import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { StateFormat } from "../constants/const";

type Props = {
    gameState: StateFormat;
    buyFromShop: (cost: number) => void;
};

export const Shop: FC<Props> = ({gameState, buyFromShop}) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const changeRefresh = () => setRefresh(!refresh);

  const buy = (cost: number) => {
    if (gameState.cookies > cost) {
        buyFromShop(cost);
        changeRefresh();
    }
  };

  return (
    <View>
      <FlatList
        data={gameState.shops}
        extraData={refresh}
        keyExtractor={(item) => item.cost}
        renderItem={({ item }) => (
          <ListItem
            cost={item.cost}
            cps={item.clicks_per_second}
            id={item.id}
            buy={buy}
            amount_owned={gameState.amount_owned}
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
    buy: (cost: number) =>void;
    amount_owned: any;
};

export const ListItem: FC<ItemProps> = ({cost, cps, id, buy, amount_owned}) => {
  return (
    <TouchableOpacity onPress={() => buy(cost)}>
      <View style={styles.container}>
        <Text style={styles.text1}>
          Koszt: {cost}, Clicks Per Second:{" "}
          {cps}
        </Text>
        <Text style={styles.text2}>
          Kupionych: {amount_owned[id]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    textAlign: "center",
    backgroundColor: '#1a1a1a',
  },
  text1: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: '#40ff00',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginRight: 700,
    marginLeft: 700,
  },
  text2: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: '#40ff00',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 700,
    marginLeft: 700,
  },
});
