/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * APPLICATION GOFA ACADEMY - LES ESPADONS DE MBOUR
 * 
 * Ce fichier est le coeur de l'application. Il gère :
 * 1. La navigation principale (Bottom Navigation)
 * 2. Le rendu des différents écrans (Home, Matchs, Joueurs, etc.)
 * 3. Les transitions animées entre les pages
 * 
 * Note : L'application est conçue pour être reliée à Supabase.
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Trophy, 
  Users, 
  Image as ImageIcon, 
  Menu, 
  ChevronRight, 
  ChevronLeft,
  Bell,
  Calendar,
  MapPin,
  Newspaper,
  Phone,
  Mail,
  School,
  Info,
  Search,
  Star,
  Plus,
  Upload,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// Import du client Supabase (à configurer dans .env)
import { supabase } from './lib/supabase';

// Définition des types pour les onglets de l'application
type Tab = 'home' | 'matchs' | 'classement' | 'joueurs' | 'academie' | 'galerie' | 'contact' | 'notifications' | 'news';

export default function App() {
  // État de l'onglet actif
  const [activeTab, setActiveTab] = useState<Tab>('home');
  // Paramètre optionnel pour définir l'onglet secondaire (ex: Matchs > Résultats)
  const [matchSubTab, setMatchSubTab] = useState<'prochains' | 'resultats' | 'classements'>('prochains');
  const [unreadCount, setUnreadCount] = useState(3);
  const [isAdmin, setIsAdmin] = useState(false);

  // Simulation d'une session admin pour le user sokuna23@gmail.com
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={(tab, sub) => {
          setActiveTab(tab);
          if (sub) setMatchSubTab(sub as any);
        }} />;
      case 'matchs':
        return <MatchsScreen initialSubTab={matchSubTab} />;
      case 'classement':
        return <MatchsScreen initialSubTab="classements" />;
      case 'joueurs':
        return <JoueursScreen isAdmin={isAdmin} />;
      case 'academie':
        return <AcademieScreen />;
      case 'galerie':
        return <GalerieScreen />;
      case 'contact':
        return <ContactScreen isAdmin={isAdmin} onToggleAdmin={toggleAdmin} />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'news':
        return <NewsScreen />;
      default:
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden border-x border-gray-200">
      {/* HEADER PERSISTENT POUR TOUTE L'APPLI */}
      <div className="bg-gradient-to-br from-primary via-accent to-primary pt-6 pb-2 px-6 flex justify-between items-center sticky top-0 z-50 shadow-xl overflow-hidden">
        {/* Glow effect back to help blending */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        {/* Left spacer for centering */}
        <div className="w-10"></div>

        <div className="flex flex-col items-center relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 flex items-center justify-center overflow-hidden"
          >
             <img 
               src="/src/assets/images/regenerated_image_1778410416145.png" 
               className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] mix-blend-screen brightness-150 contrast-150" 
               alt="Logo GOFA" 
               referrerPolicy="no-referrer"
             />
          </motion.div>
          <span className="text-[10px] text-white/90 font-black uppercase tracking-[0.3em] mt-1 drop-shadow-sm">Les Espadons</span>
        </div>

        <button 
          onClick={() => setActiveTab('notifications')}
          className="text-white p-2 hover:bg-white/10 rounded-full transition-all active:scale-95 relative z-10"
        >
          <Bell size={24} className="text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full ring-2 ring-primary animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          )}
        </button>
      </div>
      {/* 
          Note: La barre d'état 9:41 a été supprimée suite à votre demande.
          Le conteneur principal gère le défilement et les transitions.
      */}

      {/* Zone de contenu principal avec animation de transition entre les onglets */}
      <div className="flex-1 overflow-y-auto pb-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>


      {/* Barre de navigation basse (Bottom Navigation Bar) - Style Bleu/Jaune Maquette */}
      <nav className="fixed bottom-0 w-full max-w-md bg-primary flex justify-around items-center py-4 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-50 rounded-t-[30px] border-t border-white/5">
        <NavItem 
          icon={<Home size={22} />} 
          label="Accueil" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<Trophy size={22} />} 
          label="Matchs" 
          active={activeTab === 'matchs' || activeTab === 'classement'} 
          onClick={() => {
            setActiveTab('matchs');
            setMatchSubTab('prochains');
          }} 
        />
        <NavItem 
          icon={<Users size={22} />} 
          label="Joueurs" 
          active={activeTab === 'joueurs'} 
          onClick={() => setActiveTab('joueurs')} 
        />
        <NavItem 
          icon={<School size={22} />} 
          label="Académie" 
          active={activeTab === 'academie'} 
          onClick={() => setActiveTab('academie')} 
        />
        <NavItem 
          icon={<ImageIcon size={22} />} 
          label="Galerie" 
          active={activeTab === 'galerie'} 
          onClick={() => setActiveTab('galerie')} 
        />
        <NavItem 
          icon={<Menu size={22} />} 
          label="Plus" 
          active={activeTab === 'contact'} 
          onClick={() => setActiveTab('contact')} 
        />
      </nav>
    </div>
  );
}

/**
 * Composant pour un élément de la barre de navigation
 * Style mis à jour : Fond bleu, icône jaune si actif
 */
function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-secondary scale-110' : 'text-white/40 hover:text-white/70'}`}
    >
      <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-white/5' : ''}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${active ? 'text-secondary' : 'text-white/40'}`}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="nav-dot" 
          className="w-1.5 h-1.5 bg-secondary rounded-full mt-0.5 shadow-[0_0_8px_var(--color-secondary)]" 
        />
      )}
    </button>
  );
}

// --- ÉCRANS (MOCKUPS DES DESIGN DART/FLUTTER) ---

/**
 * Écran d'accueil - Reproduction exacte de la maquette fournie
 */
function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab, sub?: string) => void }) {
  // État pour les données venant de Supabase (Exemple)
  const [latestResult, setLatestResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Exemple d'appel à Supabase pour récupérer le dernier résultat
  useEffect(() => {
    async function fetchLatestResult() {
      try {
        const { data, error } = await supabase
          .from('matchs')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .single();
        
        if (data) setLatestResult(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur Supabase:", err);
        setLoading(false);
      }
    }
    fetchLatestResult();
  }, []);

  return (
    <div className="flex flex-col text-left font-sans bg-gray-50 pb-24">
      
      {/* 
          SECTION HERO : Image d'action avec les joueurs
      */}
      <div className="relative h-[320px] w-full overflow-hidden">
        <img 
          src="/src/assets/images/regenerated_image_1778410301138.png" 
          className="w-full h-full object-cover scale-105" 
          alt="Action de football collectif" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
        <div className="absolute bottom-12 left-8 text-white z-10">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-6xl font-black italic tracking-tighter leading-none mb-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
          >
            GOFA
          </motion.h1>
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-black italic text-secondary uppercase tracking-widest drop-shadow-md"
          >
            Le talent se construit ici
          </motion.p>
        </div>
      </div>

      {/* 
          MENU D'ACCÈS RAPIDE
      */}
      <div className="px-5 -mt-12 mb-10 grid grid-cols-4 gap-4 relative z-10">
        {[
          { 
            icon: <Newspaper size={28} />, 
            label: 'Actualités', 
            tab: 'news' as Tab 
          },
          { 
            icon: <Trophy size={28} />, 
            label: 'Résultats', 
            tab: 'matchs' as Tab,
            sub: 'resultats'
          },
          { 
            icon: <Calendar size={28} />, 
            label: 'Matchs', 
            tab: 'matchs' as Tab,
            sub: 'prochains'
          },
          { 
            icon: <ImageIcon size={28} />, 
            label: 'Galerie', 
            tab: 'galerie' as Tab 
          },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(item.tab, item.sub)}
            className="bg-white rounded-[28px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center py-7 px-1 border-b-4 border-secondary/20 cursor-pointer transition-all hover:bg-primary hover:text-white"
          >
            <div className="mb-3 transition-colors">{item.icon}</div>
            <span className="text-[9px] font-black tracking-tighter uppercase">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 
          SECTION RÉSULTAT RÉCENT
      */}
      <div className="px-6 mb-12">
        <div className="flex justify-between items-baseline mb-3">
          <h2 className="text-[#1A2E5A] font-black text-[11px] uppercase tracking-tighter">
            RÉSULTAT RÉCENT
          </h2>
          <button onClick={() => onNavigate('matchs', 'resultats')} className="text-[#1A2E5A] text-[11px] font-bold hover:underline opacity-80">Voir tout</button>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-[#E5F1FF]">
          <div className="flex items-center justify-between">
            {/* Team 1 : GOFA */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <img src="/src/assets/images/regenerated_image_1778410416145.png" className="w-full h-full object-contain filter brightness-110 contrast-110" alt="Gofa" referrerPolicy="no-referrer" />
              </div>
              <span className="font-black text-[12px] text-[#1A2E5A] uppercase">GOFA</span>
            </div>

            {/* Score Central */}
            <div className="flex items-center gap-2.5 mx-2">
              <span className="text-xl font-black text-[#1A2E5A]">
                {latestResult ? latestResult.score_domicile : "2"}
              </span>
              <span className="text-lg font-bold text-[#1A2E5A] opacity-30">-</span>
              <span className="text-xl font-black text-[#1A2E5A]">
                {latestResult ? latestResult.score_exterieur : "1"}
              </span>
            </div>

            {/* Team 2 : Visiteur */}
            <div className="flex items-center justify-end gap-2 flex-1 text-right">
              <span className="font-black text-[12px] text-[#1A2E5A] uppercase">
                {latestResult ? latestResult.adversaire : "Mballing"}
              </span>
              <div className="w-6 h-6 flex items-center justify-center">
                <img src="/src/assets/images/regenerated_image_1778411110302.png" className="w-full h-full object-contain filter brightness-110 contrast-110" alt="Adversaire" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER / MOTIVATION */}
      <div className="px-10 opacity-30">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>
        <p className="text-[11px] text-center font-bold uppercase tracking-[0.4em] text-gray-500 leading-relaxed italic">
          Forgeons le futur du football sénégalais
        </p>
      </div>
    </div>
  );
}

/**
 * Écran Calendrier / Matchs
 * Reproduction exacte de la maquette avec onglets Prochains, Résultats et Classements.
 */
function MatchsScreen({ initialSubTab = 'prochains' }: { initialSubTab?: 'prochains' | 'resultats' | 'classements' }) {
  const [subTab, setSubTab] = useState(initialSubTab);
  const [matchs, setMatchs] = useState<any[]>([]);
  const [resultats, setResultats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'infos' | 'lineup' | 'stats'>('infos');

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prochainsData } = await supabase
          .from('matchs')
          .select('*')
          .is('termine', false)
          .order('date', { ascending: true });
        
        const { data: resultsData } = await supabase
          .from('matchs')
          .select('*')
          .is('termine', true)
          .order('date', { ascending: false });

        if (prochainsData) setMatchs(prochainsData);
        if (resultsData) setResultats(resultsData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur Supabase:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Match en vedette par défaut
  const featuredMatch = {
    competition: "Ligue des Prodiges",
    equipe_domicile: "GOFA",
    equipe_exterieur: "ADVERSAIRE",
    date: "2026-04-11",
    heure: "16h00",
    stade: "Stade Caroline Faye",
    ville: "Mbour",
    description: "Un match crucial pour la qualification en phase finale. Nos Espadons ont besoin de votre soutien maximum !",
    arbitre: "M. Faye",
    meteo: "Ensoleillé, 28°C"
  };

  return (
    <div className="flex flex-col text-left font-sans bg-white pb-24 min-h-screen">
      {/* 
          BARRE DE TITRE
      */}
      <div className="bg-gradient-to-br from-primary via-accent to-primary pt-10 pb-5 text-center shadow-lg">
        <h1 className="text-white text-xl font-black uppercase italic tracking-widest drop-shadow-md">Calendrier</h1>
      </div>

      {/* 
          ONGLETS DE NAVIGATION (TABS) 
      */}
      <div className="flex justify-around border-b border-gray-100 bg-white sticky top-12 z-20 shadow-md backdrop-blur-md bg-white/90">
        {[
          { id: 'prochains', label: 'Prochains' },
          { id: 'resultats', label: 'Résultats' },
          { id: 'classements', label: 'Classements' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as any)}
            className={`py-5 px-4 text-[11px] font-black uppercase italic transition-all relative ${
              subTab === tab.id ? 'text-primary' : 'text-gray-300'
            }`}
          >
            {tab.label}
            {subTab === tab.id && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-secondary mx-3 rounded-t-full shadow-[0_-2px_10px_rgba(255,210,63,0.8)]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6">
        {subTab === 'prochains' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
            <h2 className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-2 italic">
              <div className="w-6 h-[3px] bg-secondary shadow-[0_0_8px_var(--color-secondary)]"></div>
              PROCHAINS MATCHS
            </h2>
            
            {/* MATCH EN VEDETTE (MAQUETTE) */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[40px] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,35,71,0.15)] p-8 relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
               <p className="text-center text-[11px] font-black text-gray-400 uppercase italic mb-8 tracking-[0.2em]">{featuredMatch.competition}</p>
               
               <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 flex items-center justify-center p-2">
                      <img src="/src/assets/images/regenerated_image_1778410416145.png" className="w-full h-full object-contain filter drop-shadow-sm brightness-110 contrast-110" alt="GOFA" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-black text-base text-primary italic uppercase tracking-wider">{featuredMatch.equipe_domicile}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary italic opacity-10 select-none">VS</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-white rounded-[35px] flex items-center justify-center p-2 border-2 border-white shadow-lg overflow-hidden">
                      <img src="/src/assets/images/regenerated_image_1778411110302.png" className="w-full h-full object-contain filter brightness-125 contrast-125 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]" alt="Adversaire" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-black text-base text-primary italic uppercase tracking-wider">{featuredMatch.equipe_exterieur}</span>
                  </div>
               </div>

               <div className="bg-primary/[0.03] rounded-[30px] p-6 space-y-4 mb-8 border border-white/50 shadow-inner">
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black uppercase italic">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><Calendar size={18} className="text-secondary" /></div>
                    {new Date(featuredMatch.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black uppercase italic">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><span className="text-secondary">🕒</span></div>
                    {featuredMatch.heure}
                  </div>
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black italic uppercase">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><MapPin size={18} className="text-secondary" /></div>
                    {featuredMatch.stade}
                  </div>
               </div>

               <button 
                 onClick={() => setSelectedMatch(featuredMatch)}
                 className="w-full bg-secondary text-primary py-5 rounded-[25px] font-black italic shadow-[0_15px_30px_rgba(255,210,63,0.4)] text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all hover:brightness-110 hover:shadow-[0_20px_40px_rgba(255,210,63,0.5)]"
               >
                 DÉTAILS DU MATCH
               </button>
            </motion.div>
            
            {/* RENDU DES AUTRES MATCHS DYNAMIQUEMENT */}
            {matchs.length > 0 && matchs.map((m, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedMatch(m)}
                className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 opacity-60 cursor-pointer hover:opacity-100 hover:shadow-md transition-all"
              >
                 <p className="text-center text-[10px] font-black text-gray-400 uppercase italic mb-4">{m.competition}</p>
                 <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                       <span className="font-black text-xs text-primary uppercase">{m.equipe_domicile}</span>
                    </div>
                    <span className="text-xs font-black text-primary italic">VS</span>
                    <div className="flex items-center gap-2">
                       <span className="font-black text-xs text-gray-400 uppercase">{m.equipe_exterieur}</span>
                    </div>
                 </div>
                 <div className="text-center text-[10px] font-bold text-gray-400 italic space-y-1">
                    <p>{new Date(m.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} - {m.heure}</p>
                    <p>{m.stade}</p>
                 </div>
              </div>
            ))}
          </div>
        )}

        {subTab === 'resultats' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6">
            <h2 className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 italic flex items-center gap-2">
              <div className="w-6 h-[3px] bg-secondary shadow-[0_0_8px_var(--color-secondary)]"></div>
              DERNIERS RÉSULTATS
            </h2>
            
            {resultats.length > 0 ? resultats.map((r, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedMatch(r)}
                className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex-1 text-right">
                  <span className="font-black text-sm text-primary uppercase italic">{r.equipe_domicile}</span>
                </div>
                <div className="flex flex-col items-center mx-6">
                  <div className="bg-primary/5 px-4 py-2 rounded-2xl">
                    <span className="text-2xl font-black italic text-primary">{r.score_domicile} - {r.score_exterieur}</span>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <span className="font-black text-sm text-gray-400 uppercase italic">{r.adversaire || r.equipe_exterieur}</span>
                </div>
              </div>
            )) : (
              <div className="bg-primary/5 p-12 rounded-[40px] border border-primary/10 text-center flex flex-col items-center gap-4">
                <Trophy size={48} className="text-secondary opacity-30" />
                <p className="text-xs text-primary font-black italic uppercase tracking-widest opacity-60">Aucun résultat récent</p>
              </div>
            )}
          </div>
        )}

        {subTab === 'classements' && <ClassementScreen />}
      </div>

      {/* MODAL DE DÉTAILS DU MATCH (STYLE "MATCH CENTER") */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Header du Match Center */}
            <div className="bg-gradient-to-br from-primary via-accent to-primary pt-12 pb-6 px-6 text-white relative shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="flex items-center justify-between relative z-10 mb-6">
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-all active:scale-90"
                >
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <div className="text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-70 italic">{selectedMatch.competition}</p>
                  <h2 className="text-sm font-black italic uppercase tracking-wider">Match Center</h2>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white">
                  <Bell size={20} className="text-secondary" />
                </button>
              </div>

              {/* Scoreboard Immersif */}
              <div className="flex items-center justify-between mb-2 relative z-10 px-2">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center p-3 backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    {selectedMatch.equipe_domicile === 'GOFA' ? (
                      <img src="/src/assets/images/regenerated_image_1778410416145.png" className="w-full h-full object-contain filter brightness-150 contrast-150 mix-blend-screen" alt="GOFA" />
                    ) : (
                      <Users size={40} />
                    )}
                  </motion.div>
                  <span className="font-black text-xs uppercase italic truncate w-full text-center">{selectedMatch.equipe_domicile}</span>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  {selectedMatch.termine ? (
                    <div className="flex flex-col items-center">
                      <motion.span 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="text-5xl font-black italic drop-shadow-2xl"
                      >
                        {selectedMatch.score_domicile} - {selectedMatch.score_exterieur}
                      </motion.span>
                      <span className="bg-secondary text-primary text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-2 shadow-lg animate-pulse">Terminé</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black italic opacity-30 select-none">VS</span>
                      <div className="bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full mt-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-secondary">À venir • {selectedMatch.heure}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2 flex-1">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center p-3 backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    <img src="/src/assets/images/regenerated_image_1778411110302.png" className="w-full h-full object-contain filter brightness-125 contrast-125" alt="Adversaire" />
                  </motion.div>
                  <span className="font-black text-xs uppercase italic truncate w-full text-center">{selectedMatch.equipe_exterieur || selectedMatch.adversaire}</span>
                </div>
              </div>
            </div>

            {/* Onglets internes du match center */}
            <div className="flex bg-white border-b border-gray-100 px-6">
              {[
                { id: 'infos', label: 'Infos', icon: <Info size={16} /> },
                { id: 'lineup', label: 'Compositions', icon: <Users size={16} /> },
                { id: 'stats', label: 'Statistiques', icon: <Trophy size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id as any)}
                  className={`flex-1 py-5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                    activeDetailTab === tab.id ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeDetailTab === tab.id && (
                    <motion.div 
                      layoutId="activeDetailUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-secondary mx-4 rounded-t-full" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Contenu Défilable */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDetailTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeDetailTab === 'infos' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-[30px] border border-gray-100 shadow-sm flex flex-col items-center">
                          <Calendar size={20} className="text-secondary mb-2" />
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                          <p className="text-xs font-black text-primary italic uppercase">{new Date(selectedMatch.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                        </div>
                        <div className="bg-white p-5 rounded-[30px] border border-gray-100 shadow-sm flex flex-col items-center">
                          <MapPin size={20} className="text-secondary mb-2" />
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Lieu</p>
                          <p className="text-xs font-black text-primary italic uppercase">{selectedMatch.stade}</p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <div className="w-1 h-3 bg-secondary"></div>
                          DESCRIPTION
                        </h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                          {selectedMatch.description || "Un affrontement décisif entre deux formations en quête de points. L'intensité sera au rendez-vous dès le coup d'envoi."}
                        </p>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-[35px] border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center">👔</div>
                              <div>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Arbitre</p>
                                 <p className="text-[11px] font-black text-primary italic uppercase">{selectedMatch.arbitre || "À confirmer"}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 text-right">
                              <div>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Météo</p>
                                 <p className="text-[11px] font-black text-primary italic uppercase">{selectedMatch.meteo || "Nuageux"}</p>
                              </div>
                              <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center">☀️</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDetailTab === 'lineup' && (
                    <div className="space-y-6">
                      <div className="bg-primary/90 p-6 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 border-2 border-white/5 m-3 rounded-[35px] pointer-events-none"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/5 rounded-full"></div>
                        
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-60 text-center">Système : 4-3-3</h4>
                        
                        <div className="relative z-10 grid grid-cols-3 gap-y-12 py-4">
                          {/* Mock Lineup Visualization */}
                          <LineupPlayer name="GUEYE" pos="GK" colSpan={3} />
                          <LineupPlayer name="DIALLO" pos="LB" />
                          <LineupPlayer name="SOW" pos="CB" />
                          <LineupPlayer name="FALL" pos="RB" />
                          <LineupPlayer name="DIOP" pos="LCM" />
                          <LineupPlayer name="NDIAYE" pos="CDM" />
                          <LineupPlayer name="GAYE" pos="RCM" />
                          <LineupPlayer name="SARR" pos="LW" />
                          <LineupPlayer name="DIENG" pos="ST" />
                          <LineupPlayer name="BA" pos="RW" />
                        </div>
                      </div>

                      <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100">
                         <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">REMPLAÇANTS</h3>
                         <div className="space-y-3">
                            {['Sylla (G)', 'Cissé', 'Faye', 'Dramé', 'Touré'].map((p, i) => (
                              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <span className="text-sm font-black text-primary italic">{p}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">Numéro {20+i}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  )}

                  {activeDetailTab === 'stats' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
                        <StatRow label="Possession" left="58%" right="42%" val={58} />
                        <StatRow label="Tirs" left="12" right="8" val={60} />
                        <StatRow label="Tirs cadrés" left="5" right="3" val={62} />
                        <StatRow label="Corners" left="7" right="4" val={63} />
                        <StatRow label="Fautes" left="10" right="14" val={41} />
                      </div>

                      <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100 flex items-center justify-around h-32">
                         <div className="text-center">
                            <p className="text-3xl font-black text-primary italic">2</p>
                            <p className="text-[9px] font-black text-gray-400 uppercase">Cartons J.</p>
                         </div>
                         <div className="w-px h-12 bg-gray-100"></div>
                         <div className="text-center">
                            <p className="text-3xl font-black text-primary italic">0</p>
                            <p className="text-[9px] font-black text-gray-400 uppercase">Cartons R.</p>
                         </div>
                         <div className="w-px h-12 bg-gray-100"></div>
                         <div className="text-center">
                            <p className="text-3xl font-black text-primary italic">3</p>
                            <p className="text-[9px] font-black text-gray-400 uppercase">Changements</p>
                         </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Fixe pour le Match Center */}
            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
               <button 
                 onClick={() => setSelectedMatch(null)}
                 className="w-full bg-primary text-white py-5 rounded-[25px] font-black italic text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl shadow-primary/20"
               >
                 RETOUR AU CALENDRIER
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatRow({ label, left, right, val }: { label: string, left: string, right: string, val: number }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] font-black text-primary italic uppercase">{left}</span>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-black text-gray-400 italic uppercase">{right}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
        <div 
          className="h-full bg-secondary transition-all duration-1000" 
          style={{ width: `${val}%` }}
        ></div>
      </div>
    </div>
  );
}

function LineupPlayer({ name, pos, colSpan = 1 }: { name: string, pos: string, colSpan?: number }) {
  const spanClass = colSpan === 3 ? 'col-span-3' : 'col-span-1';
  return (
    <div className={`flex flex-col items-center group ${spanClass}`}>
      <motion.div 
        whileHover={{ scale: 1.1, y: -5 }}
        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20 mb-2 shadow-lg backdrop-blur-md group-hover:bg-secondary group-hover:border-secondary transition-colors"
      >
        <span className="text-[10px] font-black group-hover:text-primary">{pos}</span>
      </motion.div>
      <span className="text-[8px] font-black uppercase text-white/80 tracking-widest">{name}</span>
    </div>
  );
}

const DEFAULT_PLAYERS = [
  { id: 'def-1', nom: "Djibril Dieng", poste: "Milieu de terrain", age: 16, categorie: "U17", stage_info: "Stage au Maroc", flag: "🇲🇦", photo_url: "/src/assets/images/regenerated_image_1778418360009.jpg" },
  { id: 'def-2', nom: "Mamadou Sarr", poste: "Attaquant", age: 15, categorie: "U15", photo_url: "/src/assets/images/regenerated_image_1778462128196.png" },
  { id: 'def-3', nom: "Ibrahima Ndiaye", poste: "Défenseur", age: 17, categorie: "U17", photo_url: "/src/assets/images/regenerated_image_1778462133069.png" },
  { id: 'def-4', nom: "Cheikh Ba", poste: "Gardien de but", age: 16, categorie: "U16", photo_url: "/src/assets/images/regenerated_image_1778417836738.jpg" }
];

/**
 * Écran Joueurs
 * Affiche l'effectif de l'académie avec fonctionnalités de recherche et filtres par catégorie.
 */
function JoueursScreen({ isAdmin }: { isAdmin: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("TOUS");
  const [dbPlayers, setDbPlayers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch players from Supabase
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('joueurs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des joueurs:", error);
      } else if (data) {
        setDbPlayers(data);
      }
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Fusionner les joueurs par défaut et ceux de la base de données
  const allPlayers = [...dbPlayers, ...DEFAULT_PLAYERS];

  const filteredPlayers = allPlayers.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "TOUS" || p.categorie === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header Style Maquette */}
      <div className="bg-primary pt-12 pb-6 px-6 text-white text-center relative shadow-lg">
        <button className="absolute left-6 top-12 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-black uppercase italic tracking-widest">Joueurs</h1>
      </div>

    <div className="p-6 relative">
        {/* Barre de recherche */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un joueur..." 
            className="w-full bg-gray-100 border-none rounded-2xl py-4 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 font-medium"
          />
        </div>

        {/* Filtres de catégories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {['TOUS', 'U15', 'U16', 'U17'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black italic uppercase transition-all duration-300 ${
                category === cat 
                ? 'bg-secondary text-primary shadow-lg shadow-secondary/30 scale-105' 
                : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liste des joueurs */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Chargement des joueurs...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredPlayers.length > 0 ? filteredPlayers.map((player, idx) => (
                <motion.div
                  key={player.id || player.nom}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <PlayerRow 
                    name={player.nom} 
                    pos={player.poste || player.position} 
                    age={player.age} 
                    cat={player.categorie} 
                    stage={player.stage_info} 
                    flag={player.flag}
                    image={player.photo_url || "/src/assets/images/regenerated_image_1778418360009.jpg"} 
                  />
                </motion.div>
              )) : (
                <div className="py-20 text-center opacity-30 italic font-black uppercase text-xs tracking-widest">
                  Aucun joueur trouvé
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Bouton d'ajout en bas à droite - Uniquement pour admin */}
        {isAdmin && (
          <div className="fixed bottom-24 right-6 z-40">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 flex items-center justify-center bg-secondary text-primary rounded-[20px] shadow-[0_15px_30px_rgba(255,210,63,0.4)] active:scale-95 transition-all border-b-4 border-primary/20"
            >
              <Plus size={32} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal d'ajout de joueur */}
      <AnimatePresence>
        {isModalOpen && (
          <AddPlayerModal 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => {
              setIsModalOpen(false);
              fetchPlayers();
            }} 
          />
        )}
      </AnimatePresence>

      {/* Profil Joueur (Détails) */}
      <AnimatePresence>
        {selectedPlayer && (
          <PlayerProfileModal 
            player={selectedPlayer} 
            onClose={() => setSelectedPlayer(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PlayerProfileModal({ player, onClose }: { player: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[110] bg-white flex flex-col"
    >
      {/* Header Profil */}
      <div className="bg-primary pt-12 pb-10 px-6 text-white text-center relative shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <button 
          onClick={onClose}
          className="absolute left-6 top-12 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-20"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h2 className="text-sm font-black italic uppercase tracking-[0.3em] mb-8 relative z-10">Profil Joueur</h2>
        
        <div className="relative inline-block mb-6 z-10">
          <div className="w-40 h-40 rounded-full border-4 border-white/20 p-1.5 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
              <img 
                src={player.photo_url || player.image || "/src/assets/images/regenerated_image_1778418360009.jpg"} 
                className="w-full h-full object-cover" 
                alt={player.nom} 
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-black italic uppercase tracking-tight mb-1">{player.nom}</h1>
          <p className="text-secondary text-xs font-black uppercase tracking-widest">{player.poste || player.position || "Joueur"}</p>
        </div>

        {/* Chiffres clés */}
        <div className="grid grid-cols-3 gap-4 mt-8 relative z-10 px-4">
          <div className="flex flex-col border-r border-white/10 last:border-0">
            <span className="text-[10px] font-black opacity-60 uppercase mb-1">Âge</span>
            <span className="text-sm font-black italic">{player.age} ans</span>
          </div>
          <div className="flex flex-col border-r border-white/10 last:border-0">
            <span className="text-[10px] font-black opacity-60 uppercase mb-1">Catégorie</span>
            <span className="text-sm font-black italic">{player.categorie || player.cat}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black opacity-60 uppercase mb-1">Taille</span>
            <span className="text-sm font-black italic">{player.taille || "1.75 m"}</span>
          </div>
        </div>
      </div>

      {/* Contenu Profil */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
        <div className="space-y-6">
          {/* Section Statistiques */}
          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1 h-3 bg-secondary"></div>
              STATISTIQUES
            </h3>
            
            <div className="space-y-5">
              <StatItem label="Matchs joués" value={player.matchs || 18} />
              <StatItem label="Buts" value={player.buts || 5} />
              <StatItem label="Passes décisives" value={player.passes || 7} />
              <StatItem label="Cartons jaunes" value={player.jaunes || 1} />
              <StatItem label="Cartons rouges" value={player.rouges || 0} />
            </div>
          </div>

          <button className="w-full bg-secondary text-primary py-5 rounded-[25px] font-black italic text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 active:scale-95 transition-all">
            PARCOURS DU JOUEUR
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: number | string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-black text-primary italic uppercase">{value}</span>
    </div>
  );
}

function AddPlayerModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    poste: '',
    age: '',
    categorie: 'U17',
    stage_info: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photo_url = "";

      // 1. Upload image si présente
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `joueurs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('assets') // Bucket name attendu par défaut
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('assets')
            .getPublicUrl(filePath);
          photo_url = publicUrl;
        } else {
          console.warn("Erreur upload storage (le bucket 'assets' existe-t-il?)", uploadError);
          // On continue sans image si l'upload échoue (fallback)
        }
      }

      // 2. Insert en base
      const { error } = await supabase
        .from('joueurs')
        .insert([{
          nom: formData.nom,
          poste: formData.poste,
          age: parseInt(formData.age),
          categorie: formData.categorie,
          stage_info: formData.stage_info,
          photo_url: photo_url || null
        }]);

      if (error) throw error;
      onSuccess();
    } catch (err) {
      console.error("Erreur lors de la création du joueur:", err);
      alert("Erreur lors de la création du joueur. Vérifiez la console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-primary/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="bg-white w-full max-w-sm rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-primary italic uppercase tracking-tight">Ajouter un joueur</h2>
            <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload d'image */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-100 rounded-[40px] overflow-hidden relative border-4 border-gray-50 flex items-center justify-center group">
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <Upload size={32} className="text-gray-300" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase mt-4 tracking-widest">Photo du joueur</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-4">Nom Complet</label>
                <input 
                  required
                  value={formData.nom}
                  onChange={e => setFormData({...formData, nom: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/50"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-4">Poste</label>
                  <input 
                    required
                    value={formData.poste}
                    onChange={e => setFormData({...formData, poste: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/50"
                    placeholder="Milieu"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-4">Âge</label>
                  <input 
                    required
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/50"
                    placeholder="17"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-4">Catégorie</label>
                <select 
                  value={formData.categorie}
                  onChange={e => setFormData({...formData, categorie: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/50 appearance-none"
                >
                  <option value="U15">U15 (Minime)</option>
                  <option value="U16">U16</option>
                  <option value="U17">U17 (Cadet)</option>
                  <option value="U19">U19 (Junior)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-4">Info Stage (Optionnel)</label>
                <input 
                  value={formData.stage_info}
                  onChange={e => setFormData({...formData, stage_info: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/50"
                  placeholder="Stage au Maroc"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black italic text-xs uppercase tracking-widest transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 ${loading ? 'bg-gray-100 text-gray-400' : 'bg-secondary text-primary hover:brightness-110 active:scale-95'}`}
            >
              {loading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> : 'Enregistrer le joueur'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlayerRow({ name, pos, age, cat, stage, flag, image }: { name: string, pos: string, age: number, cat: string, stage?: string, flag?: string, image?: string }) {
  return (
    <div className="bg-white p-4 rounded-[40px] border border-[#f0f0f0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5 hover:shadow-md transition-all active:scale-[0.98]">
      {/* Avatar Style Maquette */}
      <div className="w-24 h-24 rounded-[35px] overflow-hidden shrink-0 bg-gray-50 border-4 border-white shadow-sm">
        <img 
          src={image} 
          className="w-full h-full object-cover" 
          alt={name} 
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Détails du joueur */}
      <div className="flex-1 min-w-0 pr-2">
        <h3 className="font-bold text-[#333] text-lg leading-tight truncate">{name}</h3>
        <p className="text-[#888] text-sm font-medium mt-0.5">{pos}</p>
        
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[13px] text-[#444] font-bold">{age} ans</span>
          <span className="text-[13px] text-gray-300">|</span>
          <span className="text-[13px] text-[#444] font-medium">{cat}</span>
        </div>

        {stage && (
          <div className="flex items-center gap-2 mt-3">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[13px] font-semibold text-gray-600">{stage}</span>
            {flag && <span className="text-sm">{flag}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Écran Académie
 * Présentation des valeurs, de l'histoire et des installations de GOFA Academy.
 */
function AcademieScreen() {
  const [showHistory, setShowHistory] = useState(false);
  const [showStaff, setShowStaff] = useState(false);

  return (
    <div className="flex flex-col text-left pb-24">
       <div className="bg-primary p-12 text-center text-white pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <School size={64} className="text-secondary mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <h2 className="text-4xl font-black italic relative z-10">ACADÉMIE</h2>
          <p className="text-secondary font-bold tracking-[0.3em] text-[10px] uppercase mt-2 relative z-10">Le talent se construit ici</p>
       </div>

       <div className="px-6 -mt-8 space-y-4">
          <AcademieSection 
            icon={<Info/>} 
            title="Histoire" 
            onClick={() => setShowHistory(true)}
          />
          <AcademieSection 
            icon={<Users/>} 
            title="Staff Technique" 
            onClick={() => setShowStaff(true)}
          />
          
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
             <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
               Valeurs de l'académie
             </h3>
             <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: '⭐', label: 'Discipline' },
                  { icon: '⚽', label: 'Travail' },
                  { icon: '💎', label: 'Excellence' },
                  { icon: '❤️', label: 'Respect' },
                ].map((v, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-100">{v.icon}</div>
                    <span className="text-[8px] font-black uppercase text-primary text-center leading-tight">{v.label}</span>
                  </motion.div>
                ))}
             </div>
          </div>

          <AcademieSection icon={<MapPin/>} title="Installations" />
       </div>

       {/* Modal d'Histoire */}
       <AnimatePresence>
         {showHistory && (
           <HistoryModal onClose={() => setShowHistory(false)} />
         )}
       </AnimatePresence>

       {/* Modal du Staff Technique */}
       <AnimatePresence>
         {showStaff && (
           <StaffModal onClose={() => setShowStaff(false)} />
         )}
       </AnimatePresence>
    </div>
  );
}

function StaffModal({ onClose }: { onClose: () => void }) {
  const staffMembers = [
    { name: "Pape Bouba Diop", role: "Directeur Technique", desc: "Expert en détection de talents", img: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg" },
    { name: "Moussa Ndiaye", role: "Entraîneur Principal U17", desc: "Ancien international Sénégalais", img: "https://images.unsplash.com/photo-1549476464-37392f717551?q=80&w=800&auto=format&fit=crop" },
    { name: "Fatou Binetou", role: "Préparateur Physique", desc: "Spécialiste haute performance", img: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg" },
    { name: "Dr. Amadou Fall", role: "Médecin Sportif", desc: "Suivi médical et traumatologie", img: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg" },
    { name: "Ibrahima Sarr", role: "Analyste Vidéo", desc: "Optimisation tactique et data", img: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-primary/95 backdrop-blur-md flex flex-col pt-12"
    >
      <div className="px-8 flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Staff Technique</h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-12">
        <div className="grid grid-cols-1 gap-4">
          {staffMembers.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 p-4 rounded-[30px] border border-white/10 flex items-center gap-5 group hover:bg-white/10 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-xl">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-black uppercase text-sm italic">{member.name}</h3>
                <p className="text-secondary font-black text-[9px] uppercase tracking-widest mb-1">{member.role}</p>
                <p className="text-white/40 text-[10px] italic">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HistoryModal({ onClose }: { onClose: () => void }) {
  const historyData = [
    {
      year: "1995",
      title: "La Fondation",
      content: "L'académie GOFA est née d'une vision audacieuse à Mbour : offrir aux jeunes talents locaux un cadre professionnel alliant sport et éducation. Fondée par des passionnés, elle a débuté avec un groupe restreint de 15 joueurs."
    },
    {
      year: "2010",
      title: "L'Expansion",
      content: "Grâce à des partenaires internationaux et une reconnaissance croissante, l'académie quadruple sa capacité d'accueil et inaugure ses premiers terrains synthétiques aux normes internationales."
    },
    {
      year: "2015",
      title: "Consécration",
      content: "Le premier 'Espadon' signe un contrat professionnel dans un club européen de premier plan. C'est le début d'une longue série de réussites qui placera GOFA sur la carte mondiale du scoutisme."
    },
    {
      year: "2026",
      title: "Vision 2030",
      content: "Aujourd'hui, GOFA aspire à devenir le centre de formation de référence en Afrique de l'Ouest, avec une emphase sur l'intelligence de jeu et l'intégrité morale de nos athlètes."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-primary/95 backdrop-blur-md flex flex-col pt-12"
    >
      <div className="px-8 flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Notre Histoire</h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-12">
        <div className="relative border-l-2 border-secondary/30 ml-4 space-y-12 pb-8">
          {historyData.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-10"
            >
              <div className="absolute -left-[11px] top-0 w-5 h-5 bg-secondary rounded-full border-4 border-primary shadow-[0_0_15px_rgba(255,210,63,0.5)]"></div>
              <div className="bg-white/5 p-6 rounded-[30px] border border-white/10 hover:bg-white/10 transition-all group">
                <span className="text-secondary font-black text-xl italic mb-1 block group-hover:scale-110 transition-transform origin-left">{item.year}</span>
                <h3 className="text-white font-black uppercase text-sm mb-3 tracking-wide">{item.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed font-medium italic">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AcademieSection({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer group hover:bg-primary transition-all`}
    >
      <div className="flex items-center gap-4">
        <div className="text-primary group-hover:text-secondary transition-colors">{icon}</div>
        <span className="font-black text-sm text-primary uppercase italic group-hover:text-white transition-colors">{title}</span>
      </div>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-secondary group-hover:text-primary transition-all`}>
        <ChevronRight size={20} />
      </div>
    </motion.div>
  );
}

/**
 * Écran Galerie
 * Portfolio photos des matchs et moments forts de l'académie.
 */
function GalerieScreen() {
  return (
    <div className="p-6 text-left">
      <div className="flex justify-between items-center mb-8 pt-4">
        <h1 className="text-2xl font-black text-primary italic uppercase underline decoration-secondary decoration-4">Galerie</h1>
        <div className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black italic">MBOUR 2026</div>
      </div>

       <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-3xl overflow-hidden relative border-2 border-white shadow-sm">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-[10px] font-black italic">Match U17</p>
                  <p className="text-[8px] opacity-70">12 Avril 2026</p>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

/**
 * Écran Contact
 * Informations de contact et localisation de l'académie.
 */
function ContactScreen({ isAdmin, onToggleAdmin }: { isAdmin?: boolean, onToggleAdmin?: () => void }) {
  return (
    <div className="p-6 text-left">
      <div className="bg-primary p-8 rounded-[40px] text-center text-white mb-8 border-b-8 border-secondary">
          <Users size={64} className="mx-auto mb-4 text-secondary/30" />
          <h2 className="text-xl font-black italic">CONTACT</h2>
          <p className="text-xs opacity-70 mt-2">Nous sommes à votre écoute</p>
      </div>

      <div className="space-y-4">
        {onToggleAdmin && (
          <div className="bg-white p-5 rounded-[25px] flex items-center justify-between shadow-sm border border-secondary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary">
                <Info size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Mode Administration</p>
                <p className="text-sm font-black text-primary uppercase">{isAdmin ? 'Activé' : 'Désactivé'}</p>
              </div>
            </div>
            <button 
              onClick={onToggleAdmin}
              className={`w-12 h-6 rounded-full transition-all relative ${isAdmin ? 'bg-secondary' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAdmin ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        )}

        <div className="bg-white p-5 rounded-[25px] flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary">
            <Phone size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400">Présidence</p>
            <p className="text-base font-black text-primary">+221 78 129 27 91</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[25px] flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400">Secrétariat</p>
            <p className="text-sm font-black text-primary">gofacorp@mbour.sn</p>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-[25px] font-black italic shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
          <MapPin size={20} />
          LOCALISER L'ACADÉMIE
        </button>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * Écran Classement
 * Affiche la position de GOFA Academy par rapport aux autres clubs de la ligue.
 */
function ClassementScreen() {
  return (
    <div className="p-6 text-left">
      <div className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-2xl font-black text-primary italic uppercase tracking-tighter">Classements</h1>
        <div className="bg-secondary p-2 rounded-xl shadow-lg shadow-secondary/20">
          <Trophy className="text-primary" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-[35px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="bg-primary p-4 flex justify-between text-[10px] font-black uppercase text-secondary/60 italic tracking-widest">
          <span className="w-8">#</span>
          <span className="flex-1">Club</span>
          <span className="w-10 text-center">MJ</span>
          <span className="w-10 text-center">PTS</span>
        </div>
        <div className="divide-y divide-gray-50">
          <RankRow rank={1} name="GOFA ACADEMY" mj={10} pts={24} active />
          <RankRow rank={2} name="GUÉPARD" mj={10} pts={21} />
          <RankRow rank={3} name="MBALLING" mj={10} pts={18} />
          <RankRow rank={4} name="ATLANTIQUE" mj={10} pts={15} />
          <RankRow rank={5} name="DIAMBARS" mj={10} pts={13} />
        </div>
      </div>
    </div>
  );
}

/**
 * Écran des Notifications
 * Cet écran affiche les alertes envoyées par l'académie (résultats, matchs, infos).
 */
function NotificationsScreen() {
  // Liste des notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'result', title: 'Victoire !', desc: 'GOFA U17 l\'emporte 2-1 contre Mballing.', time: 'Il y a 10 min', unread: true },
    { id: 2, type: 'match', title: 'Nouveau Match', desc: 'Le calendrier des U19 a été mis à jour.', time: 'Il y a 2h', unread: true },
    { id: 3, type: 'news', title: 'Félicitations', desc: 'Djibril Dieng est élu meilleur joueur du mois.', time: 'Il y a 5h', unread: true },
    { id: 4, type: 'info', title: 'Entraînement', desc: 'Séance annulée demain cause pluie (Caroline Faye).', time: 'Hier', unread: false },
  ]);

  return (
    <div className="p-6 text-left pb-24 min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-8 pt-8">
        <div>
          <h1 className="text-2xl font-black text-primary italic uppercase tracking-tighter">Notifications</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-1 text-left italic">Restez connecté à l'académie</p>
        </div>
        <div className="bg-gradient-to-br from-primary to-accent text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"><Bell size={22}/></div>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <motion.div 
            key={n.id} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white p-6 rounded-[35px] border ${n.unread ? 'border-secondary/50 bg-secondary/[0.03]' : 'border-gray-50'} shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex gap-4 items-start relative overflow-hidden`}
          >
            {n.unread && <div className="absolute top-0 right-0 w-10 h-10 bg-secondary rounded-bl-[25px] flex items-center justify-center p-1.5"><div className="w-2 h-2 bg-primary rounded-full animate-ping shadow-[0_0_8px_var(--color-primary)]"></div></div>}
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              n.type === 'result' ? 'bg-green-50 text-green-600' : 
              n.type === 'match' ? 'bg-primary/5 text-primary' : 'bg-blue-50 text-blue-600'
            }`}>
              {n.type === 'result' ? <Trophy size={24} /> : <Bell size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-black text-primary italic text-sm uppercase tracking-tight">{n.title}</h3>
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed italic">{n.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
        className="mt-12 w-full bg-primary text-white py-5 rounded-[30px] font-black italic text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        TOUT MARQUER COMME LU
      </button>
    </div>
  );
}

/**
 * Écran des Actualités
 * Affiche les derniers articles et nouvelles de l'académie.
 */
function NewsScreen() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const news = [
    {
      id: 1,
      title: "Sadio Mané : L'inspiration de toute une génération",
      category: "PROFIL",
      date: "10 Mai 2026",
      image: "/src/assets/images/regenerated_image_1778418360009.jpg",
      desc: "Découvrez comment la star sénégalaise continue de soutenir la formation des jeunes au pays via des projets comme GOFA.",
      fullContent: "Découvrez comment la star sénégalaise continue de soutenir la formation des jeunes au pays via des projets comme GOFA. Sadio Mané, véritable icône du football mondial, est une source d'inspiration intarissable pour nos académiciens. Son parcours exemplaire, de Bambali aux sommets de l'Europe, montre à chaque jeune de Mbour que le travail et l'humilité ouvrent toutes les portes. GOFA Academy est fière de transmettre ces valeurs prônées par l'enfant du pays."
    },
    {
      id: 2,
      title: "Nouveau partenariat avec l'équipementier",
      category: "CLUB",
      date: "08 Mai 2026",
      image: "/src/assets/images/regenerated_image_1778410210392.png",
      desc: "GOFA Academy est fière d'annoncer la signature d'un contrat de 3 ans avec son nouveau partenaire technique.",
      fullContent: "GOFA Academy est fière d'annoncer la signature d'un contrat de 3 ans avec son nouveau partenaire technique. Ce partenariat stratégique permettra à tous nos jeunes académiciens de bénéficier de matériel de haute performance, des tenues d'entraînement aux chaussures de compétition. Cette collaboration marque une nouvelle étape dans la professionnalisation de notre structure et renforce notre image de marque au niveau national."
    },
    {
      id: 3,
      title: "Rénovation du centre de formation",
      category: "INFRASTRUCTURE",
      date: "05 Mai 2026",
      image: "/src/assets/images/regenerated_image_1778410301138.png",
      desc: "Les travaux avancent à grands pas. Le nouveau dortoir sera prêt pour accueillir la promotion 2026.",
      fullContent: "Les travaux avancent à grands pas. Le nouveau dortoir sera prêt pour accueillir la promotion 2026. Avec une capacité de 40 lits, des salles d'étude modernes et un espace de vie convivial, ce nouveau centre garantira des conditions optimales pour la réussite sportive et scolaire de nos pensionnaires. La direction technique prévoit une inauguration officielle au début du mois de septembre, juste avant la reprise des championnats."
    }
  ];

  return (
    <div className="p-6 text-left pb-24 min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-8 pt-8">
        <div>
          <h1 className="text-2xl font-black text-primary italic uppercase tracking-tighter">Actualités</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-1 text-left italic">Les dernières nouvelles du club</p>
        </div>
        <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
          <Newspaper size={22}/>
        </div>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[35px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={item.title} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-primary text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{item.date}</span>
              <h3 className="text-lg font-black text-primary italic uppercase leading-tight mt-1 mb-2 tracking-tight group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className={`text-xs text-gray-500 font-medium leading-relaxed italic ${expandedId === item.id ? '' : 'line-clamp-2'}`}>
                {expandedId === item.id ? item.fullContent : item.desc}
              </p>
              <button 
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="mt-4 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest italic hover:gap-4 transition-all"
              >
                {expandedId === item.id ? 'Réduire' : 'Lire la suite'} 
                <ChevronRight size={14} className={`text-secondary transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RankRow({ rank, name, mj, pts, active }: { rank: number, name: string, mj: number, pts: number, active?: boolean }) {
  return (
    <div className={`p-4 flex justify-between items-center text-xs font-black ${active ? 'bg-secondary/20' : ''}`}>
      <span className={`w-8 ${rank === 1 ? 'text-secondary font-black' : 'text-gray-400'}`}>{rank === 1 ? '🏆' : rank}</span>
      <span className="flex-1 italic text-primary">{name}</span>
      <span className="w-10 text-center text-gray-500 font-bold">{mj}</span>
      <span className="w-10 text-center text-primary italic underline decoration-secondary decoration-2">{pts}</span>
    </div>
  );
}
