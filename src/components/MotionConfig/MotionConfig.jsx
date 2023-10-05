"use client";
import { MotionConfig as MC } from "framer-motion";

export const MotionConfig = ({ children }) => (
  <MC reducedMotion="user">{children}</MC>
);
