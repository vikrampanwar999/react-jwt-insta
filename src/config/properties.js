import Cookies from 'universal-cookie';
const AUTH_SERVICE='http://localhost:8081';
const CHAT_SERVICE='http://localhost:8080';
const properties ={
     
    INSTA_REDIRECT_URL:'https://766276473043.ngrok.io/instalogin',
    INSTA_ACCESS_TOKEN_URL:'https://api.instagram.com/oauth/access_token',
    INSTA_CLIENT_ID:'156957412902052',
    INSTA_CLIENT_SECRECT:'f8a755b73bb53fdfcdc467ef5aa042d6',
    FB_APP_ID:'358238235599355',
    AUTH_SERVICE : AUTH_SERVICE,
    CHAT_SERVICE : CHAT_SERVICE,
    INSTA_USER_REGISTER:AUTH_SERVICE+'/insta/register/user',
    GET_INSTA_ASSOCIATED_ACCOUNTS:AUTH_SERVICE+'/insta/accounts',
    
}
export default properties;

export const cookies = new Cookies();

