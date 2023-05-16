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
VALUES ('SUV','Citroen','C4 Cactus',2020,55.0,4,'manual','gasoline',TRUE,16,9,'https://app.empresasmaggi.com.br/dashboard/galeria/versoes/67b6336077f9d4f90777fc853073f379.webp');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('SUV','Fiat','Pulse',2023,66.1,4,'automatic','gasoline',TRUE,13,12,'https://www.brunofritsch.cl/file/v1/collections/fiat-pulse.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('SUV','Nissan','Kicks',2019,60.5,4,'automatic','gasoline',TRUE,17,9,'https://www.motortrend.com/uploads/sites/10/2019/01/2019-nissan-kicks-sr-cvt-suv-angular-front.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Volkswagen','Polo',2018,35.8,4,'manual','gasoline',TRUE,12,7,'https://www.yourlease.nl/privelease/wp-content/uploads/2022/02/private-lease-vw-polo-comfortline-dsg-automaat.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Hyundai','i30 N',2022,54.4,4,'manual','gasoline',TRUE,16,10,'https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_675,q_auto:good,w_1200/cms/uploads/l3arcgwhkqtaljxvzaqf');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Fiat','500 e',2023,73.0,2,'automatic','electric',TRUE,13,10,'https://500e.fiat.com.br/content/dam/fiat/products/332/312/0/2022/page/hero.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('hatchback','Fiat','Argo',2019,36.3,4,'automatic','gasoline',TRUE,14,9,'https://lopcar.com.ar/wp-content/uploads/2021/01/fiat-argo-.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Toyota','Corolla',2021,63.7,4,'automatic','gasoline',TRUE,15,11,'https://toyotadelpilar.com/assets/img/corolla_001.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Fiat','Tipo',2018,60.0,4,'automatic','gasoline',TRUE,14,11,'https://assets.meinauto.de/image/upload/f_auto/q_auto:eco/c_scale,w_auto/v1//prod/fiat/tipo/2/4sedan-easy/fiat_16tipoeasysa2b_angularfront.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sedan','Ford','Mondeo',2017,69.2,4,'automatic','diesel',TRUE,21,17,'https://mobiscar.ru/images/auto/ford-mondeo-v.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Ford','Ranger',2021,69.0,4,'automatic','diesel',TRUE,18,14,'https://www.pickuptrucks.dm/wp-content/uploads/2021/10/Arctic-White.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Toyota','Hilux GR Sport',2021,72.2,4,'automatic','diesel',TRUE,20,14,'https://static-content-live.caricarz.com/media_library/newcar/203/6712992/conversions/203_1679477424-full-image.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('pickUp','Volkswagen','Amarok',2017,65.7,4,'automatic','diesel',TRUE,17,14,'https://motorworldgroupsxm.com/wp-content/uploads/2020/06/Amarok-Transparent.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Volkswagen','Golf Estate',2022,69.9,4,'automatic','gasoline',TRUE,20,15,'https://vehicle.images.leaseloco.com/extra-large/profile/Volkswagen_Golf_Estate_2020_1.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Mini','Countryman Cooper S',2024,74.0,4,'automatic','gasoline',TRUE,31,23,'https://cut-images.roadster.com/evox/color_1280_032_png/15143/15143_cc1280_032_C4L.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('familiar','Fiat','Tipo Station Wagon',2020,55.5,4,'automatic','diesel',TRUE,15,8,'https://storage.carsmile.pl/uploads/2023/04/fiat_nowe_tipo_kombi_thumb.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Audi','TT',2020,75.0,2,'automatic','gasoline',TRUE,19,15,'https://www.motortrend.com/uploads/sites/10/2019/11/2020-audi-tt-4wd-coupe-angular-front.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Toyota','86 GR',2022,75.9,2,'manual','gasoline',TRUE,18,13,'https://cdn.rotorint.com/GR_86/2022_06_Jun/e/hero/png/lo/907x510/SPN_GRS_010K1XAM300A95260B1_compcrop_001.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('sport','Volkswagen','Golf GTI',2015,58.8,2,'manual','gasoline',TRUE,16,11,'https://assets.local-car-finder.com/images//9908/9908_st1280_089.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Jeep','Wrangler',2023,73.5,2,'manual','gasoline',TRUE,15,12,'https://medias.fcacanada.ca/jellies/renditions/2023/800x510/CC23_JLJL72_2TB_PGG_APA_XXX_XXX_XXX.1aaa5d21f651dcfd23d94bcacebe5ded.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Ford','Bronco Raptor',2023,78.5,4,'automatic','gasoline',TRUE,16,14,'https://static.tcimg.net/vehicles/primary/d9bca5daf03429a0/2023-Ford-Bronco-green-full_color-driver_side_front_quarter.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('offRoad','Mercedes Benz','G-Class',2022,75.0,4,'automatic','gasoline',TRUE,17,15,'https://www.openroad.com/assets/stock/ColorMatched_01/Transparent/1280/cc_2023MBS53_01_1280/cc_2023MBS530032_01_1280_934.png');

INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Rolls Royce','Ghost',2014,140.0,4,'automatic','gasoline',TRUE,19,14,'https://i.pinimg.com/originals/e1/04/86/e104867f8b2605040ad185c9c05e7c19.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Mercedes Benz','C-Class 200 Cabrio',2017,79.9,2,'automatic','gasoline',TRUE,16,10,'https://hsmmotors.com/wp-content/uploads/2022/08/variant-c200-cabrio-amg-Standard.png');
INSERT INTO car (category,brand,model,born,price,doors,transmission,fueltype,AC,urban,route,image)
VALUES ('luxury','Aston Martin','Vantage',2012,92.8,2,'automatic','gasoline',TRUE,23,18,'https://www.motortrend.com/uploads/sites/10/2017/11/2012-aston-martin-v8-vantage-coupe-angular-front.png');

INSERT INTO _user (email,firstname,lastname,password,role,identifier,nationality,borndate)
VALUES ('admin@example.com','Sr','Tester','$2a$10$eP0usefQb6k3MPF2Uy0kde0Pq3WjnPO5tPILB7HQ0oX3FHV7RWLrW','ADMIN','00000000','Argentinean','2000-01-01 09:00:00.000000')