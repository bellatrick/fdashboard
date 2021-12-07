import React,{useEffect, useState} from "react";
import Layout from "../components/Layout";
import {FETCH_CATEGORIES} from '../utils/Graphql'
import { useQuery } from "@apollo/react-hooks";
import CategoryList from '../components/CategoryList'
import AddCategoryModal from '../components/AddCategoryModal'
const Category = () => {
  const { loading: loadCategory, data } = useQuery(FETCH_CATEGORIES);
  const [dataList, setdataList] = useState(data?.getCategory)
  const [open, setOpen] = useState(false)
  useEffect(() => {
   setdataList(data?.getCategory)
  }, [data])
  return (
    <Layout>
      <main className='py-5 px-16'>
        <div>
          <p onClick={()=>setOpen(true)} className="bg-green-600 cursor-pointer w-48 py-2 font-medium rounded-md items-end hover:bg-green-700 text-center text-white text-sm">
            Add new Category
          </p>
        </div>
        <CategoryList data={dataList} loading={loadCategory}/>
      </main>
      <AddCategoryModal open={open} setOpen={setOpen}/>
    </Layout>
  );
};

export default Category;
