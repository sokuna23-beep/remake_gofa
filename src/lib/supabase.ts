import { createClient } from '@supabase/supabase-js';

/**
 * INITIALISATION DU CLIENT SUPABASE
 * 
 * Pour que cela fonctionne, vous devez :
 * 1. Créer un projet sur https://supabase.com
 * 2. Récupérer l'URL et la Clé ANON dans les paramètres API
 * 3. Ajouter ces valeurs dans les secrets de l'application (ou fichier .env pour le local)
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Création du client Supabase unique pour toute l'application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * STRUCTURE DE BASE DE DONNÉES RECOMMANDÉE :
 * 
 * Table 'matchs' :
 * - id: uuid (primary key)
 * - equipe_domicile: text
 * - equipe_exterieur: text
 * - score_domicile: int
 * - score_exterieur: int
 * - date: timestamp
 * - categorie: text (U13, U17, etc.)
 * 
 * Table 'joueurs' :
 * - id: uuid
 * - nom: text
 * - position: text
 * - age: int
 * - categorie: text
 * 
 * Table 'notifications' :
 * - id: uuid
 * - user_id: uuid (optionnel pour notifs globales)
 * - titre: text
 * - description: text
 * - type: text ('result', 'match', 'news')
 * - created_at: timestamp
 */
