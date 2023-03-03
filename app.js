document.addEventListener("DOMContentLoaded", () => {
    getSpace();
  });
  
  function getSpace() {
    const urlSpace = `https://api.spacexdata.com/v3/launches`;
  
    fetch(urlSpace)
      .then((response) => {
        return response.json();
      })
  
      .then((data) => {
        console.log(data);
        renderingServices(data);
      });
  }

  function renderingServices(misiones) {
    const launches = document.querySelector("#cards-missions");
    let html = "";
  
    misiones.forEach((lanzamiento) => {
      const { mission_name, launch_year, links: { mission_patch_small }, flight_number } = lanzamiento;
      html += `

      <div class="col-12 col-xl-4">
      <div class="card bg-transparent border-light mb-3" style="max-width: 540px;">
        <div class="row g-0">                                
          <div class="col-4 col-md-4">
            <img src="${mission_patch_small}" class="img-fluid rounded-start py-xl-4 px-xl-1" alt="...">
          </div>
          <div class="col-8 col-md-8">
            <div class="card-body">
              <h4 class="card-title">${mission_name}</h4>              
              <p class="card-text"><small><strong>Year:</strong> ${launch_year}</small></p>
              <a href="#" class="btn btn-dark button_mission" flight_number = "${flight_number}" data-bs-toggle="modal" data-bs-target="#exampleModal">Details </a>        
            </div>
          </div>
        </div>
      </div>
    </div>
            `;
      launches.innerHTML = html;
    });  
  }


  
const boton_lanzamiento = document.querySelector("#cards-missions");
boton_lanzamiento.addEventListener("click", selectLaunch);

function selectLaunch(e) {
  if (e.target.classList.contains("button_mission")) {
    const launchSelected = e.target.parentElement;
    launch(launchSelected);
  }
}

function launch(launchSelected) {
    console.log("Cohete seleccionado", launchSelected);
    id = launchSelected.querySelector("a").getAttribute("flight_number");
    getLaunch(id);
}


function getLaunch(id) {
    const urlSpaceid = `https://api.spacexdata.com/v3/launches/${id}`;
    fetch(urlSpaceid)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        htmlLaunch(data);
      });
}

function htmlLaunch(data) {
    const launches = document.querySelector("#content_modal");
    let html = "";
      html += `
      
      <div class="modal-header bg-modal ">
      <h2 class=" text-white modal-title" id="exampleModalLabel">Mission: ${data.mission_name}</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body bg-modal">
        <div class= "video-modal">
            <iframe width="100%" height="480" 
            src="https://www.youtube.com/embed/${data.links.youtube_id}">
            </iframe>
        </div>

        <table class=" table mt-2 table-bordered bg-modal text-white ">
            <tbody>
                <tr>
                    <th scope="col">Year</th>
                    <td>${data.launch_year}</td>
                </tr>

                <tr>
                    <th scope="row">Rocket name</th>
                    <td>${data.rocket.rocket_name}</td>

                </tr>
                <tr>
                    <th scope="row">Launch Site</th>
                    <td>${data.launch_site.site_name_long}</td>

                </tr>
                <tr>
                    <th scope="row">Links</th>
                    <td>

                    <a target="_blank" href="${data.links.wikipedia}">  <i class="text-white fa-brands fa-wikipedia-w text-dark display-5 mx-2"></i></a>
                    <a target="_blank" href="${data.links.video_link}">  <i class="text-white fa-brands fa-youtube text-dark display-5 mx-2"></i></a>
                    <a target="_blank" href="${data.links.article_link}">  <i class="text-white fa-solid fa-newspaper text-dark display-5 mx-2"></i></a>                

                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div> 
            `;
      launches.innerHTML = html;
  }
  
  
  
  
  