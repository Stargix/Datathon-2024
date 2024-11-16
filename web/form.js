// FORM AND ANIMATIONS SCRIPT
// Developed by Markus Urban for FME Datathon
// 16/11/2026 - 17/11/2024

// Let's see how much sleep I get today...


// [AMP] Programming languages could be rated by level

function go_to_team_form() {

    document.getElementById("dashboard").style.display = "none";
    //document.body.classList = "min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 flex flex-col items-center justify-center";
    document.getElementById("app").style.display = "block";

}

// Open the participant dashboard
function start_team_form() {

    document.getElementById("app").style.display = "none";
    document.body.classList = "min-h-screen bg-gradient-to-br from-teal-50 to-white p-4 md:p-8";
    document.getElementById("team_building_form").style.display = "block";

}


// FORM TITLES AND SUBTITLES
let form_section_titles = ["Participant Information", "Tell us about your preferences", "Tell us about your skills", "More about yourself", "Almost done! ☀️"];
let form_section_subtitles = ["Let's start with some basic information", "Help us customize your experience", "Select all programming languages you're proficient in", "Please tell us more about your objectives and yourself for the Datathon", "Tell us about your projects, your future, and a fun fact"]


var form_page = 0;
var form_max_pages = 5;
var progress = 10;

function form_next_button() {

    form_page++;

    // Change button to "Finish"
    if (form_page == 4) {
        document.getElementById("form_next_button").innerHTML = "Save & finish";
    }

    else {
        document.getElementById("form_next_button").innerHTML = "Next Step";
    }

    // Form finished
    if (form_page >= form_max_pages) {

        send_form();

    }

    else {

        document.getElementById("step_indicator").innerHTML = "Step " + (form_page + 1) + " from 5";
        document.getElementById("form_step_" + (form_page)).style.display = "none";
        document.getElementById("form_step_" + (form_page+1)).style.display = "block";
        document.getElementById("form_section_title").innerHTML = form_section_titles[form_page];
        document.getElementById("form_section_subtitle").innerHTML = form_section_subtitles[form_page];

        // Update progress bar
        const progressBar = document.getElementById("progressBar");
        progress += 20;
        progressBar.style.width = `${progress}%`;

    }

}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var sent_json;

// Save the data and send to server for teammates formation
function send_form() {

    var birthdate = document.getElementById("dob").value;
    var age = getAge(birthdate);

    if (!preferred_role) {
        preferred_role = "Don't care";
    }

    var years = ["1st", "2nd", "3rd", "4th"];
    var year_study = selectedYears[0];
    
    if (years.includes(selectedYears[0])) {
        year_study += " year";
    }

    if (dietaryRestrictions.length == 0) {
        dietaryRestrictions = "None";
    }

    // Format selected programming languages
    var items = selectedLanguages;
    const dict = Object.fromEntries(items.map(item => [item, 4]));

    // Collect all the data
    let participant_info = {
        name: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
        age: age,
        email: document.getElementById("email").value,
        age: age,
        year_of_study: year_study,
        shirt_size: shirtSize,
        university: document.getElementById("uni").value,
        dietary_restrictions: dietaryRestrictions,

        preferred_languages: ["English", "Spanish"],

        programming_skills: dict,
        experience_level: selectedExperienceLevels[0],
        hackathons_done: document.getElementById("hackathons").value,
        interests: interests,
        preferred_role: preferred_role,
        objective: document.getElementById("objective").value,
        interest_in_challenges: [selectedChallenge + " Challenge"],
        friend_registration: [],
        preferred_team_size: document.getElementById("teamSize").value,
        availability: selectedAvailability,

        introduction: document.getElementById("aboutYourself").value,
        technical_project: document.getElementById("technical-project").value,
        future_excitement: document.getElementById("future-excitement").value,
        fun_fact: document.getElementById("fun-fact").value

    };

    sent_json = participant_info;

    send_data(sent_json);

    document.getElementById("team_building_form").style.display = "none";
    document.getElementById("loader_spinner").style.display = "flex";

}


function show_team_skeleton() {

    document.getElementById("loader_spinner").style.display = "none";
    document.getElementById("skeleton_page").style.display = "block";
}


var result_json;

function send_data(data) {
    
    const url = "http://127.0.0.1:5000/recommendations";
 
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Create the cards
        const jsonArray = data.map(JSON.parse);
        result_json = jsonArray;
        show_real_results(jsonArray);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


var users = [];

function show_real_results(participants) {

  document.getElementById("loader_spinner").style.display = "none";

  // First card is filled with sent_json data
  document.getElementById("user_avatar_1").src = `https://avatar.oxro.io/avatar.svg?name=${sent_json.name}`;
  document.getElementById("user_name_1").textContent = sent_json.name;
  document.getElementById("user_description_1").textContent = sent_json.preferred_role;

  // Popover for first card
  document.getElementById("user_age_1").textContent = `Age: ${sent_json.age}`;
  document.getElementById("user_year_1").textContent = `Year of Study: ${sent_json.year_of_study}`;
  document.getElementById("user_role_1").textContent = `Role: ${sent_json.preferred_role}`;
  document.getElementById("user_hackathons_1").textContent = `Hackathons Done: ${sent_json.hackathons_done}`;

  // Fill remaining cards with data from participants array
  for (let i = 0; i < 3; i++) {
    const participant = participants[i];
    const cardId = i + 2; // To target user_card_2 and user_card_3

    document.getElementById(`user_avatar_${cardId}`).src = `https://avatar.oxro.io/avatar.svg?name=${participant.name}`;
    document.getElementById(`user_name_${cardId}`).textContent = participant.name;
    document.getElementById(`user_description_${cardId}`).textContent = participant.preferred_role;

    // Popover for other cards
    document.getElementById(`user_age_${cardId}`).textContent = `Age: ${participant.age}`;
    document.getElementById(`user_year_${cardId}`).textContent = `Year of Study: ${participant.year_of_study}`;
    document.getElementById(`user_role_${cardId}`).textContent = `Role: ${participant.preferred_role}`;
    document.getElementById(`user_hackathons_${cardId}`).textContent = `Hackathons Done: ${participant.hackathons_done}`;
  }

  document.getElementById("loader_spinner").style.display = "none";
  document.getElementById("real_results_page").style.display = "block";

}


function another_team() {

    // Delete 3 first elements from the received JSON (we have 16 elements in total)
    result_json.splice(0, 3);

    document.getElementById("real_results_page").style.display = "none";
    document.getElementById("skeleton_page").style.display = "block";

    setTimeout(function() {
        document.getElementById("skeleton_page").style.display = "none";
        show_real_results(result_json);
    }, 1000);

}



function joinTeam() {

    document.getElementById("spinner_text").innerHTML = "Saving your new team...";
    document.getElementById("real_results_page").style.display = "none";
    document.getElementById("loader_spinner").style.display = "flex";

    setTimeout(function() {
        
        document.getElementById("loader_spinner").style.display = "none";
        document.getElementById("team_images_placeholder").style.display = "none";
        document.getElementById("team_images_real").style.display = "flex";
        document.getElementById("team_text").innerHTML = "You joined a team!";
        document.getElementById("team_subtext").innerHTML = "You can change your team if you wish";
        document.getElementById("button_team_join").innerHTML = "Leave the team";
        document.getElementById("button_team_join").style.backgroundColor = "#e74c3c";

        // Put team member initials on the dashboard
        document.getElementById("team_avatar_img_1").src = document.getElementById("user_avatar_1").src;
        document.getElementById("team_avatar_img_2").src = document.getElementById("user_avatar_2").src;
        document.getElementById("team_avatar_img_3").src = document.getElementById("user_avatar_3").src;
        document.getElementById("team_avatar_img_4").src = document.getElementById("user_avatar_4").src;

        document.getElementById("dashboard").style.display = "block";

    }, 2000);

}

function closeSuccessSection() {
    document.getElementById("join_success_section").classList.add("hidden");
  }
