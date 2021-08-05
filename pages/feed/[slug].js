import styles from '../../styles/Feed.module.css' 
import { useRouter } from 'next/router'
import  Toolbar  from '../../components/toolbar'

function Feed( {pageNumber, articles} ){
  const router = useRouter();

  return(
    <div className="page-container">
      <Toolbar/>
      <div className={styles.main}>
        {
          articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={ () => (window.location.href = article.url) } > { article.title } </h1>
              <p>{article.description}</p>
              { !!article.urlToImage && <img src={article.urlToImage} alt={ article.title } /> }
            </div>
          ))
        }
      </div>
      <div className={styles.paginator}>
        <div 
        onClick = {
          () => {
            if(pageNumber > 1){
              router.push(`/feed/${pageNumber-1}`).then(
                ()=> window.scrollTo(0,0)
              )
            }
          } 
        }
        className= { pageNumber === 1 ? styles.disabled : styles.active }  >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div 
        onClick = {
          () => {
            if(pageNumber < 5){
              router.push(`/feed/${pageNumber + 1}`).then(
                ()=> window.scrollTo(0,0)
              )
            }
          } 
        }
        className= { pageNumber === 5 ? styles.disabled : styles.active }  >
          Next Page
        </div>
      </div>
    </div>  
  )
}

export default Feed

export async function getServerSideProps(context){
  const pageNumber = context.query.slug;
  if(!pageNumber || pageNumber < 1 || pageNumber > 5){
    return{
      props:{
        articles : [],
        pageNumber : 1
      }
    }
  }
  
  const apiResponce = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers:{
        Authorization : `Bearer ab0ae9c1f79848e4b746588954f0b80c`
      }
    }
  )

  const apiJson = await apiResponce.json();
  const { articles } = apiJson;

  return{
    props:{
      articles,
      pageNumber : Number.parseInt(pageNumber)
    }
  }
}