import React, { useState, useEffect } from "react";
import api from "../services/api"
import validaCEP from "../Utils/Utils"

import '../assets/css/Main.css'
import back from '../assets/images/back.png';


export default function Show({ match, history }) {
  const [person, setPerson] = useState({});
  const [endereco, setEndereco] = useState({});

  const id = match.params.id;
  useEffect(() => {
    async function personToShow(id) {
      const response = await api.get(`/${id}`);
      const ender = await validaCEP(response.data.data.cep)
      setPerson(response.data.data)
      setEndereco(ender.data)
    }
    personToShow(id);
  }, [id])

  return (
    <React.Fragment>
      <div className="show-people">
        <h1 className="title-component">Exibindo pessoa</h1>
        <table className="table-people">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>email</th>
              <th>Rua</th>
              <th>Número</th>
              <th>cep</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="person" key={person.id}>
              <td>{person.nome} </td>
              <td>{person.cpf} </td>
              <td>{person.email} </td>
              <td>{endereco.logradouro} </td>
              <td>{person.numero} </td>
              <td>{person.cep} </td>
              <td>{endereco.bairro} </td>
              <td>{endereco.localidade} </td>
              <td>{endereco.uf} </td>
              <td><img src={back} alt="back" onClick={ () =>  history.push("/persons")
        }></img></td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}