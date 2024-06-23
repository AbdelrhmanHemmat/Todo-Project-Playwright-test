import { Page } from "@playwright/test";

export default class TodoPage{
//variables
private page:Page;
//constructor
constructor(page:Page){
this.page = page;
}

//Elements

private WelcomeMessage(){
    return '[data-testid="welcome"]';
}
private getTodoText(){
    return '[data-testid="todo-item"]';
}
private deletebutton(){
    return '[data-testid="delete"]';
}
private notodomessages(){
    return '[data-testid="no-todos"]';
}


//methods
getWelcomeMessage(){
   return this.page.locator(this.WelcomeMessage());
}

async getTodotextByIndex(index:number){
return await this.page.locator(this.getTodoText()).nth(index).innerText();
}

async load(){
    await this.page.goto('/todo');
}
async deleteTaskByIndex(index:number){
   return  await this.page.locator(this.deletebutton()).nth(0).click();
}
getNOTodoMessage(){
return this.page.locator(this.notodomessages());
}
}