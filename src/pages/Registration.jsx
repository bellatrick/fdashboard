import CustomInput from "../components/CustomInput";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";

import { useNavigate,Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
export default function Example() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [loginUser, { error }] = useMutation(REGISTER_USER, {
    update() {
      navigate("/");
   
    },
    onError(err) {
      
    
        if(err.graphQLErrors[0].message){
          toast.error(err.graphQLErrors[0].message);
        }else toast.error('Something went wrong')
  
    },
    variables:userDetails ,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await loginUser();
      setLoading(false)
    } catch (err) {
      console.log(err, error,'error');
    }
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
              <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <CustomInput
                    id="username"
                    name="username"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                    type="username"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                Email
                </label>
                  <CustomInput
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    value={userDetails.password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
           
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {loading ? (
                    <LoadingSpinner
                      height={"6"}
                      width={"5"}
                      color={"bg-white"}
                    />
                  ) : (
                    "Sign in"
                  )}
                </button>
                <p className='mt-6 text-sm text-bold'>Already have an account? <Link className='text-green-600' to='/'>Sign In</Link></p>
              </div>
            </form>
         
          </div>
        </div>
      </div>
    </>
  );
}
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!

  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
 
      }
    ) {
      id
      email
      username
      
      token
    }
  }
`;
