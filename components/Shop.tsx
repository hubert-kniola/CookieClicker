import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { StateFormat, ItemFormat } from "../constants/const";


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
        console.log('buy:');
        console.log(gameState);
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
          Koszt: {cost}, CPS:{" "}
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
    padding: 4,
    textAlign: "center",
    backgroundColor: '#ffff99',
  },
  text1: {
    width: 250,
    padding: 3,
    textAlign: "center",
    fontSize: 15,
    color: 'black',
    // fontFamily: Roboto_700Bold,
    fontWeight: "bold",
    backgroundColor: '#fccf10',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  text2: {
    width: 250,
    padding: 3,
    textAlign: "center",
    fontSize: 15,
    color: 'black',
    // fontFamily: Roboto_700Bold,
    fontWeight: "bold",
    backgroundColor: '#fccf10',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 3,
  },
});
