import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import RoundedButton from "../../components/RoundedButton";
import { spacing } from "../../utils/sizes";
import { fontSizes } from "./../../utils/sizes";
import { colers } from "./../../utils/colers";

function Focus({ addSubject }) {
  const [subject, setSubject] = useState(null);
  //console.log(addSubject);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onChangeText={(subject) => setSubject(subject)}
            value={subject || ""}
          ></TextInput>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(subject);
            }}
          ></RoundedButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  title: {
    color: colers.white,
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Focus;
