import { useNavigate } from 'react-router-dom'

import './NovoProjeto.modules.css'
import ProjectForm from '../projects/ProjectsForm';

function NovoProjeto() {

const navigate = useNavigate()

function createPost (project) {

  // initialize cost and services
  project.cost = 0
  project.services = []

  fetch('http://localhost:5000/projects', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(project),
  })

  .then ((resp) => resp.json())
  .then ((data) => {
    console.log(data)
    // redirect
    navigate('/components/pages/Projects', {state: {message: 'Projeto criado com sucesso!'}})
  })
  .catch((err) => console.log(err))

}

  return (
  <div className='new_project_container'>
    <h1>Novo Projeto</h1>
    <p>Crie seu projeto para depois adicionar os serviços</p>
    <ProjectForm btnText='Criar Projeto' handleSubmit={createPost} />
  </div>
  )
}

export default NovoProjeto;
