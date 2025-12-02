USE trouve_ton_artisan;

-- CATEGORIES
INSERT INTO categorie (nom) VALUES
('Bâtiment'),
('Services'),
('Fabrication'),
('Alimentation');

-- SPECIALITES
INSERT INTO specialite (nom, id_categorie) VALUES
('Plomberie', 1),
('Électricité', 1),
('Coiffure', 2),
('Ménage', 2),
('Menuiserie', 3),
('Boulangerie', 4);

-- ARTISANS
INSERT INTO artisan (nom, note, localisation, email_contact, site_web, description, image_url, id_specialite) VALUES
('Dupont Plomberie', 4.5, 'Lyon', 'contact@dupont.fr', 'https://dupont.fr', 'Spécialiste en plomberie depuis 15 ans.', 'plombier.jpg', 1),
('Élec Pro', 4.2, 'Villeurbanne', 'contact@elecpro.fr', NULL, 'Entreprise d\'électricité générale.', 'electricien.jpg', 2),
('Salon Beauté Plus', 4.8, 'Lyon 7', 'contact@beauteplus.fr', NULL, 'Coiffure homme et femme.', 'coiffure.jpg', 3),
('Boulangerie Martin', 5.0, 'Lyon 3', 'contact@martin.fr', NULL, 'Pain artisanal et viennoiseries.', 'boulanger.jpg', 6);
