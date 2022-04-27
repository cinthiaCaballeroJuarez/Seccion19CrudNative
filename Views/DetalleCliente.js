import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetalleCliente = ({navigation, route}) => {
  //console.log(router.params);
  const {guardarConsultarAPI} = route.params;
  const {nombre, telefono, correo, empresa, id} = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert(
      'Desea eliminar el cliente?',
      'Un contacto eliminado no se puede eliminar',
      [
        {text: 'si eliminar', onPress: () => eliminarContacto()},
        {text: 'cancelar', style: 'cancel'},
      ],
    );
  };

  const eliminarContacto = async () => {
    //console.log('eliminando', id);
    const url = `http://10.0.2.2:3000/clientes/${id}`;
    console.log(url);
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    //redireccionar
    navigation.navigate('Inicio');

    //consultar la api denuevo
    guardarConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono: <Subheading>{telefono}</Subheading>
      </Text>

      <Button
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        > Eliminar Cliente
      </Button>

      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('Nuevo Cliente', {
            cliente: route.params.item,
            guardarConsultarAPI,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    marginBottom: 20,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default DetalleCliente;
