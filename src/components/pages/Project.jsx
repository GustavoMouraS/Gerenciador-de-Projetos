import "./Project.modules.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectsForm from "../projects/ProjectsForm";
import Message from '../Message'

function Project() {
  const { id } = useParams();

  const [project, setPropject] = useState([]);
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
                    <span>Total de Utilizado:</span> R${project.cost}
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
                {showServiceForm && <div>formulário de serviço</div>}
              </div>
            </div>
            <h2>serviços</h2>
            <Container customClass="start">
              <p>Itens de Serviços</p>
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
