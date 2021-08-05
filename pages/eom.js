import styles from '../styles/EOM.module.css'
import  Toolbar  from '../components/toolbar'
import Image from 'next/image'

function Eom({employee}){
  return(
    <div className='page-container'>
      <Toolbar/>
      <div className={styles.main}>
        <h1>Employe Of The Month</h1>
        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6> {employee.position} </h6>
          <Image width="250" height="250" src={employee.image} alt="" />
          <p> {employee.description} </p>
        </div>
      </div>
    </div>
  )
}

export default Eom

export async function getServerSideProps(){
  const responce = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth')
  const employee = await responce.json()
  return{
    props:{
      employee
    }
  }
}