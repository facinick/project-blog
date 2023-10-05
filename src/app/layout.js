import clsx from "clsx";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MotionConfig } from "@/components/MotionConfig/MotionConfig";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { getThemeOnServer } from "@/helpers/get-theme-on-server";
import "./styles.css";
import "./theme.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});

const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const savedTheme = getThemeOnServer();
  const theme = savedTheme || "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-scheme={theme}
    >
      <body>
        <ThemeProvider initialTheme={theme}>
          <MotionConfig>
            <Header />
            <main>{children}</main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
