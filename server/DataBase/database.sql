CREATE TABLE person(
    id uuid PRIMARY KEY,
    name VARCHAR(80),
    surname VARCHAR(80),
    email VARCHAR(80),
    password VARCHAR(80),
    leader uuid,
    FOREIGN KEY (leader) REFERENCES person (id)
);

CREATE TABLE task(
    id uuid PRIMARY KEY,
    title VARCHAR(80),
    description VARCHAR(80),
    deadline date,
    date_of_create date,
    date_of_update date,
    priority VARCHAR(10),
    status VARCHAR(10),
    creator uuid,
    FOREIGN KEY (creator) REFERENCES person (id),
    responsible uuid,
    FOREIGN KEY  (responsible) REFERENCES person (id)
);


