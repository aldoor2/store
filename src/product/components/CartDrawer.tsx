import * as React from "react";
import {
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CartItem, Product } from "@/Product/types";
import { parseCurrency } from "@/Utils/currency";
import { INFORMATION } from "@/App/constants";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onIncrement,
  onDecrement,
  onClose,
  ...props
}) => {
  const total = React.useMemo(
    () =>
      parseCurrency({
        price: items.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        ),
      }),
    [items]
  );
  const quantity = React.useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );
  const text = React.useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title}${
                product.quantity > 1 ? ` (x${product.quantity})` : ""
              } - ${parseCurrency({
                price: product.price * product.quantity,
              })}\n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [items, total]
  );

  React.useEffect(() => {
    if (!items.length) onClose();
  }, [items.length, onClose]);

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                fontSize={{ base: "2xl", sm: "3xl" }}
                fontWeight="500"
              >
                <Text>Tu pedido</Text>
                <Text color="gray.400">({quantity})</Text>
              </Stack>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody data-testid="cart" paddingX={4}>
            {items.length ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((product) => (
                  <Stack
                    key={product.id}
                    data-testid="cart-item"
                    direction="row"
                  >
                    <Stack width="100%">
                      <Stack
                        alignItems="center"
                        color="primary"
                        direction="row"
                        fontWeight={500}
                        justifyContent="space-between"
                      >
                        <Text fontSize="lg">{product.title}</Text>
                        <Text>
                          {parseCurrency({
                            price: product.price * product.quantity,
                          })}
                        </Text>
                      </Stack>
                      <Stack direction="row">
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="decrement"
                          size="xs"
                          onClick={() => onDecrement(product)}
                        >
                          -
                        </Button>
                        <Text fontWeight="500">{product.quantity}</Text>
                        <Button
                          borderRadius={9999}
                          colorScheme="primary"
                          data-testid="increment"
                          size="xs"
                          onClick={() => onIncrement(product)}
                        >
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Text color="gray.400" textAlign="center">
                No hay elementos en tu carrito
              </Text>
            )}
          </DrawerBody>

          {Boolean(items.length) && (
            <DrawerFooter paddingX={4}>
              <Stack spacing={4} width="100%">
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  fontSize="lg"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Text>Total Estimado:</Text>
                  <Text>{total}</Text>
                </Stack>
                <Link
                  isExternal
                  data-testid="complete-order"
                  href={`https://wa.me/${
                    INFORMATION.phone
                  }?text=${encodeURIComponent(text)}`}
                  style={{ textDecoration: "none" }}
                  width="100%"
                >
                  <Button
                    colorScheme="whatsapp"
                    leftIcon={
                      <Image
                        alt="icon"
                        src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"
                      />
                    }
                    size="lg"
                    width="100%"
                  >
                    Completar pedido
                  </Button>
                </Link>
              </Stack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
