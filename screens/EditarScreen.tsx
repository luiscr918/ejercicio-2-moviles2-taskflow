import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ref,  update } from "firebase/database";
import { auth, db } from "../firebase/Config";

export const EditarScreen = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [createdAt, setCreatedAt] = useState("");

  const handleCreateTask = () => {
    //traer el usuario con la sesion activa
    const user = auth.currentUser;
    if (user != null) {
      const takRef = ref(db, `users/${user.uid}/tasks/${id}`);
      update(takRef, {
        title: title,
        completed: completed,
        createdAt: createdAt,
      });
      Alert.alert("Exito", "Tarea actualizada correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.switchContainer}>
        <Text>Completada:</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Fecha de creación (YYYY-MM-DD)"
        value={createdAt}
        onChangeText={setCreatedAt}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Editar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
