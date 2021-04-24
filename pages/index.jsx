//import Head from 'next/head'
//import styles from '../styles/Home.module.css'

import { api } from "../services/api";


export default function Home(props) {
  return (
    <div>
    <h1>Cenas</h1>
    <p>{JSON.stringify(props.cards)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const {data} = await api.get('cards');
 
  const cards = data.data.map(card => {
    return {
      name: card.name,
      image: card.images.small,
    };
  })
  
  return {
    props: {
      cards: data,
    },

    revalidate: 60*60*8,
  }

}


