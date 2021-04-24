import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api';

export default function Card() {
    const router = useRouter();

    return (
        <h1>{router.query.name}</h1>
    )
}

export const getStaticProps = async (ctx) => {

    const {name} = ctx.params;

    const { data } = await api.get('/card?q=name:' + {name});

    const card = {
        id: data.id,
      name: data.name,
      image: data.images.large,
      type: data.types,
      releaseDate: data.set.releaseDate,
      level: data.level,
      abilityName: data.abilities.name,
      abilityDescription: data.abilities.text,
      abilityType: data.abilities.type,
      evolvesTo: data.evolvesTo,
      evolvesFrom: data.evolvesFrom,
        
    }

    return {
        props: {},
        revalidate: 60*60*24,
    }
}