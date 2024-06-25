import {
  Cairo as FontCairo,
  Fira_Code as FontMono,
  Inter as FontSans,
  Poppins as FontPoppins,
  Tajawal as FontTajawal,
  Volkhov as FontVolkhov,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontVolkhov = FontVolkhov({
  subsets: ["latin"],
  variable: "--font-volkhov",
  weight: ["400", "700"],
});

export const fontPoppins = FontPoppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});
// New Font Settings
export const fontTajawal = FontTajawal({
  subsets: ["arabic"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
// New Font Settings
export const fontCairo = FontCairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
