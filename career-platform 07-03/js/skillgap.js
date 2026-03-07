function analyze(){

let career=document.getElementById("career").value

let result=""

if(career==="Backend Developer"){

result="Learn Data Structures, APIs, Databases, System Design"

}

if(career==="Data Scientist"){

result="Learn Python, Statistics, Machine Learning"

}

if(career==="AI Engineer"){

result="Deep Learning, TensorFlow, ML Systems"

}

document.getElementById("output").innerHTML=result

}
