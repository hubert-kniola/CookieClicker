import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Game } from "./screens/Game";

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.length,
    backgroundColor: '#1a1a1a',
  },
});
