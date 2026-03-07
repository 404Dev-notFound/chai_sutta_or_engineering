function suggestCareer(){

let interest=document.getElementById("interest").value

let result=""

if(interest==="Coding"){

result="Software Developer, AI Engineer, Backend Developer"

}

else if(interest==="Research"){

result="MTech, MS Abroad, PhD"

}

else if(interest==="Business"){

result="MBA, Product Manager, Consultant"

}

else if(interest==="Government"){

result="UPSC, GATE, SSC"

}

document.getElementById("result").innerHTML=result

}