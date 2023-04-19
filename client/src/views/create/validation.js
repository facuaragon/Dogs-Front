export const validation = (input) =>{
    let errors = {};
    
    //name
    if(!input.name){
        errors.name= "Must be given";
    }
    if(!/^[a-zA-Z ]+$/.test(input.name.split(" ").join(""))){ 
        errors.name= "Letters only";
    }

    // min height
    if(!/^[0-9]*$/.test(input.height_min)){
        errors.height_min= "Numbers Only";
    }
    if(!input.height_min){
        errors.height_min= "Must be given";
    }
    if(input.height_min <= 0){
        errors.height_min= "Must be higher";
    }
    

    // max height
    if(!/^[0-9]*$/.test(input.height_max)){
        errors.height_max= "Numbers Only";
    }
    if(!input.height_max){
        errors.height_max= "Must be given";
    }
    if(input.height_max <= 0){
        errors.height_max= "Must be higher";
    }
    if(input.height_max <= input.height_min){
        errors.height_max= "Maximum must be higher than minimun";
    }


    // min weight
    if(!/^[0-9]*$/.test(input.weight_min)){
        errors.weight_min= "Numbers Only";
    }
    if(!input.weight_min){
        errors.weight_min=  "Must be given";
    }
    if(input.weight_min <= 0){
        errors.weight_min=  "Minimun must be higher";
    }
    // setErrors({...errors, weight_min: ""});

    // max weight
    if(!/^[0-9]*$/.test(input.weight_max)){
        errors.weight_max= "Numbers Only";
    }
    if(!input.weight_max){
        errors.weight_max= "Must be given";
    }
    if(input.weight_max <= 0){
        errors.weight_max= "Minimun must be higher";
    }
    if(input.weight_max <= input.height_min){
        errors.weight_max= "Maximum must be higher than minimun";
    }


    //min life span
    if(!/^[0-9]*$/.test(input.life_span_min)){
        errors.life_span_min= "Must be a number";
    }
    if(!input.life_span_min){
        errors.life_span_min= "Must be given";
    }
    if(input.life_span_min <= 0){
        errors.life_span_min= "Must be higher";
    }
    // setErrors({...errors, life_span_min: ""});

    //max life span
    if(!/^[0-9]*$/.test(input.life_span_max)){
        errors.life_span_max= "Numbers Only";
    }
    if(!input.life_span_max){
        errors.life_span_max= "Must be given";
    }
    if(input.life_span_max <= 0){
        errors.life_span_max= "Must be higher";
    }
    if(input.life_span_max <= input.height_min){
        errors.life_span_max= "Maximum must be higher than minimun";
    }

    //image
    if(!input.image){
        errors.image = "Must be given"
    }
    if(!/\.(jpe?g|png|gif|bmp)$/i.test(input.image) && !/^(ftp|http|https):\/\/[^ "]+$/ig.test(input.image)){
        errors.image = "Must be an URL or JEPG, PNG, GIF or BNP"
    }

    //temperaments
    if(!input.temperaments.length){
        errors.temperaments= "At least select one temperament"
    }

    return errors;
}