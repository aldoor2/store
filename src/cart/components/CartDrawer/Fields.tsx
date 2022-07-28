import * as React from "react";
import {
  Alert,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Checkout, Field } from "@/Cart/types";

interface Props {
  fields: Field[];
  checkout: Checkout;
  onChange: (id: string, value: string) => void;
}

interface FIeldProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<FIeldProps> = ({ value, onChange, ...props }) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};

const RadioField: React.FC<{
  options: string[];
  onChange: (value: string) => void;
  value: string;
}> = ({ value, onChange, options }) => {
  return (
    <RadioGroup colorScheme="primary" value={value} onChange={onChange}>
      <Stack>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

const Fields: React.FC<Props> = ({ fields, checkout, onChange }) => {
  return (
    <Stack spacing={0}>
      {fields.map((field) => (
        <Stack key={field.type}>
          <Text fontWeight="500">{field.title}</Text>
          <Stack spacing={4}>
            {field.type === "text" && (
              <TextField
                placeholder={field.placeholder}
                value={checkout.get(field.title) || ""}
                onChange={(value: string) => onChange(field.title, value)}
              />
            )}
            {field.type === "radio" && (
              <RadioField
                options={field.options}
                value={checkout.get(field.title) || ""}
                onChange={(value: string) => onChange(field.title, value)}
              />
            )}
            {field.note && <Alert colorScheme="primary">{field.note}</Alert>}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Fields;
