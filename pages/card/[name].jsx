import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api';
import Image from 'next/image';
import styles from './card.module.scss';

export default function Card({card, attacks}) {
   const router = useRouter();

   
    return (
        <div className={styles.card}>
            <center>
                <div className={styles.imageContainer}>
                    <Image
                        width={350}
                        height={500}
                        src={card.image}
                        alt={card.name}
                        objectFit="cover"
                    /> 
                </div>

                <header>
                <h1>{card.name}</h1>
                <span>{card.type}</span>
                
                </header>

                <div className={styles.description}>
                    {card.description}
                </div>
                <div>
                    {attacks.map(attack => {
                        return (
                        <div>
                            <a>{attack.name}</a>
                            <a>{attack.convertedEnergyCost}</a>
                            <a>{attack.damage}</a>
                            <a>{attack.text}</a>
                            <a>{attack.cost}</a>
                        </div>
                        )
                    }
                        )}
                </div>
            </center>
        </div>
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
        name: verifyProperty(pokemon, pokemon.name, "name"),
        level: verifyInformation(pokemon.level),
        image: pokemon.images.large,
        //type: listTypes(pokemon.types),
        evolvesTo: verifyInformation(pokemon.evolvesTo),
        evolvesFrom: verifyInformation(pokemon.evolvesFrom),
        weaknesses: {
            type: verifyInformation(pokemon.weaknesses.type),
            value: verifyInformation(pokemon.weaknesses.value),
        },
        //attacks: mapAttacks(pokemon.attacks),
        releaseDate: pokemon.set.releaseDate,
        hp: verifyInformation(pokemon.hp),
        setName: verifyInformation(pokemon.set.name),
        series: verifyInformation(pokemon.series),
        //resistancesType: verifyProperty(pokemon, pokemon.resistances.type, "resistances"),
        //resistenceValue: verifyInformation(pokemon.resistances.value),
        convertedRetreatCost: verifyInformation(pokemon.convertedRetreatCost),
        //abilities: mapAbilities(pokemon.abilities),
    };
   

    const attacks = pokemon.attacks.map(attack => {
 
        return {
            name: attack.name,
            convertedEnergyCost: attack.convertedEnergyCost,
            damage: attack.damage,
            text: attack.text, 
            cost: listCosts(attack),
        }
    });


    const abilities = pokemon.abilities.map(ability => {
 
        return {
            name: ability.name,
            type: ability.type,
            description: ability.text,
        }
    });


    return {
        props: {
            card,
            attacks,
            abilities
        },

        revalidate: 60*60*24,

    }
}

function listCosts(attack) {
    let costs = "";
    for(let i= 0; i<attack.cost.length; i++) {
      costs=costs + attack.cost[i];
    }
    return costs;
}

    function verifyInformation (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        return information;
    }

    function verifyProperty (objetc, information, property) {
        if(objetc.hasOwnProperty(property)) {
            return information;
        }
    }


    /*function mapAttacks (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }
    

        information.map(attack => {

            return {
              name: attack.name,
              convertedEnergyCost: attack.convertedEnergyCost,
              damage: attack.damage,
              text: attack.text
              /*cost: function listCosts() {
                  let costs = "";
                  for(let i= 0; i<attack.cost.length; i++) {
                    costs=costs + attack.cost[i];
                  }
                  return costs;
              }
            }
         })

        }*/
    

    /*function listTypes (information) {
        if (information === undefined) {
            return "Nothing to show here!";
        }

        let types = "";
        for(let i= 0; i<information.length; i++) {
          types=types + information[i];
        }
        return types;
    }*/

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