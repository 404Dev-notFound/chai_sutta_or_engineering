function findCareer(){

let interest=document.getElementById("interest").value

let result=""

if(interest==="Coding"){

result="Suggested Careers: Software Developer, AI Engineer, Backend Developer"

}

else if(interest==="Research"){

result="Suggested Path: MTech, MS Abroad, PhD"

}

else if(interest==="Business"){

result="Suggested Careers: MBA, Product Manager, Consultant"

}

else if(interest==="Government"){

result="Suggested Exams: UPSC, GATE, SSC"

}

document.getElementById("careerResult").innerText=result

}



function analyzeSkills(){

let career=document.getElementById("targetCareer").value

let result=""

if(career==="Backend Developer"){

result="Required Skills: Data Structures, APIs, Databases, System Design"

}

if(career==="Data Scientist"){

result="Required Skills: Python, Statistics, Machine Learning"

}

if(career==="AI Engineer"){

result="Required Skills: Deep Learning, TensorFlow, ML Systems"

}

document.getElementById("skillResult").innerText=result

}



function generateRoadmap(){

let goal=document.getElementById("goal").value

let roadmap=""

if(goal==="Software Job"){

roadmap=`

Month 1-3: Learn Data Structures

Month 3-6: Build Portfolio Projects

Month 6-8: Contribute to Open Source

Month 8-12: Prepare for Interviews

`

}

if(goal==="GATE"){

roadmap=`

Month 1-4: Study Core Subjects

Month 5-8: Practice Questions

Month 9-12: Mock Tests and Revision

`

}

if(goal==="MS Abroad"){

roadmap=`

2nd Year: Build Projects

3rd Year: Prepare GRE/IELTS

4th Year: Apply to Universities

`

}

document.getElementById("roadmapResult").innerText=roadmap

}
