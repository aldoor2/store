import * as React from "react";
import { Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { parseCurrency } from "@/utils/currency";
import { Product } from "@/product/types";
import ProductCard from "@/product/components/ProductCard";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>(null);
  const text = React.useMemo(
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
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(product) => handleAddCart(product)}
                onSelectImage={(productImage) => setSelectedImage(productImage)}
              />
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
