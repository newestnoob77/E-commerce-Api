export default class applicationError extends Error{
    constructor(code,message){
        this.code=code
        super(message)
    }
}