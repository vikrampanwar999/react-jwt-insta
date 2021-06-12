import React from 'react';
import { getInstaUserInfo } from "../util/ApiUtil";

const InstaLoginComponent=(props)=>{
  let response;
  console.log('inside getInstaUserInfoFromService {}',response.data);
  console.log('inside getInstaUserInfoFromService local storage',localStorage.getItem("accessToken"));
  // axios.post(properties.INSTA_USER_INFO,response.data)
  getInstaUserInfo(response.data)
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
export default InstaLoginComponent;
