import CustomInput from "../components/CustomInput";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Store } from "../context/store";
import { useNavigate} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import logo from '../assets/logo.png'
export default function Example() {
  const navigate = useNavigate();
  const { loginHandler, userIsLoggedIn } = useContext(Store);
  useEffect(() => {
    if (userIsLoggedIn) {
      navigate("/products");
    }
  }, [userIsLoggedIn, navigate]);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
      const { exp } = jwt_decode(result.data.login.token);
      loginHandler(result.data.login.token, exp);
      navigate("/products");
    },
    onError(err) {
    
      if(err.graphQLErrors[0].message){
        toast.error("Invalid credentials");
      }else toast.error('Something went wrong')
     
    },
    variables: {
      username: userDetails.username,
      password: userDetails.password,
    },
  });
  const handleSubmit = async (e) => {
    toast.dismiss();
    setLoading(false);
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-full  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto  sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-32 w-32"
            src={logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-700">
            Sign in to your account
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
                  htmlFor="email"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? (
                    <LoadingSpinner
                      height={"6"}
                      width={"5"}
                      
                    />
                  ) : (
                    "Sign in"
                  )}
                </button>
                {/* <p className="mt-6 text-sm text-bold">
                  Don't have an account?{" "}
                  <Link className="text-blue-600" to="/signup">
                    Sign Up
                  </Link>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username

      token
    }
  }
`;
