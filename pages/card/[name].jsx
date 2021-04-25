import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api';
import Image from 'next/image';
import styles from './card.module.scss';

export default function Card({card, attacks, abilities, type, resistance}) {
   const router = useRouter();

   
    return (
        <div className={styles.card}>
            <div className= {styles.upContainer}>
                <div className="Left Container">
                    <div className={styles.imageContainer}>
                        <Image
                            width={350}
                            height={500}
                            src={card.image}
                            alt={card.name}
                            objectFit="cover"
                        /> 
                    </div>
                    <div className={styles.text}>
                        <h1>{card.name}</h1>
                        <span>{card.type}</span>
                    </div>
                </div>
                <div className={styles.rightTotalContainer}>
                        <h2>About:</h2>
                        <p>Level: {card.level}</p>
                        <p>Evolves To: {card.evolvesTo}</p>
                        <p>Evolves From: {card.evolvesFrom}</p>
                        <p>hp: {card.hp}</p>
                        <p>Set Name: {card.setName}</p>
                        <p>Series: {card.series}</p>
                        <p>Converted Retreat Cost: {card.convertedRetreatCost}</p>
                    </div>
                    <div className={styles.rightContainer}>
                        <h2>Weaknesses:</h2>
                        <dl>
                            <dt> </dt>
                            <dd>Type: {card.weaknesses.type}</dd>
                            <dd>Value: {card.weaknesses.value}</dd>
                        </dl>
                    </div>
            </div>  

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
        evolvesTo: verifyInformation(pokemon.evolvesTo),
        evolvesFrom: verifyInformation(pokemon.evolvesFrom),
        weaknesses: {
            type: verifyInformation(pokemon.weaknesses.type),
            value: verifyInformation(pokemon.weaknesses.value),
        },
        releaseDate: pokemon.set.releaseDate,
        hp: verifyInformation(pokemon.hp),
        setName: verifyInformation(pokemon.set.name),
        series: verifyInformation(pokemon.set.series),
        convertedRetreatCost: verifyInformation(pokemon.convertedRetreatCost),
    };
   

    const types =  listTypes(pokemon.types);

    const resistances = pokemon.resistances.map(resistance => {
 
        return {
            type: resistance.type,
            value: resistance.value,
        }
    });


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
            abilities,
            resistances,
            types
        },

        revalidate: 60*60*24,

    }
}

function listCosts(attack) {
    let costs = "";
    for(let i= 0; i<attack.cost.length; i++) {
      costs=costs + attack.cost[i] + ", ";
    }
    return costs;
}

    function verifyInformation (information) {
        if (information === undefined) {
            return "--";
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
    

    function listTypes (information) {
        let types = "";
        for(let i= 0; i<information.length; i++) {
          types=types + information[i] + ", ";
        }
        return types;
    }

    