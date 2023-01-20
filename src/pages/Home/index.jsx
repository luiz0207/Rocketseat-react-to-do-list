import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
      const newStudent = {
        name: studentName ,
        time: new Date().toLocaleTimeString("pt-br", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })     //valor digitado pelo input da pessoa
      };
      setStudents(prevState => [...prevState, newStudent]);
      // ['Rodrigo]
      //[['Rodrigo', Amanda]
  }


  useEffect(() => {
    async function fetchData() {
     const response = await fetch('https://api.github.com/users/luiz0207')              //copo do useEffect
     const data = await response.json();


        setUser({
          name: data.name,
          avatar: data.avatar_url,
     });
  }

  fetchData();
}, []);


  return (
    <div className="container">
      <header>
          <h1>Nome: Lista de presença </h1>
          <div>
            <strong>Luiz</strong>
            <img src="https://github.com/luiz0207.png" alt="Foto de perfil" />
          </div>
        </header>

      <input 
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)} 
       />


      <button type="button" onClick={ handleAddStudent}>
        Adicionar
        </button>
        {
          
          students.map(student => (
          <Card 
          key={student.name}
          name={student.name} 
          time={student.time}
           />
        ))
      }   
    </div> //usar o conteudo de uma variavel estado
  )
}

//quando estado muda ele renderiza denovo "state"


