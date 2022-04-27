import React, {useState, useEffect} from 'react';

import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  //console.log(route.params);
  const {guardarConsultarAPI} = route.params;
  //campo formulario

  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  //detectar si estamos editando o no

  useEffect(() => {
    if (route.params.cliente) {
      //console.log('Estamos editando')
      const {nombre, telefono, correo, empresa} = route.params.cliente;

      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    //validar
    if (
      nombre.trim() === '' ||
      telefono.trim() === '' ||
      correo.trim() === '' ||
      empresa.trim() === ''
    ) {
      guardarAlerta(true);
      return;
    }
    // generar el cliente
    const cliente = {nombre, telefono, empresa, correo};
    console.log(cliente);

    //si estamos editando ocreando un nuevo cliente
    if (route.params.cliente) {
      //console.log('editando');
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://10.0.2.2:3000/clientes/${id}`;
      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      //guardar el cliente en api
      try {
        await axios.post('http://10.0.2.2:3000/clientes', cliente);
        console.log('Cliente guardado...');
      } catch (error) {
        console.log(error);
      }
    }
    //redireccionar
    navigation.navigate('Inicio');

    //limpiar el from (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    //cambiar a true para traer el nuevo cliente
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Cinthia"
        onChangeText={texto => guardarNombre(texto)}
        value={nombre}
        style={styles.input}
      />

      <TextInput
        label="Telefono"
        placeholder="97215640"
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />

      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder="Nombre empresa"
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  Button: {
    backgroundColor: '#80016f'
}
});

export default NuevoCliente;
