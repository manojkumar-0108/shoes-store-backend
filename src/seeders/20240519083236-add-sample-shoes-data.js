'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('shoes', [
      {
        name: "Nike Air Force 1",
        description: "Iconic streetwear sneaker with timeless design and comfort.",
        price: 7990,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsneaker-1.jpg?alt=media&token=cc1cb34f-ea27-4d49-8073-538894663a37',
        category: 'Sneakers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Adidas Ultra Boost",
        description: "High-performance running shoe with responsive cushioning and sleek style.",
        price: 11990,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsneaker-5.jpg?alt=media&token=f9a3c6a5-627a-4095-b7c3-9cb4e70fcc27',
        category: 'Sneakers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Air Jordan 1",
        description: "Legendary basketball sneaker with classic design and cultural significance.",
        price: 17999,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsneaker-3.jpg?alt=media&token=31014b52-429c-49f5-96de-7f10a203f92b',
        category: 'Sneakers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Converse Chuck Taylor All Star",
        description: "Timeless canvas sneaker with versatile style and casual comfort.",
        price: 5599,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsneaker-4.jpg?alt=media&token=976e1aed-5899-4c58-975c-690d1dc130e8',
        category: 'Sneakers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Vans Old Skool",
        description: "Skateboarding classic with durable construction and signature side stripe.",
        price: 4660,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsneaker-2.jpeg?alt=media&token=e756032b-5c9b-4158-ba82-d5d98ec085c3',
        category: 'Sneakers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Athletic Shoes 
      {
        name: "Nike Zoom Pegasus 38",
        description: "Versatile running shoe with responsive cushioning and breathable upper.",
        price: 12990,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fathletic-1.png?alt=media&token=459af904-e5ff-47a2-b9ba-e0186f7e3732',
        category: 'Athletic Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Adidas Ultraboost 21",
        description: "High-performance running shoe with plush cushioning and energy return.",
        price: 8999,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fathletic-2.jpeg?alt=media&token=1ab197a5-f62f-4927-8b8f-c1303d35d177',
        category: 'Athletic Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Brooks Ghost 14",
        description: "Neutral running shoe with smooth ride and balanced cushioning.",
        price: 10030,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fathletic-3.png?alt=media&token=9279006a-d2af-4bc5-ba0a-a2b819a60603',
        category: 'Athletic Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Asics Gel-Nimbus 23",
        description: "Premium running shoe with advanced cushioning and comfortable fit.",
        price: 11550,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fathletic-4.jpg?alt=media&token=f60be1ee-9c69-41df-a710-5e02ba78befa',
        category: 'Athletic Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Under Armour HOVR Machina 2",
        description: "Smart running shoe with connected technology and responsive cushioning.",
        price: 11999,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fathletic-5.jpg?alt=media&token=f5de8604-ea04-4b3f-b41c-3a7cc3aac465',
        category: 'Athletic Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Boots shoes
      {
        name: "Timberland 6-Inch Premium Waterproof Boot",
        description: "Iconic work boot with waterproof construction and rugged durability.",
        price: 9990,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fboot-1.jpg?alt=media&token=39a9a413-1d0d-4329-aa7d-ead298d75932',
        category: 'Boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dr. Martens 1460 Smooth Leather Boot",
        description: "Classic combat boot with smooth leather upper and air-cushioned sole.",
        price: 6999,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fboot-2.jpg?alt=media&token=60dd59de-7331-4c98-a573-cbda62603dde',
        category: 'Boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Red Wing Iron Ranger Boot",
        description: "Heritage work boot with durable leather construction and timeless style.",
        price: 4999,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fboot-3.jpg?alt=media&token=0c2e2cac-3fb6-4ba8-a4d8-a095373efe3f',
        category: 'Boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sorel Caribou Boot",
        description: "Cold weather boot with waterproof construction and removable felt liner.",
        price: 11700,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fboot-4.jpeg?alt=media&token=10287cbf-69a4-4036-b703-ad7d8504bddc',
        category: 'Boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Frye Harness Boot",
        description: "Western-inspired boot with leather upper and harness detail.",
        price: 7099,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fboot-5.jpg?alt=media&token=fd8d2784-580f-4d0e-951f-295effed5d93',
        category: 'Boots',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      //Sandals shoes
      {
        name: "Birkenstock Arizona Soft Footbed Sandal",
        description: "Comfortable sandal with contoured footbed and adjustable straps.",
        price: 1350,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsandal-1.jpeg?alt=media&token=bf9fb6d3-ec3b-42f3-8cdd-d3337b06185d',
        category: 'Sandals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Teva Original Universal Sandal",
        description: "Sporty sandal with cushioned footbed and water-ready webbing.",
        price: 1550,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsandal-2.jpeg?alt=media&token=d0b91356-481b-4966-85f2-46d9a8fda481',
        category: 'Sandals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chaco Z/Cloud Sandal",
        description: "Outdoor sandal with adjustable straps and supportive LUVSEAT footbed.",
        price: 1100,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsandal-3.jpg?alt=media&token=0cab6f26-31c3-4523-ad4e-f2da10378c21',
        category: 'Sandals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Keen Newport H2 Sandal",
        description: "Waterproof sandal with protective toe bumper and secure-fit lace capture system.",
        price: 1499,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsandal-4.jpeg?alt=media&token=dec45842-2f2c-4682-b87c-08a328dead7e',
        category: 'Sandals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Teva Hurricane XLT2 Sandal",
        description: "Versatile sandal with cushioned footbed and rugged Durabrasion rubber outsole.",
        price: 870,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fsandal-5.jpeg?alt=media&token=368efea0-1ee8-4bca-b738-ce9afc279e2a',
        category: 'Sandals',
        createdAt: new Date(),
        updatedAt: new Date()
      },


      //Loafers shoes
      {
        name: "Gucci Horsebit Loafer",
        description: "Luxurious leather loafer with iconic horsebit detail and almond toe.",
        price: 2830,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Floffer-1.jpg?alt=media&token=c96d7354-e925-4681-a7b0-60b35f3ca94e',
        category: 'Loafers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tod's Gommino Driving Shoe",
        description: "Classic driving shoe with pebbled leather upper and rubber sole.",
        price: 3495,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Floffer-2.jpg?alt=media&token=0d1a386a-1f26-4206-a60c-772a67d34855',
        category: 'Loafers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cole Haan Pinch Penny Loafer",
        description: "Timeless penny loafer with moccasin-inspired design and leather upper.",
        price: 3150,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Floffer-3.jpeg?alt=media&token=6452e4d6-8cc8-4a3b-a394-fcd6209ed5ba',
        category: 'Loafers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "G.H. Bass & Co. Weejuns Penny Loafer",
        description: "Classic penny loafer with polished leather upper and hand-sewn construction.",
        price: 2110,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Floffer-4.jpeg?alt=media&token=4c985ac3-598a-48c2-8dad-0906759d0cfd',
        category: 'Loafers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sperry Gold Cup Exeter Penny Loafer",
        description: "Premium penny loafer with hand-sewn construction and memory foam footbed.",
        price: 160,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Floffer-5.jpg?alt=media&token=6b3a3c0d-ec9f-40f6-a10c-95ec9419acec',
        category: 'Loafers',
        createdAt: new Date(),
        updatedAt: new Date()
      },


      //Slippers
      {
        name: "UGG Ascot",
        description: "Cozy sheepskin slipper with suede upper and durable rubber sole for indoor-outdoor wear.",
        price: 490,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fslipper-1.jpg?alt=media&token=c1848521-652c-46f6-86ed-1c1482b0b3ab',
        category: 'Slippers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "LL Bean Wicked Good Moccasins",
        description: "Warm fleece-lined slipper with soft suede upper and supportive foam footbed.",
        price: 379,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fslipper-2.jpg?alt=media&token=972caa20-3811-4a36-aef5-afc8b162601b',
        category: 'Slippers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Minnetonka Cally Slipper",
        description: "Classic moccasin slipper with plush faux fur lining and padded insole for comfort.",
        price: 499,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fslipper-3.jpg?alt=media&token=945cfb94-370a-462c-9024-e2f4cf65ad57',
        category: 'Slippers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Acorn Moc Slipper",
        description: "Soft microfleece slipper with memory foam footbed and durable rubber outsole for indoor-outdoor wear.",
        price: 450,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fslipper-4.jpg?alt=media&token=69014774-5974-4b3a-915c-108247b1a2a3',
        category: 'Slippers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dearfoams Microsuede Clog Slipper",
        description: "Comfortable clog-style slipper with plush faux shearling lining and cushioned insole.",
        price: 730,
        image: 'https://firebasestorage.googleapis.com/v0/b/shoesstore-50c69.appspot.com/o/images%2Fslipper-5.jpg?alt=media&token=e0e8faad-d95a-4f7d-ba91-1647369dae5a',
        category: 'Slippers',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('shoes', null, {});
  }
};
