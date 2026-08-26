import mongoose from "mongoose";
const uri=process.env.MONGODB_URI;if(!uri)throw new Error("MONGODB_URI is required");await mongoose.connect(uri);
const stop=(time,title)=>({time,title});const day=(day,title,image,stops,description="")=>({day,title,description,image:{url:image,publicId:"",alt:title},stops});
const px=(id)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
const plans={
"rajasthan-heritage-tour":[
 day(1,"Jaipur – Royal Arrival",px(36213405),[stop("10:00 AM","Pickup from Jaipur Airport / Railway Station"),stop("11:30 AM","City Palace and Jantar Mantar"),stop("04:00 PM","Hawa Mahal and old Jaipur markets"),stop("08:00 PM","Overnight stay in Jaipur")]),
 day(2,"Jaipur – Amber Fort & Heritage Sights",px(37350667),[stop("08:00 AM","Breakfast at hotel"),stop("09:00 AM","Amber Fort and Jal Mahal photo stop"),stop("02:00 PM","Albert Hall Museum / local bazaar"),stop("07:30 PM","Overnight stay in Jaipur")]),
 day(3,"Jaipur – Jodhpur",px(37350616),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort and Jaswant Thada"),stop("07:00 PM","Clock Tower market and hotel drop")]),
 day(4,"Jodhpur – Udaipur via Ranakpur",px(33726478),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive toward Udaipur"),stop("12:30 PM","Visit Ranakpur Jain Temple"),stop("05:30 PM","Arrive Udaipur and evening at leisure")]),
 day(5,"Udaipur – City of Lakes",px(36563717),[stop("08:30 AM","Breakfast"),stop("09:30 AM","City Palace and Jagdish Temple"),stop("03:00 PM","Saheliyon Ki Bari"),stop("05:30 PM","Lake Pichola boat ride")]),
 day(6,"Udaipur – Jaisalmer",px(37272317),[stop("07:30 AM","Breakfast and checkout"),stop("08:00 AM","Drive to Jaisalmer"),stop("05:00 PM","Hotel check-in and leisure"),stop("08:00 PM","Overnight stay in Jaisalmer")]),
 day(7,"Jaisalmer – Fort & Desert",px(12510699),[stop("08:30 AM","Breakfast"),stop("09:30 AM","Jaisalmer Fort and Jain Temples"),stop("12:30 PM","Patwon Ki Haveli"),stop("04:00 PM","Drive to Sam Sand Dunes"),stop("05:30 PM","Camel safari and sunset")]),
 day(8,"Jaisalmer – Departure",px(19091920),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Gadisar Lake / local shopping"),stop("12:00 PM","Departure transfer"),stop("01:00 PM","Tour ends with memories")])],
"golden-triangle-tour":[
 day(1,"Delhi Arrival & Old Delhi",px(31804744),[stop("10:00 AM","Pickup from Delhi Airport / Railway Station"),stop("11:30 AM","Red Fort area and Jama Masjid"),stop("03:00 PM","India Gate and Parliament area"),stop("07:00 PM","Hotel drop")]),
 day(2,"Delhi Sightseeing",px(15295236),[stop("09:00 AM","Qutub Minar"),stop("11:30 AM","Humayun's Tomb"),stop("03:00 PM","Lotus Temple / Akshardham"),stop("07:00 PM","Overnight Delhi")]),
 day(3,"Delhi – Agra",px(8570419),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Agra"),stop("01:00 PM","Agra Fort"),stop("04:30 PM","Mehtab Bagh sunset view")]),
 day(4,"Agra – Jaipur",px(36512152),[stop("06:00 AM","Taj Mahal sunrise visit"),stop("09:00 AM","Breakfast and checkout"),stop("10:00 AM","Drive to Jaipur via Fatehpur Sikri"),stop("06:00 PM","Jaipur hotel check-in")]),
 day(5,"Jaipur Sightseeing",px(36213405),[stop("08:30 AM","Amber Fort"),stop("12:00 PM","Jal Mahal photo stop"),stop("02:00 PM","City Palace and Jantar Mantar"),stop("05:00 PM","Hawa Mahal and local bazaar")]),
 day(6,"Jaipur Departure",px(37350667),[stop("08:00 AM","Breakfast and checkout"),stop("09:30 AM","Albert Hall / shopping if time permits"),stop("12:00 PM","Airport / Railway Station drop")])],
"desert-safari-tour":[
 day(1,"Jodhpur Sightseeing",px(37350616),[stop("09:00 AM","Pickup in Jodhpur"),stop("09:30 AM","Mehrangarh Fort"),stop("12:00 PM","Jaswant Thada"),stop("03:00 PM","Umaid Bhawan Palace Museum"),stop("06:00 PM","Clock Tower market")]),
 day(2,"Jodhpur – Jaisalmer",px(37272317),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Jaisalmer"),stop("02:30 PM","Hotel check-in"),stop("04:00 PM","Gadisar Lake and local market")]),
 day(3,"Jaisalmer Fort & Sam Dunes",px(12510699),[stop("08:30 AM","Breakfast"),stop("09:30 AM","Jaisalmer Fort"),stop("12:00 PM","Patwon Ki Haveli"),stop("03:30 PM","Drive to Sam Sand Dunes"),stop("05:30 PM","Camel safari and sunset"),stop("07:30 PM","Cultural program and desert camp stay")]),
 day(4,"Desert Sunrise & Departure",px(19091920),[stop("06:30 AM","Sunrise and photography"),stop("08:00 AM","Breakfast at camp"),stop("09:30 AM","Checkout and drive to Jaisalmer"),stop("12:00 PM","Departure transfer")])],
"royal-rajasthan-tour":[
 day(1,"Jaipur Arrival",px(36213405),[stop("10:00 AM","Pickup and hotel check-in"),stop("02:00 PM","City Palace"),stop("05:00 PM","Hawa Mahal and market")]),
 day(2,"Jaipur Heritage",px(37350667),[stop("08:30 AM","Amber Fort"),stop("12:00 PM","Jal Mahal"),stop("02:30 PM","Jantar Mantar"),stop("06:00 PM","Chokhi Dhani optional evening")]),
 day(3,"Jaipur – Bikaner",px(36561998),[stop("08:00 AM","Drive to Bikaner"),stop("02:00 PM","Junagarh Fort"),stop("05:00 PM","Old city exploration")]),
 day(4,"Bikaner – Jaisalmer",px(37272317),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Jaisalmer"),stop("04:00 PM","Gadisar Lake")]),
 day(5,"Jaisalmer & Desert",px(12510699),[stop("09:00 AM","Jaisalmer Fort and havelis"),stop("03:30 PM","Sam Sand Dunes"),stop("05:30 PM","Camel safari and sunset"),stop("08:00 PM","Desert camp")]),
 day(6,"Jaisalmer – Jodhpur",px(37350616),[stop("08:00 AM","Breakfast"),stop("09:00 AM","Drive to Jodhpur"),stop("03:30 PM","Mehrangarh Fort")]),
 day(7,"Jodhpur – Udaipur",px(33726478),[stop("08:00 AM","Jaswant Thada"),stop("10:00 AM","Drive to Udaipur via Ranakpur"),stop("05:30 PM","Udaipur check-in")]),
 day(8,"Udaipur Sightseeing",px(36563717),[stop("09:00 AM","City Palace"),stop("12:00 PM","Jagdish Temple"),stop("03:00 PM","Saheliyon Ki Bari"),stop("05:30 PM","Lake Pichola boat ride")]),
 day(9,"Udaipur – Chittorgarh – Jaipur",px(15344913),[stop("08:00 AM","Checkout and drive"),stop("10:30 AM","Chittorgarh Fort"),stop("02:00 PM","Continue to Jaipur"),stop("07:00 PM","Jaipur arrival")]),
 day(10,"Jaipur Departure",px(31804744),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Shopping if time permits"),stop("12:00 PM","Airport / station drop")])],
"cultural-rajasthan-tour":[
 day(1,"Jaipur – Culture & Markets",px(36213405),[stop("10:00 AM","Arrival pickup"),stop("12:00 PM","City Palace"),stop("04:00 PM","Johari and Bapu Bazaar")]),
 day(2,"Jaipur – Heritage & Folk Evening",px(37350667),[stop("09:00 AM","Amber Fort"),stop("01:00 PM","Jantar Mantar"),stop("06:00 PM","Traditional cultural evening")]),
 day(3,"Jaipur – Pushkar",px(8570419),[stop("08:00 AM","Drive to Pushkar"),stop("11:30 AM","Brahma Temple and Pushkar Lake"),stop("03:00 PM","Local market walk")]),
 day(4,"Pushkar – Jodhpur",px(37350616),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort"),stop("06:00 PM","Old city walk")]),
 day(5,"Jodhpur Rural & Craft Experiences",px(36561998),[stop("09:00 AM","Bishnoi village excursion"),stop("01:00 PM","Traditional lunch"),stop("03:00 PM","Handicraft and textile workshops")]),
 day(6,"Jodhpur – Udaipur",px(33726478),[stop("08:00 AM","Drive via Ranakpur"),stop("12:30 PM","Ranakpur Jain Temple"),stop("05:00 PM","Udaipur arrival")]),
 day(7,"Udaipur Culture & Departure",px(36563717),[stop("09:00 AM","City Palace"),stop("12:00 PM","Local art / miniature painting area"),stop("03:00 PM","Departure transfer")])],
"forts-palaces-tour":[
 day(1,"Jaipur Palaces",px(36213405),[stop("10:00 AM","Arrival and City Palace"),stop("03:00 PM","Hawa Mahal and Jantar Mantar")]),
 day(2,"Amber & Jaigarh Forts",px(37350667),[stop("08:30 AM","Amber Fort"),stop("12:30 PM","Jaigarh Fort"),stop("04:00 PM","Nahargarh sunset")]),
 day(3,"Jaipur – Jodhpur",px(37350616),[stop("08:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort"),stop("05:30 PM","Jaswant Thada")]),
 day(4,"Jodhpur – Udaipur",px(33726478),[stop("08:00 AM","Umaid Bhawan Palace Museum"),stop("10:30 AM","Drive via Ranakpur"),stop("05:00 PM","Udaipur arrival")]),
 day(5,"Udaipur Palaces",px(36563717),[stop("09:00 AM","City Palace"),stop("01:00 PM","Bagore Ki Haveli"),stop("05:30 PM","Lake Pichola boat ride")]),
 day(6,"Udaipur – Chittorgarh",px(15344913),[stop("08:00 AM","Drive to Chittorgarh"),stop("10:30 AM","Chittorgarh Fort complex"),stop("04:00 PM","Return / overnight nearby")]),
 day(7,"Departure",px(31804744),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Departure transfer")])],
"pilgrimage-tour":[
 day(1,"Ajmer & Pushkar",px(8570419),[stop("09:00 AM","Pickup and drive to Ajmer"),stop("11:00 AM","Ajmer Sharif Dargah"),stop("03:00 PM","Pushkar Brahma Temple"),stop("05:00 PM","Pushkar Lake aarti")]),
 day(2,"Pushkar – Nathdwara",px(33726478),[stop("08:00 AM","Breakfast"),stop("09:00 AM","Drive to Nathdwara"),stop("03:00 PM","Shrinathji Temple darshan")]),
 day(3,"Nathdwara – Eklingji – Udaipur",px(36563717),[stop("08:00 AM","Morning darshan"),stop("10:30 AM","Eklingji Temple"),stop("02:00 PM","Udaipur arrival and leisure")]),
 day(4,"Udaipur – Ranakpur",px(15344913),[stop("08:00 AM","Drive to Ranakpur"),stop("10:30 AM","Ranakpur Jain Temple"),stop("02:30 PM","Temple surroundings and onward stay")]),
 day(5,"Departure",px(31804744),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Departure transfer")])],
"adventure-rajasthan-tour":[
 day(1,"Jodhpur Arrival & Mehrangarh",px(37350616),[stop("10:00 AM","Pickup"),stop("12:00 PM","Mehrangarh Fort"),stop("04:00 PM","Zip-line / adventure activity option")]),
 day(2,"Jodhpur – Jaisalmer",px(37272317),[stop("08:00 AM","Drive to Jaisalmer"),stop("03:00 PM","Fort and havelis")]),
 day(3,"Desert Adventure",px(12510699),[stop("09:00 AM","Kuldhara / desert sightseeing"),stop("03:30 PM","Jeep safari option"),stop("05:00 PM","Camel safari"),stop("07:30 PM","Camp and cultural evening")]),
 day(4,"Jaisalmer – Mount Abu",px(2187050),[stop("07:00 AM","Early departure"),stop("06:00 PM","Mount Abu arrival and rest")]),
 day(5,"Mount Abu Outdoors",px(9834000),[stop("08:00 AM","Nakki Lake"),stop("11:00 AM","Hiking / viewpoints"),stop("04:30 PM","Sunset Point")]),
 day(6,"Mount Abu Departure",px(33726478),[stop("08:00 AM","Breakfast"),stop("09:30 AM","Dilwara Temples"),stop("01:00 PM","Departure transfer")])],
"family-rajasthan-tour":[
 day(1,"Jaipur Family Arrival",px(33598030),[stop("10:00 AM","Pickup and hotel check-in"),stop("03:00 PM","City Palace"),stop("05:00 PM","Hawa Mahal photo stop")]),
 day(2,"Jaipur Family Sightseeing",px(37350667),[stop("09:00 AM","Amber Fort"),stop("12:30 PM","Jal Mahal"),stop("03:00 PM","Albert Hall / family-friendly museum")]),
 day(3,"Jaipur – Jodhpur",px(37350616),[stop("08:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort"),stop("06:00 PM","Clock Tower market")]),
 day(4,"Jodhpur – Udaipur",px(33726478),[stop("08:30 AM","Jaswant Thada"),stop("10:00 AM","Drive to Udaipur"),stop("05:00 PM","Lake-side evening")]),
 day(5,"Udaipur Family Day",px(36563717),[stop("09:00 AM","City Palace"),stop("12:30 PM","Saheliyon Ki Bari"),stop("04:30 PM","Lake Pichola boat ride")]),
 day(6,"Udaipur Departure",px(31804744),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Shopping / leisure"),stop("12:00 PM","Departure transfer")])],
"honeymoon-rajasthan-tour":[
 day(1,"Udaipur – Romantic Arrival",px(37298875),[stop("11:00 AM","Pickup and hotel check-in"),stop("04:30 PM","Lake Pichola boat ride"),stop("07:30 PM","Romantic lakeside evening")]),
 day(2,"Udaipur – Palaces & Sunset",px(36563717),[stop("09:00 AM","City Palace"),stop("12:30 PM","Saheliyon Ki Bari"),stop("05:00 PM","Sajjangarh sunset")]),
 day(3,"Udaipur – Jodhpur",px(37350616),[stop("08:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort"),stop("06:00 PM","Blue City walk")]),
 day(4,"Jodhpur – Jaisalmer",px(37272317),[stop("08:00 AM","Drive to Jaisalmer"),stop("03:00 PM","Fort and havelis"),stop("06:00 PM","Gadisar Lake")]),
 day(5,"Jaisalmer Desert & Departure",px(12510699),[stop("08:30 AM","Breakfast"),stop("10:00 AM","Local sightseeing"),stop("04:00 PM","Sam Dunes"),stop("05:30 PM","Camel safari and sunset"),stop("08:00 PM","Departure / onward arrangement")])],
"budget-rajasthan-tour":[
 day(1,"Jodhpur Arrival",px(37350616),[stop("10:00 AM","Pickup"),stop("11:00 AM","Mehrangarh Fort"),stop("04:00 PM","Clock Tower market")]),
 day(2,"Jodhpur – Jaipur",px(36213405),[stop("07:30 AM","Drive to Jaipur"),stop("03:00 PM","City Palace"),stop("05:30 PM","Hawa Mahal")]),
 day(3,"Jaipur Highlights",px(37350667),[stop("08:30 AM","Amber Fort"),stop("12:30 PM","Jal Mahal"),stop("03:00 PM","Local market")]),
 day(4,"Jaipur – Pushkar",px(8570419),[stop("08:00 AM","Drive to Pushkar"),stop("11:00 AM","Brahma Temple"),stop("03:00 PM","Pushkar Lake and bazaar")]),
 day(5,"Pushkar Departure",px(31804744),[stop("08:00 AM","Breakfast"),stop("09:30 AM","Leisure / shopping"),stop("12:00 PM","Departure transfer")])],
"wildlife-rajasthan-tour":[
 day(1,"Jaipur – Ranthambore",px(145939),[stop("08:00 AM","Pickup and drive to Ranthambore"),stop("01:00 PM","Resort check-in"),stop("04:00 PM","Nature orientation / leisure")]),
 day(2,"Ranthambore Safari",px(247431),[stop("06:00 AM","Morning jungle safari"),stop("11:00 AM","Breakfast and rest"),stop("02:30 PM","Afternoon safari / fort option")]),
 day(3,"Ranthambore – Bharatpur",px(792381),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Bharatpur"),stop("04:00 PM","Keoladeo bird sanctuary orientation")]),
 day(4,"Bharatpur Birding",px(32176173),[stop("06:30 AM","Morning birding / cycle rickshaw safari"),stop("11:00 AM","Breakfast"),stop("03:30 PM","Second nature walk")]),
 day(5,"Bharatpur – Jaipur",px(36213405),[stop("08:00 AM","Drive to Jaipur"),stop("01:00 PM","City Palace"),stop("04:30 PM","Hawa Mahal")]),
 day(6,"Jaipur Departure",px(37350667),[stop("08:30 AM","Amber Fort if time permits"),stop("12:00 PM","Departure transfer")])],
"luxury-rajasthan-tour":[
 day(1,"Jaipur – Royal Welcome",px(36213405),[stop("10:00 AM","Pickup from Jaipur Airport / Railway Station"),stop("11:00 AM","Check-in at luxury heritage hotel"),stop("04:00 PM","City Palace and Jantar Mantar"),stop("07:00 PM","Royal welcome dinner")]),
 day(2,"Jaipur – Amber Fort & Leisure",px(37350667),[stop("08:00 AM","Breakfast"),stop("09:00 AM","Amber Fort"),stop("01:00 PM","Premium lunch"),stop("04:00 PM","Spa / leisure"),stop("07:30 PM","Candle-light dinner")]),
 day(3,"Jaipur – Udaipur",px(36563717),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Udaipur"),stop("03:00 PM","Luxury lake resort check-in"),stop("05:00 PM","Lake Pichola boat ride")]),
 day(4,"Udaipur – Royal Sightseeing",px(33726478),[stop("08:00 AM","Breakfast"),stop("09:00 AM","City Palace"),stop("12:30 PM","Rooftop lunch"),stop("03:00 PM","Saheliyon Ki Bari and markets"),stop("08:00 PM","Dinner with live music")]),
 day(5,"Udaipur – Jodhpur",px(37350616),[stop("08:00 AM","Breakfast and checkout"),stop("09:00 AM","Drive to Jodhpur"),stop("03:00 PM","Luxury haveli check-in"),stop("04:30 PM","Mehrangarh Fort private tour")]),
 day(6,"Jodhpur – Heritage Leisure",px(18860533),[stop("09:00 AM","Umaid Bhawan Palace Museum"),stop("12:30 PM","Premium lunch"),stop("04:00 PM","Blue City / boutique shopping")]),
 day(7,"Jodhpur – Jaisalmer",px(37272317),[stop("08:00 AM","Drive to Jaisalmer"),stop("03:00 PM","Heritage hotel check-in"),stop("05:30 PM","Gadisar Lake sunset")]),
 day(8,"Jaisalmer & Departure",px(12510699),[stop("08:30 AM","Jaisalmer Fort and havelis"),stop("01:00 PM","Lunch"),stop("03:00 PM","Departure transfer / onward journey")])],
"all-india-tour-packages":[
 day(1,"Delhi Arrival",px(31804744),[stop("10:00 AM","Arrival pickup"),stop("12:00 PM","Delhi sightseeing")]),day(2,"Delhi – Agra",px(8570419),[stop("08:00 AM","Drive to Agra"),stop("12:00 PM","Taj Mahal"),stop("03:00 PM","Agra Fort")]),day(3,"Agra – Jaipur",px(36213405),[stop("08:00 AM","Drive via Fatehpur Sikri"),stop("04:00 PM","Jaipur arrival")]),day(4,"Jaipur",px(37350667),[stop("09:00 AM","Amber Fort"),stop("02:00 PM","City Palace")]),day(5,"Jaipur – Jodhpur",px(37350616),[stop("08:00 AM","Drive to Jodhpur"),stop("03:00 PM","Mehrangarh Fort")]),day(6,"Jodhpur – Udaipur",px(36563717),[stop("08:00 AM","Drive to Udaipur"),stop("05:00 PM","Lake Pichola")]),day(7,"Udaipur",px(33726478),[stop("09:00 AM","City Palace"),stop("03:00 PM","Saheliyon Ki Bari")]),day(8,"Fly / Travel to Next Chosen Region",px(2187050),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Transfer for onward sector")]),day(9,"Custom Regional Sightseeing",px(9834000),[stop("09:00 AM","Sightseeing based on selected destination"),stop("05:00 PM","Evening leisure")]),day(10,"Departure",px(15295236),[stop("08:00 AM","Breakfast"),stop("11:00 AM","Final departure transfer")])],
"customised-tour-package":[
 day(1,"Arrival & Personalized Welcome",px(2187050),[stop("10:00 AM","Pickup at your chosen arrival point"),stop("12:00 PM","Hotel check-in / first planned experience"),stop("05:00 PM","Flexible sightseeing")]),day(2,"Your Chosen Destination",px(9834000),[stop("09:00 AM","Private sightseeing according to your preferences"),stop("02:00 PM","Optional activity / leisure"),stop("06:00 PM","Hotel drop")]),day(3,"Next Destination / Experience",px(12510699),[stop("08:00 AM","Private transfer"),stop("12:00 PM","Selected attractions"),stop("05:00 PM","Local experience")]),day(4,"Flexible Exploration Day",px(33726478),[stop("09:00 AM","Customized sightseeing"),stop("03:00 PM","Shopping / activity / leisure")]),day(5,"Departure",px(36563717),[stop("08:00 AM","Breakfast and checkout"),stop("10:00 AM","Final planned stop"),stop("12:00 PM","Departure transfer")])]
};
const Mixed=new mongoose.Schema({}, {strict:false,timestamps:true});const Tour=mongoose.models.TourPackage||mongoose.model("TourPackage",Mixed,"tourpackages");
for(const [slug,itinerary] of Object.entries(plans)){await Tour.updateOne({slug},{$set:{itinerary,itineraryNote:"This is a suggested itinerary and can be customized according to your preferences."}});console.log(`Updated itinerary ${slug}`)}
console.log(`Done. ${Object.keys(plans).length} package itineraries updated.`);await mongoose.disconnect();