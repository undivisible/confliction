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
      setTimeout(() => {
        ids.forEach((id) => {
          const element = document.getElementById(id);
          element.innerHTML = '';
        }); 
      }, 100);
    }
   else {
        try {
            const response = await fetch("json/" + conflict + ".json");
            const data = await response.json();
        
            ids.forEach((id) => {
              const element = document.getElementById(id);
              if (element) {
                if (id === "injuredCount" || id === "killCount" || id === "specialCount") {
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
                  element.innerHTML = data[id];
                  if (id === "classification") {
                        if (data[id] == 'CRITICAL') {
                            element.innerHTML = element.innerHTML + '<span class="material-symbols-rounded">warning</span>';
                            element.style.backgroundColor = '#462114';
                            element.style.color = '#FE4002';
                        }
                        else if (data[id] == 'SEVERE') {
                            element.style.backgroundColor = '#4c342c';
                            element.style.color = '#FF845B';
                        }
                        else if (data[id] == 'VOLATILE') {
                            element.style.backgroundColor = '#4c4c3f';
                            element.style.color = '#FFFDBB';
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
  sidebar = document.getElementById("sidebar");
  content = document.getElementById("main");
  if (page == 'home') {
    content.style.animation = "swapR 1s forwards"
    $("#map").load("Lucas_split_files/home_pins.html");
    setTimeout(() => {
      text('clear');   
    }, 100);
  }
  else {
    content.style.animation = "swap 1s forwards";
    $("#map").load("Lucas_split_files/" + page + ".html"); 
    text(page);
  }
}

document.addEventListener("DOMContentLoaded", () => {
    $("#map").load("Lucas_split_files/home_pins.html"); 
});
