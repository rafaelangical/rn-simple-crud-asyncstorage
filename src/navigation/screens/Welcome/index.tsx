import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import {
  ButtonLogin,
  Container,
  Row,
  TextButtonLogin,
  Title,
  Value,
  WelcomeTitle,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

type IUser = {
  name: string;
  email: string;
};

export default function Welcome() {
  const [user, setUser] = useState<IUser>({ email: "", name: "" });

  const navigation = useNavigation();

  const randomOpacity = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(randomOpacity.value, config),
    };
  });

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((e) => console.error(e));
  }, [AsyncStorage, navigation]);

  useEffect(() => {
    const loadData = async () => {
      const asyncStorageUser = JSON.parse(
        (await AsyncStorage.getItem("user")) || ""
      );

      if (asyncStorageUser) {
        setUser(asyncStorageUser);
      }
    };

    loadData();
  }, [AsyncStorage]);

  useEffect(() => {
    setTimeout(() => {
      randomOpacity.value = 0.3;
    }, 1500);

    setTimeout(() => {
      randomOpacity.value = 1;
    }, 2800);
  }, []);

  return (
    <Animated.View style={[{}, style]}>
      <Container>
        <WelcomeTitle style={{ fontSize: 24, color: "blue", fontWeight: 700 }}>
          Bem-vindo
        </WelcomeTitle>
        <Row>
          <Title>Nome: </Title>
          <Value>{user?.name}</Value>
        </Row>
        <Row>
          <Title>Email: </Title>
          <Value>{user?.email}</Value>
        </Row>

        <ButtonLogin onPress={handleLogout}>
          <TextButtonLogin>Logout</TextButtonLogin>
        </ButtonLogin>
      </Container>
    </Animated.View>
  );
}
