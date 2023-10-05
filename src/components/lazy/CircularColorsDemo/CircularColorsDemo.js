"use client";
import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "react-feather";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = useState(0);

  const timerRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const colorIndex = timeElapsed % COLORS.length;

  const borderId = useId();

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[colorIndex];

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1);
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [playing]);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleReset = () => {
    setPlaying(false);
    setTimeElapsed(0);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={borderId}
                  key={borderId}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {playing && (
            <button onClick={handlePause}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}

          {!playing && (
            <button onClick={handlePlay}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}

          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
