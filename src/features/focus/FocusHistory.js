import React from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, View } from "react-native";
import { fontSizes, spacing } from "../../utils/sizes";
import RoundedButton from "../../components/RoundedButton";

const HistoryItem = ({ item, index }) => {
  //console.log(item.status);
  return (
    <Text style={{ color: item.status > 1 ? "red" : "green" }}>
      {item.subject}
    </Text>
  );
};

function FocusHistory({ focusHistory, onClear }) {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={(HistoryItem, index) => index.toString()}
            ></FlatList>
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              ></RoundedButton>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});

export default FocusHistory;
