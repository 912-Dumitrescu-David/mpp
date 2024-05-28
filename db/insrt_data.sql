INSERT INTO manufacturer (id, name, country, city, address) VALUES
(1, 'Michelin', 'France', 'Clermont-Ferrand', '12 Cours Sablon, 63000 Clermont-Ferrand'),
(2, 'Toyo Tires', 'Japan', 'Kobe', '1-1, Kyobashi 3-chome, Chuo-ku, Kobe 650-8685, Japan'),
(3, 'Goodyear', 'USA', 'Akron', '200 Innovation Way, Akron, Ohio 44316-0001'),
(5, 'Pirelli', 'Italy', 'Milan', 'Viale Piero e Alberto Pirelli, 25, 20126 Milano MI, Italy'),
(6, 'Continental', 'Germany', 'Hanover', 'Vahrenwalder Str. 9, 30165 Hannover, Germany'),
(7, 'Yokohama', 'Japan', 'Tokyo', '1-3-3 Nihonbashi-Kakigara-cho, Chuo-ku, Tokyo 103-8650, Japan'),
(8, 'Hankook', 'South Korea', 'Seoul', '133 Teheran-ro, Gangnam-gu, Seoul, South Korea'),
(9, 'Kumho', 'South Korea', 'Gwangju', '176, Heungan-daero, Dong-gu, Gwangju, 614-804, South Korea'),
(10, 'Nokian', 'Finland', 'Nokia', 'Pirkkalaistie 7, 37100 Nokia, Finland');


INSERT INTO tire (id, manufacturer_id, model, price, size, quantity, description) VALUES
(1, 1, 'Pilot Sport 4', 150, '225/45R17', 50, 'High-performance summer tire'),
(2, 2, 'Ecopia EP422 Plus', 120, '205/55R16', 40, 'Fuel-efficient all-season tire'),
(3, 3, 'Assurance MaxLife', 130, '215/60R16', 30, 'Long-lasting all-season tire'),
(4, 4, 'ExtremeContact DWS06', 170, '235/45R18', 25, 'Ultra-high performance all-season tire'),
(5, 5, 'P Zero', 180, '245/40R18', 20, 'Max performance summer tire'),
(6, 1, 'Avid Ascend GT', 110, '195', 35, 'Touring all-season tire'),
(7, 8, 'ADVAN Sport V105', 460, '200/37R16', 93, 'Aut dolorum tempore.'),
(8, 3, 'P Zero', 171, '190/42R19', 6, 'Quasi qui itaque aut sapiente qui.'),
(9, 10, 'PremiumContact 6', 155, '230/45R19', 73, 'Delectus consequatur quibusdam voluptatem occaecati ad.'),
(10, 9, 'Eagle F1 Asymmetric 5', 384, '220/41R19', 32, 'Animi at laboriosam sint debitis impedit doloribus quo.');


select manufacturer.name,tire.model from tire join manufacturer on tire.manufacturer_id = manufacturer.id