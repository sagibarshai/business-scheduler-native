import { DefaultTheme } from "styled-components/native";

export const theme: DefaultTheme = {
  palette: {
    colors: {
      darks: {
        backgrounds: {},
        texts: {},
      },
      lights: {
        backgrounds: {
          appBackground: "rgba(255,255,255,1)",
          aqua: "rgba(7, 137, 179, 1)",
          purple: "rgba(51, 47, 68, 1)",
          black:"rgba(0,0,0,1)",
        },
        texts: { black: "rgba(0,0,0,0.8)", white: "rgba(255,255,255,1)", aqua:"rgba(7, 137, 179, 1)" },
        disabled:{
          gray:"rgba(202, 201, 201, 0.7)",
          aqua:"rgba(7, 137, 179, 1)"

        }
      },
    },
  },
  fonts: {
    sizes: {
      xs: "10px",
      s: "12px",
      m: "16px",
      l: "18px",
      xl: "20px",
      subtitle: "24px",
      title: "30px",
    },
    weights: { xs: 300, s: 400, m: 500, l: 600, xl: 700, xxl: 900 },
    styles: {},
    latterSpacings: {},
    colors: {},
  },
  spaces:{
    xs:'4px',
    s:'8px',
    m:'16px',
    l:"32px",
    xl:'50px',
  },
  border: {
    colors: { black: "rgba(0,0,0,1)", aqua: "rgba(7, 137, 179, 1)" },
    width: { m: "1px" },
    radiuses: { m: "6px", l:'10px',xl:'16px' },
    style: {
      regular: "solid",
    },
  },
  inputs: {
    sizes: {
      m: { height: "42px", width: "80%" },
    },
    text:{
      labels:{sizes:{m:"16px"}, weights:{m:700}},
    },
    placeholders:{
      colors:{blackAlpha7:"rgba(0,0,0,0.7)"},
      
    }
  },
  icons:{
    sizes:{m:22},
    colors:{aqua:"rgba(7, 137, 179, 1)", aquaDisabled:"rgba(7, 137, 179, 0.5)"}
  } 
};