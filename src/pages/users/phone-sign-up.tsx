/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Progress, Switch } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiFileText, FiPhone, FiSmartphone } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import SelectInput from '../../components/SelectInput';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  DivContainer,

  // eslint-disable-next-line prettier/prettier
  SelectContainer,
} from '../../styles/pages/phone-sign-up';
import { ImageCart } from '../../styles/pages/sign-up';

interface PhoneFormData {
  user_id: string;
  type: string;
  phone: string;
  whatsapp: boolean;
  obs?: string;
}

const PhoneSignUp: React.FC = () => {
  const [searchOption, setSearchOption] = useState('residencial');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const [withWhatsapp, setWithWhatsapp] = useState(true);
  const [paramsState, setParamsState] = useState<any>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const router = useRouter();

  const optionsSelect = [
    { value: 'residencial', label: 'residencial' },
    { value: 'comercial', label: 'comercial' },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    setParamsState(urlParams);
  }, []);

  const toggleOption = useCallback(() => {
    setSearchOption(state =>
      state === 'residencial' ? 'comercial' : 'residencial',
    );
    setOptionSelected('');
    formRef.current?.clearField('residencial');
  }, []);

  function handleWhatsapp() {
    withWhatsapp ? setWithWhatsapp(false) : setWithWhatsapp(true);
  }

  const userId = Cookies.get('@Liconnection:user');
  const queryString = paramsState;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id') ?? userId;

  const schema = Yup.object().shape({
    type: Yup.string().required('Tipo do telefone deve ser selecionado'),
    phone: Yup.string().required('Preencha o telefone com o DDD'),
    whatsapp: Yup.boolean().default(true),
    obs: Yup.string().optional(),
    user_id: Yup.string().default(id),
  });

  const handleSubmit = useCallback(
    async (data: PhoneFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const dataUser = { ...data, user_id: id, whatsapp: withWhatsapp };
      const { ok, messageErrors } = await api.post('api/phones', dataUser);
      if (ok) {
        router.push(`address-sign-up?id=${String(id)}`);

        addToast({
          type: 'success',
          title: 'Cadastro dos dados telefônicos realizado com sucesso!',
          description: 'Agora falta pouco... Preencha seu dados de endereço',
        });
      } else {
        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.',
        });
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, schema, id, withWhatsapp],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Content>
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Contatos</h1>

                <Progress
                  margin={5}
                  hasStripe
                  isAnimated
                  value={50}
                  size="sm"
                  color="green"
                />

                <DivContainer>
                  <InputMask
                    mask="(99) 9999-9999"
                    name="phone"
                    icon={FiPhone}
                    placeholder="número com o DDD"
                  />
                  <SelectContainer>
                    <SelectInput
                      name="type"
                      defaultValue={{
                        value: 'residencial',
                        label: 'residencial',
                      }}
                      onChange={toggleOption}
                      options={optionsSelect}
                    />
                  </SelectContainer>
                </DivContainer>

                <DivContainer>
                  <InputMask
                    mask="(99) 99999-9999"
                    name="phone"
                    icon={FiSmartphone}
                    placeholder="número com o DDD"
                  />
                  <Flex justify="center" align="center" width={200}>
                    <FaWhatsapp
                      style={{ marginTop: 10 }}
                      size="50px"
                      color="128c7e"
                    />
                    <Switch
                      color="green"
                      name="whatsapp"
                      id="whatsapp"
                      onChange={handleWhatsapp}
                      isChecked={withWhatsapp}
                    />
                  </Flex>
                </DivContainer>

                <Input name="obs" icon={FiFileText} placeholder="Observações" />

                <Button type="submit">Avançar para endereço {'>>'}</Button>
              </Form>
              <Link href="sign-up">
                <a>
                  <FiArrowLeft />
                  Voltar aos Dados do usuário
                </a>
              </Link>
            </AnimationContainer>
          </Content>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>
          <Background>
            <ImageCart src="../home.png" />
          </Background>
        </Col>
      </Row>
    </Container>
  );
};

export default PhoneSignUp;
