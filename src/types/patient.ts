interface Patient{
    username:String,
    surname:String
    sex:String,
    age:Number,
    address:String,
    appointments?:Array<String>,
    tc:String
}

export default Patient;