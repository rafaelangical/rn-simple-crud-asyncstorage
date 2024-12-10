import { Container, Row, Title, Value } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import MainTitle from "../../../components/MainTitle";
import Button from "../../../components/Button";

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
    }, 2000);
  }, []);

  return (
    <Animated.View style={[{}, style]}>
      <Container>
        <MainTitle text="Bem-vindo" />
        <Row>
          <Title>Nome: </Title>
          <Value>{user?.name}</Value>
        </Row>
        <Row>
          <Title>Email: </Title>
          <Value>{user?.email}</Value>
        </Row>

        <Button onPress={handleLogout} text="Logout" />
      </Container>
    </Animated.View>
  );
}
