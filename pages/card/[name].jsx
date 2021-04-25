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
    

   const {data} = await api.get('cards?q=name:'+name)
    let pokemon = data.data[0];

    const card = {
        id:pokemon.id,
        name: pokemon.name,
        level: verifyInformation(pokemon.level),
        image: pokemon.images.large,
        type: listTypes(pokemon.types),
        evolvesTo: verifyInformation(pokemon.evolvesTo),
        evolvesFrom: verifyInformation(pokemon.evolvesFrom),
        weaknesses: {
            type: verifyInformation(pokemon.weaknesses.type),
            value: verifyInformation(pokemon.weaknesses.value),
        },
        attacks: mapAttacks(pokemon.attacks),
        releaseDate: pokemon.set.releaseDate,
        hp: verifyInformation(pokemon.hp),
        setName: verifyInformation(pokemon.set.name),
        series: verifyInformation(pokemon.series),
        resistances: {
            type: verifyInformation(pokemon.resistances.type),
            value: verifyInformation(pokemon.resistances.value),
        },
        convertedRetreatCost: verifyInformation(pokemon.convertedRetreatCost),
        //abilities: mapAbilities(pokemon.abilities),
    };
   
    return {
        props: {
            card,
        },

        revalidate: 60*60*24,

    }
}

    function verifyInformation (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        return information;
    }


    function mapAttacks (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        information.map(attack => {
    
            return {
              name: verifyInformation(attack.name),
              convertedEnergyCost: verifyInformation(attack.convertedEnergyCost),
              damage: verifyInformation(attack.damage),
              description: verifyInformation(attack.text),
              /*cost: function listCosts() {
                  let costs = "";
                  for(let i= 0; i<attack.cost.length; i++) {
                    costs=costs + attack.cost[i];
                  }
                  return costs;
              }*/
            }
         })
    }

    function listTypes (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        let types = "";
        for(let i= 0; i<information.length; i++) {
          types=types + information[i];
        }
        return types;
    }

    function mapAbilities (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        information.map(ability => {
    
            return {
              name: ability.name,
              type: ability.type,
              description: ability.text,

            };
         })
    }