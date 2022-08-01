import * as React from "react";
import { Button, Flex, Grid, Stack, Text } from "@chakra-ui/react";

import { Product } from "@/Product/types";
import { Field } from "@/Cart/types";
import ProductCard from "@/Product/components/ProductCard";
import CartDrawer from "@/Cart/components/CartDrawer/CartDrawer";
import { useCart } from "@/Cart/context";

interface Props {
  products: Product[];
  fields: Field[];
}

const StoreScreen: React.FC<Props> = ({ products, fields }) => {
  const [{ total, quantity, cart }, { addItem }] = useCart();
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);

  function handleAddToCart(product: Product): void {
    // Comprueba si ya existe el product.id agregado dentro del carrito
    const isInCart = Array.from(cart.values()).some(
      (item) => product.id === item.id
    );

    if (product.options) {
      const optionOfProduct = Object.entries(product.options).map(
        ([_title, options], index) => options[index].title
      );

      const isItemWithOptionsInCart = Array.from(cart.values()).some((item) =>
        Object.entries(item.options).some(([_title, options]) =>
          options[0].title.includes(optionOfProduct[0])
        )
      );

      if ((!isInCart && product.options) || !isItemWithOptionsInCart) {
        return addItem(Symbol(product.title), {
          ...product,
          quantity: 1,
        });
      } else {
        return toggleCart(true);
      }
    }

    // Si no se encuentra el producto en el carrito, lo agregamos al mismo
    if (!isInCart) {
      return addItem(Symbol(product.title), {
        ...product,
        quantity: 1,
      });
    }

    toggleCart(true);
  }

  return (
    <>
      <Stack spacing={6}>
        {products.length ? (
          <Grid
            gridGap={8}
            templateColumns={{
              base: "repeat(auto-fill, minmax(240px, 1fr))",
              sm: "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(product: Product) => handleAddToCart(product)}
              />
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {Boolean(quantity) && (
          <Flex
            alignItems="center"
            bottom={4}
            justifyContent="center"
            position="sticky"
          >
            <Button
              boxShadow="xl"
              colorScheme="primary"
              data-testid="show-cart"
              size="lg"
              width={{ base: "100%", sm: "fit-content" }}
              onClick={() => toggleCart(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md" lineHeight={6}>
                    Ver pedido
                  </Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    borderRadius="sm"
                    color="gray.100"
                    fontSize="xs"
                    fontWeight="500"
                    paddingX={2}
                    paddingY={1}
                  >
                    {quantity} items
                  </Text>
                </Stack>
                <Text fontSize="md" lineHeight={6}>
                  {total}
                </Text>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer
        fields={fields}
        isOpen={isCartOpen}
        onClose={() => toggleCart(false)}
      />
    </>
  );
};

export default StoreScreen;
