import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class AddTodoApi{
    //variables
    private request:APIRequestContext;
    //constructor
    constructor(request :APIRequestContext){
        this.request =request ;
    }

    //methods
//add todo with api request
  async  AddTodo(user:User){
        return  await this.request.post('/api/v1/tasks',{
            data:{
                    isCompleted : false,
                    item : 'homework',
                },
            headers:{
                    Authorization:`Bearer ${user.getAccessToken()}`,
                },
    });
    }
}