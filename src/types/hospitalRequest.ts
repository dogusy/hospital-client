interface HospitalRequest {
    id?:Number,
    hospitalName:String,
    address:String,
    hospitalType:String,
    appointments?:Array<String>
  }

  export default HospitalRequest;
