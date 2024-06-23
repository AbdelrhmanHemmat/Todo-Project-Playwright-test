import { APIRequestContext, Page } from "@playwright/test";
import AddTodoApi from "../APIs/TodoApi";
import User from "../models/User";

export default class NewTodoPage{

    //variables
private page:Page;
private request ?:APIRequestContext;
    //contructors
constructor(page:Page,request?:APIRequestContext){
this.page = page ;
this.request = request;
}
    //Elements
private getTodoInput(){
    return '[data-testid="new-todo"]';
}
private getSubmitButton(){
    return '[data-testid="submit-newTask"]';
}
    //methods
    async load(){
        return await this.page.goto('/todo/new');;
    }

    async addTask(task:string){
        await this.page.type(this.getTodoInput(),task);
        await this.page.click(this.getSubmitButton());
    }

    async addNewTaskUsingApi(user:User){
        return await new AddTodoApi(this.request!).AddTodo(user);
    }

}