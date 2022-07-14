import * as React from "react";
import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { parseCurrency } from "@/Utils/currency";
import { Product } from "@/Product/types";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  onSelectImage: (productImage: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd, onSelectImage }) => {
  return (
    <Stack
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
        onClick={() => onSelectImage(product.image)}
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
        onClick={() => onAdd(product)}
      >
        Agregar
      </Button>
    </Stack>
  );
};

export default ProductCard;
