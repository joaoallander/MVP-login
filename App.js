import { useState } from "react";
import { Linking } from "react-native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function TechRootsAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const fakeApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (!validatePassword(password)) {
      setError("Senha fraca (mín. 8 caracteres, 1 maiúscula e 1 número)");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    await fakeApiCall();
    setLoading(false);

    setLoggedIn(true);
  };

const openApp = () => {
  Linking.openURL("https://mvp-tech-roots.vercel.app/");
};


  // 🔥 TELA HOME
  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.homeTitle}>🌿 Bem-vindo ao Tech Roots</Text>
        <Text style={styles.homeText}>Você está logado!</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLoggedIn(false)}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 🔐 TELA LOGIN / CADASTRO
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}> Tech Roots</Text>

        <Text style={styles.subtitle}>
          {isLogin ? "Entrar" : "Criar Conta"}
        </Text>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        )}

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={openApp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? "Entrar" : "Cadastrar"}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.switchText}>
          {isLogin ? "Não tem conta?" : "Já tem conta?"}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL("https://mvp-tech-roots.vercel.app/")
            }}
          >
            {isLogin ? " Criar conta" : " Entrar"}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4f5d0",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f1f8f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  button: {
    backgroundColor: "#43a047",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    marginTop: 15,
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  homeText: {
    marginTop: 10,
    fontSize: 16,
  },
});
