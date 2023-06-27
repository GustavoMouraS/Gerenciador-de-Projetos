import index from '../../assets/index.svg'
import './Home.modules.css'
import LinkButtom from '../layout/LinkButtom'

function Home() {
  return (
    <section className='home_container'>
      <h1>Bem-vindo ao <span>PlanPro</span></h1>
      <p>Começe a gerenciar seus projetos agora mesmo!</p>
      <LinkButtom to='/components/pages/NovoProjeto'  text='Criar Projeto' />
      <img src={index} />
    </section>
  )
}

export default Home;
