import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';


export function CalculoSemEntrada() {
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
    setResultadoCalculo(resultado.toFixed(2)); 
  }

  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>Cálculo sem entrada</Text>
       <View>
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
            <View style={styles.modal}>
                <Text style={styles.label}>Valor total do financiamento: R${resultadoCalculo}</Text> 
                <Text style={styles.label}>Valor das Parcelas: R${parseFloat(valorParcela).toFixed(2)}</Text> 
                <Text style={styles.label}>Valor do juros: R${parseFloat(resultadoCalculo - valorFinanciamento).toFixed(2)}</Text> 

                <Button title="Fechar Modal"  onPress={() => {
                  setModalVisible(false);
                }}/>
            </View>
          </Modal>
          </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
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
    marginBottom: 20,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 50,
  },
  modal: {
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