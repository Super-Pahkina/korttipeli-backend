# Elintarvikepeli-backend

[Elintarvikepeli](https://github.com/Super-Pahkina/korttipeli) on ryhmätyönä toteutettu mobiilipeli, joka on toteutettu keväällä 2021 Haaga-Helian kurssilla Ohjelmointiprojekti 2.

Peli hyödyntää Terveyden ja hyvinvoinnin laitos [Finelin](https://fineli.fi/fineli/fi/ohje/19) dataa.

Halusimme luoda pelin, joka olisi samaan aikaan opettavainen ja hauska. Käyttäjä oppii tekoälyä vastaan pelatessaan millaisia ravintosisältöjä eri tuotteilla on.

-------------

### Rakenne
Backend on toteutettu teknologioilla [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/en/starter/installing.html) ja [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_finland_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624398&gclid=Cj0KCQjwyZmEBhCpARIsALIzmnJf83TVas7R8NkAHZOXNpOUZDSjZXXuGCfmc1jTu8Yxd0zREoz6POsaAlFBEALw_wcB).

Data on haettu Finelin avoimesta datasta, ja se on tallennettu MongoDB-tietokantaan.

Backend tarjoaa rajapinnan osoitteessa https://elintarvikepeli.herokuapp.com. Rajapinnan etusivulta löytyvät
ohjeet API:n käyttöön.

------------

### Paikallinen käyttäminen
Tarvitset projektin paikallista käyttöä varten sovelluskehitysympäristön, esimerkiksi [VSCode](https://code.visualstudio.com/):n. 

Kloonaa projekti ja asenna riippuvuudet komennoilla 

```
$ git clone https://github.com/Super-Pahkina/korttipeli-backend.git
$ npm install
```


Projektin toimimiseksi tarvitset tilin MongoDB Atlasiin, ja sinun täytyy [luoda uusi clusteri](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/) datan tallentamiseksi.

Luo tiedosto salasanat.js projektin juureen, johon tallennat salasanan ja käyttäjänimesi, jotka olet määritellyt clusteria luodessasi. 

Tiedoston tulisi näyttää tältä:

![vaihda salasana](/pictures/salasanatiedosto.png)

Kommentoi tiedostossa mongo.js rivi 4 pois, ja ota rivit 2, 3, 6 ja 7 käyttöön.

![vaihda salasana](/pictures/password.png)

Kutsu tiedostossa index.js funktiota fetchFineli() tallentaaksesi tietokantaasi dataa Finelin avoimesta datasta.

Projekti käynnistyy komennolla 

```
$ npm run dev
```

---------------
Backendia käyttävä mobiilisovellus ja sen tarkempi dokumentaatio löytyvät osoitteesta
https://github.com/Super-Pahkina/korttipeli.

--------------
### Työryhmä

- Markus Karjalainen
- Joni Karvinen
- Valtteri Korhonen
- Ville Koski
- Kristiina Kumila
