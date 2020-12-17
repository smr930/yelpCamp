const mongoose      = require("mongoose");
const Campground    = require("./models/campground");
const Comment       = require("./models/comment");

// create data for new campground
const data = [
    {
        name: "Shenandoah National Park, Virginia", 
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fshenandoah-national-park-virginia-SCENICCAMP0118.jpg",
        desc: "A short drive from Washington D.C., Shenandoah National Park has 500 miles of trails, including an eight-mile hike up Old Rag Mountain that’s a must-do for avid hikers. This glorious park gives you plenty of lush views of forest and waterfalls. Its facilities are open in the spring, summer, and fall, and it has five campgrounds to choose from. The park has reopened, but campgrounds are currently operating at reduced capacity.",
        price: "30",
        address: "Shenandoah National Park 3655 U.S. Highway 211 East Luray, VA 22835",
        phone: "5409993500"
    },
    {
        name: "Dry Tortugas National Park, Florida", 
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fdry-tortugas-national-park-florida-SCENICCAMP0118.jpg",
        desc: "You can have one of the world’s largest barrier reefs right outside your tent in this beautiful park. Campers can rent some snorkel gear and spend their days on the beach or explore Fort Jefferson. This area is also great for bird-watching, so make sure you pack a pair of binoculars. The campground is currently open, but tours of the fort and ranger-led programs are temporarily suspended.",
        price: "15",
        address: "40001 SR-9336 Homestead, FL 33034",
        phone: "3052427700"
    },
  
]

let seedDB = () => {
    // remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("removed all campgrounds!");

            // add a few campgrounds
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // create a comment
                        Comment.create(
                        {
                            text: "This place is great!!!",
                            author: "Homer"
                        }, (err, comment) => {
                            if(err){
                                console.log(err);
                            } else {
                                //console.log("comment param: " + campground);
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                                //console.log("campground obj: " + campground);
                            }
                        });
                    }
                });
            });
        }
    });   

}

module.exports = seedDB;

// for more campgrounds
/*
https://www.travelandleisure.com/trip-ideas/nature-travel/most-scenic-campgrounds-in-us

Shenandoah National Park, Virginia

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fshenandoah-national-park-virginia-SCENICCAMP0118.jpg

CREDIT: XAVIER_ASCANIO/GETTY IMAGES

A short drive from Washington D.C., Shenandoah National Park has 500 miles of trails, including an eight-mile hike up Old Rag Mountain that’s a must-do for avid hikers. This glorious park gives you plenty of lush views of forest and waterfalls. Its facilities are open in the spring, summer, and fall, and it has five campgrounds to choose from. The park has reopened, but campgrounds are currently operating at reduced capacity.

$30

Shenandoah National Park
3655 U.S. Highway 211 East
Luray, VA 22835

540-999-3500

A must visit place!
--------------------------------------------------------------------------
Dry Tortugas National Park, Florida

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fdry-tortugas-national-park-florida-SCENICCAMP0118.jpg

CREDIT: SLY5800/GETTY IMAGES

You can have one of the world’s largest barrier reefs right outside your tent in this beautiful park. Campers can rent some snorkel gear and spend their days on the beach or explore Fort Jefferson. This area is also great for bird-watching, so make sure you pack a pair of binoculars. The campground is currently open, but tours of the fort and ranger-led programs are temporarily suspended.

$15

40001 SR-9336
Homestead, FL 33034

305-242-7700

For Florida and warm weather lovers, this should be on your list.
--------------------------------------------------------------------------
Big Bend National Park, Texas

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fbig-bend-national-park-texas-SCENICCAMP0118.jpg

CREDIT: BARCROFT MEDIA/GETTY IMAGES

If you’re looking for a great place to go rafting, canoeing, and kayaking, Big Bend National Park along the Rio Grande is an excellent place to go. There are also trails along the park’s desert, mountain, and river landscapes for hiking or backpacking. You’ll find three developed campgrounds there, as well as backcountry camping. Currently, the park is open, and one campground is operating at reduced capacity, while other facilities, including visitor centers, remain closed.

$30

Big Bend National Park, TX 79834

432-477-2251

Great views, includes mountains, rivers, and a lots of greenery
--------------------------------------------------------------------------
Grand Canyon National Park, Arizona

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fgrand-canyon-national-park-arizona-SCENICCAMP0118.jpg

CREDIT: MICHAEL MELFORD/GETTY IMAGES

There’s no place like the Grand Canyon if you want a stunning view. Reservations are recommended for two of the three developed campgrounds during the summer. Backcountry camping is also allowed with a permit. While the South Rim is easier to get to, it can get a little crowded. For a more secluded stay, try the North Rim, if you don’t mind having a slightly harder time getting there. The park is currently undergoing a phased reopening, and campsites on the South Rim are gradually starting to reopen with restrictions, but the North Rim campground is closed until July.

$35

Grand Canyon, AZ 86023

928-638-7888

The Grand Canyon is on my wishlist
--------------------------------------------------------------------------
Olympic National Park, Washington

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Folympic-national-park-washington-SCENICCAMP0118.jpg

CREDIT: JORDAN SIEMENS/GETTY IMAGES

There’s nothing like camping next to this beautiful coastline, marked by several sea stacks. Olympic National Park has 14 different campgrounds, some next to the ocean and others in the rain forest, so you can enjoy a variety of landscapes. The park is beginning a phased reopening.

$30

600 E. Park Avenue
Port Angeles, WA 98362

360-565-3130

This campsite that is breathtaking!
--------------------------------------------------------------------------
Sequoia and Kings Canyon National Parks, California

https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fsequoia-and-kings-national-parks-california-SCENICCAMP0118.jpg

CREDIT: JOHNNY HAGLUND/GETTY IMAGES

Want to see some of the biggest trees in North America? Look no further than these national parks. Set up camp among the 14 main campgrounds in Sequoia and Kings Canyon. Most campgrounds are usually first come, first served, but that is not the case this year — the parks require that campers make reservations for the remainder of the 2020 season when they reopen. These parks are currently open.

$35

47050 Generals Highway
Three Rivers, CA 93271

559-565-3341

Great place
--------------------------------------------------------------------------
*/