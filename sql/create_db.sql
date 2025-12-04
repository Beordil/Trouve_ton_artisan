DROP DATABASE IF EXISTS trouve_ton_artisan;

CREATE DATABASE trouve_ton_artisan;
USE trouve_ton_artisan;

CREATE TABLE categorie (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE specialite (
    id_specialite INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

CREATE TABLE artisan (
    id_artisan INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1),
    localisation VARCHAR(150),
    email_contact VARCHAR(150),
    site_web VARCHAR(150),
    description TEXT,
    image_url VARCHAR(255),
    id_specialite INT NOT NULL,
    FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
);

CREATE TABLE message_contact (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150),
    email VARCHAR(150),
    objet VARCHAR(150),
    message TEXT,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_artisan INT NOT NULL,
    FOREIGN KEY (id_artisan) REFERENCES artisan(id_artisan)
);
