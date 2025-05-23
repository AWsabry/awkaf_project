CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name_ar VARCHAR(255) NOT NULL,
    project_name_en VARCHAR(255),
    project_value DECIMAL(15,2),
    expended DECIMAL(15,2),
    current_implementation_rate DECIMAL(15,2),
    remaining_contract_amount DECIMAL(15,2),
    execution_start_date DATE,
    expected_completion_date DATE,
    project_image_path VARCHAR(500),
    gps_coordinates VARCHAR(255),
    funding_source VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ENUM workaround in PostgreSQL
-- Add a CHECK constraint for funding_source
ALTER TABLE projects
ADD CONSTRAINT funding_source_check 
CHECK (funding_source IN ('self_funded', 'investment_funded'));

-- Now add comments
COMMENT ON COLUMN projects.project_name_ar IS 'اسم المشروع';
COMMENT ON COLUMN projects.project_name_en IS 'Project Name in English';
COMMENT ON COLUMN projects.project_value IS 'قيمة العملية (التعاقد)';
COMMENT ON COLUMN projects.expended IS 'المنصرف';
COMMENT ON COLUMN projects.current_implementation_rate IS 'نسبة التنفيذ الحالية';
COMMENT ON COLUMN projects.remaining_contract_amount IS 'المتبقي من العقد';
COMMENT ON COLUMN projects.execution_start_date IS 'بداية التنفيذ';
COMMENT ON COLUMN projects.expected_completion_date IS 'التاريخ النهائي المتوقع';
COMMENT ON COLUMN projects.project_image_path IS 'صور المشروع';
COMMENT ON COLUMN projects.gps_coordinates IS 'التوقيع المكاني';
COMMENT ON COLUMN projects.funding_source IS 'التمويل الذاتي/الاستثماري';
