import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

type Props = {
  onPress: () => void;
  text: string;
  unstyled?: boolean;
};

// TODO: pass prop unstyled and apply modifications
export const ButtonStyled = styled(TouchableOpacity)`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const TextButton = styled(Text)`
  color: #fff;
  font-weight: 700;
`;

const Button = ({ onPress, text, unstyled }: Props) => {
  return (
    <ButtonStyled
      onPress={onPress}
      style={{
        backgroundColor: unstyled ? "transparent" : "blue",
        borderColor: unstyled ? "transparent" : "#999",
      }}
    >
      <TextButton style={{ color: unstyled ? "blue" : "#fff" }}>
        {text}
      </TextButton>
    </ButtonStyled>
  );
};

export default Button;
