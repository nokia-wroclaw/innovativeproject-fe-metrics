<!--
*** Link to template: https://github.com/othneildrew/Best-README-Template
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/nokia-wroclaw/innovativeproject-fe-metrics">
    <img src="https://raw.githubusercontent.com/nokia-wroclaw/innovativeproject-fe-metrics/main/frontend/root/efemetric/src/assets/tra.png" alt="Logo" width="400" height="400">
  </a>

<h3 align="center">eFEmetrics</h3>

  <p align="center">
    Solution for metrics and events reporting from any web application.
    <br />
    <a href="https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/tree/main/doc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://efemetric.site/">View Demo</a>
    ·
    <a href="https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/issues">Report Bug</a>
    ·
    <a href="https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/issues">Request Feature</a>
  </p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The main purpose of the project was to find a solution 
to reporting metrics and events from a web application. 
To achieve that, we have created a library. 
Its basic functionality is sending metrics. 
Each metric has a separate field indicating the creating time, 
value and tag list. Sending the metric can be initiated by 
event such as click on button or run completely 
in the background.


### Built With

* [Vue.js](https://vuejs.org/)
* [NGINX](https://www.nginx.com/)
* [InfluxDB](https://www.influxdata.com/)
* [Docker](https://www.docker.com/)
* [Grafana](https://grafana.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is a list of things you need to run the project locally and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

* docker
  ```sh
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nokia-wroclaw/innovativeproject-fe-metrics.git
   ```
2. Go to front folder
   ```sh
   cd frontend/root/efemetric/
   ```   
3. Install NPM packages
   ```sh
   npm install
   ```

4. Build front
   ```sh
   npm run build
   ```
5. Go to root folder
   ```sh
   cd ../../..
   ```
   
6. Build docker
   ```sh
   docker-compose up -d --build
   ```
   
7. Stop docker
   ```sh
    docker-compose down
   ```
   

<!-- USAGE EXAMPLES -->
## Usage

After build docker-compose you can test our library on the demo page at the [app demo page](http://localhost:8080/).
We have also created example dashboards in [grafana](http://localhost:3003/) that will allow you to visualize the data sent.
If you want to test locally, do not change the data in the database connection form




_For more examples, please refer to the [Documentation](https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/tree/main/doc)_


See the [open issues](https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

* [Dawid Dudek](https://github.com/DaDudek)
* [Marek Kwaśny](https://github.com/marekkwasny)
* [Karolina Szlęk](https://github.com/Karolina-Szlek)
