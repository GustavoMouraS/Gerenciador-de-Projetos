import {parse, v4 as uuidv4} from 'uuid'

import "./Project.modules.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectsForm from "../projects/ProjectsForm";
import Message from '../Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
  const { id } = useParams();

  const [project, setPropject] = useState([]);
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message,setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPropject(data);
        setServices(data.services)
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPost(project){
    setMessage('')
    if (project.budget < project.cost) {
      setMessage('O orçamento não poder ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    fetch (`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setPropject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado!')
      setType('success')
    })
    .catch((err) => console.log(err))
  }

  function createService(project) {
    setMessage('')

    const lastService = project.services[project.services.length -1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setShowServiceForm(false)
    })
    .catch((err) => console.log(err))

  }

  function removeService (id, cost) {

    const servicesUpdated = project.services.filter(
      (services) => services.id !== id
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setPropject(projectUpdated)
      setServices(servicesUpdated)
      setMessage('Serviço removido com sucesso!')
    })
    .catch((err) => console.log(err))

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className="project_details">
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className="detais_container">
              <h1>Projeto: {project.name}</h1>
              <button className="btn" onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className="project_info">
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className="project_info">
                  <ProjectsForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className="service_form_container">
              <h2>Adicione um serviço:
              </h2>
              <button className="btn" onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className="project_info">
                {showServiceForm && <ServiceForm 
                handleSubmit={createService}
                btnText='Adicionar serviço'
                projectData={project}/>}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
              services.map((service) => (
                <ServiceCard
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.description}
                key={service.id}
                handleRemove={removeService} />
              ))
              
              }
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
