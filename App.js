import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Focus from "./src/features/focus/Focus";
import { colers } from "./src/utils/colers";
import Timer from "./src/features/timew/Timer";
import { spacing } from "./src/utils/sizes";
import FocusHistory from "./src/features/focus/FocusHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // ป้องกันไม่ให้หน้าจอเข้าสู่โหมดสลีปและฟังก์ชันคู่หนึ่งเพื่อเปิดใช้งานพฤติกรรมนี้โดยไม่จำเป็น
  const STATUSES = {
    COMPLESE: 1,
    CANCELLED: 2,
  };
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLESE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        ></Timer>
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject}></Focus>
          <FocusHistory
            focusHistory={focusHistory}
            onClear={onClear}
          ></FocusHistory>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colers.darkBlue,
  },
});
