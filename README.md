# Food in PR

[Click here](https://food-in-pr.herokuapp.com) for the live demo.

## Description

This is a small project I built after searching for places to eat in Puerto Rico via Yelp. At the time, not many restaurants I knew of were in their databases, so I decided on using a local website (www.sal.pr, which was more up-to-date), to scrape from and build an API where I could fetch the data easily in the form of JSON. My approach fetches up to __30 restaurants__ at a time with the given specifications.

Along with the small API, I built a basic frontend on React to interact with.

## Endpoints

* `GET /api/restaurants/` – gets restaurants with specifics in the parameters

## Parameters

* `keyword` – any word that may describe the restaurant
* `category` – any of the following:
    * Asiática
    * Árabe
    * Argentina
    * Bebidas
    * Café
    * Cervezas
    * Vinos
    * Brunch
    * Burguers
* `area` – any of the following:
    * Centro
    * Este
    * Metro
    * Norte
    * Oeste
    * Sur
* `environment` – any of the following:
    * Bistro
    * Casual
    * Familiar
    * Fine Dining
    * Fonda
    * Guagüita
    * Lounge
    * Mesón Gastronómico
* `sortField` – any of the following:
    * title
    * rating
    * precio
* `descending` – true or false

## Response Body

* `id` – id of the restaurant (according to SAL!)
* `name` – name of the restaurant
* `city` – city of the restaurant
* `price` – price of the restaurant ($, $\$, $\$\$, etc.)
* `description` – description of the restaurant (given by restaurant owner)
* `thumbnailURL` – thumbnailURL of the restaurant
* `imageURL` – imageURL of the restaurant
* `address` – address of the restaurant
* `rating` – rating of the restaurant (number from 1 to 5, one decimal precision)
* `url` – url of the restaurant's profile in SAL!'s website
* `coordinates` – coordinates of the restaurant (latitude first, longitude second)
* `area` – area of the restaurant (Metro, West, South, etc.)


## Plausible Future Updates

* Filter by price
* Cache previous results in browser for faster performance


## Sample Web Page

This repo contains a sample web page taken from SAL! (i.e. test.html) which is the result from making the following request at the time of development https://www.sal.pr/restaurantes/Asi%C3%A1tica/?s=+&area=Metro&ambiente=Casual&include=*


**DISCLAIMER: RESTAURANT DETAILS ARE GIVEN IN SPANISH**


Made by [Víctor Hernández](https://www.github.com/vctorahernndez)
