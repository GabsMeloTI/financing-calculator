import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';

export function TelaInicial({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
  
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
  
            <Button title="Confirmar" onPress={() => setModalVisible(true)}/>
        </View>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.modalTelaInicial}>
              <Text style={styles.modalTxt}>Olá senhor {nome}, cujo CPF é {cpf}. Temos algumas opções de simulação de parcelas, veja qual se encaixa melhor ao seu objetivo.</Text>
              <View style={styles.modalBotoes}>
                <Button title="Calculo sem entrada" onPress={() => {
                    navigation.navigate('CalculoSemEntrada');
                    setModalVisible(false);
                }}/>
                <Button title="Calculo com entrada" onPress={() => {
                    navigation.navigate('CalculoComEntrada');
                    setModalVisible(false);
                }}/>
                <Button title="Calculo parcelas iguais" onPress={() => {
                    navigation.navigate('CalculoParcelasIguais');
                    setModalVisible(false);
                }}/>
              </View>
            </View>
        </Modal>
  
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
      minHeight: 100,
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
    },
    modalTelaInicial: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    modalTxt: {
        fontWeight: 'bold',
        fontSize: 24,
        width: 350,
        textAlign: 'left',
        marginBottom: 100,
    },
    modalBotoes: {
        gap: 20,
    }
  }); 