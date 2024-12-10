import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

export const Input = styled(TextInput)`
  width: 100%;
  height: 40px;
  border: 1px solid #333;
  margin-bottom: 24px;
  border-radius: 8px;
  padding-inline-start: 12px;
`;

export const Label = styled(Text)`
  color: #333;
  font-size: 16px;
  margin-bottom: 6px;
  justify-self: flex-start;
  align-self: flex-start;
`;

export const ButtonCTA = styled(TouchableOpacity)`
  width: 100%;
  background-color: blue;
  border: 1px solid #999;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  border-radius: 8px;
`;

export const TextButton = styled(Text)`
  color: #fff;
  font-weight: 700;
`;

export const TextButtonLogin = styled(TextButton)`
  color: #333;
  font-weight: 700;
`;

export const ButtonLogin = styled(TouchableOpacity)`
  border: none;
  color: #000;
  font-weight: 700;
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;
`;

export const ErrorLabel = styled(Text)`
  color: red;
  font-size: 9px;
  margin-bottom: 10px;
  margin-top: -16px;
  align-self: flex-start;
`;

export const MainTitle = styled(Text)`
  font-size: 24px;
  margin-bottom: 100px;
  color: #000;
`;
