import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../../services/supabase";

import { NavigationProp } from '@react-navigation/native';

export function Auth({ navigation }: { navigation: NavigationProp<any> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    const { data: session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    if (session) {
      Alert.alert("Cadastro realizado com sucesso");
    }
  }

  async function handleSignIn() {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    } else {
        navigation.navigate("Home");
      console.log("Login realizado com sucesso");
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Por favor, entre ou cadastre-se para continuar
        </Text>
        <View style={styles.inputGroup}>
          <Input
            label="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#6200ea",
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@endereco.com"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            label="Senha"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "#6200ea",
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Senha"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Entrar"
            disabled={loading}
            onPress={handleSignIn}
            buttonStyle={styles.button}
          />
          <Button
            title="Cadastrar-se"
            disabled={loading}
            onPress={handleSignUp}
            buttonStyle={[styles.button, styles.signUpButton]}
            titleStyle={styles.signUpTitle}
          />
           <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6200ea",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical:  6,
    marginVertical: 10,
  },
  buttonGroup: {
    display: "flex",
    width: "100%", // Ajuste para garantir o layout correto
    alignItems: "center", // Centraliza os botões
    justifyContent: "center", // Centraliza os botões verticalmente
  },
  button: {
    display: "flex",
    backgroundColor: "#6200ea",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: 300,
  },
  signUpButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6200ea",
  },
  signUpTitle: {
    color: "#6200ea",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#6200ea",
    textAlign: "center",
    marginTop: 10,
  },
});
