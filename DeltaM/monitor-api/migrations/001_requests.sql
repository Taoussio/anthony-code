
DROP TABLE IF EXISTS `Requests`;

CREATE TABLE IF NOT EXISTS `Requests` (
    id INT NOT NULL AUTO_INCREMENT,
    `name` TEXT,
    `method` TEXT,
    `result` TEXT,
    `project` TEXT,
    `updatedAt` DATETIME NOT NULL,
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (id))
ENGINE = InnoDB ;
