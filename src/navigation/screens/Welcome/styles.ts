import { View, Text, TouchableOpacity } from "react-native";
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

export const WelcomeTitle = styled(Text)`
  font-size: 24px;
  margin-bottom: 100px;
`;

export const Title = styled(Text)`
  font-size: 16px;
  color: #000;
`;

export const Value = styled(Text)`
  font-size: 14px;
  color: #666;
`;

export const TextButtonLogin = styled(Text)`
  color: #333;
  font-weight: 700;
  font-size: 16px;
`;

export const ButtonLogin = styled(TouchableOpacity)`
  border: none;
  color: #000;
  font-weight: 700;
  align-self: flex-start;
  justify-self: flex-start;
  height: 40px;
  background-color: red;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 40px;
`;

export const Row = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
