'use client'
import { useQueryString } from '@/hooks/use-querystring';
import { ChangeEvent, useState } from 'react';
import { FilterGroup } from './filter-group';
import { ProductItem } from '../product-item';
import { data } from '@/data';

export const ProductListFilter = () => {
    const queryString = useQueryString();
    const [filterOpened, setFilterOpened] = useState(false);

    const order = queryString.get('order') ?? 'views';

    const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        queryString.set('order', e.target.value);
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-6 justify-between items-start md:items-center'>
                <div className='text-3xl'><strong>{data.products.length}</strong> Produto{data.products.length != 1 ? 's' : ''}</div>
                <div className='flex flex-row w-full md:max-w-70 gap-5'>
                    <select 
                        defaultValue={order} 
                        onChange={handleSelectChanged}
                        className='flex-1 flex items-center px-6 h-12 bg-gray-200 text-gray-800 border border-gray-400 rounded-sm'>
                        <option value="views">Popularidade</option>
                        <option value="price">Por Preço</option>
                        <option value="selling">Mais vendidos</option>
                    </select>
                    <div
                        onClick={() => setFilterOpened(!filterOpened)} 
                        className='flex-1 md:hidden flex items-center px-6 h-12 bg-gray-200 text-gray-800 border border-gray-400 rounded-sm'>
                        Filtrar por
                    </div>
                </div>
            </div>
            <div className='mt-8 flex flex-col md:flex-row gap-8'>
                <div className={`flex-1 md:max-w-70 bg-gray-200 text-gray-800 ${filterOpened ? 'block' : 'hidden'} md:block`}>
                    <FilterGroup id='tech' name='Tecnologias'/>
                    <FilterGroup id='colors' name='Cores'/>
                </div>
                <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {data.products.map(item => (
                        <ProductItem key={item.id} data={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}