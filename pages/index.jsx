//import Head from 'next/head'
//import styles from '../styles/Home.module.css'

import { ta } from "date-fns/locale";
import { api } from "../services/api";
import styles from './home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({allCards}) {
  return (
    <div className={styles.homepage}>
      <section className={styles.allCards}>
        <table  className="bordered striped centered highlight responsive-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Release Date</th>
            </tr>
          </thead>

          <tbody>
            {allCards.map(card => {
              return (
                <tr key={card.id}>
                  <td>
                  <Link href={'/card/' + card.name}>
                  <Image
                    width={120}
                    height={120}
                    src={card.image}
                    alt={card.name}
                    objectFit="cover"
                  />
                  </Link>
                  </td>
                  <td>
                    <Link href={'/card/' + card.name}>
                      <a>{card.name}</a>
                    </Link>
                  </td>
                  <td>
                    <Link href={'/card/' + card.name}>
                      <a>{card.supertype}</a>
                    </Link>
                  </td>
                  <td>
                    <Link href={'/card/' + card.name}>
                      <a href="">{card.releaseDate}</a>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
    </section>
    </div>
  )
}

export async function getStaticProps() {
  const {data} = await api.get('cards');
 
  const cards = data.data.map(card => {
    
    return {
      id: card.id,
      name: card.name,
      image: card.images.small,
      supertype: card.types,
      releaseDate: card.set.releaseDate,
    };
  })

  const allCards= cards;
  
  return {
    props: {
      allCards,
    },

    revalidate: 60*60*8,
  }

}


