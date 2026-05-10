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
  Bell,
  Calendar,
  MapPin,
  Newspaper,
  Phone,
  Mail,
  School,
  Info
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
        return <JoueursScreen />;
      case 'academie':
        return <AcademieScreen />;
      case 'galerie':
        return <GalerieScreen />;
      case 'contact':
        return <ContactScreen />;
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
          icon={<ImageIcon size={22} />} 
          label="Galerie" 
          active={activeTab === 'galerie'} 
          onClick={() => setActiveTab('galerie')} 
        />
        <NavItem 
          icon={<Menu size={22} />} 
          label="Plus" 
          active={activeTab === 'contact' || activeTab === 'academie'} 
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
               <p className="text-center text-[11px] font-black text-gray-400 uppercase italic mb-8 tracking-[0.2em]">Ligue des Prodiges</p>
               
               <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 flex items-center justify-center p-2">
                      <img src="/src/assets/images/regenerated_image_1778410416145.png" className="w-full h-full object-contain filter drop-shadow-sm brightness-110 contrast-110" alt="GOFA" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-black text-base text-primary italic uppercase tracking-wider">GOFA</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary italic opacity-10 select-none">VS</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-white rounded-[35px] flex items-center justify-center p-2 border-2 border-white shadow-lg overflow-hidden">
                      <img src="/src/assets/images/regenerated_image_1778411110302.png" className="w-full h-full object-contain filter brightness-125 contrast-125 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]" alt="Adversaire" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-black text-base text-primary italic uppercase tracking-wider">ADVERSAIRE</span>
                  </div>
               </div>

               <div className="bg-primary/[0.03] rounded-[30px] p-6 space-y-4 mb-8 border border-white/50 shadow-inner">
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black uppercase italic">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><Calendar size={18} className="text-secondary" /></div>
                    11 Avril 2026
                  </div>
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black uppercase italic">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><span className="text-secondary">🕒</span></div>
                    16h00
                  </div>
                  <div className="flex items-center gap-4 text-primary text-[13px] font-black italic uppercase">
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center"><MapPin size={18} className="text-secondary" /></div>
                    Stade Caroline Faye
                  </div>
               </div>

               <button className="w-full bg-secondary text-primary py-5 rounded-[25px] font-black italic shadow-[0_15px_30px_rgba(255,210,63,0.4)] text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-all hover:brightness-110 hover:shadow-[0_20px_40px_rgba(255,210,63,0.5)]">
                 DÉTAILS DU MATCH
               </button>
            </motion.div>
            
            {/* RENDU DES AUTRES MATCHS DYNAMIQUEMENT */}
            {matchs.length > 0 && matchs.map((m, idx) => (
              <div key={idx} className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 opacity-60">
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
              <div key={i} className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 flex items-center justify-between">
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
    </div>
  );
}

/**
 * Écran Joueurs
 * Affiche l'effectif de l'académie avec fonctionnalités de recherche et filtres par catégorie.
 */
function JoueursScreen() {
  return (
    <div className="p-6 text-left">
      <div className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-2xl font-black text-primary italic">LES ESPADONS</h1>
        <Users className="text-primary" />
      </div>

      <div className="relative mb-6">
        <div className="absolute left-4 top-3 text-gray-400"><SearchIcon size={18} /></div>
        <input 
          placeholder="Rechercher un joueur..." 
          className="w-full bg-white border border-gray-100 rounded-full py-3 px-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['TOUS', 'U15', 'U16', 'U17', 'U19'].map((cat, i) => (
          <button key={cat} className={`px-6 py-2 rounded-xl text-xs font-black italic ${i === 3 ? 'bg-secondary text-primary' : 'bg-gray-100 text-gray-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <PlayerRow name="Djibril Dieng" pos="Milieu de terrain" age={16} cat="U17" stage />
        <PlayerRow name="Mamadou Sarr" pos="Attaquant" age={15} cat="U15" />
        <PlayerRow name="Ibrahima Ndiaye" pos="Défenseur" age={17} cat="U17" />
        <PlayerRow name="Cheikh Ba" pos="Gardien de but" age={16} cat="U16" />
      </div>
    </div>
  );
}

function PlayerRow({ name, pos, age, cat, stage }: { name: string, pos: string, age: number, cat: string, stage?: boolean }) {
  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Users size={28} />
        </div>
        <div>
          <h3 className="font-black text-primary text-base leading-tight italic">{name}</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{pos}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-400 font-medium">{age} ans | <span className="text-primary">{cat}</span></span>
            {stage && <span className="bg-secondary text-primary text-[8px] font-black px-1.5 rounded flex items-center gap-0.5"><Trophy size={8}/> STAGE</span>}
          </div>
        </div>
      </div>
      <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

/**
 * Écran Académie
 * Présentation des valeurs, de l'histoire et des installations de GOFA Academy.
 */
function AcademieScreen() {
  return (
    <div className="flex flex-col text-left">
       <div className="bg-primary p-12 text-center text-white pb-16">
          <School size={48} className="text-secondary mx-auto mb-4" />
          <h2 className="text-4xl font-black italic">ACADÉMIE</h2>
          <p className="text-secondary font-bold tracking-widest text-xs uppercase mt-2">Le talent se construit ici</p>
       </div>

       <div className="px-6 -mt-8 space-y-4">
          <AcademieSection icon={<Info/>} title="Histoire" open />
          <AcademieSection icon={<Users/>} title="Staff Technique" />
          <div className="bg-white p-5 rounded-[25px] shadow-sm border border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase">Valeurs de l'académie</h3>
             <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: '⭐', label: 'Discipline' },
                  { icon: '⚽', label: 'Travail' },
                  { icon: '💎', label: 'Excellence' },
                  { icon: '❤️', label: 'Respect' },
                ].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-lg">{v.icon}</div>
                    <span className="text-[8px] font-black uppercase text-primary">{v.label}</span>
                  </div>
                ))}
             </div>
          </div>
          <AcademieSection icon={<MapPin/>} title="Installations" />
       </div>
    </div>
  );
}

function AcademieSection({ icon, title, open }: { icon: React.ReactNode, title: string, open?: boolean }) {
  return (
    <div className="bg-white p-5 rounded-[25px] shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <span className="font-black text-sm text-primary uppercase italic">{title}</span>
      </div>
      <button className={`w-8 h-8 rounded-full flex items-center justify-center ${open ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
        <Menu size={16} />
      </button>
    </div>
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
function ContactScreen() {
  return (
    <div className="p-6 text-left">
      <div className="bg-primary p-8 rounded-[40px] text-center text-white mb-8 border-b-8 border-secondary">
          <Users size={64} className="mx-auto mb-4 text-secondary/30" />
          <h2 className="text-xl font-black italic">CONTACT</h2>
          <p className="text-xs opacity-70 mt-2">Nous sommes à votre écoute</p>
      </div>

      <div className="space-y-4">
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
