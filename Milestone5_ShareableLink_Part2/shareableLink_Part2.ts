//listing elements
document.getElementById('resumeForm')?.addEventListener('submit', function(event)  {
    event.preventDefault();
    
//type assertions
const profilePicture = document.getElementById('profilepicture') as HTMLInputElement;
const nameElement = document.getElementById('name') as HTMLInputElement;
const emailElement = document.getElementById('email') as HTMLInputElement;
const contactnoElement = document.getElementById('contactno') as HTMLInputElement;
const addressElement = document.getElementById('address') as HTMLInputElement;
const genderRadios = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
const educationElement = document.getElementById('education') as HTMLTextAreaElement;
const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;


if( profilePicture && nameElement && emailElement && contactnoElement && addressElement && genderRadios && educationElement && skillsElement && experienceElement){
    const name = nameElement.value;
    const email = emailElement.value;
    const contactno = contactnoElement.value;
    const address= addressElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;

//profilePicture Element
const profilePictureFile = profilePicture.files?.[0];
const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile): "";

//gender Element
let selectedGender: string | null = null;
genderRadios.forEach((radio) => {
    if (radio.checked) {
        selectedGender = radio.value;
    }
});
console.log(`Selected Gender: ${selectedGender ? selectedGender : 'None selected'}`);
//create resume generate
const resumeHTML = `
<h2>My Resume</h2>
${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="ProfilePicture" class="profilePicture"/>` : ""
}
<p><strong>Name: </strong> ${name}</p>
<p><strong>Email: </strong> ${email}</p>
<p><strong>Contact Number: </strong> ${contactno}</p>
<p><strong>Address: </strong> ${address}</p>
<p><strong>Gender: </strong> ${selectedGender ? selectedGender : 'None selected'}</p>


<h3>Education: </h3>
<span>${education}</span>

<h3>Experiences: </h3>
<span>${experience}</span>

<h3>Skills: </h3>
<span>${skills}</span>


`;


//Display the resume in the output container
const resumeGenerateElement = document.getElementById("resumeGenerate");
if(resumeGenerateElement){
resumeGenerateElement.innerHTML = resumeHTML;
resumeGenerateElement.classList.remove("hidden");

//create container for buttons
const buttonsContainer = document.createElement("div");
buttonsContainer.id = "buttonsContainer";
resumeGenerateElement.appendChild(buttonsContainer);

//Add download Pdf button
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download in PDF format";
downloadButton.addEventListener("click",() => {
    window.print(); // open the print dialog, allow the user to save as PDF
});
buttonsContainer.appendChild(downloadButton);

//Add shareable link button
const shareLinkButton = document.createElement("button");
shareLinkButton.textContent = "Copy Shareable Link";
shareLinkButton.addEventListener("click",async() => {
    try {
        //Create a unique shareable link (simulate in this case)
        const shareableLink = `https://yourdomain.com/resumes/${name.replace(
            /\s+/g,
            "_"
        )}_cv.html`;

        //Use Clopboard Api to copy the shareable link
        await navigator.clipboard.writeText(shareableLink);
        alert("Shareable link copied to clipboard!")
    } catch (err) {
        console.log("Failed to copy link:", err);
        alert("Failed to copy link to clipboard, Please Try Again! ");
    }
});
buttonsContainer.appendChild(shareLinkButton);
}else {
    console.error("Resume output container not found");
} 
}
else {
    console.error("Form elements are missing");
}
});
