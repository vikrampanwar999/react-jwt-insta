import properties from '../config/properties';
const AUTH_SERVICE = properties.AUTH_SERVICE;
const CHAT_SERVICE = properties.CHAT_SERVICE;

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: AUTH_SERVICE + "/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function facebookLogin(facebookLoginRequest) {
  return request({
    url: AUTH_SERVICE + "/facebook/signin",
    method: "POST",
    body: JSON.stringify(facebookLoginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: AUTH_SERVICE + "/users",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/me",
    method: "GET",
  });
}

export function getUsers() {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/summaries",
    method: "GET",
  });
}

export function countNewMessages(senderId, recipientId) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count",
    method: "GET",
  });
}

export function findChatMessages(senderId, recipientId) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId,
    method: "GET",
  });
}

export function findChatMessage(id) {
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + id,
    method: "GET",
  });
}

//link account and fetch the result
export function registerInstaUserInfo(instaUserINfoRequest){
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }
  
  console.log("inside getInstaUserInfo request ");
  return request({
    url: properties.INSTA_USER_REGISTER ,
    method: "POST",
    body: JSON.stringify(instaUserINfoRequest),
  });
}
export function getInstaUserInfo(instaUserINfoRequest){
  if (!localStorage.getItem("accessToken")) {
    return Promise.reject("No access token set.");
  }
  
  console.log("inside getInstaUserInfo request ");
  return request({
    url: properties.GET_INSTA_ASSOCIATED_ACCOUNTS ,
    method: "GET",
  });
}
// export function linkInstaAccountToFBAccount(instaUserINfoRequest){
//   if (!localStorage.getItem("accessToken")) {
//     return Promise.reject("No access token set.");
//   }
  
//   console.log("inside linkInstaAccountToFBAccount request ");
//   return request({
//     url: properties.INSTA_USER_INFO ,
//     method: "POST",
//     body: JSON.stringify(instaUserINfoRequest),
//   });
// }
