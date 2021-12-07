import { useEffect, useState,useContext } from "react";
import { FETCH_PRODUCTS_QUERY,FETCH_SHIPPING } from "../utils/Graphql";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import ShippingModal from '../components/ShippingModal'
import { Store } from "../context/store";
export default function Dashboard() {
  const {dispatch}= useContext(Store)
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);
  const { loading:shippingLoading, data:shippingData } = useQuery(FETCH_SHIPPING);

  const [open,setOpen]= useState(false)
  useEffect(() => {
    document.title = "Dashboard";
    if (data) {
   
      dispatch({type:'GET_PRODUCT_LIST', payload:data.getAllProducts})
    }
  
  }, [data,dispatch]);
  return (
    <Layout>
      <div className="px-16 pt-5">
      {shippingLoading ? '':  <div className="text-green-900 ">
          <h2 className='text-xl font-bold mb-2'>Shipping Costs</h2>
        <div className='flex items-center'>
        <div className=' font-semibold mr-7 '>
            {" "}
            <p className='mt-2'>Nigeria to Uk: {shippingData?.getShipping[0].nigeriaToUK}</p>
            <p className='mt-2'>UK to Nigeria: {shippingData?.getShipping[0].uKToNigeria} </p>
          </div>
          <div onClick={()=>setOpen(true)} className="mt-2 py-2 w-20 rounded-2xl text-center text-white bg-green-700 hover:bg-green-800 cursor-pointer">
            Edit
          </div>
        </div>
        </div>}
      </div>
      <TableList  loading={loading} />
      <ShippingModal open={open} setOpen={setOpen} id={shippingData?.getShipping[0].id}/>
    </Layout>
  );
}
