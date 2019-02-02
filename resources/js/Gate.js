export default class Gate{

    constructor(user){
        this.user = user;
    }


    isAdmin(){
        return this.user.type === 'admin';
    }

    isManager(){
        return this.user.type === 'manager';
    }

    isEmployee(){
        return this.user.type === 'employee';
    }

    isPrinter(){
        return this.user.type === 'printer';
    }




}
