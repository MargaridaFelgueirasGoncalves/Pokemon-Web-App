import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api';


export default function Card({card}) {
   const router = useRouter();

   
    return (
        <h1>{card.id}</h1>
      
    )
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx) {

    const {name} =ctx.params;
    

   const {data} = await api.get('cards')
    let cenas = data.data[0];

    const card = {
        id:cenas.id,
        name: cenas.name,
        image: cenas.images.large,
        type: cenas.types,
        releaseDate: cenas.set.releaseDate,
    }
   

    return {
        props: {
            card,
        },

        revalidate: 60*60*24,
    }
}




    /*const card = {
        id: data.id,
      name: data.name,
      image: data.images.large,
      type: data.types,
      releaseDate: data.data.set.releaseDate,
      level: data.data.level,
      abilityName: data.data.abilities.name,
      abilityDescription: data.data.abilities.text,
      abilityType: data.data.abilities.type,
      evolvesTo: data.evolvesTo,
      evolvesFrom: data.evolvesFrom,
      attackName: data.attacks[0].name,
      attackCost: data.attacks[0].cost,
      attackConvertedEnergyCost: data.attacks[0].convertedEnergyCost,
      attackDamage: data.attacks[0].damage,
      attackDescription: data.attacks[0].text,
      weaknessesType: data.weaknesses.type,
      weaknessesValue: data.weaknesses.value,
      resistancesType: data.resistances.type,
      resistancesValue: data.resistances.value,
      } */
    

  
