CREATE TABLE IF NOT EXISTS gallery (
    image_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    image_caption VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);
