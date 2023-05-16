CREATE TABLE `car` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ac` bit(1) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `doors` smallint NOT NULL,
  `fueltype` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `route` smallint DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `urban` smallint DEFAULT NULL,
  `born` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `disponibility` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `car` bigint DEFAULT NULL,
  `datein` datetime(6) DEFAULT NULL,
  `dateout` datetime(6) DEFAULT NULL,
  `user` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `borndate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('SUV','Citroen','C4 Cactus',2020,55.0,4,'manual','gasoline',TRUE,16,9,'https://www.grupor5.com/hubfs/buscador-precios-vehiculos/citroen-c4-cactus.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('SUV','Fiat','Pulse',2023,66.1,4,'automatic','gasoline',TRUE,13,12,'https://pulse.fiat.com.ar/content/dam/fiat/products/363/b14/0/2023/page/hero.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('SUV','Nissan','Kicks',2019,60.5,4,'automatic','gasoline',TRUE,17,9,'https://www.motortrend.com/uploads/sites/10/2019/01/2019-nissan-kicks-sr-cvt-suv-angular-front.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Volkswagen','Polo',2018,35.8,4,'manual','gasoline',TRUE,12,7,'https://www.yourlease.nl/privelease/wp-content/uploads/2022/02/private-lease-vw-polo-comfortline-dsg-automaat.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Hyundai','i30 N',2022,54.4,4,'manual','gasoline',TRUE,16,10,'https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_675,q_auto:good,w_1200/cms/uploads/l3arcgwhkqtaljxvzaqf');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Fiat','500 e',2023,73.0,2,'automatic','electric',TRUE,13,10,'https://www.fiat.com/content/dam/fiat/com/my23/500bev/colorizer/hb/green/New500-Hatchback-figurini-colorizer-Ocean-Green-desktop-680x430.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Fiat','Argo',2019,36.3,4,'automatic','gasoline',TRUE,14,9,'https://www.carone.com.ar/wp-content/uploads/2022/01/fiat-argo.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Toyota','Corolla',2021,63.7,4,'automatic','gasoline',TRUE,15,11,'https://toyotamauritius.com/sites/default/files/models/colors/Emotional%20Red%202%20%283U5%29.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Fiat','Tipo',2018,60.0,4,'automatic','gasoline',TRUE,14,11,'https://assets.meinauto.de/image/upload/f_auto/q_auto:eco/c_scale,w_auto/v1//prod/fiat/tipo/2/4sedan-easy/fiat_16tipoeasysa2b_angularfront.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Ford','Mondeo',2017,69.2,4,'automatic','diesel',TRUE,21,17,'https://mobiscar.ru/images/auto/ford-mondeo-v.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Ford','Ranger',2021,69.0,4,'automatic','diesel',TRUE,18,14,'https://d2qldpouxvc097.cloudfront.net/image-by-path?bucket=a5-gallery-serverless-prod-chromebucket-1iz9ffi08lwxm&key=417830%2Ffront34%2Flg%2Fc5c5cb');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Toyota','Hilux',2021,70.2,4,'automatic','diesel',TRUE,19,14,'https://cdn.deagenciapa.com//wp-content/uploads/2021/02/Hilix-full-icon.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Volkswagen','Amarok',2017,65.7,4,'automatic','diesel',TRUE,17,14,'https://www.carone.com.ar/wp-content/uploads/2021/09/vw-amarok-2021.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Volkswagen','Golf Estate',2022,69.9,4,'automatic','gasoline',TRUE,20,15,'https://vehicle.images.leaseloco.com/extra-large/profile/Volkswagen_Golf_Estate_2020_1.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Mini','Countryman Cooper S',2024,74.0,4,'automatic','gasoline',TRUE,31,23,'https://cut-images.roadster.com/evox/color_1280_032_png/15143/15143_cc1280_032_C4L.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Fiat','Tipo Station Wagon',2020,55.5,4,'automatic','diesel',TRUE,15,8,'https://immagini.alvolante.it/sites/default/files/styles/image_gallery_big/public/serie_auto_galleria/2016/03/fiat_tipo_sw_top_ant.png?itok=pPm6jbJ2');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Audi','TT',2020,75.0,2,'automatic','gasoline',TRUE,19,15,'https://www.motortrend.com/uploads/sites/10/2019/11/2020-audi-tt-4wd-coupe-angular-front.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Toyota','86 GR',2022,75.9,2,'manual','gasoline',TRUE,18,13,'https://cdn.rotorint.com/GR_86/2022_06_Jun/e/hero/png/lo/907x510/SPN_GRS_010K1XAM300A95260B1_compcrop_001.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Volkswagen','Golf GTI',2015,58.8,2,'manual','gasoline',TRUE,16,11,'https://assets.local-car-finder.com/images//9908/9908_st1280_089.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Jeep','Wrangler',2023,73.5,2,'manual','gasoline',TRUE,15,12,'https://medias.fcacanada.ca/jellies/renditions/2023/800x510/CC23_JLJL72_2TB_PGG_APA_XXX_XXX_XXX.1aaa5d21f651dcfd23d94bcacebe5ded.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Ford','Bronco Raptor',2023,78.5,4,'automatic','gasoline',TRUE,16,14,'https://data.3dtuning.com/tun/UX8caYJy-.jpg');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Mercedes Benz','G-Class',2022,75.0,4,'automatic','gasoline',TRUE,17,15,'https://inv.assets.sincrod.com/ChromeColorMatch/us/TRANSPARENT_cc_2022MBS230009_01_1280_051.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Rolls Royce','Ghost',2014,140.0,4,'automatic','gasoline',TRUE,19,14,'https://i.pinimg.com/originals/e1/04/86/e104867f8b2605040ad185c9c05e7c19.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Mercedes Benz','C-Class 200 Cabrio',2017,79.9,2,'automatic','gasoline',TRUE,16,10,'https://hsmmotors.com/wp-content/uploads/2022/08/variant-c200-cabrio-amg-Standard.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Aston Martin','Vantage',2012,92.8,2,'automatic','gasoline',TRUE,23,18,'https://www.motortrend.com/uploads/sites/10/2017/11/2012-aston-martin-v8-vantage-coupe-angular-front.png');

--INSET ADMIN USER
INSERT INTO _user (email,firstname,lastname,password,role,identifier,nationality,borndate)
VALUES ('admin@example.com','admin','admin','admin','ADMIN','00000000','Argentinean','2000-01-01 09:00:00.000000')