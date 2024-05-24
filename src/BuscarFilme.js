import React, { useState } from 'react';

export default function BuscarFilme() {
    const [query, setQuery] = useState('');
    const [filmes, setFilmes] = useState([]);
    const [erro, setErro] = useState('');

    const buscarFilmes = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=3a019996`);

            const data = await response.json();

            if (data.Response === 'True') {
                setFilmes(data.Search);
                setErro('');
            } else {
                setFilmes([]);
                setErro(data.Error);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setErro('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        buscarFilmes();
    }

    return (
        <div className='container'>
            <div className='pesquisa'>
                <h2>Busca de Filmes</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={query} onChange={handleChange} placeholder='Digite o nome do filme' />
                    <button type="submit">Buscar</button>
                </form>
            </div>
            {erro && <p>{erro}</p>}
            <div className='filmes'>
                {filmes.map((filme) =>
                    <div className='filmesBox' key={filme.imdbID}>
                        <h3>{filme.Title}</h3>
                        <img src={filme.Poster} alt={filme.Title} />
                    </div>
                )}
            </div>
        </div>
    );
}