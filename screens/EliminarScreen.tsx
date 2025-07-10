import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebase/Config";
import { ref, remove } from "firebase/database";

export const EliminarScreen = () => {
  const [taskId, setTaskId] = useState("");

  const handleEliminar = () => {
    //traer el usuario con la sesion activa
    const user = auth.currentUser;
    if (user != null) {
      const takRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
      remove(takRef);
      Alert.alert("Exito", "Tarea eliminada correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de la tarea"
        value={taskId}
        onChangeText={setTaskId}
      />
      <TouchableOpacity style={styles.button} onPress={handleEliminar}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
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
  button: {
    width: "100%",
    backgroundColor: "#dc3545",
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
