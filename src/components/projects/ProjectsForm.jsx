import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import Submit from '../form/Submit'
import "./ProjectsForm.modules.css";

function ProjectForm({btnText, handleSubmit, projectData}) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() =>{
    fetch('http://localhost:5000/categories', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })

    .then((resp) => resp.json())
    .then((data) => {
      setCategories(data)
    })
    .catch((err) => console.log(err))

  }, [])

  const submit = (e) =>{
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value})
  }

  function handleCategory(e) {
    setProject({...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    }})
  }
  
  return (
    <form onSubmit={submit} className="form">
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        value={project.name}
        placeholder="Insira o nome do Projeto"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        value={project.budget}
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
      />
      <Select name="category_id" text="Selecione a Categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
      <Submit text={btnText} />
    </form>
  );
}

export default ProjectForm;
