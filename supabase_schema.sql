-- SCRIPT SQL POUR CONFIGURATION SUPABASE (GOFA ACADEMY)

-- 1. Table des JOUEURS
CREATE TABLE joueurs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  poste TEXT,
  age INTEGER,
  categorie TEXT, -- U15, U16, U17, U19
  taille FLOAT,
  matchs_joues INTEGER DEFAULT 0,
  buts INTEGER DEFAULT 0,
  passes_decisives INTEGER DEFAULT 0,
  cartons_jaunes INTEGER DEFAULT 0,
  cartons_rouges INTEGER DEFAULT 0,
  international_club BOOLEAN DEFAULT false,
  stage_info TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table des MATCHS
CREATE TABLE matchs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipe_domicile TEXT NOT NULL,
  equipe_exterieur TEXT NOT NULL,
  score_domicile INTEGER,
  score_exterieur INTEGER,
  date TIMESTAMPTZ NOT NULL,
  stade TEXT,
  competition TEXT,
  categorie TEXT,
  logo_domicile TEXT,
  logo_exterieur TEXT
);

-- 3. Table des CLASSEMENTS
CREATE TABLE classements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  position INTEGER,
  matchs_joues INTEGER,
  points INTEGER,
  diff_buts INTEGER,
  competition TEXT,
  logo_url TEXT
);

-- 4. Table GALERIE
CREATE TABLE galerie (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  categorie TEXT, -- Matches, Entraînements, Tournois, Événements
  date TIMESTAMPTZ DEFAULT now()
);

-- Activation de la sécurité (Read Public par défaut)
ALTER TABLE joueurs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecture_publique" ON joueurs FOR SELECT USING (true);

ALTER TABLE matchs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecture_publique" ON matchs FOR SELECT USING (true);

ALTER TABLE classements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecture_publique" ON classements FOR SELECT USING (true);

ALTER TABLE galerie ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecture_publique" ON galerie FOR SELECT USING (true);
