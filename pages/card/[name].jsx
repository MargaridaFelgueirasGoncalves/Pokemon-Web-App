import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { api } from '../../services/api';
import Image from 'next/image';
import styles from './card.module.scss';

export default function Card({card, attacks, abilities, type, resistances, weaknesses}) {
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
                    </div>
                    </div>
                    <div className={styles.rightTotalContainer}>
                        <h2>About:</h2>
                        <p>Types: {card.type}</p>
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
                        {weaknesses.map(weakness => {
                            return (
                        <dl>
                            <dd>Type: {weakness.type}</dd>
                            <dd>Value: {weakness.value}</dd>
                        </dl>
                        )
                    })}
                    </div>
            </div>  

            <div className={styles.attackTable}>
                <table  className="bordered striped centered highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Attack Name</th>
                            <th>Damage</th>
                            <th>Converted Energy Cost</th>
                            <th>Cost</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {attacks.map(attack => {
                            return (
                                <tr>
                                    <td>
                                        <a>{attack.name}</a>
                                    </td>
                                    <td>
                                        <a>{attack.damage}</a>
                                    </td>
                                    <td>
                                        <a>{attack.convertedEnergyCost}</a>
                                    </td>
                                    <td>
                                        <a>{attack.cost}</a>
                                    </td>
                                    <td>
                                        <a>{attack.text}</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.abilityTable}>
                <table  className="bordered striped centered highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Ability Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abilities.map(ability => {
                            return (
                                <tr>
                                    <td>
                                        <a>{ability.name}</a>
                                    </td>
                                    <td>
                                        <a>{ability.type}</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.resistancesTable}>
                <table  className="bordered striped centered highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Resistance Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {resistances.map(resistance => {
                            return (
                                <tr>
                                    <td>
                                        <a>{resistance.type}</a>
                                    </td>
                                    <td>
                                        <a>{resistance.value}</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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
        name: verifyInformation(pokemon.name),
        level: verifyInformation(pokemon.level),
        image: pokemon.images.large,
        evolvesTo: verifyInformation(pokemon.evolvesTo),
        evolvesFrom: verifyInformation(pokemon.evolvesFrom),
        type: verifyInformation(listTypes(pokemon.types)),
        releaseDate: pokemon.set.releaseDate,
        hp: verifyInformation(pokemon.hp),
        setName: verifyInformation(pokemon.set.name),
        series: verifyInformation(pokemon.set.series),
        convertedRetreatCost: verifyInformation(pokemon.convertedRetreatCost),
    };
   

    const weaknesses = pokemon.weaknesses.map(weakness => {
 
        return {
            type: weakness.type,
            value: weakness.value,
        }
    });


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
            weaknesses,
        },

        revalidate: 60*60*24,

    }
}

function listCosts(attack) {
    let costs = "";
    for(let i= 0; i<attack.cost.length; i++) {
      costs=costs + attack.cost[i] + ", ";
    }
    return costs.substring(0, costs.length-2);
}

    function verifyInformation (information) {
        if (information === undefined || null) {
            return "--";
        }

        return information;
    }

    function verifyProperty (object, property) {
        if(object.hasOwnProperty(property)) {
            return pokemon + "." + property;
        }
        
        return "--";
    }
    

    function listTypes (information) {
        let types = "";
        for(let i= 0; i<information.length; i++) {
          types=types + information[i] + ", ";
        }
        return types.substring(0, types.length-2);
    }

    