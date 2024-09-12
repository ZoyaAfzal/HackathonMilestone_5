var _a;
//listing elements
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    //type assertions
    var profilePicture = document.getElementById('profilepicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var contactnoElement = document.getElementById('contact');
    var addressElement = document.getElementById('address');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var usernameElement = document.getElementById("username");
    if (profilePicture && nameElement && emailElement && contactnoElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var contactno = contactnoElement.value;
        var address = addressElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        //profilePicture element
        var profilePictureFile = (_a = profilePicture.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        //create resume generate
        var resumeGenerate = "\n<h2>MyResume</h2>\n".concat(profilePictureUrl ? "<img src=\"".concat(profilePictureUrl, "\" alt=\"ProfilePicture\" class=\"profilePicture\"/>") : "", "\n<p><strong>Name: </strong><span id=\"editName\" class=\"editable\">").concat(name_1, "</span></p>\n<p><strong>Email: </strong><span id=\"editEmail\" class=\"editable\"> ").concat(email, "</span></p>\n<p><strong>Contact Number: </strong><span id=\"editContact\" class=\"editable\"> ").concat(contactno, "</span></p>\n<p><strong>Address: </strong><span id=\"editAddress\" class=\"editable\"> ").concat(address, "</span></p>\n\n\n<h3>Education: </h3>\n<p id=\"editEducation\" class=\"editable\" >").concat(education, "</p>\n\n<h3>Experiences: </h3>\n<p id=\"editExperience\" class=\"editable\" >").concat(experience, "</p>\n\n<h3>Skills: </h3>\n<p id=\"editSkills\" class=\"editable\">").concat(skills, "</p>\n\n");
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeGenerate);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download your Resume";
        var resumeGenerateElement = document.getElementById("resumeGenerate");
        if (resumeGenerateElement) {
            resumeGenerateElement.innerHTML = resumeGenerate;
            resumeGenerateElement.appendChild(downloadLink);
            makeEditable();
        }
    }
    else {
        console.log("one or more output elements are missing");
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            //replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
