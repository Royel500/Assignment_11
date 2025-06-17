import {
  createBrowserRouter,
  

} from "react-router";
import RootLayOut from "../LayOut/RootLayOut";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import '../index.css'
import Pending from "../Components/Pending";
import Assignments from "../Components/CreateAssignment";
import Attemoted from "../Components/Attemoted";
import AllAssignments from "../Components/AllAssignments";
import PrivateRoute from "./PrivateRoute";
import Details from "../Components/Details";
import Update from "../Components/Update";
import Loading from "../Pages/Shear/Loading";
import Error from "../Pages/Shear/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,

    children:[
        {
            index:true ,
            element:<Home></Home>
        },
        {
            path:"/signUp" ,
            element:<SignUp></SignUp>
        },
        {
            path:'/signIn',
            element:<SignIn></SignIn>
        },
        {
          path:'/pending' ,
          element:<PrivateRoute>  <Pending></Pending> </PrivateRoute>
        },
        {
          path:'/create' ,
          element: <PrivateRoute><Assignments></Assignments> </PrivateRoute> 
        },


          {
            path: '/attempted',
            element: <PrivateRoute><Attemoted /></PrivateRoute>
          },

          

        {
          path:'/assignments', 
          loader: () => fetch('https://assignment-server-11-roan.vercel.app/assignment'),
          element:  <AllAssignments></AllAssignments> ,
           hydrateFallbackElement:<Loading/>
                },
        {
          path: '/details/:id',
          element: <PrivateRoute><Details /></PrivateRoute> ,
        loader: ({params}) => fetch(`https://assignment-server-11-roan.vercel.app/assignment/${params.id}`),
         hydrateFallbackElement:<Loading/>
        },

        {
          path:'/update/:id' ,
        loader: ({params}) => fetch(`https://assignment-server-11-roan.vercel.app/assignment/${params.id}`),
          element: <PrivateRoute> <Update></Update>  </PrivateRoute> ,
          hydrateFallbackElement:<Loading/>
        }


    ],
  
  },
  {
    path:'/*',
    element:<Error></Error>
  }
]);


 export default router ;
