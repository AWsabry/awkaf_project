CREATE TABLE closed_mosques (
    mosque_id INT PRIMARY KEY AUTO_INCREMENT,
    mosque_name_ar VARCHAR(255) NOT NULL COMMENT 'اسم المسجد',
    directorate VARCHAR(100) COMMENT 'المديرية',
    mosque_address TEXT COMMENT 'عنوان المسجد',
    closure_date DATE COMMENT 'تاريخ الغلق',
    closure_reason TEXT COMMENT 'سبب الغلق',
    mosque_area DECIMAL(8,2) COMMENT 'مساحة المسجد',
    nearest_mosque VARCHAR(255) COMMENT 'أقرب مسجد',
    population_density VARCHAR(50) COMMENT 'الكثافة السكانية',
    within_urban_boundary BOOLEAN COMMENT 'داخل الحيز العمراني أم لا',
    needs_maintenance BOOLEAN COMMENT 'يحتاج صيانة',
    needs_renovation BOOLEAN COMMENT 'يحتاج إحلال وتجديد',
    technical_committee_notes TEXT COMMENT 'ملاحظات اللجنة الفنية',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);