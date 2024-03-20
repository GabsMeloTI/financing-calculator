import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem vindo ao FiapBank</Text>

      <View style={styles.formulario}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            placeholder='Informe seu nome'
            value={nome}
            onChangeText={(text) => setNome(text)}
            style={styles.input}
          />
        
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            placeholder='Informe seu CPF'
            value={cpf}
            keyboardType="numeric"
            onChangeText={(text) => setCPF(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder='Informe seu email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            placeholder='Informe seu telefone'
            value={telefone}            
            keyboardType="numeric"
            onChangeText={(text) => setTelefone(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
            placeholder='Informe sua data de nascimento'
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
            style={styles.input}
          />

          <Button title="Confirmar"/>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulario: {
    marginTop: 50,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 36,
  }
}); 
