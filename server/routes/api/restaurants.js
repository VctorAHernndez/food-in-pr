const router = require("express").Router();
const request = require("request");
const cheerio = require("cheerio");



// Add CORS
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', (req, res) => {

    const keyword = req.query.keyword;
    const category = req.query.category;
    const area = req.query.area;
    const environment = req.query.environment;
    const sortField = req.query.sortField;
    const descending = req.query.descending;

    if(keyword === undefined || category === undefined || area === undefined || environment === undefined || sortField === undefined || descending === undefined) {
        res.status(400).json({ err: "One or more invalid parameters" });
    } else {
        fetchAndServeFromSAL(res, keyword, category, area, environment, sortField, descending);
    }

});



function fetchAndServeFromSAL(res, keyword, category, area, environment, sortField, descending) {

    // VALIDATION
    const validCategories = ['Árabe', 'Argentina', 'Asiática', 'Bebidas', 'Café', 'Cervezas', 'Vinos', 'Brunch', 'Burgers', ''];
    const validAreas = ['Centro', 'Este', 'Metro', 'Norte', 'Oeste', 'Sur', ''];
    const validEnvironments = ['Bistro', 'Casual', 'Familiar', 'Fine Dining', 'Fonda', 'Guagüita', 'Franquicia', 'Lounge', 'Mesón Gastronómico', ''];
    const validSortFields = ['precio', 'rating', 'title'];
    const validDescending = ['true', 'false'];

    if(!validCategories.includes(category)) return res.status(400).json({ err: "Invalid category" });
    if(!validAreas.includes(area)) return res.status(400).json({ err: "Invalid area" });
    if(!validEnvironments.includes(environment)) return res.status(400).json({ err: "Invalid environment" });
    if(!validSortFields.includes(sortField)) return res.status(400).json({ err: "Invalid sort field" });
    if(!validDescending.includes(descending)) return res.status(400).json({ err: "Invalid descending/ascending field" });

    // CONSTRUCTION OF REQUEST URL
    const baseURI = "https://www.sal.pr/restaurantes/";
    let fullURL = baseURI + (category ? `${encodeURI(category)}` : "") + "/?";
    fullURL += 's=' + (keyword ? encodeURI(keyword) : '+') + '&';
    fullURL += (area ? `area=${area}&` : '');
    fullURL += (environment ? `ambiente=${encodeURI(environment)}&` : '');
    fullURL += (sortField ? `field_name=${sortField}&` : '');
    fullURL += 'order=' + (descending === 'true' ? 'd' : 'a');

    // If only keyword is specified, prefer this URL:
    if(keyword && !category && !area && !environment) {
        fullURL = `https://www.sal.pr/?s=${keyword}&search=5`;
    }

    // MAKING THE REQUEST
    request(fullURL, (err, response, body) => {
        if(err) return res.status(400).json({ err: "Error fetching resources" });
        const restaurantList = scrapeRestaurantList(body);
        res.json(restaurantList);
    });

}



// THIS APPROACH/FUNCTION ONLY GIVES UP TO 30 RESULTS
// (WE'D HAVE TO CRAWL TO THE OTHER PAGES TO GET THE REST)
function scrapeRestaurantList(body) {
    const $ = cheerio.load(body);
    let restaurantList = [];

    $("#result-container *").each((i, elem) => {
        if($(elem).hasClass("wrap_info_container")) {

            // Look deeper in the HTML for the details of the restaurant

            // Fetch a raw string (not displayed) that contains info about the restaurant
            const metadata = $(elem).find("ul.info_container li:nth-child(5) .center_info_container span").text();
            
            // Extract info from the string
            const id = extractFieldFromPHPString("id", metadata);
            const name = extractFieldFromPHPString("name", metadata);
            const city = extractFieldFromPHPString("city", metadata);
            const price = extractFieldFromPHPString("price", metadata);
            const description = extractFieldFromPHPString("description", metadata);
            const thumbnailURL = extractFieldFromPHPString("thumbnailURL", metadata);
            const imageURL = extractFieldFromPHPString("imageURL", metadata);
            const address = extractFieldFromPHPString("address", metadata);
            const rating = extractFieldFromPHPString("rating", metadata);
            const url = extractFieldFromPHPString("url", metadata);
            const coordinates = extractFieldFromPHPString("coordinates", metadata);
            const area = extractFieldFromPHPString("area", metadata);

            // Insert the restaurant object to array
            restaurantList.push({ id, name, city, price, description, thumbnailURL, imageURL, address, rating, url, coordinates, area });

        }
    });

    return restaurantList;
}



function extractFieldFromPHPString(field, string) {

    // ImageBaseURI: https://sal-assets.s3.amazonaws.com/wp-content/uploads/
    // MoreInfoBaseURI: https://www.sal.pr/place/

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

    // Otherwise, parse string
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



/* NOW USELESS CODE: WE CAN GET ALL INFO FROM METADATA */            
// const name = $(elem).find(".resultName").text().trim();
// const city = $(elem).find(".cityName").text().trim();
// const price = $(elem).find("ul.info_container li:nth-child(4) .results_grid").text();
// const url = "https://www.sal.pr" + $(elem).find("a").attr("href");
// const imageUrl = $(elem).next(".overlayResultImg").find("img").attr("src").trim();

// Can't get rating out directly from css selector using Cheerio for some reason
// const tempUl = $(elem).find("ul.info_container li:nth-child(5) div.GigyaWrapperRatingOverallHolder span.gig-rating-stars");



module.exports = router;