CREATE TABLE closed_mosques (
    mosque_id SERIAL PRIMARY KEY,
    mosque_name_ar VARCHAR(255) NOT NULL,
    directorate VARCHAR(100),
    mosque_address TEXT,
    closure_date DATE,
    closure_reason TEXT,
    mosque_area DECIMAL(8,2),
    nearest_mosque VARCHAR(255),
    population_density VARCHAR(50),
    within_urban_boundary BOOLEAN,
    needs_maintenance BOOLEAN,
    needs_renovation BOOLEAN,
    technical_committee_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add comments
COMMENT ON COLUMN closed_mosques.mosque_name_ar IS 'اسم المسجد';
COMMENT ON COLUMN closed_mosques.directorate IS 'المديرية';
COMMENT ON COLUMN closed_mosques.mosque_address IS 'عنوان المسجد';
COMMENT ON COLUMN closed_mosques.closure_date IS 'تاريخ الغلق';
COMMENT ON COLUMN closed_mosques.closure_reason IS 'سبب الغلق';
COMMENT ON COLUMN closed_mosques.mosque_area IS 'مساحة المسجد';
COMMENT ON COLUMN closed_mosques.nearest_mosque IS 'أقرب مسجد';
COMMENT ON COLUMN closed_mosques.population_density IS 'الكثافة السكانية';
COMMENT ON COLUMN closed_mosques.within_urban_boundary IS 'داخل الحيز العمراني أم لا';
COMMENT ON COLUMN closed_mosques.needs_maintenance IS 'يحتاج صيانة';
COMMENT ON COLUMN closed_mosques.needs_renovation IS 'يحتاج إحلال وتجديد';
COMMENT ON COLUMN closed_mosques.technical_committee_notes IS 'ملاحظات اللجنة الفنية';
