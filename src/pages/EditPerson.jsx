import React, { useState, useEffect } from 'react'
import validaCEP from "../Utils/Utils"
import api from "../services/api"

import back from "../assets/images/back.png";
import send from "../assets/images/send.png";


export default function EditPerson({ match, history }) {

  const [person, setPerson] = useState({});
  const [endereco, setEndereco] = useState({});

  const id = match.params.id;

  useEffect(() => {
    async function personToShow(id) {
      const response = await api.get(`/${id}`);
      const ender = await validaCEP(response.data.data.cep)
      await setPerson(response.data.data)
      await setEndereco(ender.data)

    }
    personToShow(id);

  }, [id])

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  function cepValidado(enderecoSet) {
    setLogradouro(enderecoSet.logradouro);
    setBairro(enderecoSet.bairro);
    setCidade(enderecoSet.localidade);
    setUf(enderecoSet.uf);
  }


  return (
    <React.Fragment>
      <div>
      <h1 className="title-component">Editar pessoa</h1>
        <form className="person-form">
        <b className="grid text">nome: </b><input
            type="text"
            className="grid grid-3"
            value={nome || person.nome}
            onChange={e => { setNome(e.target.value) }}
            required
          /> 
          <b className="grid text">CPF: </b><input
            type="text"
            className="grid grid-3"
            value={cpf || person.cpf}
            onChange={e => { setCpf(e.target.value) }}
          /> 
          <b className="grid text">e-mail: </b><input
            type="text"
            className="grid grid-3"
            value={email || person.email}
            onChange={e => { setEmail(e.target.value) }}
          /> 
          <b className="grid text">CEP: </b><input
            type="text"
            className="grid grid-2"
            value={cep || person.cep}
            onChange={e => { setCep(e.target.value) }}
          /> <input
            type="button" className="grid button"
            value="validar CEP"
            onClick={async e => {
              const result = await (validaCEP(cep));
              cepValidado(result.data);
            }}
          />
          <b className="grid text">Logradouro: </b><input
            type="text"
            className="grid grid-3"
            value={logradouro || endereco.logradouro} readOnly
          /> 

          <b className="grid text">número: </b><input
            type="text"
            className="grid"
            value={numero || person.numero}
            onChange={e => { setNumero(e.target.value) }}
          /> 

          <b className="grid text">bairro: </b><input
            type="text"
            className="grid"
            value={bairro || endereco.bairro} readOnly
          /> 

          <b className="grid text">cidade: </b><input
            type="text"
            className="grid"
            value={cidade || endereco.localidade} readOnly
          /> 
          <b className="grid text">Estado: </b><input
            type="text"
            className="grid"
            value={uf || endereco.uf} readOnly
          /> <br />
          <img src={back} alt="Voltar à lista" onClick={ () => history.push("/persons")}/>  
          <br />
          <img className="enviar" src={send} alt="Enviar" onClick={() => {

            const pessoa = {
              "person": {
                "nome": nome || person.nome,
                "cpf": cpf || person.cpf,
                "email": email || person.email,
                "cep": cep || person.cep,
                "numero": parseInt(numero) || person.numero
              }
            }

            async function putPessoa(data) {
              console.log(data)
              await api.put(`/${person.id}`, data);
            }

            putPessoa(pessoa);

            history.push('/persons');

          }} />
        </form>

      </div>
    </React.Fragment>
  )
};

