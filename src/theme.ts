import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: baseTheme.colors[process.env.NEXT_PUBLIC_COLOR || "teal"],
  },
  components: {
    Radio: {
      parts: ["label"],
      baseStyle: {
        label: {
          width: "100%",
        },
      },
    },
  },
});
