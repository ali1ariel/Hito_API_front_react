import React, { useEffect, useState } from 'react'
import '../assets/css/Main.css'

import remove from '../assets/images/remove.png';
import edit from '../assets/images/edit.png';
import add from '../assets/images/add.png';
import show from '../assets/images/show.png';

import api from '../services/api'

export default function Main({ history }) {

  const [persons, SetPersons] = useState([]);


  useEffect(() => {
    async function showPeople() {
      const response = await api.get('');
      SetPersons(response.data.data);
    };

    showPeople();
  }, []);


  return (
    <React.Fragment>
      <div className="show-people">
        <h1 className="title-component">Listando Pessoas</h1>
        <table className="table-people">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>CPF</th>
              <th>email</th>
              <th>cep</th>
              <th>numero</th>
              <th></th>
              <th className="add-button"><img src={add} alt="Adicionar Pessoa" onClick={() => history.push(`/persons/new`)}/></th>
            </tr>
          </thead>
          <tbody>
            {persons.map(person => (
              <tr className="person" key={person.id}>
                <td><img src={show} alt="Ver mais" onClick={() => {
                  history.push(`/persons/${person.id}`);
                }
                }/>
                </td>
                <td>{person.nome} </td>
                <td>{person.cpf} </td>
                <td>{person.email} </td>
                <td>{person.cep} </td>
                <td>{person.numero} </td>
                <td><img src={edit} alt="Editar pessoa" onClick={() => {
                  history.push(`/persons/${person.id}/edit`);
                }
                } /></td>
                <td><img src={remove} alt="remover pessoa" onClick={() => {
                  api.delete(`/${person.id}`);
                  SetPersons(persons.filter((el) => { return el.id !== person.id}));
                }
                } /></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}  