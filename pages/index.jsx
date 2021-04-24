//import Head from 'next/head'
//import styles from '../styles/Home.module.css'



export default function Home(props) {
  return (
    <div>
    <h1>Cenas</h1>
    <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://api.pokemontcg.io/v2/cards')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },

    revalidate: 60*60*8,
  }

}


