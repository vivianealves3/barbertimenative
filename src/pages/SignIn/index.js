import React, { useRef, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  // Title,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  const styles = StyleSheet.create({
    custom: {
      fontFamily: 'BungeeShade-Regular',
      fontSize: 50,
      textAlign: 'center',
      color: '#eee',
      marginBottom: -30,
    },
  });

  return (
    <Background>
      <Container>
        <Text style={styles.custom}>Barber Time</Text>
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SingUp')}>
          <SignLinkText>Criar conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
