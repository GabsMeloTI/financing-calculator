import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();



function TelaInicial({ navigation }) {
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
          <View>
            <Text>Olá senhor {nome}, cujo CPF é {cpf}. Temos algumas opções de simulação de parcelas, veja qual se encaixa melhor ao seu objetivo.</Text>
            
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




function CalculoSemEntrada() {
  const [modalVisible, setModalVisible] = useState(false);

  const [juros, setJuros] = useState('');
  const [numParcelas, setNumParcelas] = useState('');
  const [coeFinanceiro, setCoeFinanceiro] = useState('');
  const [valorFinanciamento, setValorFinanciamento] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  function calculo(juros, numParcelas) {
    const cf = (juros / 100) / (1 - 1 / Math.pow(1 + (juros / 100), numParcelas)); 
    setCoeFinanceiro(cf);

    const valorParcelaCalculado = cf * valorFinanciamento;
    setValorParcela(valorParcelaCalculado); 

    const resultado = valorParcelaCalculado * numParcelas; 
    setResultadoCalculo(resultado); 
  }

  return (
    <View style={styles.formulario}>
          <Text style={styles.label}>Número de Parcelas:</Text>
          <TextInput
            placeholder='Informe o número de parcelas'
            value={numParcelas}
            keyboardType="double"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setNumParcelas(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Valor do financiamento:</Text>
          <TextInput
            placeholder='Informe o valor do seu financiamento'
            value={valorFinanciamento}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setValorFinanciamento(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Juros:</Text>
          <TextInput
            placeholder='Informe os possíveis juros'
            value={juros}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setJuros(numericValue);
            }}
            style={styles.input}
          />

          <Button title="Calcular"  onPress={() => {
              calculo(juros, numParcelas);
              setModalVisible(true);
            }}/> 

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View>
                <Text style={styles.label}>Valor total do financiamento: R${resultadoCalculo}</Text> 
                <Text style={styles.label}>Valor das Parcelas: R${valorParcela}</Text> 
                <Text style={styles.label}>Valor do juros: R${resultadoCalculo - valorFinanciamento}</Text> 
            </View>
          </Modal>
      </View>
  );
}

function CalculoComEntrada() {
  const [modalVisible, setModalVisible] = useState(false);

  const [juros, setJuros] = useState('');
  const [numParcelas, setNumParcelas] = useState('');
  const [coeFinanceiro, setCoeFinanceiro] = useState('');
  const [valorEntrada, setValorEntrada] = useState(0);
  const [valorFinanciamento, setValorFinanciamento] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  function calculo(juros, numParcelas) {
    const cf = (juros / 100) / (1 - 1 / Math.pow(1 + (juros / 100), numParcelas)); 
    setCoeFinanceiro(cf);

    const valorParcelaCalculado = cf * (valorFinanciamento - valorEntrada);
    setValorParcela(valorParcelaCalculado); 

    const resultado = valorParcelaCalculado * numParcelas; 
    const resultadoTotal = parseFloat(resultado) + parseFloat(valorEntrada);
    setResultadoCalculo(resultadoTotal);
  }

  return (
    <View style={styles.formulario}>

          <Text style={styles.label}>Valor do financiamento:</Text>
          <TextInput
            placeholder='Informe o valor do seu financiamento'
            value={valorFinanciamento}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setValorFinanciamento(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Valor da Entrada:</Text>
          <TextInput
            placeholder='Informe o valor da entrada'
            value={valorEntrada}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setValorEntrada(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Número de Parcelas:</Text>
          <TextInput
            placeholder='Informe o número de parcelas'
            value={numParcelas}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setNumParcelas(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Juros:</Text>
          <TextInput
            placeholder='Informe os possíveis juros'
            value={juros}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setJuros(numericValue);
            }}
            style={styles.input}
          />

          <Button title="Calcular"  onPress={() => {
              calculo(juros, numParcelas);
              setModalVisible(true);
            }}/> 

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View>
                <Text style={styles.label}>Valor total do financiamento: R${resultadoCalculo}</Text> 
                <Text style={styles.label}>Valor da entrada: R${valorEntrada}</Text> 
                <Text style={styles.label}>Valor das Parcelas: R${valorParcela}</Text> 
                <Text style={styles.label}>Valor do juros: R${resultadoCalculo - valorFinanciamento}</Text> 
            </View>
          </Modal>
      </View>
  );
}

function CalculoParcelasIguais() {
  const [modalVisible, setModalVisible] = useState(false);

  const [juros, setJuros] = useState('');
  const [numParcelas, setNumParcelas] = useState('');
  const [coeFinanceiro, setCoeFinanceiro] = useState('');
  const [valorEntrada, setValorEntrada] = useState('');
  const [valorFinanciamento, setValorFinanciamento] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  function calculo(juros, numParcelas) {
    const cf = (juros / 100) / (1 - 1 / Math.pow(1 + (juros / 100), numParcelas)); 
    setCoeFinanceiro(cf);

    const valorParcelaCalculado = (valorFinanciamento * cf) / (1 + cf);
    setValorParcela(valorParcelaCalculado); 

    const resultado = valorEntrada + (valorParcelaCalculado * numParcelas); 
    setResultadoCalculo(resultado);
  }

  return (
    <View style={styles.formulario}>

          <Text style={styles.label}>Valor do financiamento:</Text>
          <TextInput
            placeholder='Informe o valor do seu financiamento'
            value={valorFinanciamento}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setValorFinanciamento(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Valor da Entrada:</Text>
          <TextInput
            placeholder='Informe o valor da entrada'
            value={valorEntrada}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setValorEntrada(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Número de Parcelas:</Text>
          <TextInput
            placeholder='Informe o número de parcelas'
            value={numParcelas}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setNumParcelas(numericValue);
            }}
            style={styles.input}
          />

          <Text style={styles.label}>Juros:</Text>
          <TextInput
            placeholder='Informe os possíveis juros'
            value={juros}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ''); 
              setJuros(numericValue);
            }}
            style={styles.input}
          />

          <Button title="Calcular"  onPress={() => {
              calculo(juros, numParcelas);
              setModalVisible(true);
            }}/> 

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View>
                <Text style={styles.label}>Valor total do financiamento: R${resultadoCalculo}</Text> 
                <Text style={styles.label}>Valor da entrada: R${valorEntrada}</Text> 
                <Text style={styles.label}>Valor das Parcelas: R${valorParcela}</Text>  
            </View>
          </Modal>
      </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CalculoSemEntrada" component={CalculoSemEntrada} />
        <Stack.Screen name="CalculoComEntrada" component={CalculoComEntrada} />
        <Stack.Screen name="CalculoParcelasIguais" component={CalculoParcelasIguais} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
