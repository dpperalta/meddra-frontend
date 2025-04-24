import React from 'react';
import TreeMenu from 'react-simple-tree-menu';
import '../../node_modules/react-simple-tree-menu/dist/main.css';

export const Tree = ({ data }) => {
    if ( !data ) return null;
    const { lltTree } = data;
    const treeData = [
        {
            key: lltTree.soc_id + 'p1',
            label: lltTree.soc_name,
            nodes: [
                {
                    key: lltTree.hlgt_id + 'p2',
                    label: lltTree.hlgt_name,
                    nodes: [
                        {
                            key: lltTree.hlt_id + 'p3',
                            label: lltTree.hlt_name,
                            nodes: [
                                {
                                    key: lltTree.pt_id + 'p4',
                                    label: lltTree.pt_name,
                                    nodes: [
                                        { 
                                            key: lltTree.llt_id + 'p5',
                                            label: ' => ' + lltTree.llt_name + ' <= '
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <>
            <div>
                <hr />
                <span><b>Idioma: </b> { lltTree.language } </span>
                <br />
                <span><b>Versión: </b> { lltTree.version } </span>
                <hr />
            </div>
            <TreeMenu 
                cacheSearch
                data={ treeData }
                debounceTime={ 125 }
                disableKeyboard={ true }
                hasSearch={ false }
                onClickItem={ function noRefCheck(){} }
                resetOpenNodesOnDataUpdate={ false }
            />
            <hr />
        </>
    )
}

{/* <div className='ml-4 mt-2'>
                <div className='p-2 border-l-4 border-blue-400'>
                    <span className='font-semibold'>
                        { treeData.name }
                    </span>
                    <div className='ml-4'>
                        <span className='font-semibold'>
                            { treeData.children[0].name }
                        </span>
                        <div className='ml-4'>
                            <span className='font-semibold'>
                                { treeData.children[0].children[0].name }
                            </span>
                            <div className='ml-4'>
                                <span className='font-semibold'>
                                    { treeData.children[0].children[0].children[0].name }
                                </span>
                                <div className='ml-4'>
                                    <span className='font-semibold'>
                                        { treeData.children[0].children[0].children[0].children[0].name }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}