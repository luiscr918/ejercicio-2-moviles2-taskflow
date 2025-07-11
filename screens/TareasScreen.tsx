import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase/Config";
import { signOut } from "firebase/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ListaTareas } from "../components/ListaTareas";
interface User {
  id?: string;
  email: string;
  tasks: { [key: string]: Tarea };
}
export interface Tarea {
  id: string;
  completed: boolean;
  createdAt: string;
  title: string;
}
export const TareasScreen = () => {
  const navigation = useNavigation();
  const [usuarioLog, setUsuarioLog] = useState<User>();
  const user = auth.currentUser;
  const leer = () => {
    const starCountRef = ref(db, "users/" + user?.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUsuarioLog(data);
    });
  };
  useEffect(() => {
    leer();
  }, []);
  let arreglo: Tarea[] = usuarioLog?.tasks
    ? Object.entries(usuarioLog.tasks).map(([id, value]: any) => ({
        id,
        ...value,
      }))
    : [];
  //funcion para cerrar sesion
  const cerrarSesion = () => {
    signOut(auth);
    Alert.alert("Aviso", "Cerró sesion correctamente");
    navigation.dispatch(CommonActions.navigate({ name: "Login" }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas del estudiante</Text>
      <FlatList
        data={arreglo}
        renderItem={({ item }) => <ListaTareas {...item} />}
      />

      <Button onPress={cerrarSesion} title="Cerrar Sesion" color={"red"} />
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
});
