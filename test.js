
let test = `stdClass Object
(
[id] => r_28239
[type_s] => restaurant
[name_sc] => Ikebana Sushi Bar- Guaynabo
[description_texto] => La cocina japonesa tradicional en perfecto maridaje con la mejor selección de Sushi Rolls Creativos. Nakima Roll: salmón ahumado, queso crema, plátano maduro, mayonesa y salsa de anguila. Amanda Roll: vieras en tempura, carne de juey, aguacate, masago, mayonesa picante y salsa de anguila. Dancing Calamari: carne de juey, aguacate, pepinillo, con calamar en tempura y salsa de anguila. Caliente Roll: salmón en tempura, lechuga y aguacate. Se llena los viernes. Busca sus otros locales alrededor de la isla.
 
[listingsPriority_ti] => 300
[packageName_s] => Bronce
[featuredImageThumb_s] => https://sal-assets.s3.amazonaws.com/wp-content/uploads/2008/06/screen-shot-2016-08-31-at-5.52.51-pm-1473175316-67x43.jpg
[featuredImageLarge_s] => https://sal-assets.s3.amazonaws.com/wp-content/uploads/2008/06/screen-shot-2016-08-31-at-5.52.51-pm-1473175316-357x222.jpg
[foodType_sc] => Asiática
[locationCoordinates_lonlat] => Array
(
[0] => -66.10449800000004 18.407296
)
[locationCity_ssc] => Array
(
[0] => Guaynabo
)
[locationArea_ssc] => Array
(
[0] => Metro
)
[locationAddress_texto] => Calle Ebano, Local #3. San Patricio Mall (Al lado de Pet Smart)
[ambience_sc] => Familiar
[priceCategory_s] => $$
[commentCount_ti] => 65
[ratingAverage_tf] => 4.7
[salReservaId_ti] => 74
[salReservaOffer_texto] => ¡Reserva ahora y recibe una cerveza Medalla por adulto gratis!
[salReservaOfferPlus_texto] =>
[salReservaDatedOffer_textonc] =>
[logo_s] =>
[keywords_textom] => Array
(
[0] => ikebana
[1] => comida asiatica en guaynabo
[2] => para comer sushi en guaynabo
[3] => caliente roll
)
[tags_ssc] => Array
(
[0] => ikebana
[1] => comida asiatica en guaynabo
[2] => para comer sushi en guaynabo
[3] => caliente roll
)
[hasMenu_b] => 1
[uri_s] => /place/ikebana-sushi-bar-3/
[visa_days_promo_b] => 1
[visa_days_promo_offer_s] => 
20% de descuento al pagar con cualquier tarjeta Visa los martes y miércoles.

[visa_days_promo_days_is] => Array
(
[0] => 1
[1] => 2
[2] => 3
)
[_version_] => 1630011514683392000
[score] => 0.39769214
)
`;

function extractFieldFromPHPString(field, string) {

    const validFields = {
        id: "[id]", // new
        name: "[name_sc]", 
        description: "[description_texto]", // new
        thumbnailURL: "[featuredImageThumb_s]", // new
        coordinates: "[locationCoordinates_lonlat]", // new
        imageURL: "[featuredImageLarge_s]",
        address: "[locationAddress_texto]", // new
        city: "[locationCity_ssc]",
        area: "[locationArea_ssc]", // new
        price: "[priceCategory_s]",
        rating: "[ratingAverage_tf]", // new
        url: "[uri_s]"
    };

    // If invalid field given, return null
    if(!validFields[field] || !string.includes(validFields[field])) return null;
    

    // If field is valid, parse string
    const startIndex = string.indexOf(validFields[field]);
    let content = "[";

    if(field !== "coordinates" && field !== "city" && field !== "area") {

        // String is a simple object
        for(let i = startIndex + 1; i < string.length; i++) {
            if(string[i] === "[") break;
            content += string[i];
        }
        return (field === "url" ? "https://www.sal.pr" : "") + content.split("=>")[1].trim();

    } else {

        // String has an embedded array
        let count = 2;
        for(let i = startIndex + 1; i < string.length; i++) {
            if(string[i] === "[") {
                count--;
                if(count === 0) break;
            }
            content += string[i];
        }
        return content.split("=>")[2].replace(")", "").trim();

    }

}

['name', 'description', 'thumbnailURL', 'imageURL', 'address', 'price', 'rating', 'url', 'coordinates', 'city', 'area']
    .forEach(field => console.log(extractFieldFromPHPString(field, test)));
// console.log(extractFieldFromPHPString(test));