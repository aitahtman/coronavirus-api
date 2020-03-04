# coronavirus-api
api dedicated to serve Coronavirus data

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HitCount](http://hits.dwyl.com/aitahtman/coronavirus-api.svg)](http://hits.dwyl.com/aitahtman/coronavirus-api) 

## Data source

the Data  (csv files) used on this API is provided by the Center for Systems Science and Engineering of Jhons Hopkins university [repository link](https://github.com/CSSEGISandData/COVID-19)


## Installation 

After cloning the repo, run ```npm install``` to get all dependencies related to this work.


## Execution

When all dependencies are installed, execute ```npm start``` to run the API.


## Usage

To get only summarized data, use the route ```localhost:8080\getData``` with *GET* method
```json
{
   "current": [
      {
         "province": "Anhui",
         "country": "Mainland China",
         "lat": "31.8257",
         "long": "117.2264",
         "date": "3/3/20",
         "Confirmed": "990",
         "Deaths": "6",
         "Recovered": "936"
      },
      {
         "province": "Beijing",
         "country": "Mainland China",
         "lat": "40.1824",
         "long": "116.4142",
         "date": "3/3/20",
         "Confirmed": "414",
         "Deaths": "8",
         "Recovered": "288"
      }
      
   ]
} 
```
For getting times series and summarized data, use the route ```localhost:8080\getDataHisto``` with *GET* method

```json
{
   "Confirmed":{
      "histo":[
         {
            "province":"Anhui",
            "country":"Mainland China",
            "lat":"31.8257",
            "long":"117.2264",
            "date":"1/22/20",
            "value":"1"
         },
         {
            "province":"Anhui",
            "country":"Mainland China",
            "lat":"31.8257",
            "long":"117.2264",
            "date":"1/24/20",
            "value":"15"
         }
      ],
      "current":[
         {
            "province":"Anhui",
            "country":"Mainland China",
            "lat":"31.8257",
            "long":"117.2264",
            "date":"3/2/20",
            "value":"990"
         },
         {
            "province":"Beijing",
            "country":"Mainland China",
            "lat":"40.1824",
            "long":"116.4142",
            "date":"3/2/20",
            "value":"414"
         }
      ]
   },
   "Deaths":{
      "histo":[

      ],
      "current":[

      ]
   },
   "Recovered":{
      "histo":[

      ],
      "current":[

      ]
   }
}
```
## Contributing
All bug reports and pull requests are welcome.
