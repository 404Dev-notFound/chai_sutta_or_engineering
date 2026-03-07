function roadmap(){

let goal=document.getElementById("goal").value

let text=""

if(goal==="Software Job"){

text=`

Month 1-3: Learn DSA

Month 3-6: Build Projects

Month 6-8: Open Source + Internship

Month 8-12: Interview Prep

`

}

if(goal==="GATE"){

text=`

Month 1-4: Core Subjects

Month 5-8: Problem Practice

Month 9-12: Mock Tests

`

}

document.getElementById("plan").innerText=text

}