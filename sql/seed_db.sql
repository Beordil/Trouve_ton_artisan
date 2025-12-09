-- CATEGORIES
INSERT INTO categorie (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- SPECIALITES (liées aux catégories ci-dessus)
INSERT INTO specialite (nom, id_categorie) VALUES
('Boucher', 1),        -- Alimentation
('Boulanger', 1),      -- Alimentation
('Chocolatier', 1),    -- Alimentation
('Traiteur', 1),       -- Alimentation
('Chauffagiste', 2),   -- Bâtiment
('Electricien', 2),    -- Bâtiment
('Menuisier', 2),      -- Bâtiment
('Plombier', 2),       -- Bâtiment
('Bijoutier', 3),      -- Fabrication
('Couturier', 3),      -- Fabrication
('Ferronier', 3),      -- Fabrication
('Coiffeur', 4),       -- Services
('Fleuriste', 4),      -- Services
('Toiletteur', 4),     -- Services
('Webdesign', 4);      -- Services

-- ARTISANS
INSERT INTO artisan (
    nom,
    note,
    localisation,
    email_contact,
    site_web,
    description,
    image_url,
    id_specialite
) VALUES
('Boucherie Dumont', 4.5, 'Lyon',
 'boucherie.dumond@gmail.com',
 NULL,
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 NULL,
 1),

('Au pain chaud', 4.8, 'Montélimar',
 'aupainchaud@hotmail.com',
 NULL,
 'Description de l''artisan Au pain chaud.',
 NULL,
 2),

('Chocolaterie Labbé', 4.9, 'Lyon',
 'chocolaterie-labbe@gmail.com',
 'https://chocolaterie-labbe.fr',
 'Description de l''artisan Chocolaterie Labbé.',
 NULL,
 3),

('Traiteur Truchon', 4.1, 'Lyon',
 'contact@truchon-traiteur.fr',
 'https://truchon-traiteur.fr',
 'Description de l''artisan Traiteur Truchon.',
 NULL,
 4),

('Orville Salmons', 5.0, 'Evian',
 'o-salmons@live.com',
 NULL,
 'Description de l''artisan Orville Salmons.',
 NULL,
 5),

('Mont Blanc Eléctricité', 4.5, 'Chamonix',
 'contact@mont-blanc-electricite.com',
 'https://mont-blanc-electricite.com',
 'Description de l''artisan Mont Blanc Eléctricité.',
 NULL,
 6),

('Boutot & fils', 4.7, 'Bourg-en-bresse',
 'boutot-menuiserie@gmail.com',
 'https://boutot-menuiserie.com',
 'Description de l''artisan Boutot & fils.',
 NULL,
 7),

('Vallis Bellemare', 4.0, 'Vienne',
 'v.bellemare@gmail.com',
 'https://plomberie-bellemare.com',
 'Description de l''artisan Vallis Bellemare.',
 NULL,
 8),

('Claude Quinn', 4.2, 'Aix-les-bains',
 'claude.quinn@gmail.com',
 NULL,
 'Description de l''artisan Claude Quinn.',
 NULL,
 9),

('Amitee Lécuyer', 4.5, 'Annecy',
 'a.amitee@hotmail.com',
 'https://lecuyer-couture.com',
 'Description de l''artisan Amitee Lécuyer.',
 NULL,
 10),

('Ernest Carignan', 5.0, 'Le Puy-en-Velay',
 'e-carigan@hotmail.com',
 NULL,
 'Description de l''artisan Ernest Carignan.',
 NULL,
 11),

('Royden Charbonneau', 3.8, 'Saint-Priest',
 'r.charbonneau@gmail.com',
 NULL,
 'Description de l''artisan Royden Charbonneau.',
 NULL,
 12),

('Leala Dennis', 3.8, 'Chambéry',
 'l.dennos@hotmail.fr',
 'https://coiffure-leala-chambery.fr',
 'Description de l''artisan Leala Dennis.',
 NULL,
 12),

('C''est sup''hair', 4.1, 'Romans-sur-Isère',
 'sup-hair@gmail.com',
 'https://sup-hair.fr',
 'Description de l''artisan C''est sup''hair.',
 NULL,
 12),

('Le monde des fleurs', 4.6, 'Annonay',
 'contact@le-monde-des-fleurs-annonay.fr',
 'https://le-monde-des-fleurs-annonay.fr',
 'Description de l''artisan Le monde des fleurs.',
 NULL,
 13),

('Valérie Laderoute', 4.5, 'Valence',
 'v-laredoute@gmail.com',
 NULL,
 'Description de l''artisan Valérie Laderoute.',
 NULL,
 14),

('CM Graphisme', 4.4, 'Valence',
 'contact@cm-graphisme.com',
 'https://cm-graphisme.com',
 'Description de l''artisan CM Graphisme.',
 NULL,
 15);
