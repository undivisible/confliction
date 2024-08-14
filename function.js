async function text(conflict) {
    const ids = [
        "classification",
        "emoji",
        "title",
        "date",
        "injuredCount",
        "killCount",
        "specialCount",
        "special",
        "text",
      ];

    if (conflict == 'clear') {
      //reset text
      setTimeout(() => {
        ids.forEach((id) => {
          const element = document.getElementById(id);
          element.innerHTML = '';
        }); 
      }, 100);
    }
   else {
        try {
          //set text for information
            const response = await fetch("Static/Data/" + conflict + ".json");
            const data = await response.json();
        
            ids.forEach((id) => {
              const element = document.getElementById(id);
              if (element) {
                if (id === "injuredCount" || id === "killCount" || id === "specialCount") {
                  //numbers have a count up animation
                    let current = 0;
                    const increment = data[id] / (3000 / 16);
        
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= data[id]) {
                            clearInterval(timer);
                            current = data[id];
                        }
                        element.textContent = Math.round(current);
                    }, 16);
                } 
                else { 
                  //set text
                  element.innerHTML = data[id];
                  //set the color for the classification
                  if (id === "classification") {
                    element.classList.remove('critical', 'severe', 'volatile', 'resolved');
                    if (data[id] == 'CRITICAL') {
                        element.innerHTML = element.innerHTML + '<span class="material-symbols-rounded">warning</span>';
                        element.classList.add(data[id].toLowerCase());
                    }
                    else {
                      element.classList.add(data[id].toLowerCase());
                    }
                  }
              }
              }
            });
          } catch (error) {
            console.error("Error fetching or updating JSON data:", error);
          }
    }
}

function swap(page) {
  //swapping page with animations and swapping files
  sidebar = document.getElementById("sidebar");
  content = document.getElementById("main");
  information = document.getElementById("header");
  if (page == 'home') {
    content.style.animation = "swapR 1s forwards";
    $("#map").load("Static/html_maps/home_pins.html");
    setTimeout(() => {
      text('clear');   
    }, 100);
    information.style.animation = "fadeR 1s forwards";
    setTimeout(() => {
      information.style.display = "none";   
    }, 1000);
  }

  else {
    information.style.display = "flex";
    information.style.animation = "fade 1s forwards";
    content.style.animation = "swap 1s forwards";
    $("#map").load("Static/html_maps/" + page + ".html");
    text(page);
  }
}

async function list() {
  //establish container
  const main = document.getElementById("main");
  
  try {
    //fetch list json
    const raw = await fetch("Static/Data/list.json");
    const list = await raw.json();

    for (const country of list["countries"]) {
      try {
        //fetch country json
        const infoR = await fetch(`Static/Data/${country}.json`);
        const info = await infoR.json();
        
        const classification = info.classification || "UNKNOWN";
        const isClassificationCritical = classification.toUpperCase() === "CRITICAL";

        //set classification
        const classDiv = isClassificationCritical
          ? `<div class="critical"><h2>CRITICAL</h2><span class="material-symbols-rounded">warning</span></div>`
          : `<div class="${classification.toLowerCase()}"><h2>${classification}</h2></div>`;

        //create list item
        const newItem = `
          <div class="container">
            <a onclick="swap('${info.id}')">
              <div class="item">
                ${classDiv}
                <h2 class="itemTitle">${info.title}</h2>
                <h4>${info.date}</h4>
                <p>${info.blurb}</p>
              </div>
            </a>
          </div>
        `;

        main.innerHTML += newItem;
      } catch (error) {
        console.error(`Error fetching data for ${country}:`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching list:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //things to do on load
    $("#map").load("Static/html_maps/home_pins.html");
    list();
});
