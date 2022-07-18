import * as React from "react";
import {
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";

import theme from "../theme";
import { INFORMATION } from "../app/constants";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - Almacency</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        {/* Fin de meta tags de licencia */}
      </Head>
      <ChakraProvider theme={theme}>
        <Container
          backgroundColor="white"
          borderRadius="sd"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={0}>
              <Image
                alt="banner"
                borderRadius="lg"
                height="100%"
                maxHeight={64}
                src={INFORMATION.banner}
              />
              <Stack
                alignItems="center"
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 3, sm: 6 }}
              >
                <Box
                  backgroundColor="white"
                  borderRadius={9999}
                  marginTop={-8}
                  minWidth={{ base: 24, sm: 32 }}
                  padding={1}
                >
                  <Image
                    alt="avatar"
                    borderRadius={9999}
                    height={{ base: 24, sm: 32 }}
                    src={INFORMATION.avatar}
                    width={{ base: 24, sm: 32 }}
                  />
                </Box>
                <Stack
                  alignItems={{ base: "center", sm: "flex-start" }}
                  spacing={3}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  <Heading>{INFORMATION.title}</Heading>
                  <Text color="gray.500" fontWeight="500">
                    {INFORMATION.description}
                  </Text>
                  <Stack direction="row">
                    {INFORMATION.social.map(
                      (social) =>
                        social.url && (
                          <Link key={social.name} isExternal href={social.url}>
                            <Flex
                              alignItems="center"
                              backgroundColor="primary.500"
                              borderRadius={9999}
                              color="white"
                              height={10}
                              justifyContent="center"
                              width={10}
                            >
                              <Image
                                alt={social.name}
                                src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                              />
                            </Flex>
                          </Link>
                        )
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider marginY={4} />
          {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
          <Text textAlign="center">
            &copy; Copyright {new Date().getFullYear()}. Hecho con ♥ para la
            comunidad, por{" "}
            <Link isExternal href="https://gonzalopozzo.com">
              goncy
            </Link>
            .
          </Text>
          {/* Fin de copyright */}
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
