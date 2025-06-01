-- Assuming a "constructors" table exists with a unique contractor_name column

CREATE TABLE blocked_projects (
    delayed_project_id SERIAL PRIMARY KEY,
    mosque_name_ar VARCHAR(255),
    directorate VARCHAR(100),
    mosque_address TEXT,
    contract_date DATE,
    delay_reasons TEXT,
    constructor_id INTEGER,
    actions_taken TEXT,
    latest_update TEXT,
    resolution_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT constructor_id FOREIGN KEY (constructor_id)
        REFERENCES constructors(id) ON DELETE SET NULL
);

-- Add a CHECK constraint to simulate ENUM behavior
ALTER TABLE blocked_projects
ADD CONSTRAINT resolution_status_check 
CHECK (resolution_status IN ('pending', 'in_progress', 'resolved'));

-- Add comments for each column
COMMENT ON COLUMN blocked_projects.mosque_name_ar IS 'اسم المسجد';
COMMENT ON COLUMN blocked_projects.directorate IS 'المديرية';
COMMENT ON COLUMN blocked_projects.mosque_address IS 'عنوان المسجد';
COMMENT ON COLUMN blocked_projects.contract_date IS 'تاريخ التعاقد';
COMMENT ON COLUMN blocked_projects.delay_reasons IS 'أسباب التعثر';
COMMENT ON COLUMN blocked_projects.constructor_id IS 'اسم المقاول';
COMMENT ON COLUMN blocked_projects.actions_taken IS 'الخطوات التي تم اتخاذها';
COMMENT ON COLUMN blocked_projects.latest_update IS 'آخر تحديث';
COMMENT ON COLUMN blocked_projects.resolution_status IS 'حالة الحل';
