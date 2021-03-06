import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import CustomInput from "../components/CustomInput";
import Layout from "../components/Layout";
import TextArea from "../components/TextArea";
import MediaInput from "../components/MediaInput";
import LoadingSpinner from "../components/LoadingSpinner";
import DropInput from "../components/DropInput";
import { toast } from "react-toastify";
import { FETCH_CATEGORIES, FETCH_PRODUCTS_QUERY } from "../utils/Graphql";
import { cloneDeep } from "@apollo/client/utilities";

const locationList = [
  { id: 1, name: "UK" },
  { id: 2, name: "Nigeria" },
];
const stockList = [
  { id: 1, name: 'true' },
  { id: 2, name: 'false' },
];
const AddProduct = () => {
  const { loading: loadCategory, data } = useQuery(FETCH_CATEGORIES);
  const [imageArr, setImageArr] = useState([]);
  const [fileImages, setFileImages] = useState([]);
  const [loadingImg, setLoading] = useState(false);
  const [imagePreviewArr, setImagePreviewArr] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(data &&data.getCategory[0]);
  const [selectedLocation, setSelectedLocation] = useState(locationList[0]);
  const [selectedStock,setSelectedStock]= useState(stockList[0])
  const [productDetails, setProductDetails] = useState({
    name: "",
    desc: "",
    price: "",
  });
  const { name, desc, price } = productDetails;
  const navigate = useNavigate();


  const [postProduct, { loading }] = useMutation(POST_PRODUCT, {
    variables: {
      name,
      desc,
      category: selectedCategory?.name,
      price,
      inStock:selectedStock.name==='true'?true:false,
      location: selectedLocation.name,
      images: imageArr,
    },
    update(proxy,result) {
      setImageArr([]);
      setProductDetails({
        name: "",
        desc: "",
        price: "",
      });
      const data = cloneDeep(
        proxy.readQuery({
          query: FETCH_PRODUCTS_QUERY,
          variables: { limit: 5, offset: 0 },
        })
      );
     
      data.getAllProducts.unshift(result.data.postProduct);
    
      proxy.writeQuery({
        query: FETCH_PRODUCTS_QUERY,
        data,
        variables: { limit: 5, offset: 0 },
      });
    },
  });
  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(loading)
    toast.dismiss()
    try {
      e.preventDefault();
      console.log(selectedCategory,selectedLocation)
      if (imageArr.length <= 0) {
        toast.warn('At least one image must be added')
        throw new Error("At least one image must be added");
      }
     await postProduct();
      toast.success("Product successfully added");
      navigate("/");
    } catch (err) {

      console.log(err)
    }
  };

  const handleImagePreview = (image) => {
    return URL.createObjectURL(image);
  };
  const uploadImageFile = (files) => {
    console.log(files);
    if (fileImages.length >= 4) return;
    setFileImages([...fileImages, ...files]);
  };
  const handleDeleteImage = (i) => {
    const newFileImg = fileImages.filter((_, index) => index !== i);
    const newImagePrev = imagePreviewArr.filter((_, index) => index !== i);
    setImagePreviewArr(newImagePrev);
    setFileImages(newFileImg);
    toast.success("Image deleted successfully");
  };
  useEffect(() => {
    fileImages &&
      setImagePreviewArr(
        fileImages.map((images) => handleImagePreview(images))
      );
  }, [fileImages]);

  const uploadImage = async (image) => {
  

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "bellatrix");
    data.append("cloud_name", "di8tcw4ul");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di8tcw4ul/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const dataRes = await res.json();

      return dataRes.url;
    } catch (err) {
      console.log(err);
    }
  };
  const handleUploadImage = async () => {
    if(fileImages.length<=0){
      toast.error('No image has been uploaded')
      return
    }
    try {
      setLoading(true);
      const arr = await Promise.all(
        fileImages.map((image) => uploadImage(image))
      );
      setLoading(false);
      setImageArr(arr);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <form className="px-2 sm:px-10 py-5 " onSubmit={handleSubmit}>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2  lg:gap-1 px-16 md:px-2">
            {imagePreviewArr.length >= 1
              ? imagePreviewArr.map((image, i) => (
                  <div
                    key={i}
                    onClick={() => handleDeleteImage(i)}
                    className="mt-5 sm:px-4 py-6  "
                  >
                    <img
                      alt={image}
                      src={image}
                      className="mr-6  rounded-lg w-96 h-56"
                    />
                    {imageArr.length >= 1 ? "" : <p className='bg-blue-600 w-28 font-bold tracking-wider text-white text-sm mt-3 rounded-3xl text-center py-2 hover:bg-gray-800'>Delete</p>}
                  </div>
                ))
              : ""}
          </div>
          <div className="mb-8 w-full sm:w-3/2 px-16">
            <MediaInput
              placeholder="UPLOAD IMAGE"
              buttonText="Browse"
              label="Product Image  *"
              value={fileImages}
              onChange={(e) => uploadImageFile(e.target.files)}
              type="file"
              helperText=""
            />

            <button
              type="button"
              className="my-5 bg-gray-900 text-white px-6 py-2 w-40 hover:bg-gray-700 rounded-2xl"
              onClick={handleUploadImage}
            >
              {loadingImg ? (
                <LoadingSpinner height={"6"} width={"5"} color={"bg-white"} />
              ) : (
                " Upload Images"
              )}
            </button>
            <p className="text-sm text-medium">
              Note: The first image uploaded will be the main image displayed to
              the customers. You can upload up to four images. Note: Only click
              the upload images button after selecting all the images you'd like
              to upload for this product.
            </p>
          </div>
        <div className="sm:px-16 flex flex-col sm:flex-row w-full justify-between">
          {" "}
          <div className="mr-6 w-full">
            <CustomInput
              label="PRODUCT NAME"
              type="type"
              data_testid={"email"}
              id="name"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              autoComplete="product"
            />
          </div>
          <div className="mr-6 w-full">
            <CustomInput
              label="PRICE"
              type="number"
              data_testid={"email"}
              value={productDetails.price}
              onChange={handleChange}
              id="price"
              name="price"
            />
          </div>
        </div>
        <div className="sm:px-16 flex flex-col sm:flex-row w-full mt-5 justify-between">
          <div className="mr-6 w-full">
            <DropInput
              label="PRODUCT CATEGORY"
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              options={data&&data.getCategory}
              loading={loadCategory}
            />
          </div>
          <div className="mr-6 w-full">
            <DropInput
              label="PRODUCT LOCATION"
              selected={selectedLocation}
              setSelected={setSelectedLocation}
              options={locationList}
            />
          </div>
          <div className="mr-6 w-full">
            <DropInput
              label="IN STOCK"
              selected={selectedStock}
              setSelected={setSelectedStock}
              options={stockList}
            />
          </div>
        </div>
        <div className="sm:px-16 mt-5">
          {" "}
          <div className="mb-5 ">
            <TextArea
              label="DESCRIPTION  *"
              placeholder="Product Description"
              type="text"
              data_testid={"description"}
              value={productDetails.desc}
              onChange={handleChange}
              rows={5}
              id="description"
              name="desc"
            />
          </div>
     
      
        </div>
        <div className="sm:px-16 mt-8 mx-auto">
          <button
            type="submit"
            className="inline-flex justify-center w-72 rounded-md border border-transparent shadow-sm  py-2 bg-blue-800 tracking-wide font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 "
          >
            {loading ? (
              <LoadingSpinner height={"6"} width={"5"} color={"bg-blue-200"} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </Layout>
  );
};
const POST_PRODUCT = gql`
  mutation (
    $name: String!
    $desc: String!
    $price: String!
    $category: String!
    $location: String!
    $images: [String]!
    $inStock:Boolean!
  ) {
    postProduct(
      input: {
        name: $name
        desc: $desc
        price: $price
        category: $category
        location: $location
        images: $images
        inStock:$inStock
      }
    ) {
      id
      images
      price
      location
      category
      desc
      name
      inStock
    }
  }
`;
export default AddProduct;
