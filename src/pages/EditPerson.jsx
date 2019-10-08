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
  const [mensagem, setMensagem] = useState('');
  const [cepValido, setCepValido] = useState(false);

  async function cepValidado(endereco) {
    if (endereco.erro) {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
      setMensagem("O CEP é inválido, por favor, verifique!");
    }
    setLogradouro(endereco.logradouro);
    setBairro(endereco.bairro);
    setCidade(endereco.localidade);
    setUf(endereco.uf);
    setCepValido(true);
  }

  return (
    <React.Fragment>
      <div>
        <h1 className="title-component">Editar pessoa</h1>
        <h2 className="info-text">{mensagem}</h2>
        <form className="person-form">
          <b className="grid text">nome: </b><input
            type="text"
            className="grid grid-3"
            value={nome || person.nome}
            onChange={e => {
              setNome(e.target.value);
              setMensagem("");
            }}
          />
          <b className="grid text">CPF: </b><input
            type="text"
            className="grid grid-3"
            value={cpf || person.cpf}
            onChange={e => {
              setCpf(e.target.value);
              console.log(cpf);
              setMensagem("");
            }}
          />
          <b className="grid text">e-mail: </b><input
            type="text"
            className="grid grid-3"
            value={email || person.email}
            onChange={e => {
              setEmail(e.target.value)
                ; setMensagem("");
            }}
          />
          <b className="grid text">CEP: </b><input
            type="text"
            className="grid grid-2"
            value={cep || person.cep}
            onChange={e => {
              setCep(e.target.value);
              setMensagem("");
              setCepValido(false);
            }}

          /> <input
            type="button" className="grid button"
            value="validar CEP"
            onClick={async () => {
              if (cep && cep.length === 8) {
                const result = await (validaCEP(cep));
                console.log(result);
                cepValidado(result.data);
              } else {
                setMensagem("O campo de CEP está com número errado de caracteres, impossível validar!")
              }
            }}
          />
          <b className="grid text">Logradouro: </b><input
            type="text"
            className="grid grid-3 not-required"
            value={logradouro || endereco.logradouro} readOnly
          />

          <b className="grid text">número: </b><input
            type="text"
            className="grid"
            value={numero || person.numero}

            onChange={e => {
              setNumero(e.target.value);
              setMensagem("");
            }}
          />

          <b className="grid text">bairro: </b><input
            type="text"
            className="grid not-required"
            value={bairro || endereco.bairro} readOnly
          />

          <b className="grid text">cidade: </b><input
            type="text"
            className="grid not-required"
            value={cidade || endereco.localidade} readOnly
          />
          <b className="grid text">Estado: </b><input
            type="text"
            className="grid not-required"
            value={uf || endereco.uf} readOnly
          /> <br />
          <img src={back} alt="Voltar à lista" onClick={() => history.push("/persons")} />
          <br />
          <img className="enviar" src={send} alt="Enviar" onClick={() => {

            const pessoa = {
              "person": {
                "nome": nome || person.nome,
                "cpf": cpf || person.cpf,
                "email": email || person.email,
                "cep": cep || person.cep,
                "numero": parseInt(numero) || parseInt(person.numero)
              }
            }

            async function putPessoa(data) {
              try {
                if (cepValido !== false) {

                  if (cpf.length !== 11) {
                    setMensagem(`CPF inválido, o número de caracteres é 11(Contém ${cpf.length})`)
                  } else if (!email.includes("@")) {
                    setMensagem("Não parece um e-mail, não contem '@'")
                  } else {
                    const response = await api.put(`/${person.id}`, data);
                    console.log(response);
                    history.push('/');
                  }
                } else {
                  setMensagem("Valide o cep e verifique se está tudo preenchido!")
                }

              } catch (error) {
                // Error 😨
                console.log(error);
                if (error.response.status === 422) {
                  const dados = [nome, cpf, email, cep, numero];
                  if (dados.filter((el) => { return el })) {
                    setMensagem("Há dados que não estão preenchidos.")
                  };
                };
              };
            };
            putPessoa(pessoa);
          }
        }
        />
        </form>

      </div>
    </React.Fragment>
  )
};

