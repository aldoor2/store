import * as React from "react";
import { Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { CartItem, Product } from "@/Product/types";
import ProductCard from "@/Product/components/ProductCard";
import CartDrawer from "@/Product/components/CartDrawer";
import { editCart } from "@/Product/selectors";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>(null);
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);

  function handleEditCart(
    product: Product,
    action: "increment" | "decrement"
  ): void {
    setCart(editCart(product, action));
  }

  return (
    <>
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
                  onAdd={(_product) => handleEditCart(_product, "increment")}
                  onSelectImage={(productImage) =>
                    setSelectedImage(productImage)
                  }
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
                <Button
                  colorScheme="whatsapp"
                  data-testid="show-cart"
                  size="lg"
                  width={{ base: "100%", sm: "fit-content" }}
                  onClick={() => toggleCart(true)}
                >
                  Ver pedido (
                  {cart.reduce((acc, item) => acc + item.quantity, 0)})
                  productos
                </Button>
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
              <Image key="image" alt="image" src={selectedImage} />
            </Flex>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => toggleCart(false)}
        onDecrement={(product) => handleEditCart(product, "decrement")}
        onIncrement={(product) => handleEditCart(product, "increment")}
      />
    </>
  );
};

export default StoreScreen;
