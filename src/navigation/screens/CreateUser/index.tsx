import React, { useCallback, useEffect } from "react";
import { ButtonLogin, Container, Label, ErrorLabel } from "./styles";
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
import Input from "../../../components/Input";
import MainTitle from "../../../components/MainTitle";
import Button from "../../../components/Button";

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
    }, 2000);
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
          <MainTitle text="Cadastro de Usuário" />
        </Animated.View>
        <Label> Nome</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChange={onChange} placeholder="Nome" />
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
            <Input value={value} onChange={onChange} placeholder="Email" />
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
              onChange={onChange}
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
              onChange={onChange}
              placeholder="Confirmação de senha"
              secureTextEntry
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <ErrorLabel>{errors.confirmPassword.message}</ErrorLabel>
        )}
        <Button
          onPress={handleLogin}
          text="Ja é cadastrado? clique para realizar login"
          unstyled
        />
        <Animated.View
          style={[
            {
              width: "100%",
            },
            style,
          ]}
        >
          <Button
            onPress={handleSubmit((e) => onPressSend(e as IFormData))}
            text="Cadastrar"
          />
        </Animated.View>
      </Container>
    </KeyboardAvoidingView>
  );
}
