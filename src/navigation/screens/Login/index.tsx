import React, { useCallback, useEffect, useState } from "react";
import {
  ButtonCTA,
  ButtonLogin,
  Container,
  Input,
  Label,
  TextButton,
  ErrorLabel,
  TextButtonLogin,
  MainTitle,
} from "./styles";
import { KeyboardAvoidingView } from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

type IFormData = {
  email: string;
  password: string;
};

const yupSchema = yup.object().shape({
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter ao menos 6 caracteres"),
});

export default function Login() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onPressSend = async (formData: IFormData) => {
    try {
      console.log({ formData });

      console.log("PRESSSS");

      console.log({ formData });
      const { email: actualEmail, password: actualPassword } = formData;

      const asyncStorageValues = JSON.parse(
        (await AsyncStorage.getItem("user")) || ""
      );

      console.log("USUÁRIO RESGATADO COM SUCESSO", asyncStorageValues);

      const { email = "", password = "" } = asyncStorageValues;

      if (email === actualEmail && password === actualPassword) {
        navigation.navigate("Welcome");
      } else {
        setError("Usuário não encontrado na base de dados");
      }
    } catch (e) {
      console.error("Usuário não encontrado na base de dados");
      setError("Usuário não encontrado na base de dados");
    }
  };

  const handleLogin = useCallback(() => {
    navigation.navigate("CreateUser");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      randomOpacity.value = 0.3;
    }, 1500);

    setTimeout(() => {
      randomOpacity.value = 1;
    }, 2800);
  }, []);

  return (
    <KeyboardAvoidingView>
      <Container>
        <Animated.View style={[{}, style]}>
          <MainTitle>Login</MainTitle>
        </Animated.View>
        <ErrorLabel>{error}</ErrorLabel>

        <Label>E-mail</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Email" />
          )}
          name="email"
        />
        {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
        <Label>Senha</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Senha"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
        <ButtonLogin onPress={handleLogin}>
          <TextButtonLogin>Não tem login? Cadastre-se</TextButtonLogin>
        </ButtonLogin>
        <ButtonCTA onPress={handleSubmit((e) => onPressSend(e as IFormData))}>
          <TextButton>Login</TextButton>
        </ButtonCTA>
      </Container>
    </KeyboardAvoidingView>
  );
}
