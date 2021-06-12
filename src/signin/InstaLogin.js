import React ,{ useEffect}from 'react';
// import InstagramLogin from 'react-instagram-login';
import Cookies from 'universal-cookie';
import InstagramLogin from './InstagramLogin';
import axios from 'axios';
import properties ,{cookies}from '../config/properties';
import FormData from 'form-data';
import { useRecoilState } from "recoil";
import { loggedInInstaUser} from "../atom/globalState";
import { getInstaUserInfo ,registerInstaUserInfo} from "../util/ApiUtil";



const InstaLogin= (props)=>{
  console.log("props in instalogin",props);
  const [currentInstaUser, setLoggedInInstaUser] = useRecoilState(loggedInInstaUser);
  useEffect(() => {
    //check for expiration of token as well
    if (localStorage.getItem("accessToken") === null) {
      props.history.push("/login");
    }
  }, []);
  
const getInstaUserInfoFromService=(response)=>{
  //store respose.data
  if(response.data.user_id){
  console.log("setting up insta user staate ",response.data);
  localStorage.setItem('insta_user',response.data);
  cookies.set('insta_user',response.data,{ path: '/' });
  console.log("cookies ",cookies.get('insta_user'));
  const fb_access_token=localStorage.getItem("accessToken");
  console.log("fb_access_token",fb_access_token);
  const user_info=registerInstaUserInfo(response.data).then(res=>{
    console.log(res);
    setLoggedInInstaUser(res);
  }
  );
  console.log("user_info",user_info);

  //redirecting to account.js
  // props.history.push("/me");
  }
}


const failedresponseInstagram = (responsek) => {
  console.log("instalogin failrue response");
  console.log(responsek);
  localStorage.setItem("instalogin", responsek);
};

const successResponse=(code)=>{
  console.log("inside success func");
  console.log(code);
  var bodyFormData = new FormData();
  bodyFormData.append('redirect_uri', properties.INSTA_REDIRECT_URL);
  bodyFormData.append('code', code);
  bodyFormData.append('client_id', properties.INSTA_CLIENT_ID);
  bodyFormData.append('client_secret', properties.INSTA_CLIENT_SECRECT);
  bodyFormData.append('grant_type', 'authorization_code');
  axios({
    method: "post",
    url: properties.INSTA_ACCESS_TOKEN_URL,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data",
    Accept: 'application/vnd.api+json',
  },
  })
    .then(getInstaUserInfoFromService)
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
  return (
    <InstagramLogin
    clientId={properties.INSTA_CLIENT_ID}
    buttonText="Login"
    redirectUri={properties.INSTA_REDIRECT_URL}
    scope="user_profile,user_media"
    onSuccess={successResponse}
    onFailure={failedresponseInstagram}
  />
 
  );

}

export default InstaLogin;
