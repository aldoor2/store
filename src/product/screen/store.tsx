import React, { useMemo, useState } from "react";
import { Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Product } from "product/types";
import { parseCurrency } from "utils/currency";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(null);
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
    <LayoutGroup>
      <Stack borderRadius="md" padding={6}>
        {products.length ? (
          <Grid
            gridGap={6}
            templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          >
            {products.map((product) => (
              <Stack
                key={product.id}
                backgroundColor="gray.100"
                borderRadius="md"
                data-testid="product"
                padding={4}
                spacing={3}
              >
                <Image
                  alt={product.title}
                  as={motion.img}
                  borderTopRadius="md"
                  cursor="pointer"
                  layoutId={product.image}
                  maxHeight={128}
                  objectFit="cover"
                  src={product.image}
                  onClick={() => setSelectedImage(product.image)}
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
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Flex
              alignItems="center"
              animate={{ scale: 1 }}
              as={motion.div}
              bottom={4}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              justifyContent="center"
              position="sticky"
            >
              <Link
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(
                  text
                )}`}
              >
                <Button
                  colorScheme="whatsapp"
                  leftIcon={
                    <Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" />
                  }
                  width="fit-content"
                >
                  Completar pedido ({cart.length}) productos
                </Button>
              </Link>
            </Flex>
          )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            height="100%"
            justifyContent="center"
            layoutId={selectedImage}
            left={0}
            position="fixed"
            top={0}
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage} />
          </Flex>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default StoreScreen;
