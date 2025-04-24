import React, { useEffect, useState } from 'react'
import { Tree } from '../components/Tree';
import { Modal } from '../components/Modal';
import { Span } from '../components/Span';

export const MeddraSearch = () => {
    const limit = 1000;
    const offset = 0;
    const [ query, setQuery ] = useState('');
    const [ results, setResults ] = useState([]);
    const [ selectedTerm, setSelectedTerm ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if( query.length >= 3 ) {
            const fetchTerms = async() => {
                try {
                    setResults([]);
                    setLoading(true);
                    const response = await fetch(`http://localhost:5000/api/umc/api-search?limit=${ limit }&offset=${ offset }&term=${ query }`);
                    const data = await response.json();
                    setResults(data.result || []);
                } catch (error) {
                    console.error("Error fetching MedDRA terms:", error);
                }
            }
            const delayDebounce = setTimeout(() => {
                fetchTerms();
            }, 400);
            return () => clearTimeout( delayDebounce );
        }
    }, [ query ]);

    useEffect(() => {
        if( results.length > 0 ) {
            setLoading(false);
        }
    }, [ results ]);

    const handleSelect = async( term ) => {
        setSelectedTerm(term);
        setShowModal(true);
    }
    return (
        <>
            <div className='p-4 max-w-xl mx-auto'>
                <input 
                    type="text"
                    placeholder="Ingrese el término a buscar"
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                    value={ query }
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className='p-4 max-w-xl mx-auto'>
                { loading && <Span /> }
            </div>
            {
                results.length > 0 && 
                (
                    <div className='p-4 max-w-xl mx-auto' style={{ alignContent: 'flex-start', paddingLeft: '4rem' }}>
                        <table className='w-full border border-gray-300 rounded-md mx-auto shadow' style={{ alignContent: 'center' }}>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='p-2 border'>Resultado</th>
                                    <th className='p-2 border'>Categoría</th>
                                    <th className='p-2 border'>Árbol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    results.map( (term, index) => (
                                        <tr key={ index } onClick={() => handleSelect(term)} className='hover:bg-gray-50 cursor-pointer'>
                                            <td className='p-2 border' style={{ textAlign: 'left' }}>{ term.meddraData.name }</td>
                                            <td className='p-4 border' style={{ textAlign: 'left' }}>{ term.meddraData.category }</td>
                                            <td className='p-8 border' style={{ textAlign: 'right' }}>
                                                <button className='bg-blue-500 text-white rounded-md px-4 py-2' onClick={() => handleSelect(term)}>
                                                    Ver árbol
                                                </button>
                                            </td>
                                        </tr>
                                    ) )
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                selectedTerm && (
                    <Modal 
                        isOpen={ showModal } 
                        onClose={ () => setShowModal(false) } 
                        title="Árbol de términos MedDRA"
                    >
                        {
                            selectedTerm && <Tree data={ selectedTerm } />
                        }
                    </Modal>
                )
            }
        </>
    )
}