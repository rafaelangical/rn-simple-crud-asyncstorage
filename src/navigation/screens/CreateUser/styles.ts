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

export const ButtonLogin = styled(TouchableOpacity)`
  border: none;
  color: #000;
  font-weight: 700;
  align-self: flex-start;
  justify-self: flex-start;
  background-color: transparent;
`;

export const ErrorLabel = styled(Text)`
  color: red;
  font-size: 9px;
  margin-bottom: 10px;
  margin-top: -16px;
  align-self: flex-start;
`;
