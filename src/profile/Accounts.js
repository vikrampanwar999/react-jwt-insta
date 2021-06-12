import { useRecoilValue, useRecoilState } from "recoil";
import { loggedInInstaUser,loggedInUser} from "../atom/globalState";
import React, { useEffect, useState } from "react";
import { getInstaUserInfo } from "../util/ApiUtil";
import { Card, Avatar, Table } from "antd";

import "./Profile.css";
const { Meta } = Card;



const Accounts =(props)=>{
    const LinkInstaAccount=(props)=>{
        console.log("fetching linked insta profiles");
        getInstaUserInfo().then(
            res=>{
                console.log("associated insta accounsts are",res[0].instaUserName);
                setinstaUserList(res);
                console.log(res);
                
            }
        )
    }
 const [instaUserList, setinstaUserList] = useState([]);
    useEffect(() => {
        LinkInstaAccount(props);
      }, []);
     
    const getCard=(instaUser)=>{
      return(
      <div className="profile-container">
      <Card
        style={{ width: 420, border: "1px solid #e1e0e0" }}
        // actions={[<LogoutOutlined onClick={logout} />]}
      >
        <Meta
          avatar={
            <Avatar
              src={instaUser.instaProfilePicUrl}
              className="user-avatar-circle"
            />
          }
          title={instaUser.instaUserName}
          description={"@" + instaUser.instaUserName}
        />
      </Card>
    </div>
      );
    } 
    const getCards=(instaUserList)=>{
      var rows=[];
      for(let i=0;i<instaUserList.length;i++){
        var row=[];
        row.push(<td>{getCard(instaUserList[i])}</td>);
        rows.push(<tr>{row}</tr>);
      }
      return rows;
    } 
    if(instaUserList[0]){
    return (
    <Table>
      {getCards}
    </Table>
    );
        }
        else{
          return(<div>
            does not any associated insta account
          </div>);
        }

}

export default Accounts;