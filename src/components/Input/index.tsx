import { TextInput } from "react-native";
import styled from "styled-components";

export const InputStyled = styled(TextInput)`
  width: 100%;
  height: 40px;
  border: 1px solid #333;
  margin-bottom: 24px;
  border-radius: 8px;
  padding-inline-start: 12px;
`;

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: () => void;
  secureTextEntry?: boolean;
};

const Input = ({
  value,
  placeholder,
  onChange,
  secureTextEntry,
  ...rest
}: Props) => {
  return (
    <InputStyled
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

export default Input;
