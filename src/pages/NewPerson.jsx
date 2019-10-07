import React, { useState } from 'react'
import validaCEP from '../Utils/Utils'


import back from "../assets/images/back.png";
import send from "../assets/images/send.png";
import '../assets/css/formPerson.css'

import api from "../services/api"

const NewPerson = ({ history }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');



  async function cepValidado(endereco) {
    setLogradouro(endereco.logradouro);
    setBairro(endereco.bairro);
    setCidade(endereco.localidade);
    setUf(endereco.uf);
  }


  return (
    <React.Fragment>

      <div>
        <h1 className="title-component">Adicionar pessoa</h1>
        <form className="person-form">
          <b className="grid text">nome: </b><input
            type="text"
            className="grid grid-3"
            value={nome}
            onChange={e => { setNome(e.target.value) }}
            required
          />
          <b className="grid text">CPF: </b><input
            type="text"
            className="grid grid-3"
            value={cpf}
            onChange={e => { setCpf(e.target.value) }}
            required
          /> 
          <b className="grid text">e-mail: </b><input
            type="text"
            className="grid grid-3"
            value={email}
            onChange={e => { setEmail(e.target.value) }}
            required
          /> 
          <b className="grid text">CEP: </b><input
            type="text"
            className="grid grid-2"
            value={cep}
            onChange={e => { setCep(e.target.value) }}
            required
          /> <input className="grid button"
            type="button"
            value="validar CEP"
            onClick={async () => {
              const result = await (validaCEP(cep));
              cepValidado(result.data);
            }}
            required
          />
          <b className="grid text">Logradouro: </b><input
            type="text"
            className="grid grid-3"
            value={logradouro} readOnly
            required
          /> 

          <b className="grid text">número: </b><input
            type="text"
            className="grid"
            value={numero}
            onChange={e => { setNumero(e.target.value) }}
          /> 

          <b className="grid text">bairro: </b><input
            type="text"
            className="grid"
            value={bairro} readOnly
          /> 

          <b className="grid text">cidade: </b><input
            type="text"
            className="grid"
            value={cidade} readOnly
          />
          <b className="grid text">Estado: </b><input
            type="text"
            className="grid"
            value={uf} readOnly
          />  <br />
          <img src={back} alt="Voltar à lista" onClick={ () => history.push("/persons")}/>  
          <br />
          <img className="enviar" src={send} alt="Enviar" onClick={() => {
            
            const pessoa = {
              "person": {
                "nome": nome,
                "cpf": cpf,
                "email": email,
                "cep": cep,
                "numero": parseInt(numero)
              }
            }

            async function postPessoa(data) {
              await api.post('', data);
            }

            postPessoa(pessoa);

            history.push('/');



          }} />
        </form>
      </div>
    </React.Fragment>
  )
};

export default NewPerson;