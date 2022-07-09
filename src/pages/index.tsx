import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Price, Product } from "product/types";
import api from "product/api";

interface Props {
  products: Product[];
}

function parseCurrency({
  price,
  locale = "en-US",
  currency = "USD",
}: Price): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    price
  );
}

const IndexPage: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} - ${parseCurrency({
                price: product.price,
              })}\n`
            ),
          ``
        )
        .concat(
          `\nTotal: ${parseCurrency({
            price: cart.reduce((total, product) => total + product.price, 0),
          })}`
        ),
    [cart]
  );

  const handleAddCart = (product: Product) =>
    setCart((cart) => cart.concat(product));

  return (
    <Stack borderRadius="md" padding={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <GridItem key={product.id}>
            <Stack
              backgroundColor="gray.100"
              borderRadius="md"
              padding={4}
              spacing={3}
            >
              <Image
                alt={product.title}
                borderTopRadius="md"
                maxHeight={128}
                objectFit="cover"
                src={product.image}
              />
              <Stack spacing={1}>
                <Text color="teal" fontSize="xl" fontWeight="700">
                  {product.title}
                </Text>
                <Text color="green.500" fontSize="lg" fontWeight="500">
                  {parseCurrency({ price: product.price })}
                </Text>
              </Stack>
              <Button
                colorScheme="primary"
                size="sm"
                variant="outline"
                onClick={() => handleAddCart(product)}
              >
                Agregar
              </Button>
            </Stack>
          </GridItem>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Flex
          alignItems="center"
          bottom={4}
          justifyContent="center"
          position="sticky"
        >
          <Link
            href={`https://wa.me/5491141414141?text=${encodeURIComponent(
              text
            )}`}
          >
            <Button colorScheme="whatsapp" width="fit-content">
              Completar pedido ({cart.length}) productos
            </Button>
          </Link>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexPage;
