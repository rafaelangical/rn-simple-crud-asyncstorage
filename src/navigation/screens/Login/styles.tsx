import { Text, TextInput, View } from "react-native";
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

export const Label = styled(Text)`
  color: #333;
  font-size: 16px;
  margin-bottom: 6px;
  justify-self: flex-start;
  align-self: flex-start;
`;

export const ErrorLabel = styled(Text)`
  color: red;
  font-size: 9px;
  margin-bottom: 10px;
  margin-top: -16px;
  align-self: flex-start;
`;
