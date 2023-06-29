import './ProjectCard.modules.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({id, name, budget, category, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
       <div className='project_card'>
        <h4>{name}</h4>
        <p>
            <span>Orçamento:</span> R${budget}
        </p>
        <p className='category_text'>
            <span className={`${category.toLowerCase()}`}></span>{category}
        </p>
        <div className='project_card_actions'>
            <a href={`/project/${id}`}><BsPencil />Editar</a>
            <button onClick={remove}>
                <BsFillTrashFill />Excluir
            </button>
        </div>
       </div>
    )
}

export default ProjectCard
