import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';

const WebIDForm = ({changeWebId}) => {
  const [formText, setFormText] = useState();
  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escribe tu WebID:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFormText(text)}
        placeholder="WebID"></TextInput>
      <Pressable
        style={styles.button}
        onPress={() => changeWebId(formText)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}>
        <Text style={{...styles.button, backgroundColor: pressed? "#085fbd" : "#007bff"}}>Enviar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 4,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 16,
  },
});

export default WebIDForm;
