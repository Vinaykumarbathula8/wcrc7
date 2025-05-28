import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const COLORS = {
    background: "#2180e4",
    primary: "#2180e4",
    secondary: "#D6D2D2",
    tertiary: "#263238",
    white: "#FFFFFF",
    gray: "#F0F5FA",
    black: "#32343E",
}

export const SIZES = {
    // GLOBAL SIZES
    base: 8,
    font: 10,
    radius: 30,
    padding: 12,
    padding2: 12,
    padding3: 16,

    // FONTS SIZES
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // APP DIMENSIONS
    width,
    height
}

export const FONTS = {
    largeTitle: { fontFamily: "bold", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 20 }

}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme