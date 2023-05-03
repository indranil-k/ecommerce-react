import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import {Categories} from '../dummyApi';

import { Breadcrumbs, SearchProductCard, CategoryBanner, Filter } from '../components/Search';

function Search(props) {
  const params = new URLSearchParams(props.searchRule);
  const [searchedCategoryId, setSearchedCategoryId] = useState('');
  const [listItems, setListItems] = useState([]);
  const { category, subcategory } = useParams();

  useEffect(function(){
    if(params.get('categoryId')){
      setSearchedCategoryId(params.get('categoryId'))
    }
  },[params])

  useEffect(function(){
    Categories.getProductsByCategory(searchedCategoryId)
    .then(res=>{
      setListItems(res)
    })
    .catch(err=>{
      setListItems([]);
      console.log(err)
    })
  },[searchedCategoryId])

  const renderListItems = () => {
    if(listItems.length===0){
      return null;
    }
    return listItems.map(item=>{
      return <SearchProductCard product={item} key={item.productId}/>
    })
  }

  return (
    <div className="bg-white px-[20px] max-w-screen-xl mx-auto">
      <Breadcrumbs links={[category,subcategory]}/>
      <CategoryBanner/>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className='flex w-full'>
            <Filter/>
            <div className="ml-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {renderListItems()}
            </div>
        </div>

      </div>
    </div>
  )
}

export default Search