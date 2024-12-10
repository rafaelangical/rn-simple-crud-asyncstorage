import { View, Text } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 16px;
  color: #000;
`;

export const Value = styled(Text)`
  font-size: 14px;
  color: #666;
`;

export const Row = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
