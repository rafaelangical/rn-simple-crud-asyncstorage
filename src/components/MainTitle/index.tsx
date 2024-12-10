import styled from "styled-components";
import { Text } from "react-native";

const Title = styled(Text)`
  font-size: 24px;
  margin-bottom: 80px;
  color: blue;
`;

type Props = {
  text: string;
};

export const MainTitle = ({ text }: Props) => <Title>{text}</Title>;

export default MainTitle;
