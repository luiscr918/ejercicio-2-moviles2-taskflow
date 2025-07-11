import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tarea } from "../screens/TareasScreen";
import { auth, db } from "../firebase/Config";
import { ref, update } from "firebase/database";

export const ListaTareas = (item: Tarea) => {
  //completar tarea
  const completarTarea = () => {
    //traer el usuario con la sesion activa
    const user = auth.currentUser;
    //entregar
    if (user != null) {
      const takRef = ref(db, `users/${user.uid}/tasks/${item.id}`);
      update(takRef, {
        completed: true,
      });
      Alert.alert("Exito", "Tarea entregada correctamente");
    }
  };

  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>Completada: {item.completed ? "Sí" : "No"}</Text>
      <Text>Fecha: {item.createdAt}</Text>
      {!item.completed && (
        <Button onPress={completarTarea} color={"green"} title="Completar" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  taskItem: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
