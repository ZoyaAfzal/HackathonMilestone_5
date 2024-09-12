//listing elements
document.getElementById("resumeForm")?.addEventListener("submit", function(event)  {
    event.preventDefault();
    
//type assertions
const profilePicture = document.getElementById('profilepicture') as HTMLInputElement;
const nameElement = document.getElementById('name') as HTMLInputElement;
const emailElement = document.getElementById('email') as HTMLInputElement;
const contactnoElement = document.getElementById('contact') as HTMLInputElement;
const addressElement = document.getElementById('address') as HTMLInputElement;
const educationElement = document.getElementById('education') as HTMLTextAreaElement;
const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;


const usernameElement = document.getElementById(
    "username"
) as HTMLInputElement;




if( profilePicture && nameElement && emailElement && contactnoElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement){
    const name = nameElement.value;
    const email = emailElement.value;
    const contactno = contactnoElement.value;
    const address= addressElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;


const username = usernameElement.value;
const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`



//profilePicture element
const profilePictureFile = profilePicture.files?.[0];
const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile): "";

//create resume generate
const resumeGenerate = `
<h2>MyResume</h2>
${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="ProfilePicture" class="profilePicture"/>` : ""
}
<p><strong>Name: </strong><span id="editName" class="editable">${name}</span></p>
<p><strong>Email: </strong><span id="editEmail" class="editable"> ${email}</span></p>
<p><strong>Contact Number: </strong><span id="editContact" class="editable"> ${contactno}</span></p>
<p><strong>Address: </strong><span id="editAddress" class="editable"> ${address}</span></p>


<h3>Education: </h3>
<p id="editEducation" class="editable" >${education}</p>

<h3>Experiences: </h3>
<p id="editExperience" class="editable" >${experience}</p>

<h3>Skills: </h3>
<p id="editSkills" class="editable">${skills}</p>

`;

const downloadLink = document.createElement('a')
downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeGenerate);
downloadLink.download = uniquePath;
downloadLink.textContent = "Download your Resume";




const resumeGenerateElement = document.getElementById("resumeGenerate");
if(resumeGenerateElement){
    resumeGenerateElement.innerHTML = resumeGenerate;

resumeGenerateElement.appendChild(downloadLink);



makeEditable();
} 
} else {
    console.log("one or more output elements are missing");
}


});

function makeEditable(){
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function()   {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            //replace content
            if(currentElement.tagName === "P" || currentElement.tagName === "SPAN"){
                const input = document.createElement('input')
                input.type = "text"
                input.value = currentValue
                input.classList.add('editing-input')


                input.addEventListener('blur', function(){
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline'
                input.remove()
                })

                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus();
                
            }

        })
             
        
    })
}