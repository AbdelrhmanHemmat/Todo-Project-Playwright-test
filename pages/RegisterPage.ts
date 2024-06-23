import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../APIs/UserApi";
import config from '.././playwright.config';

export default class RegisterPage{

    //variables
    private page : Page;
    private request?:APIRequestContext;
    private context ?:BrowserContext;
    //construtor
    constructor(page:Page,request?:APIRequestContext,context?:BrowserContext){
        this.page = page;
        this.request = request;
        this.context = context; 
    }

    //elements
private getfirstNameInput(){
    return '[data-testid="first-name"]';
}
private getlastNameInput(){
    return '[data-testid="last-name"]';
}
private getemail(){
    return '[data-testid="email"]';
}
private getPassword(){
    return '[data-testid="password"]';
}
private getconfirmPassword(){
    return '[data-testid="confirm-password"]';
}
private getSubmitButton(){
    return '[data-testid="submit"]';
}
    //Methods

async load(){
        return  await  this.page.goto('/signup');
    }

async register(user:User){
    await this.page.type(this.getfirstNameInput(),user.getFirstName());
    await this.page.type(this.getlastNameInput(),user.getLastName());   
    await this.page.type(this.getemail(),user.getEmail());
    await this.page.type(this.getPassword(),user.getPassword());
    await this.page.type(this.getconfirmPassword(),user.getPassword());
    await this.page.click(this.getSubmitButton());
}

async RegisterUsingApi(user:User){
    
    const respons = await new UserApi(this.request!).register(user);

const responseBody = await respons.json();
const access_token =  responseBody.access_token;
const userID = responseBody.userID;
const firstName = responseBody.firstName;

user.setAccessToken(access_token);

console.log(access_token,userID,firstName);

//set cookies
await this.context!.addCookies([
    {
        name:'access_token',
        value:access_token,
        url: config.use?.baseURL,
    },
    {
        name:'firstName',
        value:firstName,
        url: config.use?.baseURL,
    },
    {
        name:'userID',
        value:userID,
        url: config.use?.baseURL,
    }
]);
}
}