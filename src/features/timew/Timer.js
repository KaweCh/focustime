import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Vibration } from "react-native";
import Countdown from "../../components/Countdown";
import { spacing } from "../../utils/sizes";
import { colers } from "./../../utils/colers";
import RoundedButton from "./../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import Timing from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;

function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  useKeepAwake();
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
    //console.log(progress);
    //return progress;
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 100);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000); //10000 = 10 วิ ทำให้สั่น
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        ></Countdown>
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        ></ProgressBar>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}></Timing>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => setIsStarted(true)}
          ></RoundedButton>
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => setIsStarted(false)}
          ></RoundedButton>
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            clearSubject();
          }}
        ></RoundedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colers.white,
    textAlign: "center",
  },
  task: {
    color: colers.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});

export default Timer;