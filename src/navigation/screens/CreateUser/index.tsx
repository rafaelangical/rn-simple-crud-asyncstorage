import React, { useCallback, useEffect, useState } from "react";
import {
  ButtonCTA,
  ButtonLogin,
  Container,
  Input,
  Label,
  TextButton,
  ErrorLabel,
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
import { TextButtonLogin } from "../Login/styles";

type IFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const yupSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter ao menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "As senhas não correspondem"),
});

export default function CreateUser() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onPressSend = useCallback(async (formData: IFormData) => {
    console.log({ formData });

    try {
      console.log({ formData });
      await AsyncStorage.setItem("user", JSON.stringify(formData));
      console.log("USUÁRIO CRIADO COM SUCESSO");
      navigation.navigate("Welcome");
    } catch (e) {
      console.error("Error on save values on AsyncStorage");
    }
  }, []);

  const handleLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

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
        <Animated.View
          style={[
            {
              marginBottom: 20,
              maxHeight: 100,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            },
            style,
          ]}
        >
          <Label
            style={[
              {
                fontSize: 24,
                color: "blue",
              },
            ]}
          >
            Cadastro de Usuário
          </Label>
        </Animated.View>
        <Label> Nome</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Nome" />
          )}
          name="name"
        />
        {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
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
        <Label>Confirmação de Senha</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Confirmação de senha"
              secureTextEntry
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
        )}
        <ButtonLogin onPress={handleLogin}>
          <TextButtonLogin>
            Ja é cadastrado? clique para realizar login
          </TextButtonLogin>
        </ButtonLogin>
        <Animated.View
          style={[
            {
              width: "100%",
            },
            style,
          ]}
        >
          <ButtonCTA onPress={handleSubmit((e) => onPressSend(e as IFormData))}>
            <TextButton>Cadastrar</TextButton>
          </ButtonCTA>
        </Animated.View>
      </Container>
    </KeyboardAvoidingView>
  );
}
