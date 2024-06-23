import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class UserApi{
    //variables
private request : APIRequestContext;

    //constructor
    constructor(request :APIRequestContext){
        this.request = request;
    }

    //methods

 // Registration api
 async register(user:User){
  return  await this.request.post('/api/v1/users/register',{
        data:{
           email:user.getEmail(),
           password:user.getPassword(),
           firstName:user.getFirstName(),
           lastName:user.getLastName(),
   },
   });
}
}