import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { fontSizes, spacing } from "./../utils/sizes";
import { colers } from "./../utils/colers";

const minutesTomillis = (min) => {
  return min * 1000 * 60;
};

const formathTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (progress === 0) {
      onEnd();
    }
    onProgress(progress);
  }, [progress]);

  const interval = useRef(null); //useRef สามารถเปลี่ยนแปลงข้อมูล โดยที่ไม่ผลต่อ component

  const countDownN = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      // report the progress

      setProgress(timeLeft / minutesTomillis(minutes));

      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesTomillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval);
      }
      return;
    }
    interval.current = setInterval(countDownN, 1000);
    // เซ็ตค่าปัจจุบัน โดยให้ countDown ลดลง  ทุก 1 วินาที

    return () => clearInterval(interval.current);
  }, [isPaused]); //isPaused ต้องเป็น false ถึงจะทำงาน

  return (
    <Text style={styles.text}>
      {formathTime(minute)}:{formathTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colers.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94,132,226,0.3)",
  },
});

export default Countdown;
