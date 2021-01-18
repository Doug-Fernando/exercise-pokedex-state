// Children REF:
//https://medium.com/javascript-in-plain-english/how-to-use-props-children-in-react-7d6ab5836c9d


import React from 'react';
import Button from './Button';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
        super();

        this.state = {
            pokemon: 0,
            pokeType: 'all',
        }
    
    this.allPokemonTypes = this.allPokemonTypes.bind(this);
    this.showPokes = this.showPokes.bind(this);
    this.filterPokemonByType = this.filterPokemonByType.bind(this);

    }

    allPokemonTypes() {
        const { pokemons } = this.props;
        const allTypes = new Set(pokemons.reduce((acc, curr) =>
            [...acc, curr.type] , []));

        return [...allTypes];
    }

    filterPokemonByType(pokeType) {
        this.setState({pokeType, pokemon: 0});
    }

    showPokes() {
        const { pokemons } = this.props;
        const { pokeType } = this.state;

        return pokemons.filter((pokemon) => {
            if(pokeType === 'all') return true;
            const findType = pokemon.type === pokeType;

            return findType;
        });
    }

    nextPokeBtn(totalPoke) {
        this.setState((previousState) => (
            {pokemon: (previousState.pokemon + 1) % totalPoke}
        ))
    }

    render() {
        const pokeTypes = this.allPokemonTypes();
        const filterPoke = this.showPokes();
        const { pokemon } = this.state;
        const selectedPoke = filterPoke[pokemon];

        return (
            <>
                <section>
                        <Button
                            onClick={() => this.filterPokemonByType('all')}
                            className="filter-button">
                            All
                        </Button>
                        {pokeTypes.map((type) => (
                            <Button key={type}
                            onClick={() => this.filterPokemonByType(type)}>
                                { type }
                            </Button>
                        ))}
                    </section>
                <div className="pokedex">
                    <Pokemon pokemon={ selectedPoke } />
                    
                </div>
                <Button
                    className="pokedex-button"
                    onClick={() => this.nextPokeBtn(filterPoke.length)}
                    disabled={filterPoke.length <= 1}>
                    Próximo pokémon
                </Button>
            </>
        );
    }
}

export default Pokedex;
