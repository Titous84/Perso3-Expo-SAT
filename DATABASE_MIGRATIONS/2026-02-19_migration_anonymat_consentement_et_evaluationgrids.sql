-- Migration additive pour une base déjà déployée.
-- @author Nathan Reyes
-- Objectif:
-- 1) Renommer survey -> evaluationgrids
-- 2) Ajouter colonnes de consentement/anonymat sur users
-- 3) Ajouter présence édition courante sur judge

START TRANSACTION;

-- 1) Renommer la table survey vers evaluationgrids (si elle existe).
SET @has_survey := (
    SELECT COUNT(*) FROM information_schema.tables
    WHERE table_schema = DATABASE() AND table_name = 'survey'
);
SET @sql := IF(@has_survey > 0, 'RENAME TABLE survey TO evaluationgrids;', 'SELECT 1;');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2) Ajouter les colonnes users (si absentes).
SET @has_picture_scope := (
    SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'picture_consent_scope'
);
SET @sql := IF(@has_picture_scope = 0,
    'ALTER TABLE users ADD COLUMN picture_consent_scope TINYINT NOT NULL DEFAULT 0 AFTER picture_consent;',
    'SELECT 1;'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_is_anonymous := (
    SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'is_anonymous'
);
SET @sql := IF(@has_is_anonymous = 0,
    'ALTER TABLE users ADD COLUMN is_anonymous TINYINT(1) NOT NULL DEFAULT 0 AFTER picture_consent_scope;',
    'SELECT 1;'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3) Ajouter la présence d\'édition côté juges (si absente).
SET @has_present_current_edition := (
    SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'judge' AND column_name = 'present_current_edition'
);
SET @sql := IF(@has_present_current_edition = 0,
    'ALTER TABLE judge ADD COLUMN present_current_edition TINYINT(1) NOT NULL DEFAULT 1 AFTER uuid;',
    'SELECT 1;'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

COMMIT;
