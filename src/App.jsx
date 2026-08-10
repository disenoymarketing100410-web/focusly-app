import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import focusImg from './assets/focus.png';
import driveImg from './assets/drive.png';
import './styles/light.css';
import strengthImg from './assets/strength.png';
import silenceImg from './assets/silence.png';
import focuslyWordmark from './assets/focusly-logo-wordmark.png';
import focuslyIcon from './assets/focusly-logo-icon.png';
import focuslySlogan from './assets/focusly-slogan.png';
import {
  Bell, Users, Mail, ChevronLeft, Plus, Heart, MessageCircle, Megaphone,
  Home, ShoppingBag, User, Check, Search, Settings, ArrowLeft, Sprout,
  Shield, Flame, Crown, Lock, Calendar, ArrowRight, Gem, MoreVertical,
  Send, Paperclip, Smile, Trophy, ArrowDown, Minus, Play, TrendingUp,
  Target, Zap, Award, Medal, Clock, Brain, BookOpen, Gamepad2, X, RefreshCw,
  Image as ImageIcon, Edit2, LayoutGrid, Activity, Sparkles, Star, ChevronRight, Info, Palette, ChevronDown, Trash2,
  Sun, Moon, Smartphone, CheckCircle2, BarChart3, Layers, Globe, ExternalLink, ShieldCheck
} from 'lucide-react';

// Error Boundary: evita pantalla en blanco ante cualquier crash de React
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('[Focusly ErrorBoundary]', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#050505', color: '#fff', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <h2 style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Algo salió mal</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', maxWidth: '300px' }}>{String(this.state.error?.message || 'Error desconocido')}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '999px', background: 'white', color: 'black', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Recargar App</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const UI_TEXT = {
  es: {
    authTitle: 'Forja tu Destino',
    authSub: 'La disciplina empieza aquí.',
    loginTitle: 'Acceso',
    loginSub: 'Retoma tu enfoque.',
    btnStart: 'Comenzar Viaje',
    btnLogin: 'Iniciar Sesión',
    btnSwitchToLogin: '¿Ya tienes una cuenta? Inicia sesión',
    btnSwitchToReg: '¿No tienes cuenta? Regístrate',
    loading: 'Cargando...',
    forum: 'Foro',
    rankings: 'Ranking',
    home: 'Inicio',
    shop: 'Tienda',
    profile: 'Perfil',
    challenge: 'Desafíate',
    organize: 'Organízate',
    grow: 'Crece',
    aiRec: 'IA te recomienda',
    weeklyGoal: 'Meta Semanal',
    activeChallenge: 'Desafío Activo',
    noChallengeYet: 'Sin desafío activo',
    startChallenge: 'Empezar Desafío',
    completeDay: 'Completar Día',
    days: 'días',
    myTasks: 'Mis Tareas',
    addTask: 'Añadir tarea...',
    aiAssistant: 'Asistente IA',
    syncSchedules: 'Sincroniza tus horarios',
    thisWeek: 'Esta Semana',
    blocker: 'Bloqueador',
    focusTips: 'Consejos de Enfoque',
    chooseCoach: 'Elige tu Coach',
    studyMethods: 'Métodos de Estudio',
    language: 'Idioma'
  },
  en: {
    authTitle: 'Forge your Destiny',
    authSub: 'Discipline starts here.',
    loginTitle: 'Access',
    loginSub: 'Regain your focus.',
    btnStart: 'Start Journey',
    btnLogin: 'Sign In',
    btnSwitchToLogin: 'Already have an account? Sign in',
    btnSwitchToReg: 'No account? Sign up',
    loading: 'Loading...',
    forum: 'Forum',
    rankings: 'Rankings',
    home: 'Home',
    shop: 'Shop',
    profile: 'Profile',
    challenge: 'Challenge',
    organize: 'Organize',
    grow: 'Grow',
    aiRec: 'AI recommends',
    weeklyGoal: 'Weekly Goal',
    activeChallenge: 'Active Challenge',
    noChallengeYet: 'No active challenge',
    startChallenge: 'Start Challenge',
    completeDay: 'Complete Day',
    days: 'days',
    myTasks: 'My Tasks',
    addTask: 'Add task...',
    aiAssistant: 'AI Assistant',
    syncSchedules: 'Sync your schedules',
    thisWeek: 'This Week',
    blocker: 'Blocker',
    focusTips: 'Focus Tips',
    chooseCoach: 'Choose your Coach',
    studyMethods: 'Study Methods',
    language: 'Language'
  }
};

// --- DATA ---
const SLIDES = [
  { title: "Focus", subtitle: "EL ARTE DE LA ATENCIÓN PLENA.", image: focusImg },
  { title: "Drive", subtitle: "LA DISCIPLINA ES EL ÚNICO CAMINO.", image: driveImg },
  { title: "Strength", subtitle: "CONSTRUYE TU VOLUNTAD DE ACERO.", image: strengthImg },
  { title: "Silence", subtitle: "ENCUENTRA PODER EN LA QUIETUD.", image: silenceImg }
];

const APPS = [
  { id: 'insta', name: 'INSTAGRAM', icon: 'https://cdn.simpleicons.org/instagram/E4405F', color: 'from-[#f09433] to-[#bc1888]' },
  { id: 'fb', name: 'FACEBOOK', icon: 'https://cdn.simpleicons.org/facebook/1877F2', color: 'from-[#1877F2] to-[#0d5a9e]' },
  { id: 'tt', name: 'TIKTOK', icon: 'https://cdn.simpleicons.org/tiktok/white', color: 'from-[#000000] to-[#333333]' },
  { id: 'yt', name: 'YOUTUBE', icon: 'https://cdn.simpleicons.org/youtube/FF0000', color: 'from-[#ff0000] to-[#cc0000]' },
  { id: 'x', name: 'X', icon: 'https://cdn.simpleicons.org/x/white', color: 'from-[#111] to-[#333]' },
  { id: 'sc', name: 'SNAPCHAT', icon: 'https://cdn.simpleicons.org/snapchat/FFFC00', color: 'from-[#FFFC00] to-[#e6e200]' },
  { id: 'pin', name: 'PINTEREST', icon: 'https://cdn.simpleicons.org/pinterest/E60023', color: 'from-[#E60023] to-[#b3001c]' },
  { id: 'in', name: 'LINKEDIN', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', color: 'from-[#0A66C2] to-[#004b8f]' },
  { id: 'rd', name: 'REDDIT', icon: 'https://cdn.simpleicons.org/reddit/FF4500', color: 'from-[#ff4500] to-[#ff8c00]' },
  { id: 'wa', name: 'WHATSAPP', icon: 'https://cdn.simpleicons.org/whatsapp/25D366', color: 'from-[#25d366] to-[#128c7e]' }
];

// --- ECONOMY REBALANCE & MASSIVE CHALLENGES ---
const APP_CHALLENGES_BANK = [
  // INSTAGRAM
  { id: 'ch_insta_1', appId: 'insta', gender: 'any', title: 'Ayuno de Stories', subtitle: 'Fuera círculos', xp: 150, diamonds: 50, duration: 7, desc: 'Evita presionar las historias en la parte superior de la pantalla.' },
  { id: 'ch_insta_2', appId: 'insta', gender: 'any', title: 'Scroll Consciente', subtitle: 'Max 5 minutos', xp: 200, diamonds: 60, duration: 14, desc: 'Entra, revisa mensajes importantes y sal. Cero scroll infinito.' },
  { id: 'ch_insta_3', appId: 'insta', gender: 'any', title: 'Purga de Feed', subtitle: 'Calidad > Cantidad', xp: 300, diamonds: 100, duration: 3, desc: 'Deja de seguir a 30 cuentas que te generen envidia o no te aporten valor real.' },
  // FACEBOOK
  { id: 'ch_fb_1', appId: 'fb', gender: 'any', title: 'Adiós al Muro', subtitle: 'Cero noticias', xp: 150, diamonds: 40, duration: 7, desc: 'Prohibido ver el feed principal. Usa la app solo para grupos útiles o mensajería.' },
  { id: 'ch_fb_2', appId: 'fb', gender: 'any', title: 'Detox de Debates', subtitle: 'Paz mental', xp: 180, diamonds: 60, duration: 10, desc: 'Prohibido leer o participar en discusiones de comentarios durante 10 días.' },
  { id: 'ch_fb_3', appId: 'fb', gender: 'any', title: 'Limpieza de Amigos', subtitle: 'Círculo real', xp: 250, diamonds: 80, duration: 5, desc: 'Elimina de tus amigos a 20 personas con las que no has hablado en más de 2 años.' },
  // TIKTOK
  { id: 'ch_tt_1', appId: 'tt', gender: 'any', title: 'Freno a la Dopamina', subtitle: 'Límite severo', xp: 200, diamonds: 70, duration: 7, desc: 'Límite estricto: Solo puedes abrir la app 15 minutos al día en total.', reward: { type: 'skin', id: 'skin_base_red' } },
  { id: 'ch_tt_2', appId: 'tt', gender: 'any', title: 'Modo Creador', subtitle: 'Aportar, no consumir', xp: 350, diamonds: 120, duration: 14, desc: 'Prohibido deslizar en el feed "Para Ti". Solo puedes entrar a subir contenido.' },
  { id: 'ch_tt_3', appId: 'tt', gender: 'any', title: 'Abstinencia Total', subtitle: 'Reinicio neuronal', xp: 500, diamonds: 150, duration: 21, desc: 'Desinstala la aplicación o bloquéala por completo durante 21 días.' },
  // YOUTUBE
  { id: 'ch_yt_1', appId: 'yt', gender: 'any', title: 'Cero Shorts', subtitle: 'Rechaza lo efímero', xp: 250, diamonds: 80, duration: 14, desc: 'La pestaña de Shorts está prohibida. Consume solo formato largo.' },
  { id: 'ch_yt_2', appId: 'yt', gender: 'any', title: 'Solo Aprendizaje', subtitle: 'Universidad YT', xp: 300, diamonds: 100, duration: 10, desc: 'Cero videos de entretenimiento o gaming. Solo tutoriales, documentales o podcasts educativos.' },
  { id: 'ch_yt_3', appId: 'yt', gender: 'any', title: 'Lista de Espera', subtitle: 'Cero impulsos', xp: 200, diamonds: 60, duration: 7, desc: 'En lugar de ver un video recomendado al instante, guárdalo en "Ver más tarde" y ciérralo.' },
  // X (TWITTER)
  { id: 'ch_x_1', appId: 'x', gender: 'any', title: 'Ayuno de Indignación', subtitle: 'Protege tu paz', xp: 200, diamonds: 70, duration: 10, desc: 'Cero lectura de "Trending Topics" o hilos de polémicas. Protege tu energía.' },
  { id: 'ch_x_2', appId: 'x', gender: 'any', title: 'Solo Lectura', subtitle: 'Cero interacciones', xp: 150, diamonds: 50, duration: 7, desc: 'No puedes twittear, dar like, ni retwittear. Solo observar en silencio.' },
  { id: 'ch_x_3', appId: 'x', gender: 'any', title: 'Limpieza de TL', subtitle: 'Algoritmo limpio', xp: 250, diamonds: 80, duration: 5, desc: 'Silencia o deja de seguir a 15 cuentas que basen su contenido en quejas o negatividad.' },
  // SNAPCHAT
  { id: 'ch_sc_1', appId: 'sc', gender: 'any', title: 'Rachas Rotas', subtitle: 'Libertad virtual', xp: 300, diamonds: 100, duration: 3, desc: 'Deja morir al menos 3 rachas (streaks) que mantienes solo por compromiso.' },
  { id: 'ch_sc_2', appId: 'sc', gender: 'any', title: 'Cara Descubierta', subtitle: 'Cero filtros', xp: 200, diamonds: 60, duration: 10, desc: 'Prohibido usar filtros que alteren tu rostro. Acéptate tal como eres hoy.' },
  { id: 'ch_sc_3', appId: 'sc', gender: 'any', title: 'Modo Fantasma', subtitle: 'Desconexión', xp: 150, diamonds: 50, duration: 7, desc: 'Activa el Modo Fantasma en el mapa y no mires las historias de la sección "Descubrir".' },
  // PINTEREST
  { id: 'ch_pin_1', appId: 'pin', gender: 'any', title: 'Acción sobre Visión', subtitle: 'Hazlo realidad', xp: 250, diamonds: 80, duration: 7, desc: 'En lugar de guardar pines, elige uno (receta, ejercicio, manualidad) y hazlo en la vida real.' },
  { id: 'ch_pin_2', appId: 'pin', gender: 'any', title: 'Tableros Limpios', subtitle: 'Orden digital', xp: 150, diamonds: 50, duration: 5, desc: 'Elimina 3 tableros antiguos que ya no representan tus metas actuales.' },
  { id: 'ch_pin_3', appId: 'pin', gender: 'any', title: 'Límite de Tablero', subtitle: 'Menos es más', xp: 180, diamonds: 60, duration: 10, desc: 'No puedes guardar más de 5 pines por día. Se selectivo con tu inspiración.' },
  // LINKEDIN
  { id: 'ch_in_1', appId: 'in', gender: 'any', title: 'Adiós al Humo', subtitle: 'Cero feed', xp: 200, diamonds: 70, duration: 14, desc: 'Ignora el muro de publicaciones. Úsalo solo para buscar empleo o mensajería directa.' },
  { id: 'ch_in_2', appId: 'in', gender: 'any', title: 'Networking Real', subtitle: 'Conexiones útiles', xp: 250, diamonds: 90, duration: 7, desc: 'Envía 3 mensajes personalizados a profesionales de tu sector pidiendo consejo.' },
  { id: 'ch_in_3', appId: 'in', gender: 'any', title: 'Optimización', subtitle: 'Mejora tu perfil', xp: 150, diamonds: 50, duration: 3, desc: 'Actualiza tu titular, resumen y añade 2 habilidades clave que hayas aprendido este año.' },
  // REDDIT
  { id: 'ch_rd_1', appId: 'rd', gender: 'any', title: 'Cero Doomscrolling', subtitle: 'Lee y sal', xp: 200, diamonds: 70, duration: 10, desc: 'Busca la información que necesitas, lee 2 posts y cierra la app. Nada de scroll.' },
  { id: 'ch_rd_2', appId: 'rd', gender: 'any', title: 'Filtro de Comunidades', subtitle: 'Solo valor', xp: 150, diamonds: 50, duration: 5, desc: 'Abandona 5 subreddits de memes o contenido tóxico. Únete a 2 educativos.' },
  { id: 'ch_rd_3', appId: 'rd', gender: 'any', title: 'Aporte de Valor', subtitle: 'Ayuda a otros', xp: 250, diamonds: 80, duration: 7, desc: 'Escribe 3 comentarios detallados ayudando a alguien en subreddits técnicos o de consejos.' },
  // WHATSAPP
  { id: 'ch_wa_1', appId: 'wa', gender: 'any', title: 'Modo Asíncrono', subtitle: 'Respuestas por lote', xp: 200, diamonds: 70, duration: 7, desc: 'Desactiva notificaciones. Revisa y responde mensajes solo 2 veces al día (ej. 1pm y 8pm).' },
  { id: 'ch_wa_2', appId: 'wa', gender: 'any', title: 'Cero Estados', subtitle: 'Vida privada', xp: 180, diamonds: 60, duration: 14, desc: 'Prohibido ver los estados de tus contactos y prohibido subir estados propios.' },
  { id: 'ch_wa_3', appId: 'wa', gender: 'any', title: 'Limpieza de Grupos', subtitle: 'Silencio total', xp: 150, diamonds: 50, duration: 3, desc: 'Archiva y silencia permanentemente todos los grupos que no sean de trabajo/estudio urgente.' },
  { id: 'ch_insta_4', appId: 'insta', gender: 'any', title: 'Desintoxicación Total', subtitle: 'Borrado temporal', xp: 500, diamonds: 200, duration: 30, desc: 'Desinstala la aplicación durante 30 días seguidos. Rompe la adicción de raíz.' },
  { id: 'ch_fb_4', appId: 'fb', gender: 'any', title: 'Apagón Social', subtitle: 'Sin rastro', xp: 400, diamonds: 150, duration: 21, desc: 'Desactiva tu cuenta de Facebook (o desinstala la app) por 21 días.' },
  { id: 'ch_tt_4', appId: 'tt', gender: 'any', title: 'Modo Monje Estricto', subtitle: 'Cero estimulación', xp: 800, diamonds: 300, duration: 30, desc: 'Ni un solo video de formato corto en 30 días. Tu cerebro te lo agradecerá.' },
  { id: 'ch_yt_4', appId: 'yt', gender: 'any', title: 'Intención Pura', subtitle: 'Cero recomendaciones', xp: 400, diamonds: 150, duration: 21, desc: 'Usa YouTube solo buscando canales específicos. Nada de feed de recomendaciones.' },
  { id: 'ch_x_4', appId: 'x', gender: 'any', title: 'Silencio Absoluto', subtitle: 'Cero ruido', xp: 450, diamonds: 180, duration: 21, desc: 'Desinstala X por 21 días. Escapa de la cámara de eco.' },
  { id: 'ch_wa_4', appId: 'wa', gender: 'any', title: 'Solo Texto', subtitle: 'Comunicación clara', xp: 300, diamonds: 100, duration: 14, desc: 'Prohibido enviar audios o fotos/stickers. Comunícate de manera concisa y solo con texto.' },
  // MÉTODOS DE ESTUDIO (NEW)
  { id: 'ch_study_1', appId: 'yt', gender: 'any', title: 'Maestro Feynman', subtitle: 'Enseña para aprender', xp: 300, diamonds: 100, duration: 7, desc: 'Explica en voz alta tus apuntes a una audiencia imaginaria sin mirar el celular por 15 min diarios.' },
  { id: 'ch_study_2', appId: 'insta', gender: 'any', title: 'Pomodoro Puro', subtitle: 'Sin interrupciones', xp: 400, diamonds: 120, duration: 10, desc: 'Haz 4 ciclos Pomodoro (25m estudio / 5m descanso). El celular debe estar en otra habitación.' },
  { id: 'ch_study_3', appId: 'tt', gender: 'any', title: 'Detox Gris', subtitle: 'Apaga los colores', xp: 250, diamonds: 80, duration: 5, desc: 'Configura la pantalla de tu celular en escala de grises para reducir el enganche visual de TikTok/Insta.' }
];

const WWII_TRIVIA = [
  { q: "¿En qué año comenzó la Segunda Guerra Mundial?", options: ["1935", "1939", "1941", "1945"], answer: 1 },
  { q: "¿Qué país NO formaba parte de las Potencias del Eje?", options: ["Alemania", "Italia", "Japón", "Unión Soviética"], answer: 3 },
  { q: "¿Cómo se llamó la invasión aliada de Normandía?", options: ["Op. Barbarroja", "Op. Overlord", "Op. Market Garden", "Op. Dinamo"], answer: 1 },
  { q: "¿Qué evento provocó la entrada de EE.UU. a la guerra?", options: ["Hundimiento del Lusitania", "Invasión de Polonia", "Ataque a Pearl Harbor", "Batalla de Inglaterra"], answer: 2 },
  { q: "¿En qué ciudad se lanzó la primera bomba atómica?", options: ["Nagasaki", "Tokio", "Kyoto", "Hiroshima"], answer: 3 },
  { q: "¿Qué batalla es considerada el punto de inflexión en el Frente Oriental?", options: ["Batalla de Kursk", "Batalla de Stalingrado", "Sitio de Leningrado", "Batalla de Berlín"], answer: 1 }
];

const STOIC_TRIVIA = [
  { q: "¿Qué filósofo estoico fue un emperador romano?", options: ["Séneca", "Epicteto", "Marco Aurelio", "Zenón"], answer: 2 },
  { q: "¿Quién de estos filósofos nació como esclavo?", options: ["Marco Aurelio", "Epicteto", "Cleantes", "Crisipo"], answer: 1 },
  { q: "Según el estoicismo, ¿qué es lo único que controlamos?", options: ["Nuestra salud", "Nuestra reputación", "Nuestros juicios y acciones", "Nuestro destino"], answer: 2 },
  { q: "¿Quién fue el fundador de la escuela estoica?", options: ["Aristóteles", "Zenón de Citio", "Sócrates", "Diógenes"], answer: 1 },
  { q: "¿Cuál es el concepto estoico de amor al destino?", options: ["Memento Mori", "Amor Fati", "Carpe Diem", "Eudaimonia"], answer: 1 },
  { q: "Séneca fue tutor y consejero de qué infame emperador romano?", options: ["Calígula", "Nerón", "Cómodo", "Tiberio"], answer: 1 }
];

const SPACE_TRIVIA = [
  { q: "¿Cuál es el planeta más grande de nuestro sistema solar?", options: ["Tierra", "Saturno", "Júpiter", "Urano"], answer: 2 },
  { q: "¿Qué galaxia colisionará con la Vía Láctea en el futuro?", options: ["Triángulo", "Andrómeda", "Magallanes", "Sombrero"], answer: 1 },
  { q: "¿Aproximadamente cuánto tarda la luz del Sol en llegar a la Tierra?", options: ["8 segundos", "8 minutos", "8 horas", "8 días"], answer: 1 },
  { q: "¿Qué es un púlsar?", options: ["Un planeta enano", "Un agujero negro", "Una estrella de neutrones giratoria", "Una nebulosa"], answer: 2 },
  { q: "¿Qué telescopio espacial se lanzó en 1990?", options: ["James Webb", "Kepler", "Spitzer", "Hubble"], answer: 3 }
];

const AVISOS_DATA = [
  { id: 'a1', title: 'NUEVO DESAFÍO GLOBAL', text: 'Únete a la Operación Detox Masivo. Recompensa x2 XP este fin de semana.', type: 'event', time: 'Hace 1h' },
  { id: 'a2', title: 'SISTEMA ACTUALIZADO', text: 'Se ha añadido la nueva Liga Diamante a las clasificaciones. ¡Llega a lo más alto de Focusly!', type: 'update', time: 'Ayer' }
];

const INITIAL_FORUM_POSTS = [
  { id: '1', author: { name: 'FocusMaster', avatarId: 'a_flame' }, text: '¡Acabo de completar 7 días en Modo Monje! La claridad mental es increíble.', likes: 24, time: 'Hace 2h', liked: false, comments: [] },
  { id: '2', author: { name: 'ZenSeeker', avatarId: 'a_base' }, text: '¿Algún consejo para resistir la tentación de abrir TikTok en la mañana?', likes: 12, time: 'Hace 5h', liked: false, comments: [{ id: 'c1', author: 'FocusMaster', text: 'Guarda el teléfono en otra habitación al dormir.' }] }
];

const MESSAGES_DATA = [
  { id: 'm_lucas', name: 'Lucas_16', role: 'Estudiante (16 años)', type: 'animated', avatarId: 'a_ninja', unread: true, time: '10:00 AM', isBot: false, isSimulatedPeer: true, botId: 'lucas' },
  { id: 'm_sofia', name: 'Sofi.Study', role: 'Estudiante (15 años)', type: 'animated', avatarId: 'a_base', unread: true, time: '09:30 AM', isBot: false, isSimulatedPeer: true, botId: 'sofia' },
  { id: 'm_mateo', name: 'Mateo_Preu', role: 'Aspirante Univ (17 años)', type: 'animated', avatarId: 'a_brain', unread: false, time: 'Ayer', isBot: false, isSimulatedPeer: true, botId: 'mateo' },
  { id: 'm_vale', name: 'Vale_Focus', role: 'Estudiante (14 años)', type: 'animated', avatarId: 'a_flame', unread: false, time: 'Lun', isBot: false, isSimulatedPeer: true, botId: 'vale' },
  { id: 'm_thiago', name: 'Thiago.Code', role: 'Estudiante (18 años)', type: 'animated', avatarId: 'a_hacker', unread: false, time: 'Dom', isBot: false, isSimulatedPeer: true, botId: 'thiago' }
];

// SISTEMA DE CALIDADES Y TEMAS GLOBAL
const RARITIES = {
  common: { id: 'common', name: 'Común', level: 1, hex: '#9ca3af' },
  rare: { id: 'rare', name: 'Raro', level: 2, hex: '#3b82f6' },
  epic: { id: 'epic', name: 'Épico', level: 3, hex: '#a855f7' },
  legendary: { id: 'legendary', name: 'Legendario', level: 4, hex: '#eab308' },
  mythic: { id: 'mythic', name: 'Mítico', level: 5, hex: '#22d3ee' }
};
const RARITY_ORDER = ['mythic', 'legendary', 'epic', 'rare', 'common'];

// Precios ajustados a la nueva economía
const BACKGROUNDS = {
  bg_default: { id: 'bg_default', name: 'El Vacío', css: 'bg-[#050505]', themeProps: { navBg: 'bg-[#181818]', navBorder: 'border-white/5' }, img: 'animated', rarity: 'common', price: 0, desc: 'El comienzo de todo. Simple y oscuro. Ideal para mentes que necesitan un reinicio total.' },
  bg_grid: { id: 'bg_grid', name: 'Matriz Cyber', css: 'bg-[#000814] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:30px_30px]', themeProps: { navBg: 'bg-[#001122]', navBorder: 'border-blue-500/30', navGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' }, img: 'animated', rarity: 'rare', price: 150, desc: 'Fondo de cuadrícula analítica. Activa el escáner neuronal para mentes calculadoras.' },
  bg_zen: { id: 'bg_zen', name: 'Jardín Zen', css: 'bg-gradient-to-b from-[#02120a] to-[#000000]', themeProps: { navBg: 'bg-[#051a0f]', navBorder: 'border-emerald-500/30', navGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' }, img: 'animated', rarity: 'epic', price: 300, desc: 'Para aquellos que buscan la paz interior extrema. Incluye orbes de calma para sincronizar tu respiración.' },
  bg_ocean: { id: 'bg_ocean', name: 'Abismo Oceánico', css: 'bg-gradient-to-b from-[#000b18] to-[#000000]', themeProps: { navBg: 'bg-[#001429]', navBorder: 'border-cyan-500/30', navGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.2)]' }, img: 'animated', rarity: 'epic', price: 450, desc: 'La presión de las profundidades forja diamantes. Ideal para concentración extrema.' },
  bg_nebula: { id: 'bg_nebula', name: 'Nebulosa Cósmica', css: 'bg-gradient-to-br from-[#120524] to-[#000000]', themeProps: { navBg: 'bg-[#1a0b2e]', navBorder: 'border-purple-500/40', navGlow: 'shadow-[0_0_25px_rgba(168,85,247,0.2)]' }, img: 'animated', rarity: 'legendary', price: 800, desc: 'Un viaje por las estrellas oscuras. Tu disciplina expande la galaxia. Activa el campo estelar.' },
  bg_inferno: { id: 'bg_inferno', name: 'Foso Infernal', css: 'bg-gradient-to-t from-[#2a0000] to-[#000000]', themeProps: { navBg: 'bg-[#2a0000]', navBorder: 'border-red-500/50', navGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]', isAgresive: true }, img: 'animated', rarity: 'mythic', price: 1500, desc: 'Solo para voluntades forjadas en el fuego más intenso. El entorno reacciona con llamas a tu progreso.' },
  bg_light: { id: 'bg_light', name: 'Luz Diurna', css: 'bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]', themeProps: { navBg: 'bg-white/80', navBorder: 'border-black/5', navGlow: 'shadow-[0_10px_30px_rgba(0,0,0,0.05)]', isLight: true }, img: 'animated', rarity: 'common', price: 0, desc: 'Claridad mental pura. Un entorno diurno manteniendo la oscuridad en tu centro de operaciones. ¡Gratis!' }
};

const LEVELS = [
  { id: 1, tag: 'COMÚN', title: 'Principiante', desc: 'Ideal para empezar. Construye el hábito de a poco.', hex: '#9ca3af', icon: Sprout },
  { id: 2, tag: 'RARO', title: 'Novato', desc: 'Sube la intensidad. Requiere un poco más de esfuerzo.', hex: '#3b82f6', icon: Shield },
  { id: 3, tag: 'ÉPICO', title: 'Profesional', desc: 'Para quienes buscan un cambio drástico y constante.', hex: '#a855f7', icon: Flame },
  { id: 4, tag: 'LEGENDARIO', title: 'Élite', desc: 'Disciplina militar. Cero excusas. Dominio absoluto.', hex: '#eab308', icon: Crown }
];

const LEAGUES = [
  { id: 'iron', name: 'LIGA HIERRO', req: '0 - 500 XP', hex: '#a1a1aa', icon: Shield },
  { id: 'bronze', name: 'LIGA BRONCE', req: '500 - 1,500 XP', hex: '#b45309', icon: Medal },
  { id: 'silver', name: 'LIGA PLATA', req: '1,500 - 3,500 XP', hex: '#94a3b8', icon: Award },
  { id: 'gold', name: 'LIGA ORO', req: '3,500 - 7,000 XP', hex: '#eab308', icon: Trophy },
  { id: 'diamond', name: 'LIGA DIAMANTE', req: '7,000+ XP', hex: '#38bdf8', icon: Gem }
];

const ALL_SKINS = [
  { id: 'skin_base_red', baseId: 'a_base', name: 'Núcleo Carmesí', rarity: 'rare', price: 100, hue: 140, brightness: 0.9 },
  { id: 'skin_base_gold', baseId: 'a_base', name: 'Núcleo Dorado', rarity: 'epic', price: 250, hue: 200, brightness: 1.5, saturate: 1.5 },
  { id: 'skin_bot_eva', baseId: 'a_bot', name: 'Unidad EVA', rarity: 'epic', price: 300, hue: -90, brightness: 1.1 },
  { id: 'skin_bot_dark', baseId: 'a_bot', name: 'Materia Oscura', rarity: 'legendary', price: 600, hue: 0, brightness: 0.3, saturate: 0 },
  { id: 'skin_flame_blue', baseId: 'a_flame', name: 'Fuego Fatuo', rarity: 'epic', price: 400, hue: 180, brightness: 1.2, saturate: 1.5 },
  { id: 'skin_flame_void', baseId: 'a_flame', name: 'Llama del Vacío', rarity: 'mythic', price: 1000, hue: 280, brightness: 0.8, saturate: 2 },
  { id: 'skin_brain_neon', baseId: 'a_brain', name: 'Sinapsis Neón', rarity: 'legendary', price: 800, hue: 250, brightness: 1.3, saturate: 2 },
  { id: 'skin_ninja_white', baseId: 'a_ninja', name: 'Fantasma Blanco', rarity: 'epic', price: 500, hue: 0, brightness: 3, saturate: 0 },
];

// --- MINIJUEGOS Y TRIVIAS DATA ---
const MINIGAMES_BANK = [
  { id: 'mg_1', type: 'reflex', title: 'Reflejos Zen', subtitle: '3 Niveles de Atención', desc: 'Prueba de velocidad neuronal. Supera 3 niveles seguidos para ganar la recompensa completa.', icon: Zap, color: 'from-yellow-500 to-orange-600', rewardXP: 30, rewardDia: 10 },
  { id: 'mg_2', type: 'memory', title: 'Memoriza', subtitle: 'Progresión Visual', desc: 'Encuentra las parejas ocultas. La dificultad (cantidad de cartas) aumenta tras cada victoria.', icon: LayoutGrid, color: 'from-blue-500 to-cyan-600', rewardXP: 45, rewardDia: 15 },
  { id: 'mg_3', type: 'millionaire', title: 'Mente Maestra', subtitle: 'Prueba de 5 Preguntas', desc: 'Demuestra tu cultura general. Responde 5 preguntas seguidas sin margen de error.', icon: Brain, color: 'from-purple-500 to-indigo-600', rewardXP: 60, rewardDia: 20 },
  { id: 'mg_4', type: 'math', title: 'Genio Matemático', subtitle: 'Agilidad Numérica', desc: 'Resuelve operaciones matemáticas. Fomenta la inteligencia y la rapidez mental.', icon: Activity, color: 'from-green-500 to-emerald-600', rewardXP: 40, rewardDia: 10 },
  { id: 'mg_5', type: 'sequence', title: 'Secuencia Lógica', subtitle: 'Orden y Enfoque', desc: 'Toca los números en orden ascendente. Entrena tu concentración y memoria de trabajo.', icon: LayoutGrid, color: 'from-indigo-500 to-purple-600', rewardXP: 35, rewardDia: 10 },
  { id: 'mg_6', type: 'whack', title: 'Destructor', subtitle: 'Caza de Distracciones', desc: 'Destruye los iconos de distracciones antes de que desaparezcan, pero NO toques los de trabajo.', icon: Target, color: 'from-red-500 to-pink-600', rewardXP: 50, rewardDia: 15 },
  { id: 'mg_7', type: 'stoic', title: 'Sabiduría Estoica', subtitle: 'Ordena la frase', desc: 'Ordena las palabras para formar famosas frases de pensadores estoicos.', icon: BookOpen, color: 'from-slate-500 to-gray-700', rewardXP: 40, rewardDia: 15 }
];

const FOCUS_TIPS_VIDEOS = [
  {
    id: 'v_dopamina',
    title: 'Desintoxicación de Dopamina',
    duration: '5:42',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    points: [
      'Elimina todo estímulo ultra-procesado en las primeras 2 horas del día.',
      'Sustituye el scroll rápido por aburrimiento controlado para reiniciar receptores.',
      'Escribe tus metas en papel para activar el sistema de recompensa real.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Cómo hackear tu química cerebral para recuperar la atención y eliminar la procrastinación inducida por TikTok e Instagram.',
    activityText: 'Desactiva las notificaciones de Instagram y TikTok por las próximas 4 horas.'
  },
  {
    id: 'v_fomo',
    title: 'Venciendo el FOMO (Miedo a perderse algo)',
    duration: '4:15',
    category: 'Redes Sociales',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    points: [
      'Entiende que la vida en redes es un filtro irreal de la realidad.',
      'Tus verdaderos amigos no te juzgarán por no responder en 5 minutos.',
      'Prioriza tu paz mental por encima de las rachas de Snapchat.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'Aprende a superar la ansiedad que te genera no estar conectado 24/7 y recupera el control de tu tiempo.',
    activityText: 'Deja un mensaje en tu grupo de WhatsApp diciendo que estarás desconectado estudiando por 2 horas.'
  },
  {
    id: 'v_pomodoro_teens',
    title: 'Pomodoro Adaptado para Adolescentes',
    duration: '6:30',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    points: [
      'Empieza con bloques cortos de 20 minutos si tu atención está dañada.',
      'Durante los 5 min de descanso, estira o bebe agua, ¡CERO PANTALLAS!',
      'Usa el método gradualmente hasta alcanzar bloques de 45 minutos.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'La técnica Pomodoro es brutal, pero las notificaciones la destruyen. Aprende a adaptarla a tu ritmo actual.',
    activityText: 'Completa 1 ciclo de Pomodoro (20 min) con el celular en "No Molestar".'
  },
  {
    id: 'v_sleep_phone',
    title: 'Por qué no dormir con el celular',
    duration: '3:45',
    category: 'Sueño',
    thumbnail: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=600&auto=format&fit=crop',
    points: [
      'La luz azul engaña a tu cerebro haciéndole creer que es de día.',
      'El contenido corto antes de dormir dispara tu cortisol y arruina tu descanso.',
      'Un cerebro sin descanso no puede consolidar la memoria para los exámenes.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'El peor hábito para un estudiante es hacer scroll antes de dormir. Destruye tu memoria y tu energía.',
    activityText: 'Deja cargando tu celular fuera de tu habitación esta noche.'
  },
  {
    id: 'v_grayscale',
    title: 'El truco de la Escala de Grises',
    duration: '2:10',
    category: 'Entorno Digital',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    points: [
      'Las apps usan colores brillantes (rojo) para hackear tus instintos.',
      'Poner la pantalla en blanco y negro vuelve el teléfono aburrido.',
      'Reducirás el tiempo de pantalla un 40% casi sin esfuerzo.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Cómo hacer que tu cerebro deje de ver tu teléfono como una máquina tragamonedas.',
    activityText: 'Ve a Configuración > Accesibilidad y activa el filtro de color en Escala de Grises.'
  },
  {
    id: 'v_feynman',
    title: 'Técnica Feynman para Exámenes',
    duration: '5:20',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    points: [
      'Elige el concepto que quieres aprender.',
      'Explícalo en voz alta como si se lo enseñaras a un niño de 10 años.',
      'Identifica dónde te trabas y vuelve a los apuntes.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'La forma más rápida de dominar cualquier tema para la escuela secundaria o universidad.',
    activityText: 'Toma el tema más difícil que debes estudiar hoy y explícalo en voz alta por 5 minutos.'
  },
  {
    id: 'v_comparison',
    title: 'La trampa de la Comparación Social',
    duration: '7:15',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
    points: [
      'Las redes sociales son un carrete de momentos destacados, no la realidad.',
      'Comparar tu "detrás de escenas" con la película editada de otros genera depresión.',
      'Enfócate en tu propio progreso, la única competencia eres tú mismo de ayer.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'Cómo dejar de compararte con los influencers o tus compañeros de clase en Instagram y recuperar tu autoestima.',
    activityText: 'Silencia a 3 cuentas en Instagram que te generen inseguridad al ver sus posts.'
  },
  {
    id: 'v_active_recall',
    title: 'Repaso Activo: Estudia Menos, Aprende Más',
    duration: '8:40',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    points: [
      'Leer y subrayar es la forma menos efectiva de estudiar.',
      'El cerebro aprende cuando se esfuerza en "recordar" la información.',
      'Usa tarjetas de memoria (flashcards) o hazte preguntas sin mirar el libro.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'El secreto de los estudiantes top para no olvidar la información en pleno examen.',
    activityText: 'Crea 5 preguntas sobre lo que estudiaste hoy y respóndelas sin mirar el cuaderno.'
  },
  {
    id: 'v_morning_routine',
    title: 'Rutina Matutina sin Pantallas',
    duration: '4:50',
    category: 'Entorno Digital',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    points: [
      'Al despertar, tu cerebro está en estado Alpha, altamente programable.',
      'Si miras TikTok al despertar, configuras tu cerebro para la distracción todo el día.',
      'Pospón el uso del teléfono al menos 1 hora después de despertar.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Evita destruir tu atención desde el primer minuto del día con esta regla de oro.',
    activityText: 'Compra un despertador físico y no uses el celular como alarma mañana.'
  },
  {
    id: 'v_friction',
    title: 'Añade Fricción a tus Malos Hábitos',
    duration: '3:30',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    points: [
      'Tu cerebro siempre elegirá el camino de menor resistencia.',
      'Si TikTok está a 1 clic, lo abrirás. Si tienes que escribir una contraseña, lo dudarás.',
      'Mueve las apps adictivas fuera de la pantalla de inicio o usa bloqueadores.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'Hackea tu entorno digital para que perder el tiempo sea difícil y estudiar sea fácil.',
    activityText: 'Mueve las apps de redes sociales a una carpeta oculta en la segunda página de tu celular.'
  },
  {
    id: 'v_identity',
    title: 'Cambio de Identidad',
    duration: '5:05',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    points: [
      'No digas "Estoy intentando dejar el teléfono", di "No soy una persona adicta al teléfono".',
      'Tus hábitos son el reflejo de la identidad que asumes.',
      'Actúa como actuaría un estudiante de excelencia.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'La verdadera transformación comienza cuando cambias cómo te ves a ti mismo.',
    activityText: 'Escribe en un papel: "Soy un estudiante enfocado y dueño de mi tiempo" y pégalo en tu monitor.'
  },
  {
    id: 'v_spaced_repetition',
    title: 'Repetición Espaciada',
    duration: '6:20',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    points: [
      'La Curva del Olvido demuestra que olvidamos el 70% de lo aprendido en 24h.',
      'Repasar a intervalos (1 día, 3 días, 1 semana) detiene la curva del olvido.',
      'Usa apps como Anki para gestionar los repasos eficientemente.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'Estudiar todo el día antes del examen es ineficiente. Aprende a distribuir el esfuerzo.',
    activityText: 'Descarga Anki o crea 10 tarjetas físicas para repasar durante los próximos 3 días.'
  },
  {
    id: 'v_study_space',
    title: 'Optimiza tu Entorno de Estudio',
    duration: '4:10',
    category: 'Entorno Digital',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    points: [
      'Tu habitación está asociada al descanso, no al trabajo duro.',
      'Limpia tu escritorio; el desorden visual agota la energía mental.',
      'Ten agua y todos tus materiales listos antes de sentarte.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Si estudias en la cama, tu cerebro se confundirá. Crea un santuario de concentración.',
    activityText: 'Limpia completamente tu escritorio dejando solo el libro y el cuaderno necesarios hoy.'
  },
  {
    id: 'v_music_focus',
    title: 'Música y Enfoque',
    duration: '3:50',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    points: [
      'La música con letra distrae tu centro del lenguaje en el cerebro.',
      'Usa ruido blanco, lo-fi beats, o bandas sonoras de videojuegos.',
      'El sonido binaural (40Hz) puede ayudar a entrar en estado de flujo.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'Escuchar a tu artista favorito mientras estudias matemáticas es contraproducente. Aprende qué escuchar.',
    activityText: 'Crea una playlist de música instrumental o Lo-Fi exclusiva para estudiar.'
  },
  {
    id: 'v_time_blocking',
    title: 'Bloqueo de Tiempo',
    duration: '5:45',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    points: [
      'Las listas de tareas pendientes generan estrés porque no tienen límite de tiempo.',
      'Asigna una hora específica del día para cada tarea (Time Blocking).',
      'Respeta el horario como si fuera una cita médica.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'El método que usan los profesionales para evitar que el tiempo se les escape entre las manos.',
    activityText: 'Abre el calendario y asigna un bloque de 2 horas exactas para hacer la tarea de mañana.'
  },
  {
    id: 'v_5_seconds',
    title: 'La Regla de los 5 Segundos',
    duration: '2:50',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    points: [
      'Si tienes el impulso de hacer algo, debes actuar en 5 segundos o tu cerebro pondrá excusas.',
      'Cuenta regresiva: 5, 4, 3, 2, 1 y ¡levántate de la cama o empieza a estudiar!',
      'Rompe la parálisis por análisis.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'Un pequeño hack mental para vencer la procrastinación en el momento exacto en que aparece.',
    activityText: 'Cierra esta app, cuenta de 5 a 1, y comienza inmediatamente a estudiar.'
  },
  {
    id: 'v_group_chats',
    title: 'Manejo de Chats Grupales',
    duration: '4:00',
    category: 'Redes Sociales',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
    points: [
      'Los grupos de clase de WhatsApp son 10% información y 90% distracción.',
      'Silencia todos los grupos; la información importante sobrevivirá unas horas.',
      'Define horarios específicos para revisar mensajes sociales.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'El miedo a quedar fuera de la conversación escolar te hace revisar el teléfono 100 veces al día.',
    activityText: 'Archiva y silencia todos los chats grupales que no sean urgentes.'
  },
  {
    id: 'v_reward_system',
    title: 'Crea tu Sistema de Recompensas',
    duration: '5:15',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    points: [
      'El estudio no da gratificación instantánea como un videojuego.',
      'Combina una tarea difícil con una recompensa inmediata (Temptation Bundling).',
      'Date permiso de jugar 30 min solo si terminas la guía de estudio primero.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'Aprende a negociar contigo mismo usando recompensas para fomentar la disciplina.',
    activityText: 'Escribe tu recompensa de hoy y cúmplela solo si terminas tus pendientes.'
  },
  {
    id: 'v_hydration',
    title: 'Agua y Oxígeno para el Cerebro',
    duration: '3:10',
    category: 'Entorno Digital',
    thumbnail: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=600&auto=format&fit=crop',
    points: [
      'Una deshidratación del 2% reduce tu capacidad cognitiva dramáticamente.',
      'La postura encorvada mirando el celular restringe la oxigenación.',
      'Bebe un vaso de agua antes de empezar a estudiar.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'El cansancio mental a veces es solo tu cerebro pidiendo agua y oxígeno. Soluciones simples de biología.',
    activityText: 'Levántate ahora mismo, bebe un vaso de agua grande y respira profundo 3 veces.'
  },
  {
    id: 'v_social_validation',
    title: 'Adicción a los Likes',
    duration: '6:30',
    category: 'Redes Sociales',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    points: [
      'Las redes están diseñadas por casinos para explotar tu necesidad de validación.',
      'Tu valor como persona no depende de cuántas visualizaciones tenga tu historia.',
      'Crea valor en el mundo real, no solo un avatar digital bonito.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'Comprende la psicología detrás de por qué subes fotos y cómo liberarte de la presión de los likes.',
    activityText: 'Desactiva el contador de likes en Instagram temporalmente.'
  },
  {
    id: 'v_single_tasking',
    title: 'El Mito del Multitasking',
    duration: '4:40',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    points: [
      'El cerebro no hace varias tareas a la vez, cambia rápidamente entre ellas.',
      'Cada cambio de tarea consume energía y tiempo (Coste de Cambio).',
      'Hacer la tarea mientras miras una serie garantiza que harás ambas cosas mal.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'Deja de intentar ser productivo haciendo 3 cosas al mismo tiempo. El enfoque requiere exclusividad.',
    activityText: 'Cierra todas las pestañas de tu navegador excepto las necesarias para tu tarea actual.'
  },
  {
    id: 'v_meditation',
    title: 'Mindfulness para Adolescentes',
    duration: '7:00',
    category: 'Ansiedad',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    points: [
      'La meditación es como hacer flexiones para tu músculo de la atención.',
      '10 minutos al día pueden revertir el daño causado por los videos cortos.',
      'No se trata de "dejar la mente en blanco", sino de notar cuándo te distraes.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'Cómo entrenar la atención plena te dará una ventaja injusta en tus exámenes y control emocional.',
    activityText: 'Cierra los ojos y concéntrate en tu respiración por 2 minutos seguidos sin moverte.'
  },
  {
    id: 'v_say_no',
    title: 'El Poder de Decir NO',
    duration: '4:20',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
    points: [
      'Cada "Sí" a salir o jugar cuando deberías estudiar, es un "No" a tu futuro.',
      'Tus amigos reales entenderán que tienes metas académicas.',
      'Protege tu tiempo, es el único recurso que no puedes comprar.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Cómo manejar la presión de grupo para no salir o no jugar online cuando necesitas prepararte para la universidad.',
    activityText: 'Rechaza amablemente una invitación o plan que interfiera con tu bloque de estudio de hoy.'
  },
  {
    id: 'v_digital_minimalism',
    title: 'Minimalismo Digital',
    duration: '8:10',
    category: 'Redes Sociales',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    points: [
      'Aplica la filosofía de Cal Newport: usa la tecnología intencionalmente.',
      'Borra las aplicaciones que no aporten un valor inmenso a tu vida.',
      'Si necesitas una red social, entra desde el navegador, no uses la app móvil.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'Cómo purgar tu vida digital para tener más tiempo para hobbies reales, amigos y descanso genuino.',
    activityText: 'Desinstala 1 aplicación que sabes que te roba tiempo pero no te aporta valor.'
  },
  {
    id: 'v_perfect_plan',
    title: 'Planifica la Semana, no el Día',
    duration: '5:30',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    points: [
      'Planificar a diario te deja ciego ante exámenes importantes de la próxima semana.',
      'Dedica 15 minutos el domingo para visualizar los hitos académicos de la semana.',
      'Divide los trabajos grandes en tareas pequeñas distribuidas en varios días.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'El antídoto contra dejar los trabajos prácticos para la noche anterior a la entrega.',
    activityText: 'Toma una hoja y anota las fechas de entrega y exámenes de los próximos 7 días.'
  }
];

const MILLIONAIRE_QS = [
  { q: "¿Cuál es el gas más abundante en la atmósfera de la Tierra?", options: ["Oxígeno", "Dióxido de Carbono", "Nitrógeno", "Helio"], answer: 2 },
  { q: "¿Quién pintó la Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: 1 },
  { q: "¿En qué año llegó el hombre a la luna?", options: ["1965", "1969", "1972", "1959"], answer: 1 },
  { q: "¿Cuál es el océano más grande del mundo?", options: ["Atlántico", "Índico", "Ártico", "Pacífico"], answer: 3 },
  { q: "¿Qué planeta es conocido como el 'Planeta Rojo'?", options: ["Venus", "Marte", "Júpiter", "Saturno"], answer: 1 },
  { q: "¿Quién escribió 'Cien años de soledad'?", options: ["Mario Vargas Llosa", "Julio Cortázar", "Gabriel García Márquez", "Borges"], answer: 2 },
  { q: "¿Cuál es el hueso más largo del cuerpo humano?", options: ["Fémur", "Tibia", "Peroné", "Húmero"], answer: 0 },
  { q: "¿Qué símbolo químico representa al Oro?", options: ["Ag", "Au", "Or", "Go"], answer: 1 },
  { q: "¿Cuál es la capital de Australia?", options: ["Sídney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
  { q: "¿Quién formuló la teoría de la relatividad?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], answer: 2 },
  { q: "¿En qué continente se encuentra el Desierto del Sahara?", options: ["Asia", "América", "África", "Oceanía"], answer: 2 },
  { q: "¿Cuál es el metal más caro del mundo?", options: ["Platino", "Rodio", "Oro", "Paladio"], answer: 1 },
  { q: "¿A qué elemento corresponde el símbolo 'K'?", options: ["Kriptón", "Fósforo", "Potasio", "Calcio"], answer: 2 },
  { q: "¿Quién pintó 'La última cena'?", options: ["Miguel Ángel", "Rafael", "Leonardo da Vinci", "Donatello"], answer: 2 },
  { q: "¿Qué instrumento mide la presión atmosférica?", options: ["Termómetro", "Barómetro", "Higrómetro", "Anemómetro"], answer: 1 }
];

// --- ANIMATED MASCOTS PROGRESSION ---
const MascotBase = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center pb-[10%]">
    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-[45%] aspect-square bg-gray-200 rounded-3xl border-[4px] border-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center transform rotate-45">
      <div className="w-[40%] aspect-square bg-white rounded-full flex items-center justify-center -rotate-45 shadow-inner">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-[40%] aspect-square bg-gray-400 rounded-full" />
      </div>
    </motion.div>
  </div>
);

const MascotBot = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-end pb-[5%]">
    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="flex flex-col items-center w-full h-[85%] relative z-10">
      <div className="w-[50%] pt-[40%] bg-blue-100 rounded-t-3xl rounded-b-xl border-[5px] border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] mb-[-5%] z-20 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-[20%] bg-blue-900 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
          <motion.div animate={{ x: ['-100%', '100%', '-100%'] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-[40%] h-[40%] bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa]"></motion.div>
        </div>
      </div>
      <div className="w-[40%] h-[35%] bg-blue-200 rounded-xl border-[4px] border-blue-500 shadow-inner z-10 flex justify-center">
        <div className="w-[30%] h-full border-x-2 border-blue-400 opacity-50"></div>
      </div>
    </motion.div>
  </div>
);

const MascotFlame = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-end pb-[5%]">
    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="flex flex-col items-center w-full h-[85%] relative z-10">
      <motion.div animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[45%] pt-[55%] bg-gradient-to-t from-purple-600 to-pink-400 rounded-b-full rounded-tl-full -rotate-45 relative shadow-[0_0_30px_rgba(168,85,247,0.8)] mb-[-5%] z-20">
        <div className="absolute inset-0 flex items-center justify-center rotate-45 pb-2 gap-2">
          <div className="w-[15%] h-[20%] bg-white rounded-full shadow-[0_0_10px_white]"></div>
          <div className="w-[15%] h-[20%] bg-white rounded-full shadow-[0_0_10px_white]"></div>
        </div>
      </motion.div>
      <div className="w-[40%] h-[30%] bg-[#1a1a1a] rounded-t-xl rounded-b-md border-[3px] border-purple-500 shadow-inner z-10 flex items-center justify-center">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-[40%] h-[40%] bg-pink-500 rounded-full blur-[2px]"></motion.div>
      </div>
    </motion.div>
  </div>
);

const MascotBrain = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-end pb-[10%]">
    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="flex flex-col items-center w-full h-[80%] relative z-10">
      <motion.div animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-[60%] pt-[50%] bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full relative shadow-[0_0_50px_rgba(234,179,8,0.8)] mb-[-15%] z-20 border-[4px] border-yellow-100 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 border-r-[3px] border-yellow-200/50"></div>
        </div>
        <div className="absolute bottom-[15%] w-full flex justify-center gap-5">
          <div className="w-[15%] h-[30%] bg-black rounded-full rotate-12 flex items-center justify-center"><div className="w-[40%] h-[40%] bg-white rounded-full"></div></div>
          <div className="w-[15%] h-[30%] bg-black rounded-full -rotate-12 flex items-center justify-center"><div className="w-[40%] h-[40%] bg-white rounded-full"></div></div>
        </div>
      </motion.div>
      <div className="w-[30%] h-[35%] bg-yellow-900 rounded-[2rem] border-[3px] border-yellow-500 z-10"></div>
    </motion.div>
  </div>
);

const MascotNinja = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-end pb-[5%]">
    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="flex flex-col items-center w-full h-[85%] relative z-10">
      <div className="w-[50%] pt-[50%] bg-[#111] rounded-full border-[3px] border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] mb-[-10%] z-20 relative overflow-hidden">
        <div className="absolute top-[30%] left-0 right-0 h-[25%] bg-[#222] flex items-center justify-center gap-3 shadow-inner">
          <div className="w-[15%] h-[40%] bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
          <div className="w-[15%] h-[40%] bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
        </div>
      </div>
      <div className="w-[45%] h-[35%] bg-zinc-900 rounded-xl border-[3px] border-red-900 shadow-inner z-10 flex flex-col items-center justify-end pb-2">
        <div className="w-[60%] h-[20%] bg-zinc-800 rounded-full"></div>
      </div>
    </motion.div>
  </div>
);

const MascotHacker = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center pb-[5%]">
    <motion.div animate={{ y: [-2, 2, -2], filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="flex flex-col items-center w-full h-[75%] relative z-10">
      <div className="w-[55%] aspect-square bg-[#0a0a0a] border-[4px] border-green-400 flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.5)] z-20 relative overflow-hidden rounded-xl">
        <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute w-full h-[10%] bg-green-500/50 shadow-[0_0_10px_#4ade80]"></motion.div>
        <div className="w-[40%] aspect-square border-4 border-green-500 rounded-sm"></div>
      </div>
    </motion.div>
  </div>
);

const MascotCrono = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotate: [0, 180, 180, 360, 360] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeInOut" }} className="w-[45%] h-[65%] flex flex-col items-center justify-between">
      <div className="w-[80%] h-[48%] border-[4px] border-orange-500 rounded-t-2xl bg-[#111] relative overflow-hidden flex flex-col justify-end shadow-[0_0_20px_rgba(249,115,22,0.3)]" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 30% 100%)' }}>
        <motion.div animate={{ height: ['80%', '0%', '0%', '80%', '80%'] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1], ease: "linear" }} className="w-full bg-yellow-400 shadow-[0_0_15px_#facc15]" />
      </div>
      <div className="w-[10%] h-[4%] bg-orange-300 rounded-full" />
      <div className="w-[80%] h-[48%] border-[4px] border-orange-500 rounded-b-2xl bg-[#111] relative overflow-hidden flex flex-col justify-start shadow-[0_0_20px_rgba(249,115,22,0.3)]" style={{ clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)' }}>
        <motion.div animate={{ height: ['0%', '80%', '80%', '0%', '0%'] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1], ease: "linear" }} className="w-full bg-yellow-400 absolute bottom-0 shadow-[0_0_15px_#facc15]" />
      </div>
    </motion.div>
  </div>
);

const MascotIcaro = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-[50%] aspect-square relative flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-[-20%] bg-[radial-gradient(circle,rgba(239,68,68,0.6)_0%,transparent_70%)] rounded-full blur-md" />
      <div className="w-[60%] h-[60%] bg-gradient-to-t from-red-600 to-yellow-400 rounded-b-full rounded-tr-full -rotate-45 relative z-10 flex items-center justify-center border-2 border-orange-300 shadow-[0_0_20px_#f97316]">
        <div className="w-[30%] h-[30%] bg-white rounded-full translate-x-1 -translate-y-1 shadow-[0_0_10px_white]"></div>
      </div>
      <motion.div animate={{ rotate: [-15, 30, -15] }} transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[-30%] top-[20%] w-[60%] h-[40%] bg-gradient-to-r from-orange-600 to-yellow-400 rounded-l-full origin-right border-y-2 border-l-2 border-orange-300 z-0" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }} />
      <motion.div animate={{ rotate: [15, -30, 15] }} transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-30%] top-[20%] w-[60%] h-[40%] bg-gradient-to-l from-orange-600 to-yellow-400 rounded-r-full origin-left border-y-2 border-r-2 border-orange-300 z-0" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }} />
    </motion.div>
  </div>
);

const MascotSophia = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center pb-[5%]">
    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative w-[45%] aspect-square flex flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-dashed border-yellow-200 rounded-full opacity-60" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -inset-1 border-[3px] border-yellow-400 rounded-full opacity-90 shadow-[0_0_20px_#facc15]" />
      <div className="w-[85%] h-[85%] bg-white rounded-full shadow-[0_0_40px_white] flex items-center justify-center z-10 relative overflow-hidden border-[3px] border-blue-100">
        <div className="w-full h-[40%] bg-blue-50 absolute top-0" />
        <div className="w-[50%] h-[8%] bg-blue-200 rounded-full absolute bottom-[35%] flex justify-center gap-2">
          <div className="w-[30%] h-full bg-blue-300 rounded-full" />
          <div className="w-[30%] h-full bg-blue-300 rounded-full" />
        </div>
        <div className="absolute bottom-[15%] w-[15%] h-[15%] bg-yellow-200 rounded-full" />
      </div>
    </motion.div>
  </div>
);

const MascotAtlas = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-end pb-[5%]">
    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-[55%] flex flex-col items-center">
      <div className="w-[60%] h-[20px] bg-sky-600 rounded-t-xl border-[3px] border-sky-800 flex justify-center items-center gap-1.5 p-1 z-10 shadow-md">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-[0_0_5px_#fde047]" />
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} className="w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-[0_0_5px_#fde047]" />
      </div>
      <div className="w-full aspect-square bg-[#0f172a] rounded-3xl border-[4px] border-sky-600 shadow-[inset_0_0_20px_rgba(56,189,248,0.5)] relative flex items-center justify-center overflow-hidden -mt-1">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-1 bg-[radial-gradient(circle,rgba(253,224,71,0.5)_0%,transparent_70%)] blur-sm" />
        <div className="w-[70%] h-[50%] bg-sky-900/50 rounded-lg flex items-end justify-center gap-1 p-1 z-10 border border-sky-400/30 backdrop-blur-sm">
          <div className="w-[25%] h-[90%] bg-red-400 rounded-sm" />
          <div className="w-[20%] h-[70%] bg-green-400 rounded-sm" />
          <div className="w-[25%] h-[100%] bg-yellow-400 rounded-sm" />
          <div className="w-[15%] h-[60%] bg-purple-400 rounded-sm" />
        </div>
      </div>
    </motion.div>
  </div>
);

const MascotVento = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-[50%] aspect-square flex flex-col items-center relative">
      <div className="w-[75%] h-[60%] bg-indigo-500 rounded-t-3xl rounded-bl-3xl border-[3px] border-indigo-300 relative z-10 flex items-center justify-end px-3 shadow-[0_0_15px_rgba(99,102,241,0.6)]">
        <div className="w-4 h-4 bg-white rounded-full relative"><div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full" /></div>
      </div>
      <div className="absolute top-[35%] right-[-15%] w-[45%] h-[25%] bg-cyan-400 rounded-r-xl border-[3px] border-cyan-200 z-0 shadow-md" />
      <motion.div animate={{ rotateY: [0, 50, 0] }} transition={{ duration: 0.3, repeat: Infinity }} className="absolute top-[15%] left-[-40%] w-[70%] h-[40%] bg-yellow-300 origin-right rounded-l-full z-0 border-2 border-yellow-500" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }} />
    </motion.div>
  </div>
);

const BgPreviewDefault = () => (
  <div className="w-full h-full bg-[#050505] rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center">
    <motion.div animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-4 bg-white/20 rounded-full blur-[2px]" />
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.div key={i} animate={{ y: [-10, 110], x: [0, Math.random() * 20 - 10], opacity: [0, 0.8, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "linear", delay: i * 1.5 }} className="absolute w-0.5 h-0.5 bg-white/40 rounded-full" style={{ top: -10, left: `${20 + i * 20}%` }} />
    ))}
  </div>
);

const BgPreviewGrid = () => (
  <div className="w-full h-full bg-[#000814] bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:16px_16px] rounded-xl border border-blue-500/20 overflow-hidden relative">
    <motion.div animate={{ y: ['-10%', '110%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_#3b82f6]" />
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div key={i} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_4px_cyan]" style={{ left: `${16 + i * 16}px`, top: `${32 + (i % 2) * 16}px` }} />
    ))}
  </div>
);

const BgPreviewZen = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#02120a] to-[#000000] rounded-xl border border-emerald-500/20 overflow-hidden relative flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-20 h-20 border border-emerald-500/10 rounded-full border-dashed" />
    <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-8 h-8 rounded-full border-2 border-emerald-400/20" />
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div key={i} animate={{ y: [110, -10], x: [0, Math.sin(i) * 15], opacity: [0, 0.7, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }} className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[0.5px] shadow-[0_0_6px_#10b981]" style={{ bottom: -10, left: `${15 + i * 18}%` }} />
    ))}
  </div>
);

const BgPreviewOcean = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#000b18] to-[#000000] rounded-xl border border-cyan-500/20 overflow-hidden relative">
    {/* Floating Manta Ray / Fish Silhouette */}
    <motion.div animate={{ x: [-20, 120], y: [40, 25, 40] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute w-6 h-3 bg-cyan-400/10 rounded-full blur-[0.5px] pointer-events-none" style={{ clipPath: 'polygon(0% 50%, 40% 0%, 100% 50%, 40% 100%)' }} />
    {/* Bubbles */}
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div key={i} animate={{ y: [110, -10], x: [0, Math.cos(i) * 10], scale: [0.6, 1, 0.6] }} transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.6 }} className="absolute w-1.5 h-1.5 border border-cyan-400/60 rounded-full animate-pulse" style={{ bottom: -10, left: `${10 + i * 16}%` }} />
    ))}
  </div>
);

const BgPreviewNebula = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#120524] to-[#000000] rounded-xl border border-purple-500/30 overflow-hidden relative flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-[-40%] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_60%)]" />
    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
    {/* Tiny falling meteor */}
    <motion.div animate={{ x: [-20, 120], y: [-20, 120] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute w-4 h-0.5 bg-gradient-to-r from-purple-400 to-transparent blur-[0.5px] transform rotate-45" />
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2 + i * 0.5, repeat: Infinity }} className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ left: `${20 + i * 20}%`, top: `${15 + (i % 2) * 30}%` }} />
    ))}
  </div>
);

const BgPreviewInferno = () => (
  <div className="w-full h-full bg-gradient-to-t from-[#2a0000] to-[#000000] rounded-xl border border-red-500/30 overflow-hidden relative">
    <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute bottom-0 w-full h-[50%] bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.3)_0%,transparent_70%)]" />
    {/* Upward rising sparks */}
    {Array.from({ length: 7 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      return (
        <motion.div key={i} animate={{ y: [110, -10], x: [0, (Math.random() * 20 - 10)], opacity: [0, 1, 0] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeIn", delay: i * 0.4 }} className="absolute rounded-full bg-orange-400 blur-[0.5px] shadow-[0_0_4px_#f97316]" style={{ width: size, height: size, bottom: -10, left: `${8 + i * 14}%` }} />
      );
    })}
  </div>
);

const BgPreviewLight = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] rounded-xl border border-slate-300 overflow-hidden relative">
    <motion.div animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8)_0%,transparent_60%)] pointer-events-none" />
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div key={i} animate={{ y: [110, -10], x: [0, Math.sin(i) * 10], opacity: [0, 0.5, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(0,0,0,0.1)]" style={{ bottom: -10, left: `${15 + i * 20}%` }} />
    ))}
  </div>
);

const MascotOrb = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-[60%] aspect-square rounded-full bg-gradient-to-tr from-blue-600 via-cyan-300 to-white flex items-center justify-center shadow-[0_0_30px_#67e8f9]">
      <motion.div animate={{ scale: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-[40%] aspect-square bg-white rounded-full blur-[2px]" />
    </motion.div>
  </div>
);

const MascotPrism = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotateY: 360, y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-[50%] aspect-square relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute w-full h-full bg-emerald-500/80 border-[3px] border-emerald-200" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      <div className="absolute w-full h-full bg-emerald-700/80 border-[3px] border-emerald-200 origin-bottom" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotateX(-60deg)' }} />
      <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -bottom-4 w-[80%] h-2 bg-emerald-400 blur-md rounded-full" />
    </motion.div>
  </div>
);

const MascotEye = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-[70%] h-[40%] bg-purple-900 border-4 border-purple-400 rounded-[100%] flex items-center justify-center shadow-[0_0_25px_#c084fc] relative overflow-hidden">
      <motion.div animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }} className="w-[40%] aspect-square bg-white rounded-full flex items-center justify-center">
        <motion.div animate={{ scale: [1, 0.5, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-[50%] aspect-square bg-purple-600 rounded-full flex items-center justify-center">
          <div className="w-[30%] aspect-square bg-black rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
);

const MascotCrown = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-4, 4, -4], rotateZ: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-[60%] h-[40%] relative flex items-end">
      <div className="w-[33%] h-full bg-gradient-to-t from-yellow-600 to-yellow-300 border-2 border-yellow-200 rounded-t-xl z-10" />
      <div className="w-[34%] h-[130%] bg-gradient-to-t from-yellow-600 to-yellow-200 border-2 border-yellow-100 rounded-t-xl z-20 -mx-1" />
      <div className="w-[33%] h-full bg-gradient-to-t from-yellow-600 to-yellow-300 border-2 border-yellow-200 rounded-t-xl z-10" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white] z-30" />
    </motion.div>
  </div>
);

const MascotVoid = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="w-[60%] aspect-square rounded-full border-4 border-dashed border-gray-500 flex items-center justify-center p-2 relative">
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full bg-black border-2 border-purple-500/50 shadow-[0_0_30px_#a855f7] flex items-center justify-center overflow-hidden">
        <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(168,85,247,0.5)_100%)] rounded-full blur-[2px]" />
      </motion.div>
    </motion.div>
  </div>
);

const MascotLotus = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-[50%] aspect-square relative flex items-center justify-center">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="absolute w-[40%] h-[120%] bg-pink-500/50 border border-pink-300 rounded-full mix-blend-screen shadow-[0_0_10px_#ec4899]" style={{ transform: `rotate(${deg}deg)` }} />
      ))}
      <div className="w-[30%] aspect-square bg-white rounded-full z-10 shadow-[0_0_15px_white]" />
    </motion.div>
  </div>
);

const MascotHelix = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-[40%] h-[70%] flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
      {[0, 1, 2, 3].map((idx) => (
        <div key={idx} className="w-full flex justify-between relative h-[20%] items-center">
          <div className="w-[20%] aspect-square rounded-full bg-cyan-400 z-10 shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute w-full h-[3px] bg-white/30 z-0" />
          <div className="w-[20%] aspect-square rounded-full bg-fuchsia-400 z-10 shadow-[0_0_10px_#e879f9]" />
        </div>
      ))}
    </motion.div>
  </div>
);

const MascotShield = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-[60%] h-[70%] bg-blue-600/80 border-4 border-blue-300 shadow-[0_0_30px_#60a5fa] relative flex justify-center pt-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[60%] h-[80%] border-2 border-white/50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }} />
    </motion.div>
  </div>
);

const MascotSword = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-[20%] h-[80%] flex flex-col items-center">
      <motion.div animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }} transition={{ duration: 1, repeat: Infinity }} className="w-full flex-1 bg-gradient-to-t from-cyan-400 to-white shadow-[0_0_20px_#22d3ee] rounded-t-full" style={{ clipPath: 'polygon(50% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)' }} />
      <div className="w-[200%] h-[10%] bg-gray-300 rounded-sm border-y-2 border-gray-500" />
      <div className="w-[80%] h-[20%] bg-gray-800 rounded-b-md border-x-2 border-b-2 border-gray-600 flex justify-center items-end pb-1">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </motion.div>
  </div>
);

const MascotGhost = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-5, 5, -5], scaleY: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-[50%] h-[60%] bg-white/80 rounded-t-full relative shadow-[0_0_30px_white] backdrop-blur-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 75% 100%, 50% 80%, 25% 100%, 0 80%)' }}>
      <div className="flex justify-center gap-2 mt-[40%]">
        <div className="w-3 h-4 bg-black rounded-full" />
        <div className="w-3 h-4 bg-black rounded-full" />
      </div>
    </motion.div>
  </div>
);

const MascotPyramid = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotateY: 360, y: [-4, 4, -4] }} transition={{ rotateY: { duration: 5, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }} className="w-[50%] aspect-square relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute w-full h-full bg-cyan-500/20 border-2 border-cyan-400" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-4 w-[70%] h-2 bg-cyan-400 blur-md rounded-full" />
    </motion.div>
  </div>
);

const MascotRing = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <div className="relative w-[60%] aspect-square flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-dashed border-sky-400 shadow-[0_0_15px_#38bdf8]" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-2 border-sky-200 shadow-[0_0_10px_#bae6fd]" />
      <motion.div animate={{ scale: [0.8, 1.1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
    </div>
  </div>
);

const MascotDagger = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-5, 5, -5], rotate: [45, 50, 45] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-[15%] h-[70%] flex flex-col items-center relative">
      <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-full flex-1 bg-gradient-to-t from-purple-500 to-indigo-300 shadow-[0_0_20px_#a855f7] rounded-t-full" />
      <div className="w-[250%] h-[8%] bg-indigo-900 border border-indigo-400 rounded-sm" />
      <div className="w-3 h-12 bg-indigo-950 border border-indigo-800 rounded-b-md" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-purple-500/20 blur-md rounded-full pointer-events-none" />
    </motion.div>
  </div>
);

const MascotCube = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotateX: 360, rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-[45%] aspect-square relative flex items-center justify-center border-4 border-emerald-400 shadow-[0_0_25px_#34d399] rounded-lg" style={{ transformStyle: 'preserve-3d' }}>
      <motion.div animate={{ scale: [0.6, 0.9, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="w-[60%] aspect-square border-2 border-dashed border-emerald-200 rounded" />
    </motion.div>
  </div>
);

const MascotAtom = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <div className="relative w-[60%] aspect-square flex items-center justify-center">
      <motion.div animate={{ scale: [0.9, 1.1, 0.9], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-6 bg-pink-500 rounded-full shadow-[0_0_20px_#ec4899] z-10" />
      <motion.div animate={{ rotateX: 70, rotateY: 30, rotateZ: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full border-2 border-pink-400/50 rounded-full" />
      <motion.div animate={{ rotateX: 30, rotateY: 70, rotateZ: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full border-2 border-pink-400/50 rounded-full" />
    </div>
  </div>
);

const MascotComet = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <motion.div animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative flex items-center justify-center w-16 h-16">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-6 h-6 bg-yellow-300 rounded-full shadow-[0_0_20px_#fde047] z-10" />
      <div className="absolute right-[-20px] w-20 h-4 bg-gradient-to-l from-transparent via-yellow-500/40 to-yellow-300/80 rounded-full blur-[2px] transform rotate-45" />
    </motion.div>
  </div>
);

const MascotMirror = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-[50%] h-[70%] border-4 border-[#8ab4f8] rounded-[100px] bg-black/60 shadow-[0_0_25px_rgba(138,180,248,0.5)] overflow-hidden relative p-1">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-[conic-gradient(from_0deg,#3b82f6,#a855f7,#3b82f6)] opacity-40 blur-sm" />
      <div className="absolute inset-2 bg-black/80 rounded-[100px] z-10" />
    </motion.div>
  </div>
);

const MascotHourglass = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ rotate: [0, 180, 180, 360, 360], y: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }} className="w-[35%] h-[60%] flex flex-col justify-between items-center relative">
      <div className="w-full h-[45%] border-x-4 border-t-4 border-amber-500 rounded-t-xl bg-black/50 overflow-hidden relative">
        <motion.div animate={{ height: ['90%', '0%', '0%', '90%', '90%'] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1], ease: "linear" }} className="w-full bg-amber-400/80 absolute bottom-0" />
      </div>
      <div className="w-2 h-2 bg-amber-500 rounded-full z-10" />
      <div className="w-full h-[45%] border-x-4 border-b-4 border-amber-500 rounded-b-xl bg-black/50 overflow-hidden relative">
        <motion.div animate={{ height: ['0%', '90%', '90%', '0%', '0%'] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1], ease: "linear" }} className="w-full bg-amber-400/80 absolute top-0" />
      </div>
    </motion.div>
  </div>
);

const MascotPhoenix = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="w-[60%] aspect-square relative flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-[-10%] bg-[radial-gradient(circle,rgba(239,68,68,0.4)_0%,transparent_70%)] rounded-full blur-md" />
      <div className="w-[50%] h-[50%] bg-gradient-to-tr from-red-500 via-orange-500 to-yellow-400 rounded-full border-2 border-red-300 relative z-10 flex items-center justify-center shadow-[0_0_20px_#ef4444]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-2 border-2 border-dashed border-white/40 rounded-full" />
      </div>
      <motion.div animate={{ rotate: [-20, 20, -20] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[-20%] w-[50%] h-[30%] bg-gradient-to-r from-red-600 to-orange-400 rounded-l-full origin-right border-l-2 border-orange-300" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }} />
      <motion.div animate={{ rotate: [20, -20, 20] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-20%] w-[50%] h-[30%] bg-gradient-to-l from-red-600 to-orange-400 rounded-r-full origin-left border-r-2 border-orange-300" style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)' }} />
    </motion.div>
  </div>
);

const MascotPegasus = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <motion.div animate={{ y: [-4, 4, -4], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-[60%] aspect-square relative flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-full" />
      <div className="relative w-[70%] h-[70%] bg-black/60 border-[3px] border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)] overflow-hidden">
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]" />
        <div className="absolute top-[40%] left-[60%] w-2 h-2 bg-cyan-200 rounded-full shadow-[0_0_8px_cyan]" />
        <div className="absolute top-[65%] left-[25%] w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-[70%] left-[55%] w-1.5 h-1.5 bg-white rounded-full" />
        <div className="absolute top-[30%] left-[45%] w-1 h-1 bg-white rounded-full" />
        <svg className="absolute inset-0 w-full h-full opacity-40 stroke-cyan-400 stroke-1" fill="none">
          <line x1="30%" y1="20%" x2="45%" y2="30%" />
          <line x1="45%" y1="30%" x2="60%" y2="40%" />
          <line x1="60%" y1="40%" x2="55%" y2="70%" />
          <line x1="55%" y1="70%" x2="25%" y2="65%" />
          <line x1="25%" y1="65%" x2="30%" y2="20%" />
        </svg>
      </div>
    </motion.div>
  </div>
);

const ANIMATED_AVATARS = {
  'a_base': MascotBase,
  'a_bot': MascotBot,
  'a_flame': MascotFlame,
  'a_brain': MascotBrain,
  'a_ninja': MascotNinja,
  'a_hacker': MascotHacker,
  'a_crono': MascotCrono,
  'a_icaro': MascotIcaro,
  'a_sophia': MascotSophia,
  'a_atlas': MascotAtlas,
  'a_vento': MascotVento,
  
  'a_orb': MascotOrb,
  'a_prism': MascotPrism,
  'a_eye': MascotEye,
  'a_crown': MascotCrown,
  'a_void': MascotVoid,
  'a_lotus': MascotLotus,
  'a_helix': MascotHelix,
  'a_shield': MascotShield,
  'a_sword': MascotSword,
  'a_ghost': MascotGhost,

  'a_pyramid': MascotPyramid,
  'a_ring': MascotRing,
  'a_dagger': MascotDagger,
  'a_cube': MascotCube,
  'a_atom': MascotAtom,
  'a_comet': MascotComet,
  'a_mirror': MascotMirror,
  'a_hourglass': MascotHourglass,
  'a_phoenix': MascotPhoenix,
  'a_pegasus': MascotPegasus,

  'bg_default': BgPreviewDefault,
  'bg_grid': BgPreviewGrid,
  'bg_zen': BgPreviewZen,
  'bg_ocean': BgPreviewOcean,
  'bg_nebula': BgPreviewNebula,
  'bg_inferno': BgPreviewInferno,
  'bg_light': BgPreviewLight,
};

const AvatarDisplay = ({ id, src, className, freeStanding = false, isLocked = false, skinFilters = null }) => {
  const Anim = ANIMATED_AVATARS[id];
  const itemData = SHOP_ITEMS.find(i => i.id === id);
  const rarity = itemData ? itemData.rarity : 'common';
  const rColor = RARITIES[rarity]?.hex || '#ffffff';
  
  const filterStyle = skinFilters ? `hue-rotate(${skinFilters.hue || 0}deg) brightness(${skinFilters.brightness || 1}) saturate(${skinFilters.saturate !== undefined ? skinFilters.saturate : 1})` : 'none';
  const content = Anim ? (
    <div className={`relative transition-all duration-500 ${freeStanding ? className.replace(/bg-[\w-]+\/?\d*/g, '').replace(/border(?:-[\w-]+)?/g, '').replace(/rounded-[\w-]+/g, '').replace('overflow-hidden', '') : className}`} style={{ filter: filterStyle }}>
      <Anim />
    </div>
  ) : (
    <img src={src} className={`object-cover transition-all duration-500 ${className}`} alt="avatar" style={{ filter: filterStyle }} />
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLocked && rarity !== 'common' && (
        <motion.div animate={ rarity === 'mythic' ? { scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360], opacity: [0.3, 0.6, 0.3] } : rarity === 'legendary' ? { scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] } : rarity === 'epic' ? { scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] } : { opacity: [0.1, 0.2, 0.1] } } transition={{ duration: rarity === 'mythic' ? 4 : 3, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20%] rounded-full blur-[15px] pointer-events-none z-0" style={{ backgroundColor: rColor }} />
      )}
      {!isLocked && (rarity === 'mythic' || rarity === 'legendary') && (
        <motion.div animate={{ scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-[10%] rounded-full border-2 pointer-events-none z-10 mix-blend-overlay" style={{ borderColor: rColor }} />
      )}
      <div className={`relative w-full h-full flex items-center justify-center transition-all z-20 ${isLocked ? 'brightness-0 opacity-40 grayscale pointer-events-none' : ''}`}>
        {content}
      </div>
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <Lock size={24} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
        </div>
      )}
    </div>
  );
};

const SHOP_ITEMS = [
  // Avatares Base (16)
  { id: 'a_base', category: 'avatar', name: 'NÚCLEO BASE', price: 0, rarity: 'common', img: 'animated', desc: 'Tu primer paso en el vacío. Sencillo, estable.' },
  { id: 'a_orb', category: 'avatar', name: 'ORBE PRIMORDIAL', price: 100, rarity: 'common', img: 'animated', desc: 'Energía en estado puro, lista para ser moldeada.' },
  { id: 'a_bot', category: 'avatar', name: 'UNIDAD OMEGA', price: 200, rarity: 'rare', img: 'animated', desc: 'Precisión robótica. Cero distracciones.' },
  { id: 'a_ghost', category: 'avatar', name: 'ESPECTRO', price: 250, rarity: 'rare', img: 'animated', desc: 'Atraviesa los muros de la procrastinación.' },
  { id: 'a_prism', category: 'avatar', name: 'PRISMA DE ENFOQUE', price: 300, rarity: 'rare', img: 'animated', desc: 'Divide tus tareas y conquista la luz.' },
  { id: 'a_ninja', category: 'avatar', name: 'SOMBRA', price: 400, rarity: 'rare', img: 'animated', desc: 'Silencioso y letal contra las notificaciones e impulsos.' },
  { id: 'a_shield', category: 'avatar', name: 'ÉGIDA', price: 500, rarity: 'epic', img: 'animated', desc: 'Tu barrera inquebrantable ante el caos exterior.' },
  { id: 'a_flame', category: 'avatar', name: 'FUEGO INTERNO', price: 600, rarity: 'epic', img: 'animated', desc: 'La llama de la voluntad. Quema la procrastinación.' },
  { id: 'a_sword', category: 'avatar', name: 'ESPADA LUMINOSA', price: 700, rarity: 'epic', img: 'animated', desc: 'Corta las distracciones de un solo tajo.' },
  { id: 'a_hacker', category: 'avatar', name: 'GLITCH', price: 800, rarity: 'epic', img: 'animated', desc: 'Hackea tus propios hábitos. Reescribe el código de tu mente.' },
  { id: 'a_lotus', category: 'avatar', name: 'LOTO SAGRADO', price: 900, rarity: 'legendary', img: 'animated', desc: 'Florece incluso en las aguas más turbias.' },
  { id: 'a_helix', category: 'avatar', name: 'HÉLICE GENÉTICA', price: 1000, rarity: 'legendary', img: 'animated', desc: 'La disciplina codificada en tu propio ADN.' },
  { id: 'a_brain', category: 'avatar', name: 'MENTE CÓSMICA', price: 1200, rarity: 'legendary', img: 'animated', desc: 'Consciencia expandida. Tu mente domina el espacio y tiempo.' },
  { id: 'a_eye', category: 'avatar', name: 'OJO PANÓPTICO', price: 1500, rarity: 'mythic', img: 'animated', desc: 'Lo observa todo, no pierde detalle. Visión absoluta.' },
  { id: 'a_void', category: 'avatar', name: 'AGUJERO NEGRO', price: 1800, rarity: 'mythic', img: 'animated', desc: 'Absorbe todo el ruido del universo. Deja solo el vacío perfecto.' },
  { id: 'a_crown', category: 'avatar', name: 'CORONA REAL', price: 2500, rarity: 'mythic', img: 'animated', desc: 'El rey de reyes del enfoque. No aceptas menos.' },

  { id: 'a_pyramid', category: 'avatar', name: 'PIRÁMIDE ASTRAL', price: 350, rarity: 'rare', img: 'animated', desc: 'Una pirámide flotante que concentra la energía del cosmos en tu mente.' },
  { id: 'a_ring', category: 'avatar', name: 'ANILLOS ORBITALES', price: 150, rarity: 'common', img: 'animated', desc: 'Dos anillos de pura energía que orbitan alrededor de tu enfoque.' },
  { id: 'a_dagger', category: 'avatar', name: 'DAGA DE SOMBRAS', price: 450, rarity: 'rare', img: 'animated', desc: 'Una hoja forjada en el vacío para cortar cualquier distracción.' },
  { id: 'a_cube', category: 'avatar', name: 'HIPERCUBO', price: 550, rarity: 'epic', img: 'animated', desc: 'Un tesseract que pliega las dimensiones para acortar tus tareas.' },
  { id: 'a_atom', category: 'avatar', name: 'NÚCLEO ATÓMICO', price: 650, rarity: 'epic', img: 'animated', desc: 'Electrones en perfecta órbita alrededor de tu núcleo de disciplina.' },
  { id: 'a_comet', category: 'avatar', name: 'COMETA STELLAR', price: 750, rarity: 'epic', img: 'animated', desc: 'Viaja a la velocidad de la luz hacia tus objetivos dejando una estela dorada.' },
  { id: 'a_mirror', category: 'avatar', name: 'PORTAL DEL VACÍO', price: 850, rarity: 'epic', img: 'animated', desc: 'Un espejo místico que absorbe la procrastinación hacia otra dimensión.' },
  { id: 'a_hourglass', category: 'avatar', name: 'ARENA INFINITA', price: 1100, rarity: 'legendary', img: 'animated', desc: 'Un reloj de arena que desafía el tiempo, permitiéndote dominar cada segundo.' },
  { id: 'a_phoenix', category: 'avatar', name: 'FÉNIX NEON', price: 1300, rarity: 'legendary', img: 'animated', desc: 'Renace de las cenizas del cansancio con energía renovada e inquebrantable.' },
  { id: 'a_pegasus', category: 'avatar', name: 'CONSTELACIÓN PEGASO', price: 2200, rarity: 'mythic', img: 'animated', desc: 'La mítica constelación de Pegaso que guía tu mente por encima de lo terrenal.' },

  // Avatares Mentores IA (5)
  { id: 'a_vento', category: 'avatar', name: 'VENTO', price: 800, rarity: 'rare', img: 'animated', desc: 'Dragón de Papel. Fluye con gracia sobre la procrastinación.' },
  { id: 'a_crono', category: 'avatar', name: 'CRONO', price: 1000, rarity: 'epic', img: 'animated', desc: 'Vigilante de Arena. Domina el flujo del tiempo y tu enfoque absoluto.' },
  { id: 'a_sophia', category: 'avatar', name: 'SOPHIA', price: 1200, rarity: 'epic', img: 'animated', desc: 'Diosa del Silencio. Su presencia invoca una paz incorruptible.' },
  { id: 'a_icaro', category: 'avatar', name: 'ÍCARO', price: 1500, rarity: 'legendary', img: 'animated', desc: 'Fénix de la Atención. Renace más fuerte tras cada distracción.' },
  { id: 'a_atlas', category: 'avatar', name: 'ATLAS', price: 2000, rarity: 'mythic', img: 'animated', desc: 'Guardián del Saber. Soporta el inmenso peso de la disciplina total.' },

  // Fondos
  ...Object.values(BACKGROUNDS).filter(bg => bg.id !== 'bg_light').map(bg => ({
    id: bg.id, category: 'background', name: bg.name, price: bg.price, rarity: bg.rarity, img: bg.img, desc: bg.desc
  }))
];

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

// --- ANIMACIONES DE TEMAS GLOBALES ---
const GlobalThemeEffects = ({ themeId }) => {
  if (themeId === 'bg_light') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
        <motion.div 
          animate={{ y: [-20, 20, -20], opacity: [0.4, 0.7, 0.4] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[-20%] right-[-10%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9)_0%,transparent_70%)]" 
        />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={`light-${i}`} 
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }} 
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.6, 0]
            }} 
            transition={{ 
              duration: Math.random() * 6 + 5, 
              repeat: Infinity, 
              ease: 'linear', 
              delay: Math.random() * 5 
            }} 
            className="absolute w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white]" 
          />
        ))}
      </div>
    );
  }

  if (themeId === 'bg_inferno') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-t from-[#100000] via-[#200000] to-[#000000]">
        {/* Heat shimmer distortion backdrop */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.25)_0%,transparent_60%)]" 
        />
        
        {/* High-fidelity Vector SVG Waving Flames at the base */}
        <div className="absolute bottom-[-10px] left-[-10px] right-[-10px] h-[25vh] z-10 opacity-70">
          <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full">
            {/* Dark flame backing */}
            <motion.path 
              d="M0,80 Q20,30 40,80 T80,80 T120,80 T160,80 T200,80 T240,80 T280,80 T320,80 T360,80 T400,80 L400,100 L0,100 Z" 
              fill="rgba(185, 28, 28, 0.3)" 
              animate={{ 
                d: [
                  "M0,80 Q20,35 40,75 T80,85 T120,70 T160,82 T200,75 T240,85 T280,72 T320,80 T360,75 T400,80 L400,100 L0,100 Z",
                  "M0,85 Q20,25 40,85 T80,75 T120,80 T160,72 T200,85 T240,70 T280,82 T320,75 T360,85 T400,85 L400,100 L0,100 Z",
                  "M0,80 Q20,35 40,75 T80,85 T120,70 T160,82 T200,75 T240,85 T280,72 T320,80 T360,75 T400,80 L400,100 L0,100 Z"
                ] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Midground orange flame */}
            <motion.path 
              d="M0,90 Q30,50 60,90 T120,90 T180,90 T240,90 T300,90 T360,90 T400,90 L400,100 L0,100 Z" 
              fill="rgba(249, 115, 22, 0.4)" 
              animate={{ 
                d: [
                  "M0,90 Q30,45 60,85 T120,92 T180,80 T240,95 T300,85 T360,92 T400,90 L400,100 L0,100 Z",
                  "M0,92 Q30,55 60,95 T120,80 T180,92 T240,85 T300,95 T360,82 T400,92 L400,100 L0,100 Z",
                  "M0,90 Q30,45 60,85 T120,92 T180,80 T240,95 T300,85 T360,92 T400,90 L400,100 L0,100 Z"
                ] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Foreground bright yellow/orange flame */}
            <motion.path 
              d="M0,95 Q40,70 80,95 T160,95 T240,95 T320,95 T400,95 L400,100 L0,100 Z" 
              fill="rgba(234, 179, 8, 0.5)" 
              animate={{ 
                d: [
                  "M0,95 Q40,65 80,92 T160,97 T240,90 T320,96 T400,93 L400,100 L0,100 Z",
                  "M0,96 Q40,75 80,98 T160,90 T240,97 T320,90 T400,97 L400,100 L0,100 Z",
                  "M0,95 Q40,65 80,92 T160,97 T240,90 T320,96 T400,93 L400,100 L0,100 Z"
                ] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </div>

        {/* Rising spark fire embers */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 5 + 2;
          return (
            <motion.div 
              key={`fire-${i}`} 
              initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }} 
              animate={{ 
                y: '-10vh', 
                x: `${Math.random() * 100 + (Math.random() * 20 - 10)}vw`, 
                opacity: [0, 0.9, 0],
                scale: [0.8, 1.2, 0.5]
              }} 
              transition={{ 
                duration: Math.random() * 4 + 3, 
                repeat: Infinity, 
                ease: 'easeIn', 
                delay: Math.random() * 4 
              }} 
              className="absolute rounded-full bg-gradient-to-t from-red-500 to-yellow-400 blur-[0.5px] shadow-[0_0_12px_rgba(249,115,22,0.8)] z-20" 
              style={{ width: size, height: size, bottom: 0 }} 
            />
          );
        })}
      </div>
    );
  }

  if (themeId === 'bg_ocean') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#000d22] via-[#000511] to-[#000000]">
        {/* Dynamic Water Caustic Shimmer Sun rays from top */}
        <motion.div 
          animate={{ rotate: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[-20%] w-[140%] h-[60vh] bg-gradient-to-b from-cyan-500/10 via-cyan-400/5 to-transparent blur-[60px] transform -skew-x-12" 
        />
        <motion.div 
          animate={{ rotate: [2, -2, 2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-0 left-[20%] w-[50%] h-[70vh] bg-gradient-to-b from-blue-400/10 to-transparent blur-[50px] transform rotate-12" 
        />

        {/* Fauna Marina 1: Slow Majestic Giant Manta Ray Silhouette */}
        <motion.div 
          initial={{ x: '-40vw', y: '30vh', opacity: 0 }}
          animate={{ 
            x: '140vw', 
            y: ['25vh', '35vh', '25vh'],
            opacity: [0, 0.25, 0.25, 0] 
          }}
          transition={{ 
            duration: 32, 
            repeat: Infinity, 
            ease: "linear",
            delay: 2 
          }}
          className="absolute w-24 h-12 bg-cyan-400/10 blur-[1px] z-10 flex items-center justify-center"
          style={{ clipPath: 'polygon(0% 50%, 35% 0%, 50% 10%, 100% 50%, 50% 90%, 35% 100%)' }}
        >
          {/* wing flap animation */}
          <motion.div 
            animate={{ scaleY: [1, 0.5, 1] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            className="w-full h-full bg-cyan-400/10 rounded-full" 
          />
        </motion.div>

        {/* Fauna Marina 2: Speedy deep-water fish group (2 fishes) */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div 
            key={`fish-${i}`}
            initial={{ x: '120vw', y: `${45 + i * 12}vh`, opacity: 0 }}
            animate={{ 
              x: '-40vw', 
              y: [`${45 + i * 12}vh`, `${42 + i * 12}vh`, `${45 + i * 12}vh`],
              opacity: [0, 0.15, 0.15, 0] 
            }}
            transition={{ 
              duration: 15 + i * 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4 
            }}
            className="absolute w-6 h-3 bg-cyan-300/10 blur-[0.5px] z-5 pointer-events-none"
            style={{ clipPath: 'polygon(0% 50%, 60% 0%, 100% 50%, 60% 100%)' }}
          />
        ))}

        {/* Dynamic wobbling bubbles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 18 + 5;
          return (
            <motion.div 
              key={`bubble-${i}`} 
              initial={{ y: '110vh', x: 0, opacity: 0 }} 
              animate={{ 
                y: '-10vh', 
                x: [0, Math.random() * 40 - 20, 0], 
                opacity: [0, 0.55, 0],
                scale: [0.8, 1.1, 0.8]
              }} 
              transition={{ 
                duration: Math.random() * 9 + 7, 
                repeat: Infinity, 
                ease: 'linear', 
                delay: Math.random() * 6 
              }} 
              className="absolute rounded-full border border-cyan-300/40 bg-cyan-200/5 backdrop-blur-[0.5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] z-10" 
              style={{ width: size, height: size, left: `${Math.random() * 100}%` }} 
            />
          );
        })}
      </div>
    );
  }

  if (themeId === 'bg_zen') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#010e07] via-[#000603] to-[#000000]">
        <motion.div animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-emerald-950/20" />
        
        {/* Calm Water Drop Zen Ripples (4 points) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`ripple-container-${i}`} className="absolute" style={{ left: `${15 + i * 23}%`, top: `${25 + (i % 2) * 35}%` }}>
            <motion.div 
              animate={{ 
                scale: [0, 5], 
                opacity: [0, 0.35, 0] 
              }} 
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeOut", 
                delay: i * 2.2 
              }} 
              className="w-10 h-10 border border-emerald-400/30 rounded-full flex items-center justify-center"
            >
              <div className="w-[60%] h-[60%] border border-emerald-500/20 rounded-full" />
            </motion.div>
          </div>
        ))}

        {/* 3D Falling forest leaves */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div 
            key={`leaf-${i}`} 
            initial={{ y: '-10vh', x: `${Math.random() * 100}vw`, rotateY: 0, rotate: 0, opacity: 0 }} 
            animate={{ 
              y: '110vh', 
              x: `${Math.random() * 100 + 30}vw`, 
              rotateY: 720, 
              rotate: 360, 
              opacity: [0, 0.65, 0] 
            }} 
            transition={{ 
              duration: Math.random() * 12 + 10, 
              repeat: Infinity, 
              ease: 'linear', 
              delay: Math.random() * 8 
            }} 
            className="absolute w-4 h-2 bg-emerald-500/20 rounded-full blur-[0.5px] border border-emerald-400/20 z-10" 
            style={{ borderTopRightRadius: '12px', borderBottomLeftRadius: '12px' }} 
          />
        ))}

        {/* Glowing Fireflies */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div 
            key={`fly-${i}`} 
            animate={{ 
              y: ['0vh', '-15vh', '10vh', '0vh'], 
              x: ['0vw', '8vw', '-6vw', '0vw'], 
              opacity: [0, 0.9, 0],
              scale: [0.7, 1.2, 0.7] 
            }} 
            transition={{ 
              duration: Math.random() * 9 + 8, 
              repeat: Infinity, 
              ease: 'easeInOut', 
              delay: Math.random() * 6 
            }} 
            className="absolute w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#34d399] z-20" 
            style={{ bottom: `${15 + Math.random() * 50}%`, left: `${Math.random() * 100}%` }} 
          />
        ))}
      </div>
    );
  }

  if (themeId === 'bg_nebula') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020006]">
        {/* Sharp shining background stars */}
        {Array.from({ length: 45 }).map((_, i) => (
          <motion.div 
            key={`star-d-${i}`} 
            animate={{ opacity: [0.15, 0.9, 0.15] }} 
            transition={{ 
              duration: Math.random() * 4 + 2, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: Math.random() * 3
            }} 
            className="absolute rounded-full bg-white shadow-[0_0_4px_white]" 
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '1.5px', height: '1.5px' }} 
          />
        ))}

        {/* Space Constellation vector mapping */}
        <svg className="absolute inset-0 w-full h-full opacity-10 z-5">
          <motion.path 
            d="M 50,150 L 120,80 L 220,130 L 300,60" 
            stroke="cyan" strokeWidth="0.5" fill="none"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 80,400 L 150,480 L 280,420 L 320,530" 
            stroke="purple" strokeWidth="0.5" fill="none"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>

        {/* Zooming Shooting stars / comets */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div 
            key={`shooting-${i}`}
            initial={{ x: '-150px', y: `${10 + i * 20}vh`, opacity: 0 }}
            animate={{ 
              x: '110vw', 
              y: `${25 + i * 20}vh`,
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ 
              duration: 2.2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 6 + 1 
            }}
            className="absolute w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent blur-[0.5px] transform rotate-[15deg] z-10" 
          />
        ))}

        {/* Dual Rotating massive cosmic cloud formations */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }} 
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} 
          className="absolute -top-[40%] -left-[40%] w-[180%] h-[180%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18)_0%,transparent_60%)] mix-blend-screen z-1" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }} 
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} 
          className="absolute -bottom-[40%] -right-[40%] w-[180%] h-[180%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,transparent_60%)] mix-blend-screen z-1" 
        />
      </div>
    );
  }

  if (themeId === 'bg_grid') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000308] perspective-[400px]">
        {/* Horizon glowing base */}
        <div className="absolute top-[35%] left-0 right-0 h-[25vh] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-[40px] z-5" />
        
        {/* Futuristic Laser Scanner Bar */}
        <motion.div 
          animate={{ y: ['-10%', '110%'] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }} 
          className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/60 shadow-[0_0_15px_#22d3ee] z-20" 
        />

        {/* 3D Flying Grid perspective floor */}
        <motion.div 
          animate={{ backgroundPositionY: ['0px', '40px'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[55vh] z-10 opacity-30 origin-top bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"
          style={{ transform: 'rotateX(75deg)' }}
        />

        {/* Falling cyber data binary code packets */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div 
            key={`stream-${i}`} 
            initial={{ y: '-20vh', opacity: 0 }} 
            animate={{ 
              y: '120vh', 
              opacity: [0, 0.75, 0],
              scaleY: [1, 1.5, 1] 
            }} 
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              ease: 'linear', 
              delay: Math.random() * 4 
            }} 
            className="absolute w-[1px] h-28 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] z-10" 
            style={{ left: `${(i + 1) * 5.3}%` }} 
          />
        ))}
      </div>
    );
  }

  // default / el vacio
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Slow-breathing Void orb in the center */}
      <motion.div 
        animate={{ 
          scale: [0.92, 1.08, 0.92], 
          opacity: [0.12, 0.22, 0.12] 
        }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] z-1" 
      />
      {/* Slow falling calm particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div 
          key={`calm-${i}`}
          animate={{ 
            y: ['-5vh', '105vh'],
            x: [`${10 + i * 8}vw`, `${13 + i * 8}vw`],
            opacity: [0, 0.4, 0] 
          }}
          transition={{ 
            duration: 18 + i * 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 2.5 
          }}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full z-10"
        />
      ))}
    </div>
  );
};

// --- COMPONENTES BASE ---
const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#03060d] z-[300] flex flex-col items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.06, 1] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
        className="w-24 h-24 rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-slate-400 to-white shadow-[0_0_50px_rgba(99,102,241,0.5)] border border-white/20 flex items-center justify-center bg-black/60 backdrop-blur-md overflow-hidden"
      >
        <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-center flex flex-col items-center">
        <img src={focuslyWordmark} alt="Focusly" className="h-7 object-contain mb-2 filter brightness-125 drop-shadow-md" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">More Action! Less Distraction</span>
      </motion.div>
    </motion.div>
  );
};

// --- SLIDES DEL CAROUSEL ---
const LANDING_CAROUSEL_SLIDES = [
  { id: 'focus', title: 'FOCUS', subtitle: 'Domina tu atención y elimina las distracciones', image: focusImg, tag: 'Concentración Máxima' },
  { id: 'silence', title: 'SILENCIO', subtitle: 'Elimina el ruido digital y recupera la calma', image: silenceImg, tag: 'Detox Digital' },
  { id: 'drive', title: 'IMPULSO', subtitle: 'Alcanza tu máximo rendimiento académico y personal', image: driveImg, tag: 'Progreso Diario' },
  { id: 'strength', title: 'DISCIPLINA', subtitle: 'Construye fortaleza mental y hábitos duraderos', image: strengthImg, tag: 'Hábitos Militares' },
];

const LandingImageSlider = ({ onFinish }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % LANDING_CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = LANDING_CAROUSEL_SLIDES[slideIndex];

  return (
    <div id="galeria-slider" className="space-y-6 pt-6">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Galería de Impacto</span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Los 4 Pilares de Focusly</h2>
        <p className="text-sm text-white/60 font-medium">Explora la experiencia visual y los fundamentos de nuestra metodología de concentración.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] sm:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.8)] group bg-[#090d16]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={current.image} 
              alt={current.title} 
              className="w-full h-full object-cover object-center brightness-[1.1] contrast-[1.05]"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content Overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  {current.tag}
                </span>
                <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed drop-shadow-md">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={onFinish}
            className="self-start sm:self-auto bg-white text-black font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0 flex items-center gap-2"
          >
            Comenzar <ArrowRight size={14} />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setSlideIndex(prev => (prev - 1 + LANDING_CAROUSEL_SLIDES.length) % LANDING_CAROUSEL_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button 
          onClick={() => setSlideIndex(prev => (prev + 1) % LANDING_CAROUSEL_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicator Progress Bars */}
        <div className="absolute top-6 left-8 right-8 z-30 flex gap-2">
          {LANDING_CAROUSEL_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSlideIndex(idx)}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-md cursor-pointer transition-all"
            >
              <div 
                className={`h-full transition-all duration-500 ${idx === slideIndex ? 'w-full bg-white shadow-[0_0_12px_white]' : 'w-0'}`} 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTE: SIMULADOR INTERACTIVO DENTRO DEL PHONE MOCKUP HERO ---
const InteractivePhoneMockup = ({ onFinish }) => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [seconds, setSeconds] = useState(1500); // 25:00
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins} : ${secs < 10 ? '0' : ''}${secs}`;
  };

  const [blockedState, setBlockedState] = useState({
    instagram: true,
    tiktok: true,
    youtube: false,
    twitter: true
  });

  const toggleAppBlock = (app) => {
    setBlockedState(prev => ({ ...prev, [app]: !prev[app] }));
  };

  const [aiQuery, setAiQuery] = useState('habito');
  const aiResponses = {
    habito: "💡 'Te sugiero activar la regla 50/10: 50 min de estudio enfocado y 10 min de descanso activo sin pantallas.'",
    distraccion: "🛡️ 'El impulso de abrir TikTok dura en promedio 90 segundos. Respira profundo tres veces y tu cerebro retomará el control.'",
    examen: "📚 'Para tu examen de mañana, prioriza repasar los mapas conceptuales y haz 3 bloques de Pomodoro antes de cenar.'"
  };

  return (
    <motion.div 
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-[340px] aspect-[9/18.5] bg-[#0c101d] rounded-[50px] p-3 border-[6px] border-[#1e293b] shadow-[0_30px_90px_rgba(15,23,42,0.8),0_0_50px_rgba(99,102,241,0.25)] overflow-hidden font-['Inter',sans-serif]"
    >
      {/* Dynamic Island Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#03060d] rounded-full z-40 flex items-center justify-end px-3 border border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] border border-white/20" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-[#050814] rounded-[38px] overflow-hidden flex flex-col pt-10 px-4 pb-4 text-white relative border border-white/10">
        
        {/* Header App Bar inside Phone */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <img src={focuslyIcon} alt="Icon" className="w-6 h-6 rounded-lg object-contain border border-white/20 bg-black" />
            <div>
              <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest block leading-none">Focusly App</span>
              <h4 className="text-xs font-black uppercase tracking-tight">Panel Live</h4>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] font-black uppercase flex items-center gap-1">
            <Flame size={10} fill="currentColor" /> Racha: 12d
          </div>
        </div>

        {/* Tab Selector Buttons inside Phone */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/80 rounded-xl border border-white/10 mb-3 text-[8px] font-black uppercase text-center">
          <button 
            onClick={() => setActiveTab('pomodoro')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'pomodoro' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            ⏱️ Timer
          </button>
          <button 
            onClick={() => setActiveTab('blocker')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'blocker' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            📵 Bloqueo
          </button>
          <button 
            onClick={() => setActiveTab('ai')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            🤖 IA
          </button>
          <button 
            onClick={() => setActiveTab('ranks')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ranks' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            🏆 Nivel
          </button>
        </div>

        {/* TAB 1: POMODORO TIMER SIMULATOR */}
        {activeTab === 'pomodoro' && (
          <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-indigo-950/40 to-black/80 border border-indigo-500/30 rounded-2xl p-4">
            <div className="text-center">
              <span className="text-[8px] font-black uppercase tracking-widest text-indigo-300 block mb-1">Sesión de Concentración</span>
              <div className="text-3xl font-black tracking-widest text-white font-mono my-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                {formatTime(seconds)}
              </div>
              <span className="text-[8px] text-white/50 uppercase font-bold">Estado: {isRunning ? '🔥 Enfoque Activo' : 'Pausado'}</span>
            </div>

            <div className="flex justify-center gap-2 my-2">
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${isRunning ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
              >
                {isRunning ? <Minus size={12} /> : <Play size={12} fill="currentColor" />}
                {isRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button 
                onClick={() => { setIsRunning(false); setSeconds(1500); }} 
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Reiniciar
              </button>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl p-2 text-[8px] flex justify-between items-center">
              <span className="text-white/60 font-bold">Recompensa estimada:</span>
              <span className="text-amber-400 font-black flex items-center gap-1"><Zap size={10} fill="currentColor" /> +150 XP</span>
            </div>
          </div>
        )}

        {/* TAB 2: BLOCKER SIMULATOR */}
        {activeTab === 'blocker' && (
          <div className="flex-1 flex flex-col justify-between space-y-2 overflow-y-auto custom-scroll pr-1">
            <span className="text-[8px] font-black uppercase text-white/40 tracking-widest block">Límites de Aplicaciones</span>
            {[
              { id: 'instagram', name: 'Instagram', sub: 'Límite: 15m/día' },
              { id: 'tiktok', name: 'TikTok', sub: 'Límite: Bloqueado total' },
              { id: 'youtube', name: 'YouTube', sub: 'Límite: 30m/día' },
              { id: 'twitter', name: 'X / Twitter', sub: 'Límite: 10m/día' },
            ].map((app) => {
              const isBlocked = blockedState[app.id];
              return (
                <div key={app.id} className="bg-white/5 border border-white/10 rounded-xl p-2 flex justify-between items-center">
                  <div>
                    <h6 className="text-[9px] font-black uppercase text-white">{app.name}</h6>
                    <span className="text-[7px] text-white/50 font-medium block">{app.sub}</span>
                  </div>
                  <button 
                    onClick={() => toggleAppBlock(app.id)}
                    className={`px-2.5 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all cursor-pointer ${isBlocked ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}
                  >
                    {isBlocked ? '🔒 Bloqueado' : '🔓 Permitido'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: AI COACH SIMULATOR */}
        {activeTab === 'ai' && (
          <div className="flex-1 flex flex-col justify-between space-y-2">
            <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest block">Asistente Conductual IA</span>
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'habito', label: '💡 Hábito' },
                { id: 'distraccion', label: '🛡️ Antidistracción' },
                { id: 'examen', label: '📚 Examen' }
              ].map(q => (
                <button 
                  key={q.id}
                  onClick={() => setAiQuery(q.id)}
                  className={`px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${aiQuery === q.id ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/10 text-white/60 hover:text-white'}`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3 flex-1 flex flex-col justify-center">
              <span className="text-[7px] font-black uppercase text-cyan-300 tracking-widest block mb-1">Recomendación IA:</span>
              <p className="text-[9px] font-medium text-white/90 leading-relaxed italic">
                {aiResponses[aiQuery]}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: RANKS SIMULATOR */}
        {activeTab === 'ranks' && (
          <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-purple-950/40 to-black/80 border border-purple-500/30 rounded-2xl p-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] font-black uppercase text-purple-300 tracking-widest">Rango Élite</span>
                <span className="text-[8px] font-black text-amber-400">Nivel 3 • Profesional</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 my-2">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full w-[72%]" />
              </div>
              <span className="text-[7px] font-bold text-white/50 block text-right">3,600 / 5,000 XP</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div className="bg-white/5 p-2 rounded-xl text-center border border-white/10">
                <span className="text-xs">🛡️</span>
                <span className="text-[7px] font-black uppercase text-white block mt-1">Escudo Focus</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl text-center border border-white/10">
                <span className="text-xs">👑</span>
                <span className="text-[7px] font-black uppercase text-white block mt-1">Corona Leyenda</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav inside Phone Mockup */}
        <div className="pt-2 mt-2 border-t border-white/10 flex justify-around text-white/40 items-center">
          <Home size={14} className="text-indigo-400" />
          <Trophy size={14} />
          <ShoppingBag size={14} />
          <User size={14} />
        </div>

      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENTE: CALCULADORA DE TIEMPO RECUPERADO ---
const FocusTimeCalculator = ({ onFinish }) => {
  const [dailyHours, setDailyHours] = useState(3);
  
  const yearlyHours = dailyHours * 365;
  const booksRead = Math.round(yearlyHours / 30);
  const projectsDone = Math.round(yearlyHours / 120);
  const xpEarned = yearlyHours * 100;

  return (
    <section id="calculadora" className="bg-gradient-to-b from-[#0a0f1d] via-[#080d19] to-[#040711] border border-slate-800/80 rounded-[36px] p-8 sm:p-12 shadow-2xl relative overflow-hidden font-['Inter',sans-serif]">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Calculadora de Impacto</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            ¿Cuánto tiempo estás perdiendo realmente?
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto">
            Mueve el deslizador a las horas aproximadas que pasas diariamente en TikTok, Instagram y otras redes.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-300">Horas en pantalla/día:</span>
            <span className="text-3xl font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-5 py-1.5 rounded-2xl">
              {dailyHours} {dailyHours === 1 ? 'Hora' : 'Horas'}
            </span>
          </div>

          <input 
            type="range" 
            min="1" 
            max="8" 
            value={dailyHours}
            onChange={(e) => setDailyHours(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>1 hr / día</span>
            <span>4 hrs / día</span>
            <span>8 hrs / día</span>
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-white">{yearlyHours.toLocaleString()}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Horas Ahorradas / Año</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-emerald-400">📚 {booksRead}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Libros Leídos Equivalentes</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-amber-400">⚡ {projectsDone}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Proyectos Completados</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-indigo-400">💎 {(xpEarned / 1000).toFixed(1)}k</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">XP Potencial en Focusly</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <button 
            onClick={onFinish}
            className="bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 hover:scale-105 text-white font-black text-xs uppercase tracking-widest px-10 py-4.5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all cursor-pointer inline-flex items-center gap-3"
          >
            Recuperar mis {yearlyHours.toLocaleString()} horas con Focusly <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTE: MATRIZ COMPARATIVA ---
const FeatureComparisonMatrix = () => (
  <section id="matriz" className="space-y-8 font-['Inter',sans-serif]">
    <div className="text-center space-y-3 max-w-2xl mx-auto">
      <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Comparativa Élite</span>
      <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">¿Por qué Focusly es Superior?</h2>
      <p className="text-sm text-slate-400 font-medium">Diseñado con psicología de conducta y sistemas de juego para garantizar constancia real.</p>
    </div>

    <div className="overflow-x-auto custom-scroll rounded-3xl border border-slate-800 bg-[#070b16]">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-800 bg-[#0c101d] text-xs font-black uppercase tracking-wider text-slate-400">
            <th className="py-4 px-6">Característica</th>
            <th className="py-4 px-6 text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20">Focusly App</th>
            <th className="py-4 px-6 text-slate-500">Apps Tradicionales</th>
            <th className="py-4 px-6 text-slate-500">Fuerza de Voluntad Sola</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-xs font-semibold text-slate-300">
          {[
            { feature: 'Bloqueo Activo y Programable', focusly: '✅ Totalmente Configurable', trad: '⚠️ Fácil de Omitir', solo: '❌ Incumplido' },
            { feature: 'Gamificación RPG & Recompensas', focusly: '⚡ XP, Rangos, Gemas y Avatares', trad: '❌ Sin Gamificación', solo: '❌ Cero Recompensa' },
            { feature: 'Asistente IA Conductual', focusly: '🤖 Algoritmo Personalizado', trad: '❌ No Incluido', solo: '❌ No Incluido' },
            { feature: 'Retos de Desintoxicación Digital', focusly: '🔥 Desafíos Diarios Gamificados', trad: '⚠️ Temporizadores Básicos', solo: '❌ Sin Estructura' },
            { feature: 'Sincronización Supabase Cloud', focusly: '🌐 Persistencia en tiempo real', trad: '⚠️ Local Únicamente', solo: '❌ No Aplica' },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
              <td className="py-4 px-6 font-bold text-white">{row.feature}</td>
              <td className="py-4 px-6 font-black text-emerald-400 bg-indigo-500/5 border-x border-indigo-500/20">{row.focusly}</td>
              <td className="py-4 px-6 text-slate-400">{row.trad}</td>
              <td className="py-4 px-6 text-slate-500">{row.solo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

// --- SUB-COMPONENTE: FAQ INTERACTIVO CON BÚSQUEDA ---
const InteractiveFAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Cómo funciona el bloqueo de aplicaciones en Focusly?',
      a: 'Focusly te permite establecer límites precisos diarios para redes sociales como TikTok, Instagram o YouTube. Una vez superado el tiempo o durante una sesión de enfoque activa, las notificaciones y accesos se restringen.'
    },
    {
      q: '¿Es totalmente gratis probar Focusly?',
      a: 'Sí. Puedes acceder de forma gratuita e instantánea mediante el Modo Demo o crear tu cuenta sin necesidad de tarjeta de crédito.'
    },
    {
      q: '¿Qué beneficios otorga el sistema de XP y Rangos?',
      a: 'Al completar sesiones Pomodoro y mantener rachas diarias acumulas XP para ascender de Principiante a Leyenda, desbloqueando insignias militares, aspectos de avatares 3D y gemas de la tienda.'
    },
    {
      q: '¿Mis datos personales están seguros en Focusly?',
      a: 'Absolutamente. Utilizamos Supabase Cloud con autenticación JWT y cifrado de punta a punta. No vendemos ni compartimos tus hábitos de uso con terceros.'
    },
    {
      q: '¿Cómo ayuda el Asistente IA Conductual?',
      a: 'Analiza en qué momentos del día experimentas mayor distracción y genera sugerencias automáticas de horarios de estudio, descansos activos y planes de hábitos.'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="faq" className="space-y-8 font-['Inter',sans-serif] max-w-3xl mx-auto">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Preguntas Frecuentes</span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">¿Tienes dudas sobre Focusly?</h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="BUSCAR EN PREGUNTAS FRECUENTES..."
          className="w-full bg-[#070b16] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-all shadow-inner"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-[#070b16] border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 font-black uppercase text-xs tracking-tight text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-400 font-medium leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- LANDING PAGE COMPONENT (DISEÑO ORIGINAL RESTAURADO CON NUEVOS COLORES Y LOGOS EQUILIBRADOS) ---
const LandingPage = ({ onFinish }) => {
  const [activeTab, setActiveTab] = useState('principiante');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#03050d] text-white overflow-y-auto custom-scroll font-['Inter',sans-serif] selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-950/20 rounded-full blur-[160px]" />
        <div className="absolute top-[25%] right-[-10%] w-[45vw] h-[45vw] bg-slate-900/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between px-6 py-3.5 rounded-full bg-[#070b16]/90 backdrop-blur-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          {/* Logo Integration: Icon + Wordmark */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center shadow-lg">
              <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-contain rounded-lg" />
            </div>
            <img src={focuslyWordmark} alt="Focusly Logo" className="h-6 w-auto object-contain brightness-125 hidden sm:block" />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-white transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors cursor-pointer">Cómo Funciona</button>
            <button onClick={() => scrollToSection('progreso')} className="hover:text-white transition-colors cursor-pointer">Progreso</button>
            <button onClick={() => scrollToSection('mockups')} className="hover:text-white transition-colors cursor-pointer">Demostración</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-white transition-colors cursor-pointer">Testimonios</button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onFinish}
              className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-all cursor-pointer hidden sm:block"
            >
              ⚡ Modo Demo
            </button>
            <button 
              onClick={onFinish}
              className="bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 hover:brightness-110 text-white font-black text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              Comenzar <ArrowRight size={14} />
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-24 space-y-24 sm:space-y-32">
        
        {/* HERO SECTION (ESTRUCTURA ORIGINAL CON SLOGAN PROMINENTE Y SLOGAN LOGO GRANDE) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2">
          {/* Left Column: Headline, Big Slogan Logo & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span>Plataforma de Alto Rendimiento 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05] text-white"
            >
              Controla tu tiempo. <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_5px_20px_rgba(255,255,255,0.2)]">Mejora tu vida.</span>
            </motion.h1>

            {/* BRAND SLOGAN LOGO BANNER (TAMAÑO PROMINENTE Y EQUILIBRADO) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18 }}
              className="py-1 flex items-center justify-center lg:justify-start"
            >
              <div className="bg-[#000000] border border-slate-800/90 px-6 py-3.5 rounded-2xl shadow-2xl inline-flex items-center justify-center border-indigo-500/30">
                <img 
                  src={focuslySlogan} 
                  alt="More Action! Less Distraction" 
                  className="h-10 sm:h-13 w-auto object-contain mix-blend-screen filter brightness-125" 
                />
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Convierte cada minuto lejos de las redes sociales en progreso real mediante retos, recompensas y gamificación conductual.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button 
                onClick={onFinish}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
              >
                Comenzar <ArrowRight size={16} />
              </button>

              <button 
                onClick={() => scrollToSection('mockups')}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-slate-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Play size={16} className="text-indigo-400" fill="currentColor" /> Ver demostración
              </button>
            </motion.div>

            {/* Micro Social Badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Supabase Cloud DB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-400" />
                <span>Gamificación AAA</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Phone Mockup con Simulador Interactivo */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractivePhoneMockup onFinish={onFinish} />
          </div>
        </section>

        {/* SLIDER CAROUSEL DE IMÁGENES ORIGINAL */}
        <LandingImageSlider onFinish={onFinish} />

        {/* NUEVA CALCULADORA DE TIEMPO RECUPERADO */}
        <FocusTimeCalculator onFinish={onFinish} />

        {/* SECCIÓN DE BENEFICIOS ORIGINAL CON ESTILO EJECUTIVO */}
        <section id="beneficios" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Beneficios Principales</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Redefine tu relación con la tecnología</h2>
            <p className="text-sm text-slate-400 font-medium">Diseñado con psicología del comportamiento para ayudarte a reemplazar distracciones por hábitos de alto impacto.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Smartphone,
                title: 'Reduce tu tiempo en redes sociales',
                desc: 'Establece límites inteligentes y recupera el control sobre TikTok, Instagram y YouTube sin esfuerzo.',
                border: 'border-slate-800'
              },
              {
                icon: Trophy,
                title: 'Gana recompensas y sube de nivel',
                desc: 'Acumula XP y diamantes por cada hora de enfoque. Desbloquea avatares, skins y entornos únicos.',
                border: 'border-slate-800'
              },
              {
                icon: Target,
                title: 'Completa retos diarios',
                desc: 'Desafíos gamificados diseñados para estudiantes y jóvenes profesionales que buscan superar sus límites.',
                border: 'border-slate-800'
              },
              {
                icon: TrendingUp,
                title: 'Mejora tus hábitos constantemente',
                desc: 'Analítica avanzada respaldada por IA conductual para monitorear tu evolución día a día.',
                border: 'border-slate-800'
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-[#070b16] border ${card.border} hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 group`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-indigo-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-black uppercase tracking-tight text-white">{card.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECCIÓN FILOSOFÍA CON LOGO DE SLOGAN PROMINENTE */}
        <section className="bg-[#050814] border border-slate-800/80 rounded-[32px] p-8 sm:p-12 shadow-2xl text-center space-y-6 font-['Inter',sans-serif]">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 block">Filosofía de Vida & Marca</span>
          <div className="flex justify-center py-2">
            <div className="bg-black border border-white/10 px-8 py-5 rounded-3xl shadow-2xl inline-block">
              <img 
                src={focuslySlogan} 
                alt="More Action! Less Distraction" 
                className="h-12 sm:h-18 w-auto object-contain mix-blend-screen filter brightness-125" 
              />
            </div>
          </div>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Menos tiempo consumiendo contenido ajeno. Más tiempo ejecutando tus metas, estudios y proyectos reales.
          </p>
        </section>

        {/* SECCIÓN DE CÓMO FUNCIONA ORIGINAL */}
        <section id="como-funciona" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Paso a Paso</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Cómo Funciona</h2>
            <p className="text-sm text-slate-400 font-medium">Cuatro pasos sencillos para transformar tus hábitos digitales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { num: '01', title: 'Configura tus objetivos', desc: 'Elige las apps a bloquear y define tus metas diarias de concentración.' },
              { num: '02', title: 'Completa desafíos', desc: 'Inicia sesiones de enfoque sin distracciones y supera los retos diarios.' },
              { num: '03', title: 'Obtén recompensas', desc: 'Acumula experiencia (XP), diamantes e insignias de rango militar.' },
              { num: '04', title: 'Mejora tus hábitos', desc: 'Visualiza tu racha y evoluciona tu mentalidad constantemente.' },
            ].map((step, idx) => (
              <div key={idx} className="relative bg-[#070b16] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-lg hover:border-indigo-500/40 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-indigo-400/40">{step.num}</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-tight text-white">{step.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SISTEMA DE PROGRESO ORIGINAL */}
        <section id="progreso" className="space-y-12 bg-[#050814] p-8 sm:p-12 rounded-[40px] border border-slate-800/80 shadow-2xl">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Gamificación Élite</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Sistema de Progreso</h2>
            <p className="text-sm text-slate-400 font-medium">Evoluciona tu rango como en los mejores videojuegos de rol.</p>
          </div>

          {/* Level Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'principiante', name: 'Principiante', level: 'Nivel 1', color: '#22c55e', tag: 'COMÚN', icon: Sprout, xp: '0 - 500 XP', desc: 'Ideal para dar el primer paso hacia una mente libre de distracciones.' },
              { id: 'novato', name: 'Novato', level: 'Nivel 2', color: '#3b82f6', tag: 'RARO', icon: Shield, xp: '500 - 1.5K XP', desc: 'Incrementa la intensidad y construye constancia diaria firme.' },
              { id: 'profesional', name: 'Profesional', level: 'Nivel 3', color: '#a855f7', tag: 'ÉPICO', icon: Flame, xp: '1.5K - 3.5K XP', desc: 'Para mentes enfocadas que buscan transformar su rendimiento académico.' },
              { id: 'leyenda', name: 'Leyenda', level: 'Nivel 4', color: '#eab308', tag: 'LEGENDARIO', icon: Crown, xp: '3.5K+ XP', desc: 'Dominio absoluto del tiempo. Cero excusas, disciplina de nivel élite.' },
            ].map(lvl => {
              const Icon = lvl.icon;
              const isSel = activeTab === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveTab(lvl.id)}
                  className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all cursor-pointer ${isSel ? 'bg-[#0e1526] border-indigo-500 shadow-2xl scale-[1.02]' : 'bg-[#070b16] border-slate-800 hover:bg-[#0a0f1d]'}`}
                  style={{ borderColor: isSel ? lvl.color : 'rgba(255,255,255,0.1)' }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ color: lvl.color, backgroundColor: `${lvl.color}20` }}>{lvl.tag}</span>
                    <Icon size={24} style={{ color: lvl.color }} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black uppercase text-white">{lvl.name}</h4>
                    <span className="text-[10px] font-bold text-slate-500 block">{lvl.xp}</span>
                    <p className="text-xs text-slate-400 font-medium pt-2 leading-relaxed">{lvl.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* XP Progress Bar Showcase */}
          <div className="bg-black/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest block">Barra de Experiencia</span>
                <h3 className="text-xl font-black uppercase text-white">Rango Élite de Usuario</h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase flex items-center gap-2">
                <Crown size={16} /> 7,450 / 10,000 XP
              </div>
            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div initial={{ width: '0%' }} animate={{ width: '74.5%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]" />
            </div>

            {/* Badges Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'Insignia Foco', desc: '100 Horas sin Redes', icon: Zap, color: 'text-indigo-400' },
                { title: 'Fuego Santo', desc: 'Racha de 30 Días', icon: Flame, color: 'text-amber-400' },
                { title: 'Guardián Égida', desc: 'Nivel Élite', icon: Shield, color: 'text-purple-400' },
                { title: 'Campeón Místico', desc: 'Top 1% Global', icon: Trophy, color: 'text-emerald-400' },
              ].map((badge, i) => {
                const BIcon = badge.icon;
                return (
                  <div key={i} className="bg-white/5 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <BIcon size={20} className={badge.color} />
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase text-white">{badge.title}</h5>
                      <span className="text-[9px] text-slate-400 font-medium block">{badge.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NUEVA MATRIZ COMPARATIVA */}
        <FeatureComparisonMatrix />

        {/* MOCKUPS DE LA APLICACIÓN ORIGINALES */}
        <section id="mockups" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Demostración Visual</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Capturas de la Aplicación</h2>
            <p className="text-sm text-slate-400 font-medium">Una interfaz diseñada minuciosamente para inspirarte y mantenerte enfocado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {[
              {
                title: 'Panel de Control',
                tag: 'DASHBOARD',
                desc: 'Visualiza tus misiones diarias, racha de atención y el estado en tiempo real del bloqueador.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-400 uppercase">Focusly Dashboard</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">En Línea</span>
                    </div>
                    <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-3 text-center">
                      <span className="text-[8px] font-bold uppercase text-white/50 block">Sesión en Curso</span>
                      <div className="text-xl font-black text-white my-1">25 : 00</div>
                      <span className="text-[8px] font-bold text-amber-300 uppercase"> Recompensa: +150 XP</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-black uppercase text-white/40">Apps Limitadas</span>
                      <div className="bg-white/5 p-2 rounded-lg text-[9px] flex justify-between font-bold"><span>Instagram</span><span className="text-red-400">Bloqueado</span></div>
                      <div className="bg-white/5 p-2 rounded-lg text-[9px] flex justify-between font-bold"><span>TikTok</span><span className="text-red-400">Bloqueado</span></div>
                    </div>
                  </div>
                )
              },
              {
                title: 'Colección de Avatares',
                tag: 'TIENDA & SKIN',
                desc: 'Equipa personajes 3D animados con auras y aspectos exclusivos.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-purple-400 uppercase">Colección & Avatares</span>
                      <span className="text-[9px] text-amber-300 font-black"> 4,500 Gemas</span>
                    </div>
                    <div className="bg-purple-900/40 border border-purple-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-2xl shadow-[0_0_20px_#a855f7] mb-2">
                        🔥
                      </div>
                      <h6 className="text-xs font-black uppercase text-white">Fuego Primordial</h6>
                      <span className="text-[8px] font-bold text-purple-300 uppercase">Rango Épico</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">🛡️</div>
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">👑</div>
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">💎</div>
                    </div>
                  </div>
                )
              },
              {
                title: 'Asistente IA Conductual',
                tag: 'INTELIGENCIA ARTIFICIAL',
                desc: 'Análisis inteligente en tiempo real para optimizar tu horario de estudio y descansos.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-cyan-400 uppercase">IA Coach Focusly</span>
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">Activo</span>
                    </div>
                    <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-3 space-y-2">
                      <span className="text-[8px] font-bold uppercase text-cyan-300 block">Recomendación Personalizada</span>
                      <p className="text-[9px] font-medium text-white/80 leading-relaxed">
                        "Detectamos mayor distracción entre las 4 PM y 6 PM. Te sugerimos activar el reto Ayuno de Redes durante ese bloque."
                      </p>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl text-[9px] font-bold flex justify-between items-center">
                      <span>Plan de Hábitos Creado</span>
                      <span className="text-emerald-400">100% Optimizado</span>
                    </div>
                  </div>
                )
              }
            ].map((mock, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-[#070b16] border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col space-y-4 hover:border-indigo-500/40 transition-all"
              >
                {/* Phone Frame */}
                <div className="w-full aspect-[9/16] bg-[#03050d] rounded-2xl border-2 border-slate-800 overflow-hidden relative shadow-inner">
                  {mock.mockupContent}
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">{mock.tag}</span>
                  <h4 className="text-base font-black uppercase text-white">{mock.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{mock.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ESTADÍSTICAS REALES / TECNOLOGÍA ORIGINAL */}
        <section className="bg-gradient-to-r from-slate-900/80 via-indigo-950/80 to-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 'Supabase', label: 'Base de Datos Realtime' },
              { num: 'OAuth & JWT', label: 'Autenticación Segura' },
              { num: 'Realtime DB', label: 'Sincronización en Nube' },
              { num: '0 ms', label: 'Persistencia Directa' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white bg-gradient-to-r from-indigo-300 via-slate-200 to-white bg-clip-text text-transparent">{stat.num}</div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ INTERACTIVO CON BÚSQUEDA */}
        <InteractiveFAQ />

        {/* TESTIMONIOS ORIGINALES */}
        <section id="testimonios" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Lo que dice nuestra comunidad</h2>
            <p className="text-sm text-slate-400 font-medium">Historias reales de jóvenes que transformaron su rendimiento digital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mateo R.',
                role: 'Estudiante de Medicina',
                comment: 'Pasé de gastar 5 horas al día en TikTok a estudiar sin distracciones. El sistema de XP me enganchó desde el primer día.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                name: 'Valeria G.',
                role: 'Ingeniería de Software',
                comment: 'Focusly se siente como jugar un RPG de productividad. Bloquear mi teléfono nunca había sido tan gratificante.',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                name: 'Lucas S.',
                role: 'Estudiante de Bachillerato',
                comment: 'Gracias a los desafíos y mentores IA logré organizar mis exámenes sin ansiedad. Es la mejor app que he probado.',
                gradient: 'from-amber-500 to-orange-600'
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#070b16] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <p className="text-xs text-slate-300 font-medium italic leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-xs font-black uppercase text-white shadow-md`}>
                    {t.name.substring(0, 2)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-white">{t.name}</h5>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL ORIGINAL CON ESTILO EJECUTIVO Y DOS BOTONES */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#090e1f] via-[#0d142b] to-[#090e1f] p-8 sm:p-16 border border-slate-800 shadow-[0_0_80px_rgba(15,23,42,0.8)] text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Empieza Tu Transformación</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Empieza hoy a recuperar tu tiempo.</h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Únete a miles de jóvenes que ya están convirtiendo sus distracciones en logros reales.
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onFinish}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-3"
            >
              Comenzar ahora <ArrowRight size={18} />
            </button>
            <button 
              onClick={onFinish}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-slate-700 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl backdrop-blur-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              ⚡ Modo Demo Directo
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER CON LOGOS Y NAVEGACIÓN */}
      <footer className="border-t border-slate-800/80 bg-[#020409] py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-white/20 p-1 flex items-center justify-center shadow-lg">
              <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-contain rounded-md" />
            </div>
            <img src={focuslyWordmark} alt="Focusly Logo" className="h-6 w-auto object-contain brightness-125" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Inicio</button>
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-white transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors cursor-pointer">Cómo Funciona</button>
            <button onClick={() => scrollToSection('progreso')} className="hover:text-white transition-colors cursor-pointer">Progreso</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-white transition-colors cursor-pointer">Testimonios</button>
          </div>

          <div className="text-xs font-medium text-slate-500 text-center md:text-right">
            © 2026 Focusly Inc. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

const Onboarding = LandingPage;

const LogoReveal = ({ onContinue, onBack }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#060810] z-50 flex flex-col text-white px-8 pt-16 pb-10 justify-between items-center overflow-hidden">
    {/* Background Ambient Glow */}
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vw] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onClick={onBack} className="self-start relative z-50 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity p-2 text-white cursor-pointer">
      <ChevronLeft size={24} /> <span className="text-xs font-bold uppercase tracking-wider">Volver</span>
    </motion.button>

    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-sm relative z-10">
      <motion.div
        initial={{ scale: 0.8, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="w-28 h-28 rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-white shadow-[0_0_60px_rgba(99,102,241,0.5)] border border-white/20 overflow-hidden bg-black/80"
      >
        <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>

      <motion.img 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        src={focuslyWordmark} 
        alt="Focusly" 
        className="h-10 object-contain filter brightness-125"
      />

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.4 }} 
        className="bg-black/80 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-full"
      >
        <img src={focuslySlogan} alt="More Action! Less Distraction" className="max-h-12 object-contain mx-auto filter brightness-110" />
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full max-w-sm relative z-10">
      <button onClick={onContinue} className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] cursor-pointer flex items-center justify-center gap-2">
        Empieza el viaje <ArrowRight size={16} />
      </button>
    </motion.div>
  </motion.div>
);

const AuthScreen = ({ onBack, onContinue, lang = 'es', initialIsLogin = false, isLinking = false }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [localName, setLocalName] = useState('');
  const [localGender, setLocalGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const t = UI_TEXT[lang];

  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.reload(); // Recargar para que el useEffect principal cargue la sesión
      } else {
        if (!isLinking && !localGender) {
          setErrorMsg('Selecciona un género para tu avatar.');
          setLoading(false);
          return;
        }

        // Obtener sesión actual
        const { data: { session } } = await supabase.auth.getSession();
        let authResult;

        if (session?.user && (session.user.is_anonymous || !session.user.email)) {
          // Si el usuario actual es anónimo, lo vinculamos (actualizamos) a cuenta permanente
          authResult = await supabase.auth.updateUser({ email, password });
        } else {
          // Si no es anónimo, creamos un nuevo usuario normal
          authResult = await supabase.auth.signUp({ email, password });
        }

        if (authResult.error) throw authResult.error;

        if (isLinking) {
          // Si se está vinculando desde el perfil, onContinue actualizará el estado y volverá a main
          onContinue();
        } else {
          onContinue(localName || 'Jugador_Nuevo', localGender);
        }
      }
    } catch (err) {
      setErrorMsg(err.message === 'Invalid login credentials' ? 'Credenciales incorrectas' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#060810] z-40 overflow-hidden flex flex-col font-['Inter',sans-serif]">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full px-8 pt-16 pb-10">
        <button onClick={onBack} className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity mb-6 -ml-2 w-max text-white cursor-pointer"><ChevronLeft size={24} /><span className="text-xs font-bold uppercase tracking-wider">Volver</span></button>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col flex-1">
          {/* Logo Header Banner inside Auth */}
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-md w-max">
            <img src={focuslyIcon} alt="Focusly Icon" className="w-8 h-8 rounded-xl object-contain shadow-md" />
            <img src={focuslyWordmark} alt="Focusly" className="h-5 object-contain filter brightness-125" />
          </motion.div>

          <motion.div variants={staggerItem} className="mb-6">
            <h1 className="text-3xl font-black tracking-tight uppercase mb-2 leading-[1.1] text-white">{isLogin ? t.loginTitle : (isLinking ? 'Registrar' : t.authTitle)}</h1>
            <p className="text-white/40 text-[10px] tracking-[0.25em] font-black uppercase italic">{isLogin ? t.loginSub : (isLinking ? 'Vincula tu progreso' : t.authSub)}</p>
          </motion.div>
          <div className="flex-1 overflow-y-auto custom-scroll space-y-4 pb-4 px-1">
            {!isLogin && !isLinking && (
              <motion.div variants={staggerItem} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><User size={18} /></div>
                <input value={localName} onChange={e => setLocalName(e.target.value)} placeholder="NOMBRE DE USUARIO" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" />
              </motion.div>
            )}

            {!isLogin && !isLinking && (
              <motion.div variants={staggerItem} className="flex gap-3 mb-2">
                <button onClick={() => setLocalGender('M')} className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${localGender === 'M' ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg' : 'bg-[#0c0c0c]/80 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}>
                  <User size={24} /> <span className="text-[10px] font-black uppercase">Hombre</span>
                </button>
                <button onClick={() => setLocalGender('F')} className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${localGender === 'F' ? 'bg-pink-600/20 border-pink-500 text-white shadow-lg' : 'bg-[#0c0c0c]/80 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}>
                  <User size={24} /> <span className="text-[10px] font-black uppercase">Mujer</span>
                </button>
              </motion.div>
            )}

            <motion.div variants={staggerItem} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Mail size={18} /></div>
              <input type="email" autoComplete={isLogin ? "email" : "off"} value={email} onChange={e => setEmail(e.target.value)} placeholder="CORREO ELECTRÓNICO" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" />
            </motion.div>
            
            <motion.div variants={staggerItem} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Lock size={18} /></div>
              <input type="password" autoComplete={isLogin ? "current-password" : "new-password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="CONTRASEÑA" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" />
            </motion.div>

            {errorMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] uppercase font-black tracking-widest text-center mt-2">
                {errorMsg}
              </motion.div>
            )}
          </div>
          <motion.div variants={staggerItem} className="pt-4 mt-auto">
            <button onClick={handleSubmit} disabled={loading || (!isLogin && !isLinking && !localGender)} className={`group relative w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-3 ${(!isLogin && !isLinking && !localGender) || loading ? 'bg-white/20 text-white/40 cursor-not-allowed' : 'bg-white text-black'}`}>
              <span className="relative z-10">{loading ? t.loading : (isLogin ? t.btnLogin : (isLinking ? 'Registrar Cuenta' : t.btnStart))}</span><ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center mt-8">
              <button onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} className="px-6 py-3 border border-white/10 rounded-full text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white hover:border-white/30 transition-all shadow-sm active:scale-95">
                {isLogin ? t.btnSwitchToReg : t.btnSwitchToLogin}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- COMPONENTS ADICIONALES (TIENDA Y COLECCIÓN) ---
const PolygonButton = ({ children, onClick, disabled, className, colorHex = "#ffffff" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative overflow-hidden group font-black uppercase tracking-widest text-xs px-6 py-4 transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'} ${className}`}
    style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
  >
    <div className="absolute inset-0 bg-[#111] z-0 transition-colors group-hover:bg-[#222]" />
    <div className="absolute top-0 left-0 w-1.5 h-full z-10" style={{ backgroundColor: colorHex }} />
    <div className="absolute bottom-0 right-0 w-1.5 h-full z-10" style={{ backgroundColor: colorHex }} />
    <div className="relative z-20 flex items-center justify-center gap-2">{children}</div>
  </button>
);

const PolygonCard = ({ children, onClick, rarityColor, isLocked }) => (
  <motion.div
    whileHover={!isLocked ? { scale: 1.03 } : {}}
    whileTap={!isLocked ? { scale: 0.97 } : {}}
    onClick={onClick}
    className={`relative bg-[#0a0a0a]/80 backdrop-blur-md cursor-pointer group transition-all duration-300 flex flex-col ${isLocked ? '' : 'hover:shadow-[0_0_30px_rgba(var(--glow-color),0.2)]'}`}
    style={{
      clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
      '--glow-color': rarityColor ? rarityColor.replace('#', '') : '255,255,255'
    }}
  >
    <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity z-20" style={{ background: `linear-gradient(225deg, ${rarityColor} 50%, transparent 50%)` }}></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity z-20" style={{ background: `linear-gradient(45deg, ${rarityColor} 50%, transparent 50%)` }}></div>
    <div className="absolute inset-[2px] bg-black/60 z-0" style={{ clipPath: 'polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)' }} />
    <div className="relative z-10 flex-1 flex flex-col w-full h-full">{children}</div>
  </motion.div>
);

// --- MODALES PRINCIPALES ---
const ClashCardModal = ({ item, userDiamonds, onClose, onAction, inventory, isShopMode }) => {
  const [viewSkins, setViewSkins] = useState(false);
  const [previewSkinId, setPreviewSkin] = useState(null);

  const rarity = RARITIES[item.rarity];
  const isOwned = inventory.avatars.includes(item.id);
  const isEquipped = inventory.equippedAvatar === item.id;
  const activeSkinId = previewSkinId || inventory.equippedSkins?.[item.id] || null;
  const activeSkinData = activeSkinId ? ALL_SKINS.find(s => s.id === activeSkinId) : null;
  const canAfford = userDiamonds >= item.price;

  const availableSkins = ALL_SKINS.filter(s => s.baseId === item.id);

  const stats = [
    { label: 'Voluntad', val: (RARITY_ORDER.indexOf(item.rarity) * 20 + 20) + '%' },
    { label: 'Focus', val: item.price > 1000 ? 'Alto' : 'Medio' }
  ];

  const handleSkinAction = (skin) => {
    const skinOwned = inventory.skins.includes(skin.id);
    if (skinOwned) {
      onAction('equip_skin', { baseId: item.id, skinId: skin.id });
      setPreviewSkin(skin.id);
    } else {
      if (userDiamonds >= skin.price) {
        onAction('buy_skin', skin);
        setPreviewSkin(skin.id);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col overflow-hidden text-white pt-10 px-4 pb-6">
      <button onClick={onClose} className="absolute top-12 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"><X size={20} /></button>
      <div className="flex-1 flex flex-col relative w-full max-w-sm mx-auto bg-gradient-to-b from-[#0a192f] to-[#020c1b] rounded-t-[40px] rounded-b-[20px] border-4 border-[#1e293b] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 px-6 pt-6 pb-2 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 flex items-center justify-center relative drop-shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: rarity.hex }}>
              <div className="absolute inset-[2px] bg-[#0a192f]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
              <span className="relative z-10 font-black text-sm text-white">{rarity.level}</span>
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight leading-none drop-shadow-md text-white">{activeSkinData ? activeSkinData.name : item.name}</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80" style={{ color: rarity.hex }}>{rarity.name} • Héroe</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative flex items-center justify-center w-full my-4 z-10">
          <div className="absolute w-[80%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent rounded-full blur-xl"></div>
          <div className="w-[70%] aspect-square relative z-20">
            <AvatarDisplay id={item.id} src={item.img} className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transform scale-110" freeStanding={true} skinFilters={activeSkinData} />
          </div>
          <div className="absolute bottom-0 bg-[#0f172a] border-2 border-[#334155] rounded-full px-5 py-1.5 shadow-lg transform translate-y-1/2 flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Concentración Activa</span>
          </div>
        </div>
        <div className="bg-[#0f172a] rounded-t-3xl p-6 relative z-10 mt-4 border-t-2 border-[#1e293b] flex flex-col justify-end">
          {!viewSkins ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs text-white/60 font-medium text-center mb-5 leading-relaxed">{item.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map((st, i) => (
                  <div key={i} className="bg-[#020c1b] rounded-xl border border-white/5 p-3 flex flex-col items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{st.label}</span>
                    <span className="text-sm font-black text-white">{st.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {availableSkins.length > 0 && (
                  <button onClick={() => setViewSkins(true)} className="flex-1 bg-[#1e293b] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#334155] transition-colors flex items-center justify-center gap-2 border border-white/5">
                    <Palette size={16} /> Aspectos
                  </button>
                )}
                {isShopMode ? (
                  isOwned ? (
                    <button disabled className="flex-1 bg-[#1e293b] text-green-500 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-green-500/30">Adquirido</button>
                  ) : (
                    <button onClick={() => canAfford ? onAction('buy', item) : null} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${canAfford ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-[#1e293b] text-white/30'}`}>
                      {canAfford ? 'Comprar' : 'Pobre'} <Gem size={14} className={canAfford ? "text-white" : "text-white/30"} /> {item.price}
                    </button>
                  )
                ) : (
                  isOwned ? (
                    <button onClick={() => !isEquipped ? onAction('equip', item) : null} disabled={isEquipped} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest ${isEquipped ? 'bg-[#1e293b] text-green-500 border border-green-500/30' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]'}`}>
                      {isEquipped ? 'En Uso' : 'Equipar'}
                    </button>
                  ) : (
                    <button onClick={() => onAction('gotoShop', item)} className="flex-1 bg-red-600 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center gap-1">
                      <Lock size={14} /> Ir a Tienda
                    </button>
                  )
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/80">Aspectos Disponibles</h3>
                <button onClick={() => { setViewSkins(false); setPreviewSkin(null); }} className="text-[10px] font-black uppercase text-blue-400">Volver</button>
              </div>
              <div className="flex gap-3 overflow-x-auto custom-scroll pb-2">
                <div onClick={() => setPreviewSkin(null)} className={`min-w-[80px] bg-[#020c1b] border-2 rounded-xl p-2 cursor-pointer transition-colors ${previewSkinId === null ? 'border-blue-500 bg-blue-900/20' : 'border-white/5 hover:border-white/20'} flex flex-col items-center text-center`}>
                  <div className="w-10 h-10 mb-2"><AvatarDisplay id={item.id} src={item.img} className="w-full h-full" freeStanding={true} /></div>
                  <span className="text-[8px] font-black uppercase text-white/80">Original</span>
                  {inventory.equippedSkins?.[item.id] === undefined || inventory.equippedSkins?.[item.id] === null ? <Check size={10} className="text-green-500 mt-1" /> : null}
                </div>
                {availableSkins.map(skin => {
                  const sOwned = inventory.skins.includes(skin.id);
                  const sEquipped = inventory.equippedSkins?.[item.id] === skin.id;
                  const sActive = previewSkinId === skin.id;
                  return (
                    <div key={skin.id} onClick={() => setPreviewSkin(skin.id)} className={`min-w-[90px] bg-[#020c1b] border-2 rounded-xl p-2 cursor-pointer transition-colors ${sActive ? `border-[${RARITIES[skin.rarity].hex}] bg-white/5` : 'border-white/5 hover:border-white/20'} flex flex-col items-center text-center`}>
                      <div className="w-10 h-10 mb-2"><AvatarDisplay id={item.id} src={item.img} className="w-full h-full" freeStanding={true} skinFilters={skin} isLocked={!sOwned && isShopMode} /></div>
                      <span className="text-[8px] font-black uppercase text-white/80 truncate w-full">{skin.name}</span>
                      {!sOwned ? <div className="flex items-center gap-1 mt-1"><Gem size={8} className="text-blue-400" /><span className="text-[8px] font-black">{skin.price}</span></div> :
                        sEquipped ? <Check size={10} className="text-green-500 mt-1" /> : <span className="text-[8px] font-black text-green-500 mt-1">Obtenido</span>}
                    </div>
                  )
                })}
              </div>
              <div className="mt-4">
                {previewSkinId === null ? (
                  <button onClick={() => onAction('equip_skin', { baseId: item.id, skinId: null })} disabled={!isOwned || inventory.equippedSkins?.[item.id] == null} className="w-full bg-[#1e293b] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50">Equipar Original</button>
                ) : (
                  (() => {
                    const s = ALL_SKINS.find(x => x.id === previewSkinId);
                    const sOwned = inventory.skins.includes(s.id);
                    if (sOwned) {
                      return <button onClick={() => onAction('equip_skin', { baseId: item.id, skinId: s.id })} disabled={inventory.equippedSkins?.[item.id] === s.id} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:bg-[#1e293b] disabled:text-green-500">Equipar Aspecto</button>
                    } else {
                      return <button onClick={() => handleSkinAction(s)} disabled={!isOwned || userDiamonds < s.price} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:bg-[#1e293b] disabled:text-white/30">
                        {isOwned ? `Comprar por ${s.price}` : 'Requiere Personaje'} <Gem size={12} />
                      </button>
                    }
                  })()
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundDetailModal = ({ item, userDiamonds, onClose, onAction, inventory, isShopMode }) => {
  const rarity = RARITIES[item.rarity];
  const isOwned = inventory.backgrounds.includes(item.id);
  const isEquipped = inventory.equippedBg === item.id;
  const canAfford = userDiamonds >= item.price;
  const bgStyle = item.css || 'bg-[#111]';

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className={`absolute inset-0 z-[100] ${bgStyle} flex flex-col overflow-hidden text-white`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-0"></div>
      <GlobalThemeEffects themeId={item.id} />
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <button onClick={onClose} className="absolute top-16 left-6 p-2 bg-[#111]/80 backdrop-blur-md border border-white/10 text-white z-50 transform -skew-x-12 hover:bg-white/10 transition-colors"><ChevronLeft size={20} className="skew-x-12" /></button>
        <div className="flex-1 flex flex-col items-center justify-center relative mt-10">
          <div className="w-[90%] h-[40vh] relative z-10 flex items-center justify-center mb-8 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black/40">
            <AvatarDisplay id={item.id} className="absolute inset-0 w-full h-full z-20" />
          </div>
          <div className="text-center w-full bg-[#0a0a0a]/50 backdrop-blur-md p-6 border-y border-white/5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 inline-block px-4 py-1 border" style={{ color: rarity.hex, borderColor: rarity.hex, backgroundColor: `${rarity.hex}11` }}>{rarity.name}</span>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic transform -skew-x-6 text-white drop-shadow-lg mb-4">{item.name}</h1>
            <p className="text-xs text-white/70 font-medium leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide">{item.desc}</p>
          </div>
        </div>
        <div className="mt-auto pt-6">
          {isShopMode ? (
            isOwned ? (
              <PolygonButton disabled colorHex="#22c55e" className="w-full h-[64px] bg-[#111] text-green-500 border border-green-500/30">
                <Check size={18} /> ADQUIRIDO
              </PolygonButton>
            ) : (
              <PolygonButton onClick={() => canAfford ? onAction('buy', item) : null} colorHex={canAfford ? rarity.hex : '#444'} className={`w-full h-[72px] ${canAfford ? 'bg-black/60 backdrop-blur-md text-white hover:bg-black/80' : 'bg-[#0a0a0a] text-white/30'} flex justify-between px-8`}>
                <span className="text-sm">{canAfford ? 'ADQUIRIR ENTORNO' : 'FONDOS INSUFICIENTES'}</span>
                {item.price > 0 && (
                  <div className="flex items-center gap-2">
                    <Gem size={16} fill="currentColor" className={canAfford ? "text-[#8ab4f8]" : "text-white/30"} />
                    <span className="text-xl font-black">{item.price}</span>
                  </div>
                )}
              </PolygonButton>
            )
          ) : (
            isOwned ? (
              <PolygonButton onClick={() => !isEquipped ? onAction('equip', item) : null} colorHex={isEquipped ? '#22c55e' : rarity.hex} disabled={isEquipped} className={`w-full h-[72px] bg-[#1a1a1a] flex justify-center px-8 ${isEquipped ? 'text-green-500' : 'text-white hover:bg-[#222]'}`}>
                <span className="text-sm">{isEquipped ? 'EN USO' : 'EQUIPAR'}</span>
              </PolygonButton>
            ) : (
              <PolygonButton onClick={() => onAction('gotoShop', item)} colorHex="#ef4444" className="w-full h-[72px] bg-[#1a1a1a] text-white hover:bg-[#222] flex justify-between px-8">
                <span className="text-sm flex items-center gap-2"><Lock size={16} /> BLOQUEADO</span>
                <span className="text-xs uppercase tracking-widest text-white/50">Ir a la Tienda</span>
              </PolygonButton>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

const UniversalDetailModal = (props) => {
  if (props.item.category === 'avatar') return <ClashCardModal {...props} />;
  return <BackgroundDetailModal {...props} />;
};

const ChallengeDetail = ({ challenge, onClose, onStart }) => (
  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
    <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
      <button onClick={onClose} className="absolute top-16 left-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
      <div className="flex-1 flex flex-col items-center justify-center mt-10 text-center">
        <div className={`w-28 h-28 rounded-[40px] bg-gradient-to-br ${challenge.color || 'from-gray-700 to-gray-900'} flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 p-6`}>
          {challenge.type === 'app' ? <img src={challenge.icon} className="w-full h-full object-contain filter invert drop-shadow-lg" alt="icon" /> : <challenge.icon size={56} className="drop-shadow-lg" />}
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-3 leading-none">{challenge.title}</h2>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8ab4f8] mb-6">{challenge.duration} DÍAS • {challenge.subtitle}</p>
        <p className="text-sm text-white/70 max-w-xs mb-10 leading-relaxed font-medium">{challenge.desc}</p>

        <div className="flex gap-4 w-full max-w-xs mb-10">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col items-center shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Recompensa</span>
            <span className="text-2xl font-black text-[#8ab4f8] drop-shadow-md">+{challenge.xp} XP</span>
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col items-center shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Botín</span>
            <span className="text-2xl font-black text-white flex items-center gap-2 drop-shadow-md"><Gem size={18} className="text-blue-400" /> +{challenge.diamonds}</span>
          </div>
        </div>

        <button onClick={() => onStart(challenge)} className="w-full max-w-xs bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.2)]">Aceptar Desafío</button>
      </div>
    </div>
  </motion.div>
);

const ChatView = ({ person, onBack, activeChatsHistory, setActiveChatsHistory }) => {
  const PEER_RESPONSES = {
    lucas: [
      '😅 bro yo también lucho con eso, especialmente con TikTok antes de dormir',
      'me pasó igual la semana pasada... lo peor es que después no puedo concentrarme en mate',
      'oye prueba el truco de poner el cel en otra habitación cuando estudias, me cambió la vida lol',
      'sí bro, el profe de biología nos dio un artículo de eso. el FOMO es real 😬',
      '¡eso! yo me puse límites de 30 min diarios en insta y ya hasta duermo mejor',
      'qué pesado eso... yo a veces siento que si no abro el grupo de clase pierdo algo importante pero nunca pasa nada jaja',
      'oye cuántos días llevas sin abrir TikTok? yo voy por 4 y me está costando',
      'exacto!! los snapchats también son una trampa, las rachas te obligan a entrar aunque no quieras'
    ],
    sofia: [
      'yo siento lo mismo! sobre todo cuando veo a otras del colegio con mejores notas y más seguidores ugh',
      'la comparación en insta me destruyó el año pasado ngl 😔 tuve que dejar de seguir a muchas',
      'oye tú usas alguna técnica de estudio? yo empecé con el Pomodoro y me ayuda bastante',
      'exactamente! además de noche el cel me quita el sueño y después en clase no entiendo nada',
      'jajaja yo también tenía esa costumbre de ver reels justo antes de dormir... malísimo',
      'el profe de psico nos habló del dopamina detox y me pareció súper interesante, ¿lo conoces?',
      'estoy intentando hacer eso de anotar mis metas en papel en vez de en el cel, se siente diferente',
      '😂 cero en eso, soy adicta a los estados de whatsapp pero sé que tengo que cortar'
    ],
    mateo: [
      'bro el año pasado perdí materias por pasarme en YouTube y videojuegos, ya aprendí la lección',
      'yo uso la técnica Feynman para estudiar, básicamente te explicas a ti mismo el tema en voz alta',
      'el truco que me funcionó fue bloquear todas las apps con un horario, solo las abro a las 8pm',
      'para la uni necesitás enfocarte sí o sí... los profesores no te esperan como en el colegio',
      '100% de acuerdo, la neurociencia dice que el cerebro tarda 23 min en recuperar el foco después de una distracción',
      'yo le quitá los colores al cel hace 2 semanas (modo gris) y baajé un montón el tiempo de pantalla',
      'estoy haciendo el desafío de Pomodoro Puro de Focusly, vas bien?',
      'los chats grupales son un pozo sin fondo bro, yo los silencio todos y los reviso 1 vez al día'
    ],
    vale: [
      'a mí me da mucho miedo quedarme afuera de los chismes del colegio si no estoy siempre conectada 😬',
      'mi mamá me quitó el cel a las 9pm y al principio odie pero ahora duermo mejor jajaja',
      'cuándo fue la última vez que estudiaste sin música ni series de fondo? yo lo intento y me cuesta',
      'yo todavía no sé bien qué hacer con las rachas de snap, es como una trampa emocional',
      'oye pero tampoco es fácil cuando todos tus amigos están en insta todo el día y tú no',
      '¡me pasó lo mismo! empecé con 5 min de meditación al día y se me hace más fácil concentrarme',
      'ay sí el truco de la escala de grises lo leí en Focusly y voy a probarlo hoy',
      'igual... a veces siento que si no respondo rápido al chat me odian pero sé que no es verdad 😅'
    ],
    thiago: [
      'la clave es separar el tiempo de descanso del tiempo de estudio, no pueden mezclarse',
      'yo uso Anki para flashcards y es brutal para memorizar cosas para los exámenes',
      'el time blocking me salvó este semestre, no es difícil una vez que te acostumbrás',
      'bro el multitasking es un mito total, yo aprendí eso leyendo sobre neurociencia 🧠',
      'lo bueno es que a los 18 todavía podés revertir los hábitos antes de llegar a la uni',
      'yo me propuse leer 10 páginas de un libro antes de dormir en vez de ver el cel, ya llevo 3 semanas',
      'la repetición espaciada es lo mejor para no olvidar lo que estudiás, cambia todo',
      'si querés te paso los videos que uso yo de productividad en YouTube, son buenísimos'
    ]
  };

  const personHistory = activeChatsHistory?.[person.id] || [
    { id: 1, text: `¡Hola! Soy ${person.name}, ¿cómo vas con los bloqueos de apps hoy?`, sender: 'other', time: '10:00 AM' }
  ];

  const [messages, setMessages] = useState(personHistory);
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Persist messages to global history
  useEffect(() => {
    if (setActiveChatsHistory) {
      setActiveChatsHistory(prev => ({ ...prev, [person.id]: messages }));
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), text: input, sender: 'user', time: now };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setShowEmojis(false);

    // Simulate peer typing + reply
    const peerResponses = PEER_RESPONSES[person.botId] || PEER_RESPONSES['lucas'];
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = peerResponses[Math.floor(Math.random() * peerResponses.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'other', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200 + Math.random() * 1200);
  };

  const EMOJIS = ["🔥", "💪", "📚", "😅", "💡", "✅", "😬", "🧠"];

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/40 backdrop-blur-md z-[100] flex flex-col text-white">
      <div className="px-6 pt-16 pb-4 bg-gradient-to-b from-black/80 to-transparent border-b border-white/10 flex items-center gap-4 z-10 relative shadow-lg">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={24} /></button>
        <div className="w-10 h-10 rounded-full border border-white/20 shadow-md overflow-hidden relative bg-[#111] shrink-0 flex items-center justify-center">
          {person.type === 'animated' ? (
            <div className="w-full h-full transform scale-[1.3] pt-1 flex items-center justify-center">
              <AvatarDisplay id={person.avatarId} className="w-full h-full" freeStanding={true} />
            </div>
          ) : (
            <img src={person.avatar} className="w-full h-full object-cover" alt="avatar" />
          )}
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-tight">{person.name}</h2>
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> {person.role}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 custom-scroll relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0"></div>
        {messages.map(msg => (
          <div key={msg.id} className={`p-4 rounded-[24px] max-w-[80%] relative z-10 shadow-md ${msg.sender === 'user' ? 'bg-white text-black self-end rounded-tr-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-white/10 backdrop-blur-sm self-start rounded-tl-sm border border-white/10'}`}>
            <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
            <span className={`text-[8px] font-black uppercase mt-2 flex items-center gap-1 ${msg.sender === 'user' ? 'text-black/40 justify-end' : 'text-white/30'}`}>
              {msg.time} {msg.sender === 'user' && <Check size={10} />}
            </span>
          </div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-sm self-start rounded-[24px] rounded-tl-sm border border-white/10 px-5 py-3 flex items-center gap-1.5 shadow-md">
            <span className="text-[10px] text-white/50 font-bold tracking-wide">{person.name.split('_')[0]} está escribiendo</span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="text-white/60 text-lg leading-none">...</motion.span>
          </motion.div>
        )}
      </div>

      <div className="p-5 bg-black/60 backdrop-blur-xl border-t border-white/10 z-10 relative pb-8">
        <AnimatePresence>
          {showEmojis && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-[90px] left-6 right-6 bg-[#111] border border-white/10 rounded-[24px] p-4 flex justify-between shadow-2xl z-50">
              {EMOJIS.map(e => <button key={e} onClick={() => setInput(i => i + e)} className="text-2xl hover:scale-125 transition-transform">{e}</button>)}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 items-center">
          <button className="p-2 text-white/40 hover:text-white transition-colors"><Paperclip size={20} /></button>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-1 focus-within:border-white/30 focus-within:bg-white/10 transition-colors">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" placeholder="MENSAJE..." className="w-full bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none py-3 text-white placeholder:text-white/30" />
            <button onClick={() => setShowEmojis(!showEmojis)} className={`p-2 transition-colors ${showEmojis ? 'text-white' : 'text-white/40 hover:text-white'}`}><Smile size={18} /></button>
          </div>
          <button onClick={handleSend} disabled={!input.trim()} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95' : 'bg-white/10 text-white/30'}`}><Send size={18} className="ml-1" /></button>
        </div>
      </div>
    </motion.div>
  );
};


const Forum = ({ onSelectChat, unreadFilter, setUnreadFilter, activeTab, setActiveTab, forumPosts, setForumPosts, userAvatarItem, username }) => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('forum_posts').select('*').order('created_at', { ascending: false }).limit(50);
      if (data) {
        const formatted = data.map(post => {
          let content = { text: post.text, authorName: 'Usuario', avatarId: 'a_base', comments: [] };
          try {
            const parsed = JSON.parse(post.text);
            if (parsed.text) content = { ...content, ...parsed };
          } catch(e) {}
          return {
            id: post.id,
            author: { name: content.authorName, avatarId: content.avatarId },
            text: content.text,
            likes: post.likes || 0,
            time: new Date(post.created_at).toLocaleDateString(),
            liked: false,
            comments: content.comments || []
          };
        });
        setForumPosts(formatted);
      }
    };
    if (activeTab === 'comunidad') {
      fetchPosts();
    }
  }, [activeTab, setForumPosts]);

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    const authorName = username || 'Tú';
    const avatarId = userAvatarItem?.id || 'a_base';
    
    // Optimistic UI
    const newPost = {
      id: Date.now().toString(),
      author: { name: authorName, avatarId },
      text: newPostText,
      likes: 0,
      time: 'Justo ahora',
      liked: false,
      comments: []
    };
    setForumPosts([newPost, ...forumPosts]);
    setNewPostText('');

    // Save to Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const payload = { text: newPostText, authorName, avatarId, comments: [] };
      await supabase.from('forum_posts').insert({
        author_id: session.user.id,
        text: JSON.stringify(payload)
      });
    }
  };

  const toggleLike = async (postId) => {
    const target = forumPosts.find(p => p.id === postId);
    if(!target) return;
    const newLikes = target.liked ? target.likes - 1 : target.likes + 1;
    
    setForumPosts(posts => posts.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: newLikes } : p));
    
    // Si no es un ID local (empezando con timestamp), actualizar en DB
    if (postId.length > 20) {
      await supabase.from('forum_posts').update({ likes: newLikes }).eq('id', postId);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newCommentText.trim()) return;
    
    let updatedComments = [];
    setForumPosts(posts => posts.map(p => {
      if (p.id === postId) {
        updatedComments = [...p.comments, { id: Date.now().toString(), author: username || 'Tú', text: newCommentText }];
        return { ...p, comments: updatedComments };
      }
      return p;
    }));
    setNewCommentText('');

    // Actualizar payload en Supabase
    const target = forumPosts.find(p => p.id === postId);
    if (target && postId.length > 20) {
      const payload = { text: target.text, authorName: target.author.name, avatarId: target.author.avatarId, comments: updatedComments };
      await supabase.from('forum_posts').update({ text: JSON.stringify(payload) }).eq('id', postId);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="px-6 pt-16 pb-4 bg-gradient-to-b from-black/80 to-transparent border-b border-white/5">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-lg">Comunicaciones</h1>
        <div className="flex gap-2 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
          <button onClick={() => setActiveTab('avisos')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'avisos' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Avisos</button>
          <button onClick={() => setActiveTab('comunidad')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'comunidad' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Comunidad</button>
          <button onClick={() => setActiveTab('chats')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'chats' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Chats</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-36 custom-scroll space-y-4">
        {activeTab === 'avisos' && AVISOS_DATA.map(aviso => (
          <div key={aviso.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-lg group hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/5 shadow-inner shrink-0">
                {aviso.type === 'event' ? <Star size={18} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" /> : <RefreshCw size={18} className="text-[#8ab4f8] drop-shadow-[0_0_10px_rgba(138,180,248,0.5)]" />}
              </div>
              <div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 block mb-0.5">
                  {aviso.type === 'event' ? 'Evento Global' : 'Actualización del Sistema'}
                </span>
                <span className="text-[10px] font-bold text-white/70 uppercase block">{aviso.time}</span>
              </div>
            </div>
            <h3 className="text-base font-black uppercase tracking-tight text-white mb-2 leading-tight">{aviso.title}</h3>
            <p className="text-xs text-white/70 font-medium leading-relaxed">{aviso.text}</p>
          </div>
        ))}

        {activeTab === 'comunidad' && (
          <div className="space-y-4">
            <div className="bg-black/50 backdrop-blur-md border border-white/5 rounded-3xl p-4 shadow-lg flex items-center gap-3">
              <AvatarDisplay id={userAvatarItem?.id || 'a_base'} src={userAvatarItem?.img || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'} className="w-10 h-10 rounded-full object-cover border border-white/10" freeStanding={true} />
              <input value={newPostText} onChange={(e) => setNewPostText(e.target.value)} type="text" placeholder="¿CÓMO VA TU DISCIPLINA HOY?" className="flex-1 bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-white" />
              <button onClick={handleCreatePost} className="p-2 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-transform"><Send size={14} className="ml-0.5" /></button>
            </div>

            {forumPosts.map(post => (
              <div key={post.id} className="bg-black/50 backdrop-blur-md border border-white/5 rounded-3xl p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  {post.author.avatarId ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-[#111] flex items-center justify-center shrink-0">
                      <div className="w-full h-full transform scale-[1.3] pt-2 flex items-center justify-center">
                        <AvatarDisplay id={post.author.avatarId} className="w-full h-full" freeStanding={true} />
                      </div>
                    </div>
                  ) : (
                    <img src={post.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight">{post.author.name}</h4>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm font-medium mb-5 text-white/80 leading-relaxed">{post.text}</p>

                <div className="flex gap-6 border-t border-white/5 pt-4">
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                    <motion.div animate={post.liked ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.3 }}><Heart size={16} fill={post.liked ? "currentColor" : "none"} className={post.liked ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" : ""} /></motion.div>
                    <span className="text-[10px] font-black">{post.likes}</span>
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} className={`flex items-center gap-2 transition-colors ${expandedPost === post.id ? 'text-blue-400' : 'text-white/40 hover:text-white'}`}>
                    <MessageCircle size={16} /> <span className="text-[10px] font-black">{post.comments.length}</span>
                  </motion.button>
                </div>

                {expandedPost === post.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    {post.comments.length > 0 ? post.comments.map(c => (
                      <div key={c.id} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                        <span className="text-[9px] font-black uppercase text-blue-400 block mb-1">{c.author}</span>
                        <p className="text-[10px] text-white/80 font-medium leading-relaxed">{c.text}</p>
                      </div>
                    )) : (
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center py-2">Sé el primero en comentar.</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 pt-2">
                      <input value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} type="text" placeholder="Escribe un comentario..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/30 transition-colors" />
                      <button onClick={() => handleAddComment(post.id)} className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 hover:scale-105 active:scale-95 transition-all"><Send size={14} className="ml-0.5" /></button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chats' && MESSAGES_DATA.map(msg => (
          <div key={msg.id} onClick={() => onSelectChat(msg)} className="bg-black/50 backdrop-blur-md border border-white/5 rounded-3xl p-4 flex items-center justify-between cursor-pointer hover:border-white/10 transition-all shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-[#111] flex items-center justify-center relative">
                  {msg.type === 'animated' ? (
                    <div className="w-full h-full transform scale-[1.3] pt-2 flex items-center justify-center">
                      <AvatarDisplay id={msg.avatarId} className="w-full h-full" freeStanding={true} />
                    </div>
                  ) : (
                    <img src={msg.avatar} alt="avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                {msg.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(59,130,246,0.6)]" />}
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">{msg.name} {msg.isBot && <Brain size={12} className="text-[#8ab4f8]" />}</h4>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-0.5">{msg.role || (msg.isBot ? 'Mentor IA' : 'Usuario conectado')}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Rankings = ({ userXP, username, inventory }) => {
  const userLeagueIndex = LEAGUES.findIndex((l, i) => {
    if (i === LEAGUES.length - 1) return true;
    const maxXP = parseInt(l.req.split('-')[1]?.replace(/,/g, '') || '999999');
    return userXP <= maxXP;
  });

  const [viewLeagueIndex, setViewLeagueIndex] = useState(userLeagueIndex >= 0 ? userLeagueIndex : 0);
  const viewingLeague = LEAGUES[viewLeagueIndex];
  const isUserLeague = viewLeagueIndex === userLeagueIndex;

  const mockNames = ['Alex_99', 'ZenMaster', 'David_X', 'Emma.Focus', 'Chris_Pro', 'Mia_Flow', 'Tom_Hustle', 'Lily_Zen', 'Samurai', 'Zoe_Dopamine', 'Max_Gains', 'Ava_Deep', 'Leo_Focus', 'Nia_Monk', 'Neo_Matrix'];

  const leaderboard = React.useMemo(() => {
    const minXP = parseInt(viewingLeague.req.split('-')[0]?.replace(/,/g, '') || '0');
    const maxXP = parseInt(viewingLeague.req.split('-')[1]?.replace(/,/g, '') || (minXP + 5000).toString());
    const range = maxXP - minXP;
    const MOCK_AVATARS = ['a_base', 'a_bot', 'a_flame', 'a_ninja', 'a_hacker', 'a_brain', 'a_vento', 'a_crono', 'a_sophia', 'a_icaro', 'a_atlas'];

    let players = mockNames.map((name, i) => {
      const xp = minXP + Math.floor((range * (mockNames.length - i)) / (mockNames.length + 2));
      return { id: `mock_${i}`, name, xp, isUser: false, avatarId: MOCK_AVATARS[i % MOCK_AVATARS.length] };
    });

    if (isUserLeague) {
      players.push({ id: 'user', name: username || 'Tú', xp: userXP, isUser: true, avatarId: inventory?.equippedAvatar || 'a_base' });
    } else {
      players.push({ id: 'bot_middle', name: 'FocusBot', xp: minXP + Math.floor(range / 2), isUser: false, avatarId: 'a_bot' });
    }

    return players.sort((a, b) => b.xp - a.xp);
  }, [viewLeagueIndex, isUserLeague, userXP, username, viewingLeague, inventory]);

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden bg-black/40 backdrop-blur-sm">
      {/* Header - Ligas */}
      <div className="pt-16 pb-4 bg-gradient-to-b from-black/90 to-transparent border-b border-white/5 relative z-20">
        <div className="flex justify-center items-center gap-6 px-6 overflow-x-auto custom-scroll snap-x py-2">
          {LEAGUES.map((l, i) => {
            const isActive = i === viewLeagueIndex;
            return (
              <div key={l.id} onClick={() => setViewLeagueIndex(i)} className={`shrink-0 snap-center flex flex-col items-center transition-all duration-300 cursor-pointer ${isActive ? 'scale-110 opacity-100' : 'scale-75 opacity-40 hover:opacity-80'}`}>
                <l.icon size={isActive ? 44 : 32} color={l.hex} className={isActive ? `drop-shadow-[0_0_15px_${l.hex}80]` : ''} />
              </div>
            );
          })}
        </div>
        <div className="text-center mt-3">
          <h2 className="text-2xl font-black uppercase tracking-tighter" style={{ color: viewingLeague.hex }}>{viewingLeague.name}</h2>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mt-1">
            {isUserLeague ? 'Tu liga actual' : 'Clasificación global'}
          </p>
        </div>
      </div>

      {/* Leaderboard Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36 custom-scroll">
        <div className="bg-black/50 backdrop-blur-md rounded-[32px] p-2 border border-white/10 shadow-lg flex flex-col">
          {leaderboard.map((p, i) => {
            return (
              <React.Fragment key={p.id}>
                <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex items-center justify-between p-3 transition-all ${p.isUser ? 'bg-white border-2 border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-[20px] my-2 scale-[1.02] relative z-10' : 'hover:bg-white/5 rounded-[20px]'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-black w-6 text-center ${p.isUser ? 'text-black' : i === 0 ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-white/30'}`}>{i + 1}</span>
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-[#111] overflow-hidden shrink-0">
                      <AvatarDisplay id={p.avatarId} className="w-[120%] h-[120%]" freeStanding={true} />
                    </div>
                    <span className={`text-xs font-black tracking-wide ${p.isUser ? 'text-black' : 'text-white'}`}>{p.name}</span>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${p.isUser ? 'bg-black text-white' : 'text-[#8ab4f8] bg-[#8ab4f8]/10 border border-[#8ab4f8]/20'}`}>{p.xp} XP</span>
                </motion.div>
                {i === 2 && viewLeagueIndex < LEAGUES.length - 1 && (
                  <motion.div layout className="h-[2px] w-full bg-green-500/30 my-3 relative flex items-center justify-center">
                    <span className="absolute bg-green-950 text-green-400 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-green-500/50 tracking-widest z-10 shadow-[0_0_10px_rgba(34,197,94,0.3)]">Zona de Ascenso</span>
                  </motion.div>
                )}
                {i === leaderboard.length - 4 && viewLeagueIndex > 0 && (
                  <motion.div layout className="h-[2px] w-full bg-red-500/30 my-3 relative flex items-center justify-center">
                    <span className="absolute bg-red-950 text-red-400 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-red-500/50 tracking-widest z-10 shadow-[0_0_10px_rgba(239,68,68,0.3)]">Zona de Descenso</span>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ShopView = ({ userDiamonds, onSelectItem, inventory }) => {
  const [shopTab, setShopTab] = useState('personajes');
  const avatars = SHOP_ITEMS.filter(i => i.category === 'avatar');
  const backgrounds = SHOP_ITEMS.filter(i => i.category === 'background');

  const SectionTitle = ({ title, hex }) => (
    <div className="flex items-center gap-3 mb-6 mt-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
      <div className="w-2 h-2 rotate-45" style={{ backgroundColor: hex }} />
      <h2 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: hex }}>{title}</h2>
      <div className="w-2 h-2 rotate-45" style={{ backgroundColor: hex }} />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
    </div>
  );

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="px-6 pt-16 pb-4 flex justify-between items-end relative z-10 border-b border-white/5 bg-gradient-to-b from-[#111]/80 to-transparent">
        <div>
          <span className="text-[10px] font-black text-white/50 tracking-[0.3em] uppercase block mb-1">Mercado Negro</span>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none transform -skew-x-6">Tienda</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 border-l-2 border-l-[#8ab4f8] shadow-lg transform skew-x-6">
          <Gem size={14} className="text-[#8ab4f8] -skew-x-6 transform" fill="#8ab4f8" />
          <span className="font-black text-[#8ab4f8] tracking-widest text-xs -skew-x-6 transform">{userDiamonds.toLocaleString()}</span>
        </div>
      </div>
      <div className="px-6 mt-4 z-10">
        <div className="flex gap-2 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
          <button onClick={() => setShopTab('personajes')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${shopTab === 'personajes' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Personajes</button>
          <button onClick={() => setShopTab('entornos')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${shopTab === 'entornos' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Entornos</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-36 custom-scroll relative z-10">
        {shopTab === 'personajes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionTitle title="Reclutas" hex="#ffffff" />
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((item) => {
                const owned = inventory.avatars.includes(item.id);
                const rColor = RARITIES[item.rarity].hex;
                return (
                  <PolygonCard key={item.id} onClick={() => onSelectItem(item)} rarityColor={rColor} isLocked={false}>
                    <div className="h-32 p-4 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent">
                      <AvatarDisplay id={item.id} src={item.img} className="w-full h-full drop-shadow-2xl" freeStanding={true} />
                    </div>
                    <div className="p-3 border-t border-white/5 bg-black/50 flex flex-col items-center text-center">
                      <span className="text-[8px] font-black uppercase tracking-widest mb-1 px-2 py-0.5" style={{ color: rColor, backgroundColor: `${rColor}22` }}>{RARITIES[item.rarity].name}</span>
                      <h3 className="text-xs font-black uppercase tracking-tight text-white mb-2">{item.name}</h3>
                      {owned ? (
                        <span className="text-[9px] font-black uppercase text-green-500 tracking-widest">Adquirido</span>
                      ) : (
                        <div className="flex items-center gap-1"><Gem size={10} className="text-white/50" /><span className="text-[10px] font-black text-white/80">{item.price}</span></div>
                      )}
                    </div>
                  </PolygonCard>
                )
              })}
            </div>
          </motion.div>
        )}
        {shopTab === 'entornos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SectionTitle title="Hologramas" hex="#a855f7" />
            <div className="flex flex-col gap-4 mb-8">
              {backgrounds.map((item) => {
                const owned = inventory.backgrounds.includes(item.id);
                const rColor = RARITIES[item.rarity].hex;
                return (
                  <PolygonCard key={item.id} onClick={() => onSelectItem(item)} rarityColor={rColor} isLocked={false}>
                    <div className="flex h-24">
                      <div className="w-1/3 relative overflow-hidden bg-black/40">
                        <AvatarDisplay id={item.id} className="absolute inset-0 w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 z-10"></div>
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-center bg-black/50">
                        <span className="text-[8px] font-black uppercase tracking-widest mb-1 w-max px-2 py-0.5" style={{ color: rColor, backgroundColor: `${rColor}22` }}>{RARITIES[item.rarity].name}</span>
                        <h3 className="text-sm font-black uppercase tracking-tight text-white mb-1">{item.name}</h3>
                        {owned ? (
                          <span className="text-[9px] font-black uppercase text-green-500 tracking-widest mt-auto">Adquirido</span>
                        ) : (
                          <div className="flex items-center gap-1 mt-auto"><Gem size={10} className="text-white/50" /><span className="text-[10px] font-black text-white/80">{item.price}</span></div>
                        )}
                      </div>
                    </div>
                  </PolygonCard>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- MODAL: ESTADÍSTICAS ---
const StatsModal = ({ onClose, calendarTasks, completedCount, userXP }) => {
  const habits = (calendarTasks || []).filter(t => t.isHabit);
  const todayStr = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completedDates?.includes(todayStr));
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);
  const totalStreaks = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
  const compliance = habits.length > 0 ? Math.round((completedToday.length / habits.length) * 100) : 0;
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    return { label: ['D','L','M','X','J','V','S'][d.getDay()], count: habits.filter(h => h.completedDates?.includes(key)).length, max: habits.length || 1 };
  });
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().split('T')[0];
    return { key, count: habits.filter(h => h.completedDates?.includes(key)).length, max: habits.length || 1 };
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden">
      <div className="px-6 pt-14 pb-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div>
          <p className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase mb-1">Tu Progreso</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Estadísticas</h2>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><X size={18} className="text-white" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Hábitos Creados', value: habits.length, icon: '📋', color: 'from-blue-900/60 to-indigo-900/60', border: 'border-blue-500/20' },
            { label: 'Completados Hoy', value: completedToday.length, icon: '✅', color: 'from-emerald-900/60 to-teal-900/60', border: 'border-emerald-500/20' },
            { label: 'Cumplimiento', value: `${compliance}%`, icon: '🎯', color: 'from-purple-900/60 to-violet-900/60', border: 'border-purple-500/20' },
            { label: 'Racha Máxima', value: `${maxStreak}d`, icon: '🔥', color: 'from-orange-900/60 to-red-900/60', border: 'border-orange-500/20' },
            { label: 'Rachas Totales', value: totalStreaks, icon: '⚡', color: 'from-yellow-900/60 to-amber-900/60', border: 'border-yellow-500/20' },
            { label: 'Desafíos', value: completedCount || 0, icon: '🏆', color: 'from-pink-900/60 to-rose-900/60', border: 'border-pink-500/20' },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-gradient-to-br ${m.color} border ${m.border} rounded-[20px] p-4`}>
              <div className="text-xl mb-2">{m.icon}</div>
              <div className="text-2xl font-black text-white">{m.value}</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Actividad Últimos 7 Días</h4>
          <div className="flex items-end gap-2 h-20">
            {last7.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md relative" style={{ height: '60px', background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${d.max > 0 ? Math.max(4, Math.round((d.count / d.max) * 100)) : 4}%` }} transition={{ delay: i * 0.06, duration: 0.5 }} className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-[#8ab4f8] to-[#a78bfa]" />
                </div>
                <span className="text-[7px] font-black text-white/30 uppercase">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Actividad Últimos 30 Días</h4>
          <div className="flex flex-wrap gap-1.5">
            {last30.map((d, i) => {
              const opacity = d.max > 0 && d.count > 0 ? Math.min(1, 0.25 + (d.count / d.max) * 0.75) : 0.05;
              return <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }} className="w-7 h-7 rounded-md" style={{ background: `rgba(138,180,248,${opacity})` }} title={`${d.count} hábitos`} />;
            })}
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-indigo-500/20 rounded-[24px] p-5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8ab4f8] mb-4">Resumen General</h4>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center"><span className="text-[11px] font-semibold text-white/60">Días activos (último mes)</span><span className="text-[11px] font-black text-white">{last30.filter(d => d.count > 0).length} / 30</span></div>
            <div className="flex justify-between items-center"><span className="text-[11px] font-semibold text-white/60">XP Total</span><span className="text-[11px] font-black text-[#8ab4f8]">{userXP}</span></div>
            <div className="flex justify-between items-center"><span className="text-[11px] font-semibold text-white/60">Objetivos alcanzados</span><span className="text-[11px] font-black text-emerald-400">{completedCount || 0}</span></div>
          </div>
          <div className="h-2 bg-black/30 rounded-full overflow-hidden mb-1">
            <motion.div initial={{ width: 0 }} animate={{ width: `${compliance}%` }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-[#8ab4f8] to-[#a78bfa] rounded-full" />
          </div>
          <div className="flex justify-between">
            <span className="text-[8px] text-white/30 font-bold">0%</span>
            <span className="text-[8px] text-white/40 font-black">Cumplimiento: {compliance}%</span>
            <span className="text-[8px] text-white/30 font-bold">100%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MODAL: CREAR HÁBITO ---
const CreateHabitModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('salud');
  const [frequency, setFrequency] = useState('diario');
  const [difficulty, setDifficulty] = useState('medio');
  const categories = [
    { id: 'salud', label: 'Salud', icon: '💪' }, { id: 'mente', label: 'Mente', icon: '🧠' },
    { id: 'social', label: 'Social', icon: '💬' }, { id: 'estudio', label: 'Estudio', icon: '📚' },
    { id: 'deporte', label: 'Deporte', icon: '🏃' }, { id: 'creatividad', label: 'Creatividad', icon: '🎨' },
  ];
  const difficulties = [
    { id: 'facil', label: 'Fácil', xp: 10 }, { id: 'medio', label: 'Medio', xp: 25 }, { id: 'dificil', label: 'Difícil', xp: 50 },
  ];
  const handleAdd = () => {
    if (!title.trim()) return;
    const cat = categories.find(c => c.id === category);
    const diff = difficulties.find(d => d.id === difficulty);
    onAdd({ id: `habit_${Date.now()}`, title: title.trim(), desc: desc.trim(), category, categoryIcon: cat?.icon || '📋', frequency, difficulty, xpReward: diff?.xp || 25, streak: 0, completedDates: [], isHabit: true });
    onClose();
  };
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} className="absolute inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden">
      <div className="px-6 pt-14 pb-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div><p className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase mb-1">Nuevo</p><h2 className="text-2xl font-black uppercase tracking-tight text-white">Crear Hábito</h2></div>
        <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center"><X size={18} className="text-white" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll space-y-5">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Nombre del Hábito</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Leer 30 minutos..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-[13px] font-medium text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors" />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Descripción (opcional)</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="¿Por qué quieres este hábito?" rows={2} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-[13px] font-medium text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors resize-none" />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Categoría</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)} className={`py-3 rounded-2xl text-[8px] font-black uppercase tracking-wider border flex flex-col items-center gap-1 transition-all ${category === cat.id ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}>
                <span className="text-lg">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Frecuencia</label>
          <div className="flex gap-2">
            {[{ id: 'diario', label: 'Diario' }, { id: 'semanal', label: 'Semanal' }, { id: 'personalizado', label: 'Custom' }].map(f => (
              <button key={f.id} onClick={() => setFrequency(f.id)} className={`flex-1 py-3 rounded-2xl text-[8px] font-black uppercase tracking-wider border transition-all ${frequency === f.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}>{f.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Dificultad</label>
          <div className="flex gap-2">
            {difficulties.map(d => (
              <button key={d.id} onClick={() => setDifficulty(d.id)} className={`flex-1 py-3 rounded-2xl text-[8px] font-black uppercase tracking-wider border transition-all flex flex-col items-center gap-0.5 ${difficulty === d.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}>
                {d.label}<span className="text-[7px] font-black">+{d.xp} XP</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 pb-10 pt-4 shrink-0 border-t border-white/10">
        <button onClick={handleAdd} disabled={!title.trim()} className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${title.trim() ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>Crear Hábito</button>
      </div>
    </motion.div>
  );
};

// --- MODAL: PLAN IA DE HÁBITOS ---
const AIHabitPlanModal = ({ onClose, onAddHabits }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const PLANS = [
    { id: 'detox', name: 'Detox Digital', icon: '📵', desc: 'Reduce tu dependencia del teléfono.', color: 'from-purple-900/80 to-indigo-900/80', border: 'border-purple-500/30', habits: [
      { title: 'Teléfono boca abajo 1h', category: 'mente', categoryIcon: '🧠', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Sin mirar el teléfono durante una hora.' },
      { title: 'Sin redes antes de las 9AM', category: 'mente', categoryIcon: '🧠', difficulty: 'medio', xpReward: 25, frequency: 'diario', desc: 'Empieza el día sin distracciones.' },
      { title: '30 min sin pantallas antes de dormir', category: 'salud', categoryIcon: '💪', difficulty: 'medio', xpReward: 25, frequency: 'diario', desc: 'Mejora tu calidad de sueño.' },
      { title: 'Un día sin TikTok/Instagram', category: 'mente', categoryIcon: '🧠', difficulty: 'dificil', xpReward: 50, frequency: 'semanal', desc: 'Un día completo sin redes de entretenimiento.' },
    ]},
    { id: 'academic', name: 'Enfoque Académico', icon: '📚', desc: 'Maximiza tu productividad estudiantil.', color: 'from-blue-900/80 to-cyan-900/80', border: 'border-blue-500/30', habits: [
      { title: 'Pomodoro 25 min', category: 'estudio', categoryIcon: '📚', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Estudia 25 minutos con concentración total.' },
      { title: 'Repasar apuntes del día', category: 'estudio', categoryIcon: '📚', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Consolida lo aprendido antes de dormir.' },
      { title: 'Planificar tareas del día', category: 'estudio', categoryIcon: '📚', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Organiza tu lista cada mañana.' },
      { title: 'Leer 20 páginas', category: 'mente', categoryIcon: '🧠', difficulty: 'medio', xpReward: 25, frequency: 'diario', desc: 'Lee un libro de crecimiento personal.' },
    ]},
    { id: 'health', name: 'Salud y Energía', icon: '⚡', desc: 'Construye hábitos para rendir mejor.', color: 'from-emerald-900/80 to-teal-900/80', border: 'border-emerald-500/30', habits: [
      { title: 'Beber 8 vasos de agua', category: 'salud', categoryIcon: '💪', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Hidratación óptima para el cerebro.' },
      { title: '30 min de ejercicio', category: 'deporte', categoryIcon: '🏃', difficulty: 'medio', xpReward: 25, frequency: 'diario', desc: 'Actividad física que mejora la concentración.' },
      { title: 'Dormir 8 horas', category: 'salud', categoryIcon: '💪', difficulty: 'medio', xpReward: 25, frequency: 'diario', desc: 'El sueño es crucial para la memoria.' },
      { title: 'Meditar 10 minutos', category: 'mente', categoryIcon: '🧠', difficulty: 'facil', xpReward: 10, frequency: 'diario', desc: 'Reduce el estrés y mejora el enfoque.' },
    ]},
  ];
  const handleGenerate = (plan) => {
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setGeneratedPlan(plan); }, 1800);
  };
  const handleAddAll = () => {
    if (!generatedPlan) return;
    onAddHabits(generatedPlan.habits.map(h => ({ ...h, id: `habit_${Date.now()}_${Math.random().toString(36).substr(2,5)}`, streak: 0, completedDates: [], isHabit: true })));
    onClose();
  };
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} className="absolute inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden">
      <div className="px-6 pt-14 pb-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div><p className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase mb-1">Asistente IA</p><h2 className="text-2xl font-black uppercase tracking-tight text-white">Plan de Hábitos</h2></div>
        <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center"><X size={18} className="text-white" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
        {!generatedPlan && !isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-[11px] text-white/50 font-medium leading-relaxed mb-2">Elige un objetivo y la IA generará un plan personalizado para ti.</p>
            {PLANS.map(plan => (
              <motion.button key={plan.id} whileTap={{ scale: 0.98 }} onClick={() => handleGenerate(plan)} className={`w-full bg-gradient-to-r ${plan.color} border ${plan.border} rounded-[24px] p-5 text-left`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{plan.icon}</div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-tight text-white">{plan.name}</h3>
                    <p className="text-[10px] text-white/50 font-medium mt-1">{plan.desc}</p>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-1.5">{plan.habits.length} hábitos incluidos →</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center h-64 gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Sparkles size={28} className="text-white" /></motion.div>
            </div>
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-tight text-white">Generando plan...</p>
              <p className="text-[10px] text-white/40 font-medium mt-2">La IA está analizando tu perfil</p>
            </div>
          </div>
        )}
        {generatedPlan && !isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{generatedPlan.icon}</div>
              <div><p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Plan Generado ✓</p><h3 className="text-lg font-black uppercase text-white">{generatedPlan.name}</h3></div>
            </div>
            {generatedPlan.habits.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-[20px] p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{h.categoryIcon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-black uppercase tracking-tight text-white">{h.title}</h4>
                    <p className="text-[9px] text-white/40 font-medium mt-1">{h.desc}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[7px] font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full text-white/50">{h.frequency}</span>
                      <span className="text-[7px] font-black uppercase tracking-widest bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-400">+{h.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {generatedPlan && !isGenerating && (
        <div className="px-6 pb-10 pt-4 shrink-0 border-t border-white/10">
          <button onClick={handleAddAll} className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg">
            Añadir {generatedPlan.habits.length} hábitos al plan
          </button>
        </div>
      )}
    </motion.div>
  );
};

const LOG_ICONS = {
  Activity: Activity,
  Target: Target,
  Calendar: Calendar,
  Trophy: Trophy,
  Shield: Shield
};

const ProfileView = ({ inventory, setInventory, userXP, username, onOpenItem, completedCount, activityLog, selectedApps, setSelectedApps, lang, setLang, userEmail, isAnonymous, onSignOut, onLinkAccount, onOpenStats, loginStreak, isLight, toggleMode, onOpenLanding }) => {
  const [activeProfileTab, setActiveProfileTab] = useState('estado');
  const [activeTab, setActiveTab] = useState('avatars');
  const [showAppSelector, setShowAppSelector] = useState(false);

  const equippedAvatarItem = SHOP_ITEMS.find(i => i.id === inventory.equippedAvatar);
  const activeSkinId = inventory.equippedSkins?.[equippedAvatarItem?.id];
  const activeSkinData = activeSkinId ? ALL_SKINS.find(s => s.id === activeSkinId) : null;

  const currentLeagueObj = LEAGUES.find((l, i) => {
    if (i === LEAGUES.length - 1) return true;
    const maxXP = parseInt(l.req.split('-')[1].replace(/,/g, ''));
    return userXP <= maxXP;
  }) || LEAGUES[0];

  const allAvatars = SHOP_ITEMS.filter(i => i.category === 'avatar');
  const allBackgrounds = SHOP_ITEMS.filter(i => i.category === 'background');

  const groupedAvatars = RARITY_ORDER.map(r => ({ rarity: RARITIES[r], items: allAvatars.filter(i => i.rarity === r) })).filter(g => g.items.length > 0);
  const groupedBackgrounds = RARITY_ORDER.map(r => ({ rarity: RARITIES[r], items: allBackgrounds.filter(i => i.rarity === r) })).filter(g => g.items.length > 0);

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto pb-36 custom-scroll">
        <div className="flex flex-col items-center mt-16 mb-8 relative px-6">
          <div className="relative group w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full pointer-events-none"></div>
            <AvatarDisplay id={equippedAvatarItem?.id} src={equippedAvatarItem?.img} className="w-full h-full z-10" freeStanding={true} skinFilters={activeSkinData} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mt-6 text-white">{username}</h2>
          <div className="flex gap-10 mt-3 text-center">
            <div><span className="block text-xl font-black text-white">{userXP}</span><span className="text-[9px] text-white/50 tracking-widest uppercase">XP Total</span></div>
            <div><span className="block text-xl font-black text-white">{currentLeagueObj.name}</span><span className="text-[9px] text-white/50 tracking-widest uppercase">Liga</span></div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 mx-6 shadow-md">
          <button onClick={() => setActiveProfileTab('estado')} className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeProfileTab === 'estado' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Estado</button>
          <button onClick={() => setActiveProfileTab('coleccion')} className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeProfileTab === 'coleccion' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Colección</button>
        </div>

        {activeProfileTab === 'estado' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-6 pb-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight drop-shadow-md">Métricas</h3>
                <button 
                  onClick={onOpenStats}
                  className="px-4 py-2 bg-gradient-to-r from-[#8ab4f8] to-[#a78bfa] hover:from-[#a78bfa] hover:to-[#8ab4f8] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg active:scale-95 transition-all"
                >
                  Estadísticas
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-[24px] border border-white/10 flex flex-col justify-between shadow-lg">
                  <Calendar size={18} className="text-white/50 mb-3" />
                  <span className="text-3xl font-black text-white">{loginStreak || 0}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Días de Racha</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-[24px] border border-white/10 flex flex-col justify-between shadow-lg">
                  <LayoutGrid size={18} className="text-white/50 mb-3" />
                  <span className="text-3xl font-black text-white">{selectedApps?.length || 0}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Apps Activas</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-[24px] border border-white/10 flex flex-col justify-between shadow-lg">
                  <Trophy size={18} className="text-white/50 mb-3" />
                  <span className="text-3xl font-black text-white">{completedCount || 0}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Desafíos</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-[24px] border border-white/10 flex flex-col justify-between shadow-lg">
                  <TrendingUp size={18} className="text-white/50 mb-3" />
                  <span className="text-3xl font-black text-white">Top 10</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Rango Global</span>
                </div>
              </div>
            </div>

            {activityLog && activityLog.length > 0 && (
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 drop-shadow-md">Actividad Reciente</h3>
                <div className="space-y-3">
                  {activityLog.map((act, idx) => {
                    let IconComponent = Activity;
                    if (act.icon) {
                      if (typeof act.icon === 'string') {
                        IconComponent = LOG_ICONS[act.icon] || Activity;
                      } else if (typeof act.icon === 'function') {
                        IconComponent = act.icon;
                      }
                    }
                    const Icon = IconComponent;
                    return (
                      <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-[20px] p-4 flex items-center justify-between border border-white/10 shadow-md hover:border-white/20 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            {Icon && <Icon size={20} className="text-[#8ab4f8]" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-white mb-0.5">{act.title}: {act.subtitle}</h4>
                            <span className="text-[9px] font-black tracking-widest text-white/40 uppercase">{act.time}</span>
                          </div>
                        </div>
                        <ChevronLeft size={16} className="text-white/30 rotate-180" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex gap-3">
                <button onClick={() => setShowAppSelector(!showAppSelector)} className="flex-grow bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm p-4 rounded-[20px] border border-white/10 shadow-lg flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><LayoutGrid size={18} className="text-white" /></div>
                    <h3 className="text-sm font-black uppercase tracking-tight drop-shadow-md">Apps</h3>
                  </div>
                  <ChevronDown size={20} className={`text-white/50 transition-transform duration-300 ${showAppSelector ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="w-16 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm rounded-[20px] border border-white/10 shadow-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-[8px] text-white/50 font-bold uppercase tracking-widest mb-1">Idioma</span>
                    <span className="text-sm font-black uppercase text-white">{lang}</span>
                  </button>
                  {toggleMode && (
                    <button onClick={toggleMode} className="w-16 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm rounded-[20px] border border-white/10 shadow-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-[8px] text-white/50 font-bold uppercase tracking-widest mb-1">Tema</span>
                      {isLight ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-white" />}
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      const nextBg = inventory.equippedBg === 'bg_light' ? 'bg_default' : 'bg_light';
                      setInventory(prev => ({ ...prev, equippedBg: nextBg }));
                    }} 
                    className="w-16 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm rounded-[20px] border border-white/10 shadow-lg flex flex-col items-center justify-center shrink-0"
                  >
                    <Palette size={18} className="text-white/50 mb-1" />
                    <span className="text-[8px] font-black uppercase text-white tracking-widest">{inventory.equippedBg === 'bg_light' ? 'Claro' : 'Oscuro'}</span>
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {showAppSelector && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid grid-cols-3 gap-x-4 gap-y-6 bg-white/5 backdrop-blur-sm p-6 rounded-[24px] border border-white/10 shadow-lg mt-4">
                      {APPS.map(app => {
                        const isSelected = selectedApps?.includes(app.id);
                        return (
                          <motion.button key={app.id} onClick={() => setSelectedApps && setSelectedApps(p => p.includes(app.id) ? p.filter(x => x !== app.id) : [...p, app.id])} whileTap={{ scale: 0.9 }} className="relative flex flex-col items-center gap-2 outline-none mx-auto">
                            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-500">
                              <img src={app.icon} className={`w-full h-full object-contain transition-all duration-500 ${isSelected ? 'grayscale-0 opacity-100 scale-110 brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'grayscale opacity-30 scale-90 brightness-200'}`} alt={app.name} />
                              <AnimatePresence>
                                {isSelected && <motion.div key={`check-${app.id}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute -top-1 -right-1 w-4 h-4 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg"><Check size={10} color="white" strokeWidth={3} /></motion.div>}
                              </AnimatePresence>
                            </div>
                            <span className={`text-[7px] font-black uppercase tracking-widest transition-colors duration-500 ${isSelected ? 'text-white' : 'text-white/20'}`}>{app.name}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ajustes de Cuenta */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[28px] border border-white/10 shadow-lg mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-[#8ab4f8]" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-white">Ajustes de Cuenta</h3>
              </div>

              {isAnonymous ? (
                <div className="space-y-4">
                  <p className="text-[11px] text-yellow-400 font-medium leading-relaxed bg-yellow-500/10 p-3.5 rounded-2xl border border-yellow-500/20">
                    ⚠️ Usando cuenta temporal de invitado. Registra tu cuenta para guardar tu progreso en la nube y acceder como desarrollador.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onLinkAccount(false)} 
                      className="flex-1 bg-white text-black py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-md text-center"
                    >
                      Registrarse
                    </button>
                    <button 
                      onClick={() => onLinkAccount(true)} 
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border border-white/10 shadow-md text-center"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/10 p-3.5 rounded-2xl border border-green-500/20 flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-widest text-green-400 uppercase">🟢 Cuenta Vinculada</span>
                    <span className="text-[11px] font-bold text-white/80 select-all truncate">{userEmail}</span>
                  </div>
                  <button 
                    onClick={onSignOut} 
                    className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border border-red-500/20 shadow-md text-center"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}

              {onOpenLanding && (
                <button 
                  onClick={onOpenLanding}
                  className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border border-indigo-500/30 shadow-md text-center flex items-center justify-center gap-2 mt-4"
                >
                  <Globe size={14} /> Ver Landing Page
                </button>
              )}
            </div>

          </motion.div>
        )}

        {activeProfileTab === 'coleccion' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pb-6">
            <div className="flex gap-2 mb-6 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
              <button onClick={() => setActiveTab('avatars')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'avatars' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Personajes</button>
              <button onClick={() => setActiveTab('backgrounds')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'backgrounds' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Entornos</button>
            </div>

            <div className="space-y-8">
              {activeTab === 'avatars' && groupedAvatars.map((group, gIdx) => (
                <div key={gIdx}>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 drop-shadow-md" style={{ color: group.rarity.hex }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.rarity.hex }}></span>
                    {group.rarity.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {group.items.map(item => {
                      const isOwned = inventory.avatars.includes(item.id);
                      const isEquipped = inventory.equippedAvatar === item.id;
                      const skinForAvatar = inventory.equippedSkins?.[item.id];
                      const skinFilters = skinForAvatar ? ALL_SKINS.find(s => s.id === skinForAvatar) : null;

                      return (
                        <div key={`inv-av-${item.id}`} onClick={() => onOpenItem(item)} className={`relative h-40 rounded-[24px] overflow-hidden cursor-pointer border-2 transition-all bg-black/50 backdrop-blur-md flex flex-col ${isEquipped ? 'scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]' : isOwned ? 'hover:border-white/30' : ''}`} style={{ borderColor: isEquipped ? group.rarity.hex : isOwned ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.5)' }}>
                          <div className="flex-1 relative flex items-center justify-center p-4">
                            <AvatarDisplay id={item.id} src={item.img} className="w-full h-full" freeStanding={true} isLocked={!isOwned} skinFilters={skinFilters} />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute bottom-3 w-full flex justify-center items-center z-10 px-3">
                            {isEquipped ? <span className="text-[10px] font-black uppercase text-black px-3 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: group.rarity.hex }}>Activo</span> :
                              isOwned ? <span className="text-[10px] font-black uppercase text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">Poseído</span> :
                                <span className="text-[9px] font-black uppercase text-white/40 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">Bloqueado</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {activeTab === 'backgrounds' && groupedBackgrounds.map((group, gIdx) => (
                <div key={gIdx}>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 drop-shadow-md" style={{ color: group.rarity.hex }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.rarity.hex }}></span>
                    {group.rarity.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {group.items.map(item => {
                      const isOwned = inventory.backgrounds.includes(item.id);
                      const isEquipped = inventory.equippedBg === item.id;

                      return (
                        <div key={`inv-bg-${item.id}`} onClick={() => onOpenItem(item)} className={`relative h-32 rounded-[24px] overflow-hidden cursor-pointer border-2 transition-all bg-black/50 backdrop-blur-md ${isEquipped ? 'scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]' : isOwned ? 'hover:border-white/30' : ''}`} style={{ borderColor: isEquipped ? group.rarity.hex : isOwned ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.5)' }}>
                          <div className={`absolute inset-0 w-full h-full z-0 transition-all ${isOwned ? '' : 'brightness-[0.2] opacity-40'}`}>
                            <AvatarDisplay id={item.id} className="absolute inset-0 w-full h-full" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10"></div>
                          {!isOwned && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <Lock size={20} className="text-white/40 drop-shadow-md" />
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-30">
                            <h4 className={`text-[10px] font-black uppercase leading-tight max-w-[70%] ${isOwned ? 'text-white' : 'text-white/40'}`}>{item.name}</h4>
                            {isEquipped ? <Check size={14} color={group.rarity.hex} /> : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- BEHAVIORAL AI ENGINE ---
const useBehavioralAI = (supabaseUserId, selectedApps, lang = 'es') => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!supabaseUserId) return;
    const analyze = async () => {
      setIsLoading(true);
      try {
        const { data: sessions } = await supabase
          .from('focus_sessions')
          .select('session_type, xp_earned, diamonds_earned, created_at')
          .eq('user_id', supabaseUserId)
          .order('created_at', { ascending: false })
          .limit(20);

        const recs = [];
        if (!sessions || sessions.length === 0) {
          recs.push({
            id: 'first', icon: '🚀',
            title: lang === 'en' ? 'Start your first challenge!' : '¡Comienza tu primer desafío!',
            desc: lang === 'en' ? 'You have no activity yet. Start small — try a 7-day challenge.' : 'No tienes actividad aún. Empieza con algo pequeño: un desafío de 7 días.',
            color: 'from-blue-600/30 to-indigo-900/30', border: 'border-blue-500/30'
          });
        } else {
          const totalSessions = sessions.length;
          const totalXP = sessions.reduce((s, r) => s + (r.xp_earned || 0), 0);
          const avgXP = totalXP / totalSessions;

          // Rule 1: Si el usuario tiene muchas sesiones completadas → desafío largo
          if (totalSessions >= 5) {
            recs.push({
              id: 'veteran', icon: '🏆',
              title: lang === 'en' ? `Veteran detected: ${totalSessions} sessions` : `Veterano detectado: ${totalSessions} sesiones`,
              desc: lang === 'en' ? `You average ${Math.round(avgXP)} XP/session. Try a 21-day Mythic challenge!` : `Promedias ${Math.round(avgXP)} XP por sesión. ¡Prueba un desafío mítico de 21 días!`,
              color: 'from-yellow-600/30 to-orange-900/30', border: 'border-yellow-500/30'
            });
          }

          // Rule 2: Si gana poca XP → desafíos más accesibles
          if (avgXP < 100 && totalSessions >= 2) {
            recs.push({
              id: 'easy', icon: '🎯',
              title: lang === 'en' ? 'Build momentum' : 'Construye impulso',
              desc: lang === 'en' ? 'Your sessions show low XP gains. Start with shorter 3-day sprints to build the habit.' : 'Tus sesiones muestran ganancias bajas. Prueba sprints de 3 días para construir el hábito.',
              color: 'from-green-600/30 to-teal-900/30', border: 'border-green-500/30'
            });
          }

          // Rule 3: Basado en apps bloqueadas
          if (selectedApps.includes('tt')) {
            recs.push({
              id: 'tiktok', icon: '🧠',
              title: lang === 'en' ? 'TikTok detected in your list' : 'TikTok detectado en tu lista',
              desc: lang === 'en' ? 'TikTok is the #1 dopamine trap. The "21-Day Abstinence" challenge will reset your neural reward system.' : 'TikTok es la trampa de dopamina #1. El desafío "Abstinencia Total" (21 días) reiniciará tu sistema de recompensa neural.',
              color: 'from-pink-600/30 to-purple-900/30', border: 'border-pink-500/30'
            });
          }
          if (selectedApps.includes('insta')) {
            recs.push({
              id: 'insta', icon: '📸',
              title: lang === 'en' ? 'Instagram Stories drain focus' : 'Las Stories de Instagram drenan el foco',
              desc: lang === 'en' ? 'The "Story Fast" challenge (7 days) shows a 40% improvement in daily concentration.' : 'El desafío "Ayuno de Stories" (7 días) muestra un 40% de mejora en concentración diaria.',
              color: 'from-orange-600/30 to-pink-900/30', border: 'border-orange-500/30'
            });
          }
        }
        setRecommendations(recs.slice(0, 3));
      } catch(e) { console.error('AI analyze error', e); }
      setIsLoading(false);
    };
    analyze();
  }, [supabaseUserId, selectedApps, lang]);

  return { recommendations, isLoading };
};

const HomeDashboard = ({ selectedApps, activeChallenge, onSelectChallenge, onOpenActive, onOpenAll, onCompleteChallenge, onPlayMinigame, userGender, selectedCoach, setSelectedCoach, completedActivities, setCompletedActivities, userXP, setUserXP, userDiamonds, setUserDiamonds, calendarTasks, setCalendarTasks, blockedAppsConfig, setBlockedAppsConfig, onOpenAICalendar, onOpenAIHabit, onOpenCreateHabit, lang, supabaseUserId, setCoachChatOpen, isLight, toggleMode, onOpenLanding }) => {
  const [homeTab, setHomeTab] = useState('desafiate');
  const [organizeSubTab, setOrganizeSubTab] = useState('habitos');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activityDone, setActivityDone] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [emergencyTimers, setEmergencyTimers] = useState({});
  const [focusRewardAlert, setFocusRewardAlert] = useState(null);
  const t = UI_TEXT[lang] || UI_TEXT['es'];
  const { recommendations, isLoading: aiLoading } = useBehavioralAI(supabaseUserId, selectedApps, lang);

  // Tick down emergency timers every second
  useEffect(() => {
    const activeIds = Object.keys(emergencyTimers).filter(id => emergencyTimers[id] > 0);
    if (activeIds.length === 0) return;
    const interval = setInterval(() => {
      setEmergencyTimers(prev => {
        const copy = { ...prev };
        for (const id of activeIds) {
          if (copy[id] > 1) { copy[id] -= 1; } else { delete copy[id]; }
        }
        return copy;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [emergencyTimers]);

  const claimFocusRewards = () => {
    let totalSavedTime = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const newConfig = { ...blockedAppsConfig };
    selectedApps.forEach(appId => {
      const bd = newConfig[appId] || { limit: 15, usedToday: 0 };
      const limit = bd.limit || 15;
      const usedToday = bd.usedToday || 0;
      if (bd.lastClaimedDate !== todayStr && usedToday < limit) {
        totalSavedTime += (limit - usedToday);
        newConfig[appId] = { ...bd, lastClaimedDate: todayStr };
      }
    });
    if (totalSavedTime === 0) return;
    const xpReward = totalSavedTime * 5;
    const diamondReward = totalSavedTime * 1;
    setUserXP(prev => prev + xpReward);
    setUserDiamonds(prev => prev + diamondReward);
    setBlockedAppsConfig(newConfig);
    setFocusRewardAlert({ xp: xpReward, diamonds: diamondReward, minutes: totalSavedTime });
    setTimeout(() => setFocusRewardAlert(null), 4000);
  };

  const appFeatured = APP_CHALLENGES_BANK
    .filter(challenge => selectedApps.includes(challenge.appId) && (!challenge.gender || challenge.gender === 'any' || challenge.gender === userGender))
    .slice(0, 6)
    .map(challenge => {
      const appRef = APPS.find(a => a.id === challenge.appId);
      return { ...challenge, type: 'app', icon: appRef.icon, color: appRef.color, currentDay: 0 };
    });

  const featuredChallenges = [
    { id: 'cult_1', type: 'culture', title: 'OPERACIÓN WWII', subtitle: 'Historia vs Scrolling', xp: 600, diamonds: 200, icon: BookOpen, color: 'from-blue-600 to-indigo-900', duration: 21, currentDay: 0, trivia: WWII_TRIVIA, reward: { type: 'background', id: 'bg_ocean' } },
    ...appFeatured
  ];

  return (
    <div className="absolute inset-0 flex flex-col z-40 text-white overflow-hidden bg-black/10 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-36 custom-scroll">
        <div className="flex gap-1.5 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md mb-8 overflow-x-auto no-scrollbar items-center">
          <button onClick={() => setHomeTab('desafiate')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'desafiate' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>{t.challenge}</button>
          <button onClick={() => setHomeTab('organizate')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'organizate' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>{t.organize}</button>
          <button onClick={() => setHomeTab('crece')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'crece' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>{t.grow}</button>
        </div>

        {homeTab === 'desafiate' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {activeChallenge ? (
              <div className="relative mb-10">
                <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={onOpenActive} className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 shadow-2xl relative overflow-hidden cursor-pointer group hover:border-white/20 transition-colors">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#8ab4f8]" />
                  <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={20} className="text-white/30" /></div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#8ab4f8] uppercase drop-shadow-md">Progreso del Desafío</span>
                    <div className="text-right">
                      <h2 className="text-3xl font-black tracking-tighter leading-none">{Math.max(1, Math.round((activeChallenge.currentDay / activeChallenge.duration) * 100))}%</h2>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-6xl font-black tracking-tighter leading-none">{activeChallenge.currentDay}</span>
                    <span className="text-xl font-bold text-white/40">/ {activeChallenge.duration} DÍAS</span>
                  </div>
                  <div className="relative h-4 bg-black/50 rounded-full overflow-hidden mb-3 border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(2, (activeChallenge.currentDay / activeChallenge.duration) * 100)}%` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="absolute top-0 left-0 bottom-0 bg-[#8ab4f8] rounded-full shadow-[0_0_15px_rgba(138,180,248,0.5)]">
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black tracking-[0.2em] text-white/30 uppercase">{activeChallenge.title} Activo</span>
                  </div>
                </motion.div>
                <button onClick={onCompleteChallenge} className="mt-4 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-lg">
                  Finalizar y Reclamar Recompensa
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 shadow-xl mb-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10"><Clock size={28} className="text-white/50" /></div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Sin retos activos</h3>
                <p className="text-[11px] text-white/60 font-medium leading-relaxed px-4">Selecciona un desafío de la lista inferior para comenzar a forjar tu voluntad hoy.</p>
              </motion.div>
            )}
            {/* AI Behavioral Recommendations */}
            {recommendations.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />{t.aiRec}
                </h3>
                <div className="space-y-3">
                  {recommendations.map(rec => (
                    <motion.div key={rec.id} whileTap={{ scale: 0.98 }} className={`bg-gradient-to-r ${rec.color} backdrop-blur-md rounded-[20px] p-4 border ${rec.border} flex items-start gap-4 shadow-md`}>
                      <span className="text-2xl shrink-0">{rec.icon}</span>
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-tight text-white mb-1">{rec.title}</h4>
                        <p className="text-[10px] text-white/70 font-medium leading-relaxed">{rec.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Más Desafíos</h3>
              <button onClick={onOpenAll} className="text-[9px] font-black tracking-widest text-white/60 hover:text-white uppercase transition-colors">Ver todos</button>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
              {featuredChallenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <motion.div variants={staggerItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSelectChallenge(challenge)} key={challenge.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-5 flex items-center justify-between border border-white/10 cursor-pointer shadow-md">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color || 'from-gray-700 to-gray-900'} flex items-center justify-center shadow-lg overflow-hidden border border-white/20 p-3`}>
                        {challenge.type === 'app' ? <img src={challenge.icon} className="w-full h-full object-contain filter invert drop-shadow-lg" alt="icon" /> : <Icon size={24} className="text-white drop-shadow-lg" />}
                      </div>
                      <div>
                        <h4 className="text-lg font-black tracking-tight uppercase leading-none mb-1">{challenge.title}</h4>
                        <p className="text-[9px] font-black tracking-[0.1em] text-white/50 uppercase">{challenge.duration} DÍAS • {challenge.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end mb-1"><Gem size={12} className="text-white/80" /><span className="text-sm font-black text-white">{challenge.diamonds}</span></div>
                      {challenge.reward && <span className="text-[8px] font-black uppercase text-yellow-400 mt-1 block">+ Premio Mítico</span>}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <div className="my-10 border-t border-white/10" />
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Centro de Pruebas</h3>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
              {MINIGAMES_BANK.map((game) => {
                const GameIcon = game.icon;
                return (
                  <motion.div variants={staggerItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onPlayMinigame(game)} key={game.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-5 flex items-center justify-between border border-white/10 cursor-pointer shadow-md">
                    <div className="flex items-center gap-5 w-full">
                      <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg overflow-hidden border border-white/20 p-3`}>
                        <GameIcon size={28} className="text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-black tracking-tight uppercase leading-none mb-1">{game.title}</h4>
                        <p className="text-[9px] font-black tracking-[0.1em] text-white/50 uppercase mb-2">{game.subtitle}</p>
                        <div className="flex gap-2">
                          <span className="text-[8px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
                          <span className="text-[8px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
                        </div>
                      </div>
                      <div className="shrink-0 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
            <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest mt-10">Más minijuegos próximamente...</p>
          </motion.div>
        )}

        {homeTab === 'organizate' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-8">
            {/* Sub-navigation tabs */}
            <div className="flex gap-1 bg-black/60 p-1 rounded-full border border-white/5 shadow-inner backdrop-blur-md shrink-0">
              <button onClick={() => setOrganizeSubTab('habitos')} className={`flex-1 py-2 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${organizeSubTab === 'habitos' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Hábitos</button>
              <button onClick={() => setOrganizeSubTab('calendario')} className={`flex-1 py-2 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${organizeSubTab === 'calendario' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Calendario</button>
              <button onClick={() => setOrganizeSubTab('bloqueador')} className={`flex-1 py-2 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${organizeSubTab === 'bloqueador' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Bloqueador</button>
            </div>

            {organizeSubTab === 'habitos' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                {/* AI Assistant Button for Habits */}
                <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-[32px] p-6 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-between group cursor-pointer" onClick={onOpenAIHabit}>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Asistente IA de Hábitos</h3>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Genera planes de hábitos personalizados</p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <Sparkles size={24} className="text-indigo-400" />
                  </div>
                </div>

                {/* Mis Hábitos Title + Add button */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Mis Hábitos</h3>
                    <button onClick={onOpenCreateHabit} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5 shadow-md">
                      <Plus size={12} /> Crear Hábito
                    </button>
                  </div>

                  {calendarTasks.filter(t => t.isHabit).length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-center">
                      <Target size={32} className="text-white/20 mx-auto mb-3" />
                      <p className="text-[11px] text-white/40 font-bold uppercase tracking-wider">Sin hábitos aún. ¡Crea uno o usa el Asistente IA!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {calendarTasks.filter(t => t.isHabit).map(habit => {
                        const todayStr = new Date().toISOString().split('T')[0];
                        const isCompletedToday = habit.completedDates?.includes(todayStr);
                        const categoryColors = {
                          salud: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
                          mente: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
                          social: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
                          estudio: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
                          deporte: 'border-pink-500/30 bg-pink-500/5 text-pink-400',
                          creatividad: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
                        };
                        const badgeClass = categoryColors[habit.category] || 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400';

                        const handleToggleComplete = () => {
                          let updatedDates = [...(habit.completedDates || [])];
                          let newStreak = habit.streak || 0;
                          if (isCompletedToday) {
                            updatedDates = updatedDates.filter(d => d !== todayStr);
                            newStreak = Math.max(0, newStreak - 1);
                          } else {
                            updatedDates.push(todayStr);
                            newStreak += 1;
                            
                            // Add rewards
                            const xpReward = habit.xpReward || 25;
                            const diamondReward = habit.category === 'salud' ? 3 : 2;
                            setUserXP(prev => prev + xpReward);
                            setUserDiamonds(prev => prev + diamondReward);
                            setCompletedActivities(prev => [{ id: Date.now().toString(), title: 'Hábito completado', subtitle: habit.title, time: 'Hace un momento', icon: Check }, ...prev]);
                          }
                          setCalendarTasks(prev => prev.map(t => t.id === habit.id ? { ...t, completedDates: updatedDates, streak: newStreak } : t));
                        };

                        const handleDeleteHabit = () => {
                          setCalendarTasks(prev => prev.filter(t => t.id !== habit.id));
                        };

                        return (
                          <div key={habit.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-5 border border-white/10 shadow-md flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                              <button onClick={handleToggleComplete} className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all ${isCompletedToday ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-white/20 text-white/40 hover:border-white/40 hover:text-white'}`}>
                                <Check size={18} strokeWidth={3} />
                              </button>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className={`text-[7px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${badgeClass}`}>{habit.categoryIcon || '📋'} {habit.category || 'Hábito'}</span>
                                  <span className="text-[7px] font-black tracking-widest uppercase text-white/40 bg-white/5 px-2 py-0.5 rounded-full">🔥 {habit.streak || 0}d</span>
                                </div>
                                <h4 className={`text-sm font-black uppercase tracking-tight truncate ${isCompletedToday ? 'text-white/40 line-through' : 'text-white'}`}>{habit.title}</h4>
                                {habit.desc && <p className="text-[9px] text-white/40 font-medium truncate mt-0.5">{habit.desc}</p>}
                              </div>
                            </div>
                            <button onClick={handleDeleteHabit} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all shrink-0">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {organizeSubTab === 'calendario' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                {/* AI Assistant Button */}
                <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-[32px] p-6 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] flex items-center justify-between group cursor-pointer" onClick={onOpenAICalendar}>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Asistente IA</h3>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Sincroniza tus horarios</p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <Brain size={24} className="text-indigo-400" />
                  </div>
                </div>

                {/* Calendar View */}
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md mb-6">Esta Semana</h3>
                  {calendarTasks.filter(t => !t.isHabit).length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-center">
                      <Calendar size={32} className="text-white/20 mx-auto mb-3" />
                      <p className="text-[11px] text-white/40 font-bold uppercase tracking-wider">Sin tareas. Usa el Asistente IA para añadir.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {calendarTasks.filter(t => !t.isHabit).map(task => (
                        <div key={task.id} className={`bg-white/5 backdrop-blur-md rounded-[24px] p-5 border shadow-md flex items-center justify-between ${
                          task.isDeadline ? 'border-red-500/30 bg-red-500/5' : 'border-white/10'
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                              task.isDeadline
                                ? 'bg-red-500/20 border-red-500/30'
                                : task.type === 'examen'
                                  ? 'bg-amber-500/20 border-amber-500/30'
                                  : task.type === 'proyecto'
                                    ? 'bg-purple-500/20 border-purple-500/30'
                                    : 'bg-indigo-500/20 border-indigo-500/30'
                            }`}>
                              {task.isDeadline
                                ? <Clock size={20} className="text-red-400" />
                                : task.type === 'examen'
                                  ? <Target size={20} className="text-amber-400" />
                                  : task.type === 'proyecto'
                                    ? <Zap size={20} className="text-purple-400" />
                                    : <Calendar size={20} className="text-indigo-400" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${
                                  task.type === 'examen' ? 'text-amber-400 bg-amber-400/10' :
                                  task.type === 'proyecto' ? 'text-purple-400 bg-purple-400/10' :
                                  'text-indigo-400 bg-indigo-400/10'
                                }`}>{task.type}</span>
                                {task.isDeadline && (
                                  <span className="text-[8px] font-black tracking-widest uppercase text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">⏰ Vence</span>
                                )}
                              </div>
                              <h4 className="text-sm font-black uppercase tracking-tight text-white">{task.title}</h4>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                              task.isDeadline ? 'text-red-400' : 'text-white/40'
                            }`}>{task.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {organizeSubTab === 'bloqueador' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                {/* App Blocker config */}
                <div className="relative">
                  {/* Focus reward toast */}
                  <AnimatePresence>
                    {focusRewardAlert && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="absolute -top-16 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500/90 to-amber-500/90 backdrop-blur-md rounded-[20px] px-5 py-4 flex items-center gap-4 border border-yellow-400/30 shadow-xl shadow-yellow-500/20"
                      >
                        <div className="text-2xl">🏆</div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-wide text-black">¡Recompensa cobrada!</p>
                          <p className="text-[10px] font-bold text-black/70">+{focusRewardAlert.xp} XP · +{focusRewardAlert.diamonds} 💎 · {focusRewardAlert.minutes} min ahorrados</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md mb-6 flex items-center gap-2"><Lock size={20} /> Bloqueador</h3>
                  <div className="space-y-4">
                    {selectedApps.map(appId => {
                      const appRef = APPS.find(a => a.id === appId);
                      const bd = blockedAppsConfig[appId] || { limit: 15, usedToday: 0 };
                      const limit = bd.limit || 15;
                      const usedToday = bd.usedToday || 0;
                      const pct = Math.min(100, (usedToday / limit) * 100);
                      const isOverLimit = usedToday >= limit;
                      const emergencySecs = emergencyTimers[appId] || 0;

                      const barColor = pct >= 100 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500';
                      const borderColor = isOverLimit ? 'border-red-500/40' : 'border-white/10';

                      return (
                        <div key={appId} className={`bg-white/5 backdrop-blur-md rounded-[24px] p-5 border ${borderColor} shadow-md`}>
                          {/* Row 1: App name + limit controls */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <img src={appRef.icon} className="w-8 h-8 object-contain filter invert opacity-80" alt={appRef.name} />
                              <div>
                                <h4 className="text-sm font-black uppercase tracking-tight text-white">{appRef.name}</h4>
                                {isOverLimit && !emergencySecs && (
                                  <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">● Bloqueada</span>
                                )}
                                {emergencySecs > 0 && (
                                  <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest animate-pulse">⚡ Acceso temporal: {Math.floor(emergencySecs / 60)}:{String(emergencySecs % 60).padStart(2,'0')}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                              <button onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...bd, limit: Math.max(5, limit - 5) } }))} className="text-white/40 hover:text-white transition-colors"><Minus size={13} /></button>
                              <span className="text-[10px] font-black tracking-widest w-10 text-center">{limit}m</span>
                              <button onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...bd, limit: limit + 5 } }))} className="text-white/40 hover:text-white transition-colors"><Plus size={13} /></button>
                            </div>
                          </div>

                          {/* Row 2: Progress bar */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[9px] font-black uppercase tracking-wider text-white/40">Usado hoy</span>
                              <span className={`text-[9px] font-black uppercase tracking-wider ${isOverLimit ? 'text-red-400' : 'text-white/60'}`}>{usedToday}/{limit} min</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.5 }}
                                className={`h-full rounded-full ${barColor} ${isOverLimit ? 'animate-pulse' : ''}`}
                              />
                            </div>
                          </div>

                          {/* Row 3: Action buttons */}
                          <div className="flex gap-2">
                            {/* Simulate usage */}
                            <button
                              onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...bd, usedToday: Math.min(limit + 10, usedToday + 5) } }))}
                              className="flex-1 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            >
                              Simular +5m
                            </button>
                            {/* Emergency bypass / reset */}
                            {emergencySecs > 0 ? (
                              <div className="flex-1 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-black uppercase tracking-wider text-amber-400 text-center">
                                ⚡ {Math.floor(emergencySecs/60)}:{String(emergencySecs % 60).padStart(2,'0')}
                              </div>
                            ) : (
                              <button
                                onClick={() => setEmergencyTimers(p => ({ ...p, [appId]: 300 }))}
                                className={`flex-1 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                                  isOverLimit
                                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                                    : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                ⚡ Urgencia 5m
                              </button>
                            )}
                            {/* Reset usage */}
                            <button
                              onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...bd, usedToday: 0 } }))}
                              className="w-10 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all shrink-0"
                              title="Resetear uso diario"
                            >
                              <RefreshCw size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Focus reward card */}
                  {(() => {
                    const todayStr = new Date().toISOString().split('T')[0];
                    let totalSaved = 0;
                    let allClaimed = true;
                    selectedApps.forEach(appId => {
                      const bd = blockedAppsConfig[appId] || { limit: 15, usedToday: 0 };
                      const limit = bd.limit || 15;
                      const usedToday = bd.usedToday || 0;
                      if (bd.lastClaimedDate !== todayStr && usedToday < limit) {
                        totalSaved += (limit - usedToday);
                        allClaimed = false;
                      }
                    });

                    if (selectedApps.length === 0) return null;

                    if (allClaimed) {
                      return (
                        <div className="mt-6 bg-white/5 border border-white/10 rounded-[24px] p-5 flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 shrink-0">
                            <Check size={18} className="text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-wide text-white">Recompensas del día cobradas</p>
                            <p className="text-[9px] text-white/40 font-semibold uppercase tracking-wider mt-0.5">¡Sigue así mañana! 🚀</p>
                          </div>
                        </div>
                      );
                    }

                    const xpPreview = totalSaved * 5;
                    const diamPreview = totalSaved * 1;

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 bg-gradient-to-br from-yellow-500/15 to-amber-500/10 border border-yellow-500/30 rounded-[28px] p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 text-xl shrink-0">🏆</div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-yellow-400">Recompensa de Enfoque</h4>
                            <p className="text-[9px] text-white/50 font-semibold uppercase tracking-wider">Por no usar todo tu tiempo de pantalla</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mb-4">
                          <span className="flex-1 text-center py-2 bg-white/10 rounded-full text-[10px] font-black text-yellow-400 uppercase tracking-widest">+{xpPreview} XP</span>
                          <span className="flex-1 text-center py-2 bg-white/10 rounded-full text-[10px] font-black text-yellow-400 uppercase tracking-widest flex items-center justify-center gap-1"><Gem size={12} /> +{diamPreview}</span>
                        </div>
                        <button
                          onClick={claimFocusRewards}
                          className="w-full py-3 rounded-full bg-yellow-500 text-black font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-yellow-500/30"
                        >
                          Cobrar {totalSaved} min ahorrados
                        </button>
                      </motion.div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {homeTab === 'crece' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">Consejos de Enfoque</h3>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-md rounded-[32px] p-6 border border-white/10 shadow-2xl relative overflow-hidden mb-8 group hover:border-white/20 transition-all cursor-pointer" onClick={() => setSelectedVideo(FOCUS_TIPS_VIDEOS[0])}>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${FOCUS_TIPS_VIDEOS[0].thumbnail})` }} />
              <div className="absolute top-4 left-4 bg-[#8ab4f8] text-black text-[8px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">Recomendado</div>
              <div className="relative z-10 pt-16">
                <h4 className="text-xl font-black tracking-tight uppercase leading-tight mb-2 text-white drop-shadow-md">{FOCUS_TIPS_VIDEOS[0].title}</h4>
                <p className="text-[10px] text-white/75 font-semibold leading-relaxed mb-4 max-w-md">{FOCUS_TIPS_VIDEOS[0].desc}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={16} className="ml-0.5 fill-black text-black" />
                  </div>
                  <span className="text-[9px] font-black tracking-widest uppercase text-white/60">{FOCUS_TIPS_VIDEOS[0].duration} MINS • HACK DE ENFOQUE</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mb-4">
              <h4 className="text-[10px] font-black tracking-widest text-white/40 uppercase">Biblioteca de Videos</h4>
            </div>

            <div className="space-y-4">
              {FOCUS_TIPS_VIDEOS.map((video) => (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedVideo(video)} key={video.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-4 flex items-center justify-between border border-white/10 cursor-pointer shadow-md">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-black border border-white/10 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={16} className="text-white drop-shadow-md" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[8px] font-bold text-white tracking-widest">{video.duration}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] font-black bg-blue-500/20 text-[#8ab4f8] border border-blue-500/30 px-2 py-0.5 rounded-full tracking-widest uppercase mb-1.5 inline-block">{video.category}</span>
                      <h4 className="text-sm font-black tracking-tight uppercase leading-tight truncate text-white">{video.title}</h4>
                      <p className="text-[9px] font-medium text-white/50 leading-tight mt-1 line-clamp-2">{video.desc}</p>
                    </div>
                    
                    <ChevronRight size={18} className="text-white/20 shrink-0 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="my-10 border-t border-white/10" />
            
            {/* Coach Selection */}
            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-1">Paso 1</h3>
              <h4 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md mb-5">Elige tu Coach</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'sophia', name: 'Sophia', type: 'Perfeccionista Ansioso/a', icon: '🌙', desc: 'Presión académica e Instagram', color: 'from-purple-700 to-indigo-900', borderColor: 'border-purple-500/50', tips: ['Recuerda: 1 like no define tu valor.', 'La perfección es enemiga del progreso.', 'Date permiso de equivocarte.', 'No compares tu interior con el exterior de otros.'] },
                  { id: 'icaro', name: 'Ícaro', type: 'Procrastinador Impulsivo', icon: '🔥', desc: 'Adicción a TikTok y dopamina instantánea', color: 'from-orange-700 to-red-900', borderColor: 'border-orange-500/50', tips: ['5-4-3-2-1 ¡arráncate ya!', 'Cada video corto que rechazas es una victoria.', 'Tu cerebro puede reaprender el aburrimiento.', 'La acción imperfecta supera la inacción perfecta.'] },
                  { id: 'atlas', name: 'Atlas', type: 'Competitivo Distraído', icon: '📚', desc: 'YouTube y videojuegos sobre el estudio', color: 'from-blue-700 to-cyan-900', borderColor: 'border-blue-500/50', tips: ['Trata el estudio como subes de nivel en un juego.', 'Cada hora de estudio = XP para tu futuro real.', 'Los mejores jugadores también leen y se forman.', 'Analiza tu tiempo de pantalla como analizas estadísticas.'] },
                  { id: 'vento', name: 'Vento', type: 'Socialmente Dependiente', icon: '💬', desc: 'FOMO y rachas de Snapchat/WhatsApp', color: 'from-teal-700 to-emerald-900', borderColor: 'border-teal-500/50', tips: ['No es necesario responder en segundos.', 'Las rachas de Snap no miden el valor de una amistad.', 'El FOMO es una mentira que vende la app.', 'Pon límites digitales claros con tus amigos.'] }
                ].map(coach => {
                  const isSelected = selectedCoach?.id === coach.id;
                  return (
                    <motion.div key={coach.id} onClick={() => setSelectedCoach(coach)} whileTap={{ scale: 0.96 }}
                      className={`bg-gradient-to-br ${coach.color} rounded-[24px] p-4 border-2 cursor-pointer transition-all ${isSelected ? coach.borderColor + ' shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'border-transparent'}`}>
                      <div className="text-3xl mb-2">{coach.icon}</div>
                      <h5 className="text-sm font-black uppercase tracking-tight text-white leading-tight">{coach.name}</h5>
                      <p className="text-[9px] text-white/60 font-bold uppercase tracking-wide mt-1">{coach.type}</p>
                      <p className="text-[8px] text-white/40 font-medium mt-1">{coach.desc}</p>
                      {isSelected && <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 w-max text-[8px] font-black text-white uppercase tracking-widest">✓ Seleccionado</div>}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selected Coach chat button */}
            {selectedCoach && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-[24px] p-5 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black tracking-widest text-white/40 uppercase mb-1">Tu coach activo</p>
                    <h4 className="text-lg font-black uppercase">{selectedCoach.icon} {selectedCoach.name}</h4>
                    <p className="text-[10px] text-white/50 font-medium mt-1">{selectedCoach.type}</p>
                  </div>
                  <button onClick={() => setCoachChatOpen(true)} className="bg-white text-black rounded-full px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    Chat
                  </button>
                </div>
              </motion.div>
            )}

            {/* Study Methods */}
            <h4 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md mb-5">Métodos de Estudio</h4>
            <div className="space-y-4">
              {[
                { id: 'pomodoro', icon: '⏰', name: 'Técnica Pomodoro', desc: 'Estudia 25 min, descansa 5. Las redes sociales rompen este ciclo porque cada notificación te saca del estado de flujo y tardas 23 minutos en recuperarlo.', tag: 'Gestión del Tiempo' },
                { id: 'feynman', icon: '🗣️', name: 'Técnica Feynman', desc: 'Explica el concepto en voz alta como si se lo enseñaras a un niño de 10 años. Si no puedes, no lo entendiste. TikTok te entrena para consumir, no para explicar.', tag: 'Comprensión Profunda' },
                { id: 'recall', icon: '🧠', name: 'Repaso Activo (Active Recall)', desc: 'En lugar de releer, cierra el libro y escribe todo lo que recuerdas. Las redes crean una ilusión de saber porque ves información, pero no la procesas activamente.', tag: 'Memoria' },
                { id: 'spaced', icon: '📅', name: 'Repetición Espaciada', desc: 'Revisa la información en intervalos crecientes (1 día, 3 días, 1 semana). El scroll infinito compite directamente con este proceso al fragmentar tu atención.', tag: 'Memorias a Largo Plazo' },
                { id: 'timeblock', icon: '📌', name: 'Bloqueo de Tiempo', desc: 'Asigna bloques específicos en tu calendario para cada tarea. Sin bloques fijos, las notificaciones y los chats grupales secuestran todo tu tiempo libre de estudio.', tag: 'Planificación' }
              ].map(method => (
                <div key={method.id} className="bg-white/5 border border-white/10 rounded-[24px] p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{method.icon}</span>
                    <div>
                      <span className="text-[8px] font-black bg-blue-500/20 text-[#8ab4f8] border border-blue-500/30 px-2 py-0.5 rounded-full tracking-widest uppercase mb-2 inline-block">{method.tag}</span>
                      <h5 className="text-sm font-black uppercase tracking-tight text-white mb-2">{method.name}</h5>
                      <p className="text-[10px] text-white/60 font-medium leading-relaxed">{method.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[8px] font-black bg-[#8ab4f8]/20 text-[#8ab4f8] border border-[#8ab4f8]/30 px-2.5 py-1 rounded-full tracking-widest uppercase block w-max mb-1.5">{selectedVideo.category}</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">{selectedVideo.title}</h3>
              </div>
              <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <X size={18} className="text-white" />
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black mb-6">
              {selectedVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={selectedVideo.videoUrl} controls autoPlay loop playsInline className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-1 space-y-6 pb-6">
              <div>
                <h4 className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">Resumen</h4>
                <p className="text-xs text-white/70 font-medium leading-relaxed">{selectedVideo.desc}</p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-5 shadow-lg">
                <h4 className="text-[10px] font-black tracking-widest text-[#8ab4f8] uppercase mb-4 flex items-center gap-2">
                  <Sparkles size={14} /> IDEAS CLAVE
                </h4>
                <ul className="space-y-4">
                  {selectedVideo.points.map((point, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#8ab4f8]/20 border border-[#8ab4f8]/30 flex items-center justify-center text-[10px] font-bold text-[#8ab4f8] shrink-0 mt-0.5">{index + 1}</div>
                      <p className="text-[11px] text-white/80 font-semibold leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedVideo.activityText && (
                <div className="bg-gradient-to-br from-emerald-900/60 to-teal-900/60 border border-emerald-500/30 rounded-3xl p-5 shadow-lg">
                  <h4 className="text-[10px] font-black tracking-widest text-emerald-400 uppercase mb-3 flex items-center gap-2">
                    <Check size={14} /> ACTIVIDAD PRÁCTICA
                  </h4>
                  <p className="text-[11px] text-white/80 font-semibold leading-relaxed mb-4">{selectedVideo.activityText}</p>
                  {completedActivities?.includes(selectedVideo.id) ? (
                    <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2 w-max">
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">¡Actividad Completada!</span>
                    </div>
                  ) : (
                    <motion.button whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!completedActivities?.includes(selectedVideo.id)) {
                          setCompletedActivities(prev => [...prev, selectedVideo.id]);
                          if (setUserXP) setUserXP(prev => prev + 20);
                          if (setUserDiamonds) setUserDiamonds(prev => prev + 5);
                          setActivityDone(selectedVideo.id);
                          setTimeout(() => setActivityDone(null), 2500);
                        }
                      }}
                      className="bg-emerald-500 text-black rounded-full px-5 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg">
                      ✓ Completar Actividad (+20 XP, +5 💎)
                    </motion.button>
                  )}
                </div>
              )}
              
              <button onClick={() => setSelectedVideo(null)} className="w-full bg-white text-black py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg mt-4">
                Cerrar y Aplicar Consejo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AllChallengesView = ({ selectedApps, onClose, onSelectChallenge, userGender }) => {
  const [filter, setFilter] = useState('apps');

  const appChallengesList = APP_CHALLENGES_BANK
    .filter(challenge => selectedApps.includes(challenge.appId) && (!challenge.gender || challenge.gender === 'any' || challenge.gender === userGender))
    .map(challenge => {
      const appRef = APPS.find(a => a.id === challenge.appId);
      return { ...challenge, type: 'app', icon: appRef.icon, color: appRef.color, currentDay: 0 };
    });

  const cultureChallenges = [
    { id: 'cult_1', type: 'culture', title: 'OPERACIÓN WWII', subtitle: 'Historia vs Scrolling', xp: 600, diamonds: 200, icon: BookOpen, color: 'from-blue-600 to-indigo-900', duration: 21, currentDay: 0, trivia: WWII_TRIVIA, reward: { type: 'background', id: 'bg_ocean' } },
    { id: 'cult_2', type: 'culture', title: 'SABIDURÍA ESTOICA', subtitle: 'Filosofía para la mente', xp: 800, diamonds: 250, icon: BookOpen, color: 'from-purple-600 to-purple-900', duration: 30, currentDay: 0, trivia: STOIC_TRIVIA }
  ];

  const mindChallenges = [
    { id: 'mind_1', type: 'generic', title: 'MODO MONJE', subtitle: 'Trabajo profundo', xp: 300, diamonds: 100, icon: Flame, color: 'from-orange-500 to-red-600', duration: 10, currentDay: 0, desc: 'Aíslate de todas las notificaciones.', reward: { type: 'avatar', id: 'a_ninja' } },
    { id: 'mind_2', type: 'generic', title: 'AYUNO DE DOPAMINA', subtitle: 'Reinicio total', xp: 800, diamonds: 250, icon: Brain, color: 'from-green-500 to-emerald-800', duration: 30, currentDay: 0, desc: 'Cero pantallas recreativas, cero estímulos artificiales.' }
  ];

  const displayList = filter === 'apps' ? appChallengesList : filter === 'cultura' ? cultureChallenges : mindChallenges;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute inset-0 flex flex-col z-[90] text-white overflow-hidden pb-[100px] bg-black/60 backdrop-blur-xl">
      <div className="px-6 pt-16 pb-6 sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-black/40">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-xl font-black uppercase tracking-tight">Catálogo</h1>
        <div className="w-10"></div>
      </div>
      <div className="px-6 py-4 flex gap-2 overflow-x-auto custom-scroll shrink-0">
        {['apps', 'cultura', 'mentalidad'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${filter === f ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black/50 backdrop-blur-md text-white/50 border border-white/5'}`}>{f}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scroll space-y-4">
        {displayList.map((challenge) => {
          const Icon = challenge.icon;
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSelectChallenge(challenge)} key={challenge.id} className="bg-black/50 backdrop-blur-md rounded-[24px] p-5 flex items-center justify-between border border-white/5 cursor-pointer shadow-md relative overflow-hidden">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color || 'from-gray-700 to-gray-900'} flex items-center justify-center shadow-lg overflow-hidden border border-white/10 p-3 z-10`}>
                  {challenge.type === 'app' ? <img src={challenge.icon} className="w-full h-full object-contain filter invert" alt="icon" /> : <Icon size={24} className="text-white" />}
                </div>
                <div className="z-10">
                  <h4 className="text-sm font-black tracking-tight uppercase leading-none mb-1.5">{challenge.title}</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8px] font-black tracking-widest text-[#8ab4f8] bg-[#8ab4f8]/10 px-2 py-0.5 rounded uppercase">{challenge.duration} Días</span>
                    <span className="text-[8px] font-black tracking-widest text-white/40 uppercase">{challenge.subtitle}</span>
                  </div>
                  {challenge.reward && <span className="text-[8px] font-black uppercase text-yellow-400 mt-1 block">+ Premio</span>}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
};

const AICalendarModal = ({ onClose, calendarTasks, setCalendarTasks }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: '¡Hola! Soy tu asistente de organización. Dime qué tareas tienes pendientes, indicando de qué tipo es (tarea, examen, proyecto) y cuándo es o cuándo se vence (ej. "examen de química el 15/06", "la entrega de arte se vence mañana", "tengo proyecto el viernes").' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const textLower = userMsg.text.toLowerCase();
      
      // 1. Detect task type
      let type = 'tarea';
      if (textLower.includes('examen') || textLower.includes('parcial') || textLower.includes('evaluacion') || textLower.includes('evaluación') || textLower.includes('prueba') || textLower.includes('quiz') || textLower.includes('test') || textLower.includes('lección') || textLower.includes('leccion')) {
        type = 'examen';
      } else if (textLower.includes('proyecto') || textLower.includes('presentación') || textLower.includes('presentacion') || textLower.includes('exposición') || textLower.includes('exposicion') || textLower.includes('trabajo') || textLower.includes('entrega') || textLower.includes('informe') || textLower.includes('exponer')) {
        type = 'proyecto';
      }
      
      // 2. Detect if it is a deadline/vencimiento vs event date
      const isDeadline = textLower.includes('vence') || textLower.includes('límite') || textLower.includes('limite') || textLower.includes('entregar') || textLower.includes('plazo') || textLower.includes('vencimiento');

      // 3. Detect date
      let dateStr = '';
      const today = new Date();
      
      // DD/MM/YYYY or DD/MM or DD-MM-YYYY or DD-MM
      const formatRegex = /\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/;
      const formatMatch = textLower.match(formatRegex);
      
      if (formatMatch) {
        const day = parseInt(formatMatch[1], 10);
        const month = parseInt(formatMatch[2], 10);
        let year = formatMatch[3] ? parseInt(formatMatch[3], 10) : today.getFullYear();
        if (year < 100) year += 2000;
        
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        dateStr = `${year}-${mm}-${dd}`;
      } else if (textLower.includes('hoy')) {
        dateStr = today.toISOString().split('T')[0];
      } else if (textLower.includes('pasado mañana') || textLower.includes('pasado manana')) {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        dateStr = d.toISOString().split('T')[0];
      } else if (textLower.includes('mañana') || textLower.includes('manana')) {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        dateStr = d.toISOString().split('T')[0];
      } else {
        const weekdays = {
          lunes: 1, martes: 2, miércoles: 3, miercoles: 3,
          jueves: 4, viernes: 5, sábado: 6, sabado: 6, domingo: 0
        };
        let foundDayOffset = -1;
        for (const [dayName, dayNum] of Object.entries(weekdays)) {
          if (textLower.includes(dayName)) {
            const currentDayNum = today.getDay();
            let daysToAdd = dayNum - currentDayNum;
            if (daysToAdd <= 0) daysToAdd += 7;
            foundDayOffset = daysToAdd;
            break;
          }
        }
        
        if (foundDayOffset !== -1) {
          const d = new Date();
          d.setDate(d.getDate() + foundDayOffset);
          dateStr = d.toISOString().split('T')[0];
        } else {
          const months = {
            enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
            julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
          };
          let monthIndex = -1;
          let dayNumber = -1;
          for (const [monthName, idx] of Object.entries(months)) {
            const regex = new RegExp(`(\\d{1,2})\\s+de\\s+${monthName}`);
            const match = textLower.match(regex);
            if (match) {
              dayNumber = parseInt(match[1], 10);
              monthIndex = idx;
              break;
            }
          }
          
          if (monthIndex !== -1 && dayNumber !== -1) {
            const d = new Date(today.getFullYear(), monthIndex, dayNumber);
            if (d < today && (today.getTime() - d.getTime()) > 1000 * 60 * 60 * 24 * 30) {
              d.setFullYear(today.getFullYear() + 1);
            }
            dateStr = d.toISOString().split('T')[0];
          }
        }
      }

      if (!dateStr) {
        dateStr = today.toISOString().split('T')[0];
      }

      // Title formatting
      let title = userMsg.text;
      const cleanRegex = /(?:tengo\s+)?(?:examen\s+de|tarea\s+de|proyecto\s+de|estudiar\s+|repasar\s+|hacer\s+|entregar\s+|exponer\s+)?(.*?)(?:\s+(?:el|la|hoy|mañana|pasado|lunes|martes|miércoles|jueves|viernes|sábado|domingo|se\s+vence|es\s+el)\b|$)/i;
      const titleMatch = userMsg.text.match(cleanRegex);
      if (titleMatch && titleMatch[1] && titleMatch[1].trim()) {
        title = titleMatch[1].trim();
      }
      
      title = title.charAt(0).toUpperCase() + title.slice(1);
      if (type === 'examen' && !title.toLowerCase().includes('examen')) {
        title = `Examen de ${title}`;
      } else if (type === 'proyecto' && !title.toLowerCase().includes('proyecto') && !title.toLowerCase().includes('trabajo') && !title.toLowerCase().includes('entrega')) {
        title = `Proyecto de ${title}`;
      } else if (type === 'tarea' && !title.toLowerCase().includes('tarea') && !title.toLowerCase().includes('hacer') && !title.toLowerCase().includes('leer') && !title.toLowerCase().includes('estudiar')) {
        title = `Tarea: ${title}`;
      }

      const newTask = { id: `t_${Date.now()}`, title, date: dateStr, type, isDeadline };
      setCalendarTasks(prev => [...prev, newTask]);
      
      const typeWord = type === 'examen' ? 'el examen' : type === 'proyecto' ? 'el proyecto' : 'la tarea';
      const deadlineWord = isDeadline ? 'con fecha límite para el' : 'programado/a para el';
      const responseText = `¡Listo! He añadido ${typeWord} "${title}" ${deadlineWord} ${dateStr} a tu calendario. ¿Algo más en lo que pueda ayudarte?`;

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col">
      <div className="px-6 pt-14 pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
            <Brain size={20} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight text-white">IA Organizer</h2>
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">• En línea</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-white" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scroll">
        {messages.map(msg => (
          <div key={msg.id} className={`p-4 rounded-[24px] max-w-[85%] shadow-md ${msg.sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-tr-sm' : 'bg-white/5 border border-white/10 text-white self-start rounded-tl-sm'}`}>
            <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-5 bg-black/60 border-t border-white/10 pb-8">
        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Escribe tu tarea o evento..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-[11px] font-bold text-white placeholder:text-white/30 outline-none" />
          <button onClick={handleSend} className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Send size={16} className="ml-0.5" /></button>
        </div>
      </div>
    </motion.div>
  );
};

const ActiveChallengeInteractive = ({ challenge, onClose, addXP, addDiamonds }) => {
  const [triviaState, setTriviaState] = useState('idle');
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (idx) => {
    if (idx === challenge.trivia[currentQ].answer) {
      setTriviaState('won');
      addXP(15);
      addDiamonds(5);
    } else {
      setTriviaState('lost');
    }
  };

  const handleNextQuestion = () => {
    setTriviaState('idle');
    setCurrentQ((prev) => (prev + 1) % challenge.trivia.length);
  };

  const ChallengeIcon = challenge.icon;

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/60 backdrop-blur-xl z-[100] flex flex-col overflow-hidden text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${challenge.color || 'from-gray-700 to-gray-900'} flex items-center justify-center p-4 border border-white/10`}>
            {challenge.type === 'app' ? <img src={challenge.icon} className="w-full h-full object-contain filter invert" alt="icon" /> : <ChallengeIcon size={32} className="text-white" />}
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{challenge.title}</h2>
            <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase mt-1">Día {challenge.currentDay} de {challenge.duration}</p>
          </div>
        </div>

        {challenge.trivia && (
          <div className="flex-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Gamepad2 size={18} className="text-[#8ab4f8]" /> Granja de XP</h3>
              <div className="flex gap-2">
                <span className="text-[9px] font-black bg-[#8ab4f8]/20 text-[#8ab4f8] px-2 py-1 rounded uppercase tracking-widest">+15 XP</span>
                <span className="text-[9px] font-black bg-white/10 text-white px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1"><Gem size={10} /> +5</span>
              </div>
            </div>
            {triviaState === 'idle' && (
              <div className="flex-1 flex flex-col">
                <p className="text-sm font-bold leading-relaxed mb-6 flex-1">{challenge.trivia[currentQ].q}</p>
                <div className="space-y-3">
                  {challenge.trivia[currentQ].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(i)} className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl text-xs font-bold transition-all">{opt}</button>
                  ))}
                </div>
              </div>
            )}
            {triviaState === 'won' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"><Check size={32} className="text-green-500" /></div>
                <h3 className="text-xl font-black uppercase mb-2">¡Correcto!</h3>
                <p className="text-xs text-white/50 mb-6 px-4">Has ganado +15 XP y +5 Diamantes.</p>
                <button onClick={handleNextQuestion} className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Siguiente Pregunta</button>
              </div>
            )}
            {triviaState === 'lost' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4"><X size={32} className="text-red-500" /></div>
                <h3 className="text-xl font-black uppercase mb-2">Incorrecto</h3>
                <button onClick={handleNextQuestion} className="bg-white/10 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-colors">Intentar Otra</button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const MinigameReflex = ({ game, onClose, addXP, addDiamonds }) => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, won_level, lost, won_all
  const [level, setLevel] = useState(1);
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const getTargetTime = (lvl) => lvl === 1 ? 500 : lvl === 2 ? 400 : 300;

  const startGame = (nextLevel = false) => {
    if (!nextLevel) setLevel(1);
    setGameState('waiting');
    setReactionTime(null);
    const randomDelay = Math.random() * 3000 + 1500;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleTap = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('lost');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      if (time <= getTargetTime(level)) {
        if (level < 3) {
          setGameState('won_level');
        } else {
          setGameState('won_all');
          addXP(game.rewardXP);
          addDiamonds(game.rewardDia);
        }
      } else {
        setGameState('lost');
      }
    }
  };

  useEffect(() => { return () => clearTimeout(timeoutRef.current); }, []);

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
          <div className="flex gap-2">
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{game.title}</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map(l => (
              <div key={l} className={`h-1.5 w-10 rounded-full ${l < level ? 'bg-green-500' : l === level && gameState !== 'idle' ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-white/20'}`}></div>
            ))}
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-4">Nivel {level}: Reacciona en &lt; {getTargetTime(level)}ms</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {gameState === 'idle' && (
            <button onClick={() => startGame(false)} className="w-48 h-48 rounded-full bg-white text-black font-black uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all text-xl">
              Iniciar Prueba
            </button>
          )}

          {(gameState === 'waiting' || gameState === 'ready') && (
            <div onClick={handleTap} className={`w-full h-[60%] rounded-[40px] flex items-center justify-center cursor-pointer transition-colors duration-100 ${gameState === 'ready' ? 'bg-green-500 shadow-[0_0_100px_rgba(34,197,94,0.6)]' : 'bg-red-600 shadow-[0_0_100px_rgba(220,38,38,0.4)]'}`}>
              <span className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md text-center px-4">
                {gameState === 'waiting' ? '¡ESPERA EL VERDE!' : '¡TOCA AHORA!'}
              </span>
            </div>
          )}

          {gameState === 'won_level' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6"><Zap size={40} className="text-yellow-400" /></div>
              <h3 className="text-2xl font-black uppercase mb-2">Nivel {level} Superado</h3>
              <p className="text-white/60 mb-8 font-medium">Reacción: <span className="text-yellow-400 font-black">{reactionTime}ms</span>. ¡Prepárate para ser más rápido!</p>
              <button onClick={() => { setLevel(l => l + 1); startGame(true); }} className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Siguiente Nivel</button>
            </div>
          )}

          {gameState === 'won_all' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><Check size={48} className="text-green-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">¡Dominio Total!</h3>
              <p className="text-white/60 mb-8 font-medium">Has superado los 3 niveles con reflejos sobrehumanos. Recompensa obtenida.</p>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Jugar de Nuevo</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"><X size={48} className="text-red-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">Conexión Rota</h3>
              <p className="text-white/60 mb-8 font-medium">
                {reactionTime ? `Tu tiempo: ${reactionTime}ms (Requerido: < ${getTargetTime(level)}ms). Fuiste demasiado lento.` : 'Te adelantaste a la señal. Controla la ansiedad.'}
              </p>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors">Volver a Intentar Nivel 1</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
};

const MinigameMemory = ({ game, onClose, addXP, addDiamonds }) => {
  const ICONS_BANK = [Zap, Flame, Target, Star, Heart, Brain, Crown, Shield];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [errors, setErrors] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('idle');

  const getMaxErrors = (lvl) => lvl === 1 ? 3 : lvl === 2 ? 4 : 5;
  const getPairsCount = (lvl) => lvl === 1 ? 3 : lvl === 2 ? 6 : 8;

  const startGame = (nextLevel = false) => {
    const currentLvl = nextLevel ? level + 1 : 1;
    if (!nextLevel) setLevel(1);
    else setLevel(currentLvl);

    const pairs = getPairsCount(currentLvl);
    const selectedIcons = ICONS_BANK.slice(0, pairs);
    let deck = [...selectedIcons, ...selectedIcons].map((icon, i) => ({ id: i, icon, uid: Math.random() }));
    deck.sort((a, b) => a.uid - b.uid);

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setErrors(0);
    setGameState('playing');
  };

  const handleCardClick = (idx) => {
    if (gameState !== 'playing' || flipped.length >= 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          if (level < 3) setGameState('won_level');
          else {
            setGameState('won_all');
            addXP(game.rewardXP);
            addDiamonds(game.rewardDia);
          }
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setErrors(e => {
            if (e + 1 >= getMaxErrors(level)) setGameState('lost');
            return e + 1;
          });
        }, 800);
      }
    }
  };

  const maxE = getMaxErrors(level);

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
          <div className="flex gap-2">
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{game.title}</h2>
          <div className="flex justify-center gap-2 mt-3">
            {[1, 2, 3].map(l => (
              <div key={l} className={`h-1 w-8 rounded-full ${l < level ? 'bg-blue-500' : l === level && gameState !== 'idle' ? 'bg-cyan-400' : 'bg-white/20'}`}></div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {gameState === 'idle' && (
            <button onClick={() => startGame(false)} className="w-48 h-48 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all text-xl">
              Iniciar Matriz
            </button>
          )}

          {gameState === 'playing' && (
            <div className="w-full max-w-sm">
              <div className="flex justify-between mb-4 px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Vidas: {'❤️'.repeat(maxE - errors)}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Pares: {matched.length / 2}/{getPairsCount(level)}</span>
              </div>
              <div className={`grid gap-3 ${cards.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {cards.map((card, idx) => {
                  const isRevealed = flipped.includes(idx) || matched.includes(idx);
                  const Icon = card.icon;
                  return (
                    <div key={idx} onClick={() => handleCardClick(idx)} className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform ${isRevealed ? 'bg-blue-600 border border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)] rotate-y-180' : 'bg-white/10 border border-white/5 hover:bg-white/20'}`}>
                      {isRevealed && <Icon size={cards.length > 12 ? 24 : 32} className="text-white drop-shadow-md" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {gameState === 'won_level' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6"><LayoutGrid size={40} className="text-blue-400" /></div>
              <h3 className="text-2xl font-black uppercase mb-2">Matriz Nivel {level} Superada</h3>
              <p className="text-white/60 mb-8 font-medium text-sm">Errores cometidos: {errors}. Prepárate, la cuadrícula se expande.</p>
              <button onClick={() => startGame(true)} className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Siguiente Matriz</button>
            </div>
          )}

          {gameState === 'won_all' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><Check size={48} className="text-green-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">¡Memoria Fotográfica!</h3>
              <p className="text-white/60 mb-8 font-medium">Has dominado los 3 niveles de la matriz. Eres inmune a las distracciones visuales.</p>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Jugar de Nuevo</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"><X size={48} className="text-red-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">Colapso Visual</h3>
              <p className="text-white/60 mb-8 font-medium">Llegaste al límite de errores. Tu concentración falló. Vuelve al Nivel 1.</p>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors">Reiniciar Simulación</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MinigameMillionaire = ({ game, onClose, addXP, addDiamonds }) => {
  const TOTAL_QS = 5;
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [selectedAns, setSelectedAns] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    const shuffled = [...MILLIONAIRE_QS].sort(() => Math.random() - 0.5).slice(0, TOTAL_QS);
    setQuestions(shuffled);
    setCurrentQIndex(0);
    setGameState('playing');
    setSelectedAns(null);
    setShowResult(false);
  };

  const handleAnswer = (idx) => {
    if (gameState !== 'playing' || selectedAns !== null) return;
    setSelectedAns(idx);
    setShowResult(true);

    const correct = idx === questions[currentQIndex].answer;

    setTimeout(() => {
      if (correct) {
        if (currentQIndex + 1 === TOTAL_QS) {
          setGameState('won');
          addXP(game.rewardXP);
          addDiamonds(game.rewardDia);
        } else {
          setCurrentQIndex(p => p + 1);
          setSelectedAns(null);
          setShowResult(false);
        }
      } else {
        setGameState('lost');
      }
    }, 1500);
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
          <div className="flex gap-2">
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{game.title}</h2>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-2">{game.desc}</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {gameState === 'idle' && (
            <button onClick={startGame} className="w-48 h-48 rounded-full bg-purple-600 text-white font-black uppercase tracking-widest shadow-[0_0_50px_rgba(147,51,234,0.4)] hover:scale-105 active:scale-95 transition-all text-xl">
              Iniciar
            </button>
          )}

          {gameState === 'playing' && questions.length > 0 && (
            <div className="w-full flex flex-col flex-1 max-w-sm">
              <div className="flex justify-center gap-1.5 mb-8">
                {Array.from({ length: TOTAL_QS }).map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${i < currentQIndex ? 'bg-purple-500 shadow-[0_0_10px_purple]' : i === currentQIndex ? 'bg-purple-500/50 animate-pulse' : 'bg-white/10'}`} />
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8 shadow-lg text-center min-h-[140px] flex items-center justify-center">
                <h3 className="text-lg font-bold leading-relaxed">{questions[currentQIndex].q}</h3>
              </div>

              <div className="space-y-4 w-full">
                {questions[currentQIndex].options.map((opt, idx) => {
                  let btnStyle = 'bg-white/5 border-white/10 hover:bg-white/10';
                  if (showResult) {
                    if (idx === questions[currentQIndex].answer) btnStyle = 'bg-green-600 border-green-500 shadow-[0_0_20px_rgba(22,163,74,0.4)]';
                    else if (idx === selectedAns) btnStyle = 'bg-red-600 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]';
                    else btnStyle = 'bg-white/5 border-white/10 opacity-50';
                  } else if (selectedAns === idx) {
                    btnStyle = 'bg-purple-600 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]';
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 font-bold text-sm ${btnStyle}`}>
                      <span className="text-purple-400 mr-3">{['A', 'B', 'C', 'D'][idx]}.</span> {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {gameState === 'won' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><Check size={48} className="text-green-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">¡Erudito Absoluto!</h3>
              <p className="text-white/60 mb-8 font-medium px-6">Resolviste las 5 preguntas correctamente. Tu cerebro está en óptimas condiciones para rechazar la gratificación instantánea.</p>
              <button onClick={startGame} className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Jugar de Nuevo</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"><X size={48} className="text-red-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">Error Fatal</h3>
              <p className="text-white/60 mb-8 font-medium">Fallaste en la pregunta {currentQIndex + 1}. Un solo error destruye la racha. Repasa tus conocimientos y vuelve a intentar.</p>
              <button onClick={startGame} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors">Reiniciar Prueba</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MinigameMath = ({ game, onClose, addXP, addDiamonds }) => {
  const [gameState, setGameState] = useState('idle');
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState({ q: '', a: 0, options: [] });

  const generateProblem = (lvl) => {
    let num1, num2, op, ans;
    if (lvl === 1) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      op = '+';
      ans = num1 + num2;
    } else if (lvl === 2) {
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      op = '-';
      ans = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 10) + 2;
      num2 = Math.floor(Math.random() * 10) + 2;
      op = 'x';
      ans = num1 * num2;
    }
    let options = [ans, ans + Math.floor(Math.random() * 5) + 1, ans - (Math.floor(Math.random() * 4) + 1), ans + 10].sort(() => Math.random() - 0.5);
    setProblem({ q: `${num1} ${op} ${num2}`, a: ans, options });
  };

  const startGame = (nextLevel = false) => {
    const currentLvl = nextLevel ? level + 1 : 1;
    if (!nextLevel) setLevel(1);
    else setLevel(currentLvl);
    generateProblem(currentLvl);
    setGameState('playing');
  };

  const handleAnswer = (ans) => {
    if (ans === problem.a) {
      if (level < 3) setGameState('won_level');
      else {
        setGameState('won_all');
        addXP(game.rewardXP);
        addDiamonds(game.rewardDia);
      }
    } else {
      setGameState('lost');
    }
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
          <div className="flex gap-2">
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{game.title}</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map(l => (
              <div key={l} className={`h-1.5 w-10 rounded-full ${l < level ? 'bg-green-500' : l === level && gameState !== 'idle' ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-white/20'}`}></div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {gameState === 'idle' && (
            <button onClick={() => startGame(false)} className="w-48 h-48 rounded-full bg-green-600 text-white font-black uppercase tracking-widest shadow-[0_0_50px_rgba(22,163,74,0.4)] hover:scale-105 active:scale-95 transition-all text-xl">
              Iniciar Prueba
            </button>
          )}

          {gameState === 'playing' && (
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="text-5xl font-black mb-10 tracking-tighter bg-white/10 p-8 rounded-3xl w-full text-center border border-white/20">{problem.q}</div>
              <div className="grid grid-cols-2 gap-4 w-full">
                {problem.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt)} className="bg-white/5 hover:bg-white/20 border border-white/10 py-6 rounded-2xl text-2xl font-black transition-colors">{opt}</button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'won_level' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><Check size={40} className="text-green-500" /></div>
              <h3 className="text-2xl font-black uppercase mb-2">Nivel {level} Superado</h3>
              <button onClick={() => startGame(true)} className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-6">Siguiente Nivel</button>
            </div>
          )}

          {gameState === 'won_all' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><Activity size={48} className="text-green-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">¡Genio!</h3>
              <p className="text-white/60 mb-8 font-medium">Cálculo mental perfeccionado.</p>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">Jugar de Nuevo</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"><X size={48} className="text-red-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">Error de Cálculo</h3>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-6">Reintentar</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MinigameWhack = ({ game, onClose, addXP, addDiamonds }) => {
  const [moles, setMoles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { setGameOver(true); setWin(score >= 15); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [gameOver, score]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const type = Math.random() > 0.7 ? 'work' : 'distraction';
      const id = Date.now();
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      setMoles(prev => [...prev, { id, type, x, y }]);
      setTimeout(() => {
        setMoles(prev => prev.filter(m => m.id !== id));
      }, type === 'work' ? 2000 : 1500);
    }, 800);
    return () => clearInterval(interval);
  }, [gameOver]);

  const handleHit = (mole) => {
    if (mole.type === 'work') {
      setScore(s => Math.max(0, s - 3));
    } else {
      setScore(s => s + 1);
    }
    setMoles(prev => prev.filter(m => m.id !== mole.id));
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center text-white p-6">
      <div className="w-full max-w-sm bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30 rounded-[32px] p-6 shadow-[0_0_50px_rgba(239,68,68,0.2)] flex flex-col items-center relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white"><X size={16} /></button>
        <game.icon size={48} className="text-red-400 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
        <h2 className="text-2xl font-black uppercase text-white mb-1 tracking-tight text-center">{game.title}</h2>
        <p className="text-xs text-white/50 uppercase tracking-widest text-center mb-6">{game.subtitle}</p>

        {!gameOver ? (
          <>
            <div className="flex w-full justify-between mb-4">
              <div className="bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30"><span className="text-xl font-black text-white">{timeLeft}s</span></div>
              <div className="bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/30"><span className="text-xl font-black text-white">{score} Pts</span></div>
            </div>
            <div className="w-full aspect-square bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden shadow-inner">
              <AnimatePresence>
                {moles.map(mole => (
                  <motion.button key={mole.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileTap={{ scale: 0.8 }} onClick={() => handleHit(mole)} className={`absolute w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 ${mole.type === 'work' ? 'bg-blue-500 border-blue-300' : 'bg-red-500 border-red-300'}`} style={{ left: `${mole.x}%`, top: `${mole.y}%`, transform: 'translate(-50%, -50%)' }}>
                    {mole.type === 'work' ? <Activity size={24} className="text-white" /> : <Zap size={24} className="text-white" />}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <p className="text-[10px] uppercase text-white/50 text-center mt-4">Golpea lo rojo, evita lo azul. Objetivo: 15 Pts</p>
          </>
        ) : (
          <div className="flex flex-col items-center py-6">
            <h3 className={`text-4xl font-black uppercase mb-2 drop-shadow-lg ${win ? 'text-green-400' : 'text-red-400'}`}>{win ? 'VICTORIA' : 'DERROTA'}</h3>
            <p className="text-white/60 mb-8 uppercase tracking-widest font-bold text-center">Puntuación: {score}</p>
            {win && (
              <button onClick={() => { addXP(game.rewardXP); addDiamonds(game.rewardDia); onClose(); }} className="w-full py-4 rounded-full bg-green-500 text-black font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all">Reclamar Recompensa</button>
            )}
            {!win && (
              <button onClick={onClose} className="w-full py-4 rounded-full bg-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all">Intentar de Nuevo</button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MinigameStoic = ({ game, onClose, addXP, addDiamonds }) => {
  const QUOTES = [
    { phrase: "La riqueza no consiste en tener muchas posesiones sino en tener pocas necesidades", author: "Epicteto" },
    { phrase: "No nos afecta lo que nos sucede sino lo que nos decimos sobre lo que nos sucede", author: "Epicteto" },
    { phrase: "Elige no ser dañado y no te sentirás dañado", author: "Marco Aurelio" },
    { phrase: "La felicidad de tu vida depende de la calidad de tus pensamientos", author: "Marco Aurelio" },
    { phrase: "Si no es correcto no lo hagas, si no es verdad no lo digas", author: "Marco Aurelio" }
  ];

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const arr = QUOTES[quoteIdx].phrase.split(" ").map((w, i) => ({ id: i, text: w }));
    setWords(arr.sort(() => Math.random() - 0.5));
    setSelectedWords([]);
  }, [quoteIdx]);

  const handleSelect = (word) => {
    setSelectedWords([...selectedWords, word]);
    setWords(words.filter(w => w.id !== word.id));
  };

  const handleDeselect = (word) => {
    setWords([...words, word]);
    setSelectedWords(selectedWords.filter(w => w.id !== word.id));
  };

  const checkAnswer = () => {
    const currentStr = selectedWords.map(w => w.text).join(" ");
    if (currentStr.toLowerCase() === QUOTES[quoteIdx].phrase.toLowerCase()) {
      if (quoteIdx < 1) { // just do 2 quotes for the minigame
        setQuoteIdx(quoteIdx + 1);
      } else {
        setWin(true);
      }
    } else {
      const arr = QUOTES[quoteIdx].phrase.split(" ").map((w, i) => ({ id: i, text: w }));
      setWords(arr.sort(() => Math.random() - 0.5));
      setSelectedWords([]);
    }
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center text-white p-6">
      <div className="w-full max-w-sm bg-gradient-to-br from-slate-900 to-black border-2 border-slate-500/30 rounded-[32px] p-6 shadow-[0_0_50px_rgba(100,116,139,0.2)] flex flex-col items-center relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white"><X size={16} /></button>
        <game.icon size={48} className="text-slate-400 mb-4 drop-shadow-[0_0_15px_rgba(148,163,184,0.8)]" />
        <h2 className="text-2xl font-black uppercase text-white mb-1 tracking-tight text-center">{game.title}</h2>
        <p className="text-xs text-white/50 uppercase tracking-widest text-center mb-6">{game.subtitle}</p>

        {!win ? (
          <>
            <div className="w-full mb-6 text-center">
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Autor: {QUOTES[quoteIdx].author}</span>
              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest block mt-1">Frase {quoteIdx + 1}/2</span>
            </div>
            <div className="w-full min-h-[100px] border-b-2 border-white/20 mb-6 flex flex-wrap gap-2 items-start justify-center pb-4">
              <AnimatePresence>
                {selectedWords.map(w => (
                  <motion.button key={`sel-${w.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => handleDeselect(w)} className="bg-blue-500 text-white font-black uppercase text-[10px] px-3 py-1.5 rounded shadow-lg hover:scale-105 active:scale-95">{w.text}</motion.button>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <AnimatePresence>
                {words.map(w => (
                  <motion.button key={`w-${w.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => handleSelect(w)} className="bg-white/10 border border-white/20 text-white font-black uppercase text-[10px] px-3 py-1.5 rounded hover:bg-white/20 hover:scale-105 active:scale-95">{w.text}</motion.button>
                ))}
              </AnimatePresence>
            </div>
            {words.length === 0 && (
              <button onClick={checkAnswer} className="w-full py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]">Verificar</button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center py-6">
            <h3 className="text-4xl font-black uppercase mb-2 drop-shadow-lg text-green-400">ILUMINADO</h3>
            <p className="text-white/60 mb-8 uppercase tracking-widest font-bold text-center">Sabiduría Adquirida</p>
            <button onClick={() => { addXP(game.rewardXP); addDiamonds(game.rewardDia); onClose(); }} className="w-full py-4 rounded-full bg-green-500 text-black font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all">Reclamar Recompensa</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MinigameSequence = ({ game, onClose, addXP, addDiamonds }) => {
  const [gameState, setGameState] = useState('idle');
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [expectedIndex, setExpectedIndex] = useState(0);

  const startGame = (nextLevel = false) => {
    const currentLvl = nextLevel ? level + 1 : 1;
    if (!nextLevel) setLevel(1);
    else setLevel(currentLvl);

    const count = currentLvl === 1 ? 4 : currentLvl === 2 ? 6 : 9;
    let nums = Array.from({ length: count }, () => Math.floor(Math.random() * 99) + 1);
    nums = nums.map((n, i) => ({ val: n, id: i, clicked: false }));
    setNumbers(nums.sort(() => Math.random() - 0.5));
    setExpectedIndex(0);
    setGameState('playing');
  };

  const handleNumClick = (id, val) => {
    const sortedVals = [...numbers].map(n => n.val).sort((a, b) => a - b);
    if (val === sortedVals[expectedIndex]) {
      setNumbers(prev => prev.map(n => n.id === id ? { ...n, clicked: true } : n));
      if (expectedIndex + 1 === numbers.length) {
        if (level < 3) setGameState('won_level');
        else {
          setGameState('won_all');
          addXP(game.rewardXP);
          addDiamonds(game.rewardDia);
        }
      } else {
        setExpectedIndex(e => e + 1);
      }
    } else {
      setGameState('lost');
    }
  };

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[100] flex flex-col text-white">
      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="p-2 -ml-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
          <div className="flex gap-2">
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">+{game.rewardXP} XP</span>
            <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase flex items-center gap-1"><Gem size={8} /> +{game.rewardDia}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter">{game.title}</h2>
          <p className="text-xs text-white/50 uppercase mt-2 font-bold tracking-widest">Ordena de Menor a Mayor</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {gameState === 'idle' && (
            <button onClick={() => startGame(false)} className="w-48 h-48 rounded-full bg-indigo-600 text-white font-black uppercase tracking-widest shadow-[0_0_50px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all text-xl">
              Iniciar Prueba
            </button>
          )}

          {gameState === 'playing' && (
            <div className={`grid gap-4 w-full max-w-sm ${level === 1 ? 'grid-cols-2' : level === 2 ? 'grid-cols-3' : 'grid-cols-3'}`}>
              {numbers.map((n) => (
                <button key={n.id} onClick={() => !n.clicked && handleNumClick(n.id, n.val)} disabled={n.clicked} className={`aspect-square rounded-2xl text-3xl font-black transition-all duration-300 flex items-center justify-center ${n.clicked ? 'bg-indigo-600/50 text-white/30 scale-95 border-none' : 'bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg text-white'}`}>
                  {n.val}
                </button>
              ))}
            </div>
          )}

          {gameState === 'won_level' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6"><Check size={40} className="text-indigo-500" /></div>
              <h3 className="text-2xl font-black uppercase mb-2">Nivel {level} Superado</h3>
              <button onClick={() => startGame(true)} className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-6">Siguiente Nivel</button>
            </div>
          )}

          {gameState === 'won_all' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6"><LayoutGrid size={48} className="text-indigo-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">¡Orden Perfecto!</h3>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-6">Jugar de Nuevo</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"><X size={48} className="text-red-500" /></div>
              <h3 className="text-3xl font-black uppercase mb-2">Secuencia Rota</h3>
              <button onClick={() => startGame(false)} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-6">Reintentar</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BottomNav = ({ activeTab, onChange, currentThemeBg, lang = 'es' }) => {
  const t = UI_TEXT[lang];
  const navItems = [
    { id: 'forum', icon: Megaphone, label: t.forum },
    { id: 'rankings', icon: Trophy, label: t.rankings },
    { id: 'home', icon: Home, label: t.home },
    { id: 'shop', icon: ShoppingBag, label: t.shop },
    { id: 'profile', icon: User, label: t.profile }
  ];

  const themeProps = BACKGROUNDS[currentThemeBg]?.themeProps || BACKGROUNDS['bg_default'].themeProps;
  const isAgresive = themeProps.isAgresive;

  const isLight = themeProps.isLight;

  return (
    <div className="absolute bottom-8 left-6 right-6 h-[76px] z-[80]">
      <div className={`absolute top-[6px] left-0 right-0 h-[64px] rounded-[32px] border backdrop-blur-md ${themeProps.navBg} ${themeProps.navBorder} ${themeProps.navGlow || 'shadow-[0_20px_40px_rgba(0,0,0,0.5)]'} transition-all duration-700`} />

      <div className="absolute inset-0 flex items-center justify-between px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} onClick={() => onChange(item.id)} className="relative w-[60px] h-[76px] flex items-center justify-center cursor-pointer z-10 group">
              {isActive && (
                <motion.div layoutId="nav-selector" className={`absolute w-[76px] h-[76px] rounded-full ${isAgresive ? 'bg-red-600/90 shadow-[0_0_20px_red]' : (isLight ? 'bg-slate-200/80' : 'bg-white shadow-lg')}`} transition={{ type: "spring", stiffness: 300, damping: 25 }} />
              )}
              <Icon size={24} className={`relative z-20 transition-colors duration-300 ${isActive ? (isAgresive ? 'text-white' : 'text-black') : (isLight ? 'text-black/40 group-hover:text-black' : 'text-white/40 group-hover:text-white')}`} strokeWidth={isActive ? 2.5 : 2} />
            </div>
          );
        })}
      </div>
    </div>
  );
};


// --- APP COMPONENT ---
function App() {
  const [step, setStep] = useState('onboarding');
  const [lang, setLang] = useState('es');
  const [selectedApps, setSelectedApps] = useState([]);
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  const toggleMode = () => {
    setIsLight(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'light' : 'dark');
      return next;
    });
  };

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLight]);

  // --- Supabase auth ---
  const [supabaseUserId, setSupabaseUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [authReturnStep, setAuthReturnStep] = useState(null);
  const [authInitialIsLogin, setAuthInitialIsLogin] = useState(false);
  const [dbLoaded, setDbLoaded] = useState(false);

  const [username, setUsername] = useState('');
  const [userGender, setUserGender] = useState('any');
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [userXP, setUserXP] = useState(0);
  const [userDiamonds, setUserDiamonds] = useState(0);

  const [mainNav, setMainNav] = useState('home');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [forumPosts, setForumPosts] = useState(INITIAL_FORUM_POSTS);

  const [completedCount, setCompletedCount] = useState(0);
  const [activityLog, setActivityLog] = useState([
    { id: 'start_1', title: 'Viaje Iniciado', subtitle: 'Bienvenido a Focusly', time: 'Hoy', icon: 'Activity' }
  ]);
  const [loginStreak, setLoginStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);

  const [inventory, setInventory] = useState({
    avatars: ['a_base'],
    backgrounds: ['bg_default'],
    skins: [],
    equippedAvatar: 'a_base',
    equippedBg: 'bg_default',
    equippedSkins: { 'a_base': null }
  });

  const isBgLight = inventory.equippedBg === 'bg_light';

  useEffect(() => {
    if (isBgLight) {
      document.body.classList.add('theme-light-active');
    } else {
      document.body.classList.remove('theme-light-active');
    }
  }, [isBgLight]);

  const [chatPerson, setChatPerson] = useState(null);
  const [unreadFilter, setUnreadFilter] = useState(false);
  const [activeForumTab, setActiveForumTab] = useState('avisos');

  const [showChallengeDetail, setShowChallengeDetail] = useState(null);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showActiveInteractive, setShowActiveInteractive] = useState(false);
  const [activeMinigame, setActiveMinigame] = useState(null);

  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [isShopMode, setIsShopMode] = useState(false);

  const [rewardAlert, setRewardAlert] = useState(null);

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [coachChatOpen, setCoachChatOpen] = useState(false);
  const [coachMessages, setCoachMessages] = useState([]);
  const [coachInput, setCoachInput] = useState('');
  const [completedActivities, setCompletedActivities] = useState([]);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [blockedAppsConfig, setBlockedAppsConfig] = useState({});
  const [showAICalendar, setShowAICalendar] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCreateHabit, setShowCreateHabit] = useState(false);
  const [showAIHabit, setShowAIHabit] = useState(false);

  const [activeChatsHistory, setActiveChatsHistory] = useState(() => {
    return MESSAGES_DATA.reduce((acc, person) => {
      acc[person.id] = [
        { id: 1, text: `¡Hola! Soy ${person.name}, ¿cómo vas con los bloqueos de apps hoy?`, sender: 'other', time: person.time }
      ];
      return acc;
    }, {});
  });

  // --- Supabase: helper para guardar perfil ---
  const saveProfile = useCallback(async (uid, data) => {
    if (!uid) return;
    await supabase.from('profiles').upsert({ id: uid, ...data, updated_at: new Date().toISOString() });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // --- Supabase: inicializar sesión anónima y cargar perfil ---
  useEffect(() => {
    const initSupabase = async () => {
      // Intentar obtener sesión existente
      const { data: { session } } = await supabase.auth.getSession();
      let uid = session?.user?.id;

      // Helper: detectar cuenta anónima leyendo el claim is_anonymous del JWT
      const getIsAnonymousFromJWT = (sess) => {
        try {
          if (!sess?.access_token) return true;
          const payload = JSON.parse(atob(sess.access_token.split('.')[1]));
          return payload.is_anonymous === true;
        } catch { return !sess?.user?.email; }
      };

      // Si no hay sesión, crear una anónima
      if (!uid) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error) {
          uid = data.user?.id;
          setUserEmail(null);
          setIsAnonymous(true);
        }
      } else {
        const anon = getIsAnonymousFromJWT(session);
        setUserEmail(anon ? null : (session?.user?.email || null));
        setIsAnonymous(anon);
      }

      if (!uid) {
        setDbLoaded(true);
        return;
      }

      setSupabaseUserId(uid);

      // Cargar perfil del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (profile && profile.onboarding_done) {
        // Usuario existente: restaurar todo su progreso
        setUsername(profile.username || 'Jugador_Nuevo');
        setUserGender(profile.user_gender || 'any');
        setSelectedApps(profile.selected_apps || []);
        setSelectedLevel(profile.selected_level || null);
        setUserXP(profile.user_xp || 0);
        setUserDiamonds(profile.user_diamonds || 0);
        // Sanitizar inventario completo — ningún campo puede ser undefined
        const rawInv = profile.inventory || {};
        const safeInv = {
          avatars:       Array.isArray(rawInv.avatars)      ? rawInv.avatars      : ['a_base'],
          backgrounds:   Array.isArray(rawInv.backgrounds)  ? rawInv.backgrounds  : ['bg_default', 'bg_light'],
          skins:         Array.isArray(rawInv.skins)        ? rawInv.skins        : [],
          equippedAvatar: rawInv.equippedAvatar || 'a_base',
          equippedBg:     rawInv.equippedBg     || 'bg_default',
          equippedSkins:  (rawInv.equippedSkins && typeof rawInv.equippedSkins === 'object') ? rawInv.equippedSkins : {},
        };
        if (!safeInv.backgrounds.includes('bg_default')) {
          safeInv.backgrounds = ['bg_default', ...safeInv.backgrounds];
        }
        if (!safeInv.backgrounds.includes('bg_light')) {
          safeInv.backgrounds = [...safeInv.backgrounds, 'bg_light'];
        }
        setInventory(safeInv);
        setActiveChallenge(profile.active_challenge || null);
        setCompletedActivities(profile.completed_activities || []);
        setCalendarTasks(profile.calendar_tasks || []);
        setBlockedAppsConfig(profile.blocked_apps_config || {});
        // Campos sincronizados
        if (typeof profile.completed_count === 'number') setCompletedCount(profile.completed_count);
        if (Array.isArray(profile.activity_log) && profile.activity_log.length > 0) setActivityLog(profile.activity_log);
        if (profile.lang) setLang(profile.lang);
        // Racha de días consecutivos (en un try-catch para que nunca bloquee el flujo)
        try {
          const today = new Date().toISOString().split('T')[0];
          const savedLastLogin = profile.last_login_date || null;
          let newStreak = typeof profile.login_streak === 'number' ? profile.login_streak : 0;
          if (savedLastLogin) {
            const diffMs = new Date(today) - new Date(savedLastLogin);
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays === 1) newStreak += 1;
            else if (diffDays > 1) newStreak = 1;
          } else {
            newStreak = Math.max(newStreak, 1);
          }
          setLoginStreak(newStreak);
          setLastLoginDate(today);
          // Guardar racha en Supabase (silencia errores si columnas no existen aún)
          supabase.from('profiles').update({ login_streak: newStreak, last_login_date: today }).eq('id', uid).then(() => {});
        } catch (_) {}
        // Si ya visitó la landing en esta sesión de navegador, marcar como cargado
        if (sessionStorage.getItem('visited_landing') === 'true') {
          setStep('main');
        }
      } else {
        // Si el usuario ya está logueado de forma permanente pero no tiene perfil en la DB (o onboarding_done es false),
        // inicializamos un perfil por defecto para que no se quede atrapado en el onboarding slider.
        const isAnonSession = (() => { try { if (!session?.access_token) return true; const p = JSON.parse(atob(session.access_token.split('.')[1])); return p.is_anonymous === true; } catch { return !session?.user?.email; } })();
        if (session && !isAnonSession) {
          const defaultProfile = {
            username: profile?.username || session.user.email.split('@')[0],
            user_gender: profile?.user_gender || 'any',
            selected_apps: profile?.selected_apps || [],
            selected_level: profile?.selected_level || 1,
            user_xp: profile?.user_xp || 0,
            user_diamonds: profile?.user_diamonds || 0,
            inventory: profile?.inventory || {
              avatars: ['a_base'],
              backgrounds: ['bg_default'],
              skins: [],
              equippedAvatar: 'a_base',
              equippedBg: 'bg_default',
              equippedSkins: { 'a_base': null }
            },
            onboarding_done: true
          };
          
          await saveProfile(uid, defaultProfile);
          
          setUsername(defaultProfile.username);
          setUserGender(defaultProfile.user_gender);
          setSelectedApps(defaultProfile.selected_apps);
          setSelectedLevel(defaultProfile.selected_level);
          setInventory(defaultProfile.inventory);
          setStep('main');
        } else {
          // Usuario nuevo anónimo: mostrar onboarding normal
          setCalendarTasks([
            { id: 't1', title: 'Examen de Matemáticas', date: new Date().toISOString().split('T')[0], type: 'examen' },
            { id: 't2', title: 'Leer capítulo 4', date: new Date().toISOString().split('T')[0], type: 'tarea' }
          ]);
        }
      }

      setDbLoaded(true);
    };

    initSupabase();
  }, [saveProfile]);

  // --- Supabase: splash timer ---
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // --- Supabase: sincronizar estado completo automáticamente ---
  useEffect(() => {
    if (!supabaseUserId || !dbLoaded || step !== 'main') return;
    const timeout = setTimeout(() => {
      saveProfile(supabaseUserId, {
        user_xp: userXP,
        user_diamonds: userDiamonds,
        inventory,
        active_challenge: activeChallenge,
        completed_activities: completedActivities,
        calendar_tasks: calendarTasks,
        blocked_apps_config: blockedAppsConfig,
        // Nuevos campos
        completed_count: completedCount,
        activity_log: activityLog.slice(0, 30),
        lang,
      });
    }, 1500); // debounce de 1.5s para no saturar la DB
    return () => clearTimeout(timeout);
  }, [userXP, userDiamonds, inventory, activeChallenge, completedActivities, calendarTasks, blockedAppsConfig, completedCount, activityLog, lang, supabaseUserId, dbLoaded, step, saveProfile]);

  // --- Handler: cuando el onboarding termina, guardar perfil completo ---
  const handleOnboardingComplete = useCallback(async (name, gender) => {
    const finalName = name || 'Jugador_Nuevo';
    const finalGender = gender || 'any';
    setUsername(finalName);
    setUserGender(finalGender);
    
    const { data: { session } } = await supabase.auth.getSession();
    const currentUid = session?.user?.id || supabaseUserId;

    if (currentUid) {
      await saveProfile(currentUid, {
        username: finalName,
        user_gender: finalGender,
        onboarding_done: false, // se pondrá true cuando elija nivel
      });
    }
    setStep('apps');
  }, [supabaseUserId, saveProfile]);

  const handleLevelConfirm = useCallback(async () => {
    if (supabaseUserId) {
      await saveProfile(supabaseUserId, {
        selected_apps: selectedApps,
        selected_level: selectedLevel,
        onboarding_done: true,
      });
    }
    setStep('main');
  }, [supabaseUserId, selectedApps, selectedLevel, saveProfile]);


  const handleStartChallenge = (challenge) => {
    setActiveChallenge({ ...challenge, currentDay: 0 });
    setShowChallengeDetail(null);
    setShowAllChallenges(false);
  };

  const handleCompleteChallenge = async () => {
    if (!activeChallenge) return;
    const xpEarned = activeChallenge.xp || 150;
    const diamondsEarned = activeChallenge.diamonds || 50;

    setCompletedCount(prev => prev + 1);
    setActivityLog(prev => [{ id: Date.now().toString(), title: 'Sesión completada', subtitle: activeChallenge.title, time: 'Hace un momento', icon: 'Target' }, ...prev]);
    setUserXP(prev => prev + xpEarned);
    setUserDiamonds(prev => prev + diamondsEarned);

    // Guardar sesión en Supabase para la IA
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      await supabase.from('focus_sessions').insert({
        user_id: session.user.id,
        session_type: activeChallenge.title,
        duration_minutes: (activeChallenge.duration || 1) * 1440,
        xp_earned: xpEarned,
        diamonds_earned: diamondsEarned
      });
    }

    if (activeChallenge.reward) {
      const r = activeChallenge.reward;
      let itemName = '';
      if (r.type === 'avatar' && !inventory.avatars.includes(r.id)) {
        setInventory(p => ({ ...p, avatars: [...p.avatars, r.id] }));
        itemName = SHOP_ITEMS.find(i => i.id === r.id)?.name || 'Personaje';
      } else if (r.type === 'background' && !inventory.backgrounds.includes(r.id)) {
        setInventory(p => ({ ...p, backgrounds: [...p.backgrounds, r.id] }));
        itemName = SHOP_ITEMS.find(i => i.id === r.id)?.name || 'Entorno';
      } else if (r.type === 'skin' && !inventory.skins.includes(r.id)) {
        setInventory(p => ({ ...p, skins: [...p.skins, r.id] }));
        itemName = ALL_SKINS.find(s => s.id === r.id)?.name || 'Aspecto';
      }
      if (itemName) setRewardAlert(`¡Has desbloqueado: ${itemName}!`);
    }

    setActiveChallenge(null);
  };

  const handleAddXP = (amount) => setUserXP(prev => prev + amount);
  const handleAddDiamonds = (amount) => setUserDiamonds(prev => prev + amount);

  const handleItemAction = (action, item) => {
    if (action === 'buy') {
      if (userDiamonds >= item.price) {
        setUserDiamonds(prev => prev - item.price);
        if (item.category === 'avatar') {
          setInventory({ ...inventory, avatars: [...inventory.avatars, item.id] });
        } else if (item.category === 'background') {
          setInventory({ ...inventory, backgrounds: [...inventory.backgrounds, item.id] });
        }
        setSelectedInventoryItem(null);
      }
    } else if (action === 'equip') {
      if (item.category === 'avatar') setInventory({ ...inventory, equippedAvatar: item.id });
      else setInventory({ ...inventory, equippedBg: item.id });
      setSelectedInventoryItem(null);
    } else if (action === 'gotoShop') {
      setSelectedInventoryItem(null);
      setMainNav('shop');
      setTimeout(() => {
        setSelectedInventoryItem(item);
        setIsShopMode(true);
      }, 300);
    } else if (action === 'buy_skin') {
      if (userDiamonds >= item.price) {
        setUserDiamonds(prev => prev - item.price);
        setInventory(prev => ({ ...prev, skins: [...(prev.skins || []), item.id] }));
      }
    } else if (action === 'equip_skin') {
      setInventory(prev => ({ ...prev, equippedSkins: { ...(prev.equippedSkins || {}), [item.baseId]: item.skinId } }));
    }
  };

  const openShopItem = (item) => {
    setIsShopMode(true);
    setSelectedInventoryItem(item);
  };

  const openInventoryItem = (item) => {
    setIsShopMode(false);
    setSelectedInventoryItem(item);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen selection:bg-red-500 selection:text-white transition-colors duration-1000 ${isLight ? 'bg-slate-100' : 'bg-[#000]'}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 0px; display: none; }
        body { background-color: #000; color: white; font-family: 'Inter', sans-serif; overflow: hidden; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
      `}} />

      <div className={`w-full h-screen sm:w-[390px] sm:h-[844px] sm:rounded-[60px] sm:border-[10px] sm:border-[#1a1a1a] relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] transition-all duration-1000 ${(BACKGROUNDS[inventory.equippedBg] || BACKGROUNDS['bg_default']).css} ${isLight ? 'theme-light' : ''}`}>
        <GlobalThemeEffects themeId={inventory.equippedBg} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-[2rem] z-[110]" />

        <AnimatePresence mode="wait">
          {step === 'splash' && (
            <Splash key="splash" onComplete={() => {
              if (supabaseUserId && dbLoaded) {
                setStep('main');
              } else {
                setStep('logoReveal');
              }
            }} />
          )}
          {step === 'onboarding' && (
            <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[200]">
              <Onboarding onFinish={() => setStep('splash')} />
            </motion.div>
          )}
          {step === 'logoReveal' && <LogoReveal key="logoReveal" onContinue={() => setStep('auth')} onBack={() => setStep('onboarding')} />}
          {step === 'auth' && (
            <AuthScreen 
              key="auth" 
              lang={lang} 
              initialIsLogin={authInitialIsLogin}
              isLinking={authReturnStep === 'main'}
              onBack={() => {
                if (authReturnStep === 'main') {
                  setStep('main');
                  setMainNav('profile');
                } else {
                  setStep('logoReveal');
                }
              }} 
              onContinue={async (name, gender) => {
                if (authReturnStep === 'main') {
                  // Actualizar estado de la sesión local
                  const { data: { session } } = await supabase.auth.getSession();
                  const isAnon = (() => { try { if (!session?.access_token) return true; const p = JSON.parse(atob(session.access_token.split('.')[1])); return p.is_anonymous === true; } catch { return !session?.user?.email; } })();
                  setUserEmail(isAnon ? null : (session?.user?.email || null));
                  setIsAnonymous(isAnon);
                  if (session?.user?.id) {
                    await saveProfile(session.user.id, { onboarding_done: true });
                  }
                  setStep('main');
                  setMainNav('profile');
                } else {
                  await handleOnboardingComplete(name, gender);
                }
              }} 
            />
          )}

          {step === 'apps' && (
            <motion.div key="apps" initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} transition={{ duration: 0.6 }} className="absolute inset-0 bg-black z-40 text-white flex flex-col">
              <div className="flex-1 overflow-y-auto custom-scroll px-8 pt-20 pb-32">
                <button onClick={() => setStep('auth')} className="flex items-center gap-1 opacity-20 hover:opacity-100 transition-opacity mb-8 -ml-2 w-max text-white"><ChevronLeft size={24} /></button>
                <motion.h1 animate={{ y: [0, -5, 0], textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 25px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="text-4xl font-black uppercase tracking-tighter mb-10 leading-[0.9] text-white">Elige<br />tus Apps</motion.h1>
                <div className="grid grid-cols-3 gap-x-6 gap-y-8 content-start pb-10">
                  {APPS.map(app => {
                    const isSelected = selectedApps.includes(app.id);
                    return (
                      <motion.button key={app.id} onClick={() => setSelectedApps(p => p.includes(app.id) ? p.filter(x => x !== app.id) : [...p, app.id])} whileTap={{ scale: 0.9 }} className="relative flex flex-col items-center gap-3 outline-none mx-auto">
                        <div className="relative w-16 h-16 flex items-center justify-center transition-all duration-500">
                          <img src={app.icon} className={`w-full h-full object-contain transition-all duration-500 ${isSelected ? 'grayscale-0 opacity-100 scale-110 brightness-150 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'grayscale opacity-30 scale-90 brightness-200'}`} alt={app.name} />
                          <AnimatePresence>
                            {isSelected && <motion.div key={`check-${app.id}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute -top-1 -right-1 w-5 h-5 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg"><Check size={12} color="white" strokeWidth={3} /></motion.div>}
                          </AnimatePresence>
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-500 ${isSelected ? 'text-white' : 'text-white/20'}`}>{app.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 z-50"><button onClick={() => setStep('levels')} className="w-full bg-white text-black py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">A desintoxicarse</button></div>
            </motion.div>
          )}

          {step === 'levels' && (
            <motion.div key="levels" initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} transition={{ duration: 0.6 }} className="absolute inset-0 bg-black z-40 flex flex-col">
              <div className="flex-1 overflow-y-auto custom-scroll px-8 pt-20 pb-32">
                <button onClick={() => setStep('apps')} className="flex items-center gap-1 opacity-20 hover:opacity-100 transition-opacity mb-8 -ml-2 w-max text-white"><ChevronLeft size={24} /></button>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white">Elige tu<br />Desafío</h1>
                <div className="space-y-4 pb-10">
                  {LEVELS.map(l => {
                    const Icon = l.icon;
                    const isSelected = selectedLevel === l.id;
                    return (
                      <motion.div layout="position" key={l.id} onClick={() => setSelectedLevel(l.id)} animate={{ borderColor: isSelected ? l.hex : 'rgba(255,255,255,0.1)', backgroundColor: isSelected ? '#151515' : '#0c0c0c', boxShadow: isSelected ? `0 0 30px ${l.hex}33, inset 0 0 15px ${l.hex}1A` : '0 0 0px rgba(0,0,0,0)' }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="border rounded-[32px] p-6 cursor-pointer flex flex-col relative overflow-hidden">
                        <AnimatePresence>
                          {isSelected && <motion.div key={`glow-${l.id}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.2, 1] }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-[50px] pointer-events-none z-0" style={{ backgroundColor: l.hex }} />}
                        </AnimatePresence>
                        <motion.div layout="position" className="relative z-10 flex justify-between items-center w-full">
                          <div><span className={`text-[8px] font-black tracking-widest ${l.color}`}>{l.tag}</span><h3 className="text-xl font-black uppercase mt-1 text-white">{l.title}</h3></div>
                          <motion.div animate={{ backgroundColor: isSelected ? `${l.hex}1A` : 'rgba(255,255,255,0.05)', boxShadow: isSelected ? `0 0 20px ${l.hex}66` : '0 0 0px rgba(0,0,0,0)' }} className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300"><Icon size={24} color={isSelected ? l.hex : "rgba(255,255,255,0.3)"} strokeWidth={isSelected ? 2.5 : 2} /></motion.div>
                        </motion.div>
                        <AnimatePresence>
                          {isSelected && <motion.div key={`details-${l.id}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="relative z-10 overflow-hidden"><div className="pt-4 mt-4 border-t border-white/10"><p className="text-[11px] text-white/60 italic font-medium leading-relaxed">{l.desc}</p><div className="mt-4 flex gap-2"><span style={{ color: l.hex, backgroundColor: `${l.hex}1A`, borderColor: `${l.hex}33` }} className="px-3 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase border">+{l.id * 10}XP / DÍA</span><span style={{ color: l.hex, backgroundColor: `${l.hex}1A`, borderColor: `${l.hex}33` }} className="px-3 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase border">NIVEL {l.id}</span></div></div></motion.div>}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 z-50"><button onClick={handleLevelConfirm} disabled={!selectedLevel} className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all ${selectedLevel ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>Confirmar Reto</button></div>
            </motion.div>
          )}

          {step === 'main' && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40">
              <AnimatePresence mode="wait">
                {mainNav === 'home' && <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><HomeDashboard selectedApps={selectedApps} activeChallenge={activeChallenge} onSelectChallenge={setShowChallengeDetail} onOpenActive={() => setShowActiveInteractive(true)} onOpenAll={() => setShowAllChallenges(true)} onCompleteChallenge={handleCompleteChallenge} onPlayMinigame={setActiveMinigame} userGender={userGender} selectedCoach={selectedCoach} setSelectedCoach={setSelectedCoach} completedActivities={completedActivities} setCompletedActivities={setCompletedActivities} userXP={userXP} setUserXP={setUserXP} userDiamonds={userDiamonds} setUserDiamonds={setUserDiamonds} calendarTasks={calendarTasks} setCalendarTasks={setCalendarTasks} blockedAppsConfig={blockedAppsConfig} setBlockedAppsConfig={setBlockedAppsConfig} onOpenAICalendar={() => setShowAICalendar(true)} onOpenAIHabit={() => setShowAIHabit(true)} onOpenCreateHabit={() => setShowCreateHabit(true)} lang={lang} supabaseUserId={supabaseUserId} setCoachChatOpen={setCoachChatOpen} isLight={isLight} toggleMode={toggleMode} onOpenLanding={() => setStep('onboarding')} /></motion.div>}
                {mainNav === 'forum' && <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Forum onSelectChat={(p) => { setChatPerson(p); setStep('chat'); }} unreadFilter={unreadFilter} setUnreadFilter={setUnreadFilter} activeTab={activeForumTab} setActiveTab={setActiveForumTab} forumPosts={forumPosts} setForumPosts={setForumPosts} userAvatarItem={SHOP_ITEMS.find(i => i.id === inventory.equippedAvatar)} username={username} /></motion.div>}
                {mainNav === 'rankings' && <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Rankings userXP={userXP} inventory={inventory} username={username} /></motion.div>}
                {mainNav === 'shop' && <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><ShopView userDiamonds={userDiamonds} onSelectItem={openShopItem} inventory={inventory} /></motion.div>}
                {mainNav === 'profile' && (
                  <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
                    <ErrorBoundary>
                      <ProfileView 
                        inventory={inventory} 
                        setInventory={setInventory} 
                        userXP={userXP} 
                        username={username} 
                        onOpenItem={openInventoryItem} 
                        completedCount={completedCount} 
                        activityLog={activityLog} 
                        selectedApps={selectedApps} 
                        setSelectedApps={setSelectedApps} 
                        lang={lang} 
                        setLang={setLang} 
                        userEmail={userEmail}
                        isAnonymous={isAnonymous}
                        onSignOut={handleSignOut}
                        onLinkAccount={(isLoginView) => {
                          setAuthReturnStep('main');
                          setAuthInitialIsLogin(isLoginView);
                          setStep('auth');
                        }}
                        onOpenStats={() => setShowStats(true)}
                        loginStreak={loginStreak}
                        isLight={isLight}
                        toggleMode={toggleMode}
                        onOpenLanding={() => setStep('onboarding')}
                      />
                    </ErrorBoundary>
                  </motion.div>
                )}
              </AnimatePresence>

              <BottomNav activeTab={mainNav} onChange={setMainNav} currentThemeBg={inventory.equippedBg} lang={lang} />

              <AnimatePresence>
                {showChallengeDetail && <ChallengeDetail key="modal-challenge" challenge={showChallengeDetail} onClose={() => setShowChallengeDetail(null)} onStart={handleStartChallenge} />}
                {showAllChallenges && <AllChallengesView key="modal-all-challenges" selectedApps={selectedApps} onClose={() => setShowAllChallenges(false)} onSelectChallenge={setShowChallengeDetail} userGender={userGender} />}
                {showActiveInteractive && activeChallenge && <ActiveChallengeInteractive key="modal-active" challenge={activeChallenge} onClose={() => setShowActiveInteractive(false)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}

                {activeMinigame && activeMinigame.type === 'reflex' && <MinigameReflex key="modal-minigame-reflex" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'memory' && <MinigameMemory key="modal-minigame-memory" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'millionaire' && <MinigameMillionaire key="modal-minigame-millionaire" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'math' && <MinigameMath key="modal-minigame-math" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'sequence' && <MinigameSequence key="modal-minigame-sequence" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'whack' && <MinigameWhack key="modal-minigame-whack" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'stoic' && <MinigameStoic key="modal-minigame-stoic" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}

                {selectedInventoryItem && <UniversalDetailModal key="modal-item" item={selectedInventoryItem} userDiamonds={userDiamonds} onClose={() => setSelectedInventoryItem(null)} onAction={handleItemAction} inventory={inventory} isShopMode={isShopMode} />}

                {showAICalendar && <AICalendarModal key="modal-ai-calendar" onClose={() => setShowAICalendar(false)} calendarTasks={calendarTasks} setCalendarTasks={setCalendarTasks} />}
                {showStats && <StatsModal key="modal-stats" onClose={() => setShowStats(false)} calendarTasks={calendarTasks} completedCount={completedCount} userXP={userXP} />}
                {showCreateHabit && <CreateHabitModal key="modal-create-habit" onClose={() => setShowCreateHabit(false)} onAdd={(newHabit) => setCalendarTasks(prev => [...prev, newHabit])} />}
                {showAIHabit && <AIHabitPlanModal key="modal-ai-habit" onClose={() => setShowAIHabit(false)} onAddHabits={(newHabits) => setCalendarTasks(prev => [...prev, ...newHabits])} />}

                {/* Alerta de Recompensas Especiales */}
                {rewardAlert && (
                  <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 50, opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-0 left-0 right-0 z-[200] mx-4 bg-yellow-500/20 backdrop-blur-xl border-2 border-yellow-400 p-4 rounded-3xl flex items-center justify-between shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner"><Star size={20} className="text-black" /></div>
                      <h3 className="text-sm font-black uppercase tracking-tight text-white">{rewardAlert}</h3>
                    </div>
                    <button onClick={() => setRewardAlert(null)} className="p-2 bg-black/40 rounded-full hover:bg-black/60"><X size={16} /></button>
                  </motion.div>
                )}
                 {coachChatOpen && selectedCoach && (() => {
                  // Banco de respuestas por coach con personalidad real
                  const COACH_PERSONALITIES = {
                    sophia: {
                      greet: `Hola 🌙 Soy Sophia. Entiendo la presión que sentís con el colegio, las expectativas y esa sensación de que nunca es suficiente. Estoy aquí para acompañarte, sin juzgarte. ¿Qué te tiene agobiada/o hoy?`,
                      keywords: {
                        ansiedad: [`Respiremos. Esa sensación de agobio que sentís es real, no te estás inventando nada. 💙 Pero acordate: no podés controlarlo todo. ¿Qué es lo único que podés hacer hoy, por pequeño que sea?`, `La ansiedad miente. Te dice que todo es urgente, que todo puede salir mal. Preguntate: "¿Qué es lo peor que podría pasar realmente?" Casi nunca es tan grave como parece.`, `Cuando la ansiedad aparece, tu cerebro entra en modo supervivencia. Un truco: nómbra 5 cosas que ves, 4 que tocás, 3 que escuchás. Esto te regresa al presente.`],
                        instagram: [`Esa comparación que sentís cuando ves Instagram es completamente normal. Pero recordá: estás viendo los mejores 3 segundos de la vida de alguien, no su realidad completa. 📸`, `¿Sabías que el 70% de lo que ves en Instagram es contenido diseñado específicamente para hacerte sentir menos? No es tu inseguridad, es el algoritmo haciendo su trabajo.`, `Un ejercicio: la próxima vez que abras Insta y sientas esa punzada de "ellos tienen más", cerrá la app y escribí una cosa en la que vos mejoraste esta semana.`],
                        notas: [`Las notas son importantes, pero no son lo único importante. Son una foto de un momento, no una definición de quién sos. 📚`, `Si las notas te están aplastando, hagamos algo simple: dividí el material en partes del tamaño de un bocado. Una página. Un concepto. No la materia entera.`, `¿Estudiaste hoy aunque sea 15 minutos? Eso cuenta. La constancia pequeña gana a la intensidad esporádica. Siempre.`],
                        default: [`Entiendo. La presión académica es real y te agota emocionalmente, no solo mentalmente. ¿Qué es lo que más te está costando en este momento?`, `Date permiso de no tenerlo todo resuelto. La perfección es una trampa que paraliza más de lo que ayuda. ¿Qué es lo que podría estar "suficientemente bien" hoy?`, `A veces la mejor estrategia es empezar por la tarea más pequeña de tu lista. No la más importante. La más pequeña. Y ver cómo eso te da impulso para seguir.`]
                      }
                    },
                    icaro: {
                      greet: `¡Buenas! 🔥 Soy Ícaro. Sé perfectamente lo que es el TikTok infinito, las ganas de hacer algo pero no arrancar nunca. No vengo a darte un sermón, vengo a darte el empujón. ¿Qué tenés que hacer y no estás haciendo?`,
                      keywords: {
                        tiktok: [`Eso que sentís cuando cerrás TikTok y no recordás qué viste es exactamente tu dopamina volviendo al piso. Tu cerebro fue secuestrado. Ahora vamos a recuperarlo. 5-4-3-2-1, ¡arrancá!`, `El algoritmo de TikTok fue diseñado por los mejores ingenieros del mundo para que no puedas parar. No es debilidad tuya. Pero podés hackear el sistema: borrá la app por 72 horas. Solo 72 horas.`, `Cada video corto que rechazás hoy es literalmente una sinapsis más fuerte mañana. Tu cerebro se puede reparar. Pero necesita que vos le des la oportunidad.`],
                        procrastinar: [`Procrastinar no es pereza, es miedo disfrazado. Miedo a que no quede bien, a que sea difícil, a fallar. ¿De qué estás huyendo exactamente?`, `Regla de los 2 minutos: si algo tarda menos de 2 minutos, hacelo AHORA. Si tarda más, poné un temporizador de 5 minutos y empezá igual. Casi nunca parás a los 5 minutos.`, `Tu cerebro busca el camino de menor resistencia. Las apps le dan placer instantáneo. El estudio requiere esfuerzo. La solución: poné el cel en otra habitación. Literalmente en otra habitación.`],
                        motivacion: [`La motivación es un mito. Los campeones no esperan estar motivados, actúan aunque no tengan ganas. La acción crea motivación, no al revés. Empezá aunque sea un minuto.`, `¿Por qué querés mejorar? No me digas "para sacar buenas notas". Decime el por qué de verdad. Esa razón profunda es tu combustible cuando la motivación falla.`, `Cada vez que hacés algo difícil cuando no tenés ganas, te estás demostrando a vos mismo que podés. Esa confianza se acumula. Arranqué ya, aunque sea mal.`],
                        default: [`Pará. ¿Cuánto tiempo llevas "pensando en empezar"? Ese tiempo ya es tiempo perdido. La acción imperfecta siempre gana a la inacción perfecta. ¿Qué hacés en los próximos 5 minutos?`, `Dale, contame. ¿Cuál es la excusa de hoy? Porque yo ya escuché todas y tengo respuesta para cada una. 😤`, `No te pido que hagas todo. Te pido que hagas UNA cosa. ¿Cuál es la cosa más pequeña que podés hacer ahora mismo hacia tu objetivo?`]
                      }
                    },
                    atlas: {
                      greet: `¡Hola! 📚 Soy Atlas. Sé que sos competitivo y que YouTube y los juegos son más divertidos que estudiar. Pero hay una forma de usar esa mentalidad gamer para dominar cualquier materia. ¿Qué querés mejorar?`,
                      keywords: {
                        youtube: [`YouTube no es el problema si lo usás bien. El 90% lo usa para entretenimiento. El 10% lo usa para aprender habilidades reales. ¿En qué grupo querés estar?`, `Subscripción nueva: busca "Khan Academy" o "[materia que estudias] explained" en YouTube. Convertí tu tiempo de consumo en tiempo de aprendizaje. Mismo tiempo, diferente resultado.`, `Truco de gamer para YouTube: usá el modo de velocidad 1.5x para videos educativos. Aprendés más en menos tiempo. Tu cerebro se adapta en 10 minutos.`],
                        videojuegos: [`Los mejores gamers del mundo también estudian sus errores, leen guías, practican mecánicas. Esa mentalidad de mejora constante que tenés para los juegos... llevala al colegio.`, `En los juegos, cada nivel desbloqueado es XP acumulada. El colegio funciona igual: cada concepto que dominás desbloquea el siguiente. ¿Cuál es el "boss level" que necesitás derrotar esta semana?`, `¿Cuántas horas pusiste en ese juego hasta dominarlo? Aplicá ese mismo principio de repetición deliberada a la materia que más te cuesta. Los resultados te van a sorprender.`],
                        concentracion: [`El estado de flow que sentís cuando estás metido en un juego y el tiempo vuela existe también para el estudio. La clave: sin notificaciones, sin multitarea, tarea clara y desafiante pero alcanzable.`, `Para entrar en modo concentración: 1) Poné el cel en modo avión. 2) Cerrá todas las pestañas innecesarias. 3) Poné música instrumental. 4) Empezá con la tarea más difícil mientras tu energía está alta.`, `Las interrupciones son el enemigo número 1 del rendimiento cognitivo. Cada notificación te saca del estado de flujo y tardás 23 minutos en volver. ¿Cuántas notificaciones recibís por hora?`],
                        default: [`Analicemos tu situación tácticamente. ¿Cuáles son tus materias más fuertes? ¿Cuáles son las más débiles? Con esa información podemos diseñar un plan de ataque real.`, `En todo juego hay estrategia. El estudio también la tiene. ¿Estás estudiando sin estrategia o con una? Porque la diferencia en resultados es enorme.`, `Los mejores en cualquier campo tienen rutinas. ¿Cuál es tu rutina de estudio actual? Dímela y te digo qué le falta o qué sobra.`]
                      }
                    },
                    vento: {
                      greet: `Hola 💬 Soy Vento. Entiendo que el FOMO es real, que las rachas de Snap te generan ansiedad y que sentís que si no estás conectado te perdés de todo. Pero hay una mejor forma de relacionarte. ¿Qué es lo que más te cuesta?`,
                      keywords: {
                        fomo: [`El FOMO es un producto diseñado por las redes sociales. Te venden la idea de que siempre hay algo mejor pasando en otro lado. La realidad: el 90% de las historias son de gente aburrida fingiendo que no lo está.`, `Experimento: La próxima vez que abras Instagram por FOMO, preguntate "¿Qué información concreta y útil voy a buscar?" Si no tenés respuesta, cerrá la app.`, `La gente con quien realmente vale la pena relacionarse no va a excluirte de nada importante por estar 2 horas sin mirar el cel. Si lo hacen, esa es una señal de la calidad de esa amistad.`],
                        snapchat: [`Las rachas de Snapchat te tienen de rehén. Pero una relación basada en un número de días seguidos enviando algo no es una amistad real, es un número en una app.`, `¿Qué pasa si dejás morir una racha? En el peor caso, perdés un número. En el mejor caso, descubrís cuáles amigos realmente se preocupan por vos más allá del jueguito.`, `El diseño de las rachas es deliberado: generarte ansiedad de perderlas para que entres a la app todos los días. Es manipulación psicológica. Sabelo y actuá en consecuencia.`],
                        amigos: [`Hay una diferencia entre amigos digitales y amigos reales. Los reales saben tu cumpleaños sin que Instagram se los recuerde. ¿Cuántos de esos tenés?`, `Una conexión real de 30 minutos cara a cara vale más que 200 mensajes de texto al día. Las redes sociales te dan la ilusión de conexión sin el nutritivo de verdad.`, `¿Cuándo fue la última vez que hiciste algo en persona con alguien que te importa, sin teléfonos? Ese es el tipo de conexión que te recarga de verdad.`],
                        default: [`No tenés que estar disponible las 24 horas. Eso no te hace mal amigo/a, te hace una persona con límites saludables. Y eso es admirable, no egoísta.`, `Ponerte como prioridad no es ser egocéntrico. Es necesario. No podés dar lo mejor de vos a los demás si vos mismo estás agotado por estar siempre conectado.`, `¿Qué pasaría si avisaras a tus amigos que vas a estar desconectado estudiando por 2 horas? Los que te importan lo van a entender. Los que no lo entienden te están dando información valiosa.`]
                      }
                    }
                  };

                  const personality = COACH_PERSONALITIES[selectedCoach.id];
                  const scrollRef = React.createRef();

                  const getCoachResponse = (userText) => {
                    const lower = userText.toLowerCase();
                    const kws = personality.keywords;
                    for (const [key, responses] of Object.entries(kws)) {
                      if (key !== 'default' && lower.includes(key)) {
                        return responses[Math.floor(Math.random() * responses.length)];
                      }
                    }
                    const extraMatches = {
                      sophia: { nota: 'notas', examen: 'notas', cole: 'notas', ansiosa: 'ansiedad', estresada: 'ansiedad', insta: 'instagram', foto: 'instagram' },
                      icaro: { tikto: 'tiktok', procrastin: 'procrastinar', aburri: 'motivacion', cansa: 'motivacion', ganas: 'motivacion' },
                      atlas: { youtu: 'youtube', jueg: 'videojuegos', game: 'videojuegos', concentr: 'concentracion', distra: 'concentracion' },
                      vento: { racha: 'snapchat', snap: 'snapchat', fomo: 'fomo', perderm: 'fomo', amig: 'amigos', grup: 'amigos' }
                    };
                    const extras = extraMatches[selectedCoach.id] || {};
                    for (const [partial, key] of Object.entries(extras)) {
                      if (lower.includes(partial) && kws[key]) {
                        return kws[key][Math.floor(Math.random() * kws[key].length)];
                      }
                    }
                    return kws.default[Math.floor(Math.random() * kws.default.length)];
                  };

                  const initMessages = coachMessages.length === 0
                    ? [{ id: 0, text: personality.greet, sender: 'coach' }]
                    : coachMessages;

                  const handleSend = () => {
                    if (!coachInput.trim()) return;
                    const userMsg = { id: Date.now(), text: coachInput, sender: 'user' };
                    const replyText = getCoachResponse(coachInput);
                    const coachReply = { id: Date.now() + 1, text: replyText, sender: 'coach' };
                    setCoachMessages(prev => [
                      ...(prev.length === 0 ? [{ id: 0, text: personality.greet, sender: 'coach' }] : prev),
                      userMsg, coachReply
                    ]);
                    setCoachInput('');
                  };

                  return (
                    <motion.div
                      key="coach-chat"
                      initial={{ opacity: 0, y: '100%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="absolute inset-0 z-[200] flex flex-col"
                      style={{ background: 'linear-gradient(to bottom, #050505, #0a0a0a)' }}
                    >
                      {/* Header */}
                      <div className="px-5 pt-14 pb-4 border-b border-white/10 flex items-center gap-4 shrink-0 bg-black/60 backdrop-blur-md">
                        <button
                          onClick={() => setCoachChatOpen(false)}
                          className="p-2.5 -ml-1 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
                        >
                          <ChevronLeft size={20} className="text-white" />
                        </button>
                        <div className="text-3xl">{selectedCoach.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-sm font-black uppercase tracking-tight text-white">{selectedCoach.name}</h2>
                          <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">● En línea · Coach IA</span>
                        </div>
                      </div>

                      {/* Messages area */}
                      <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scroll"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        {initMessages.map(msg => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            {msg.sender === 'coach' && (
                              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-lg mr-2 shrink-0 mt-1">
                                {selectedCoach.icon}
                              </div>
                            )}
                            <div className={`px-4 py-3 rounded-[20px] max-w-[78%] shadow-md ${
                              msg.sender === 'user'
                                ? 'bg-white text-black rounded-tr-sm'
                                : 'bg-white/10 text-white rounded-tl-sm border border-white/10'
                            }`}>
                              <p className="text-[12px] font-medium leading-relaxed">{msg.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Input area */}
                      <div className="px-4 pt-3 pb-8 bg-black/80 border-t border-white/10 shrink-0 backdrop-blur-md">
                        <div className="flex gap-3 items-center">
                          <input
                            value={coachInput}
                            onChange={e => setCoachInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                            placeholder={`Habla con ${selectedCoach.name}...`}
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-[12px] font-medium text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                          />
                          <button
                            onClick={handleSend}
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-lg"
                          >
                            <Send size={16} className="ml-0.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'chat' && chatPerson && (
            <ChatView key="chat" person={chatPerson} onBack={() => setStep('main')} activeChatsHistory={activeChatsHistory} setActiveChatsHistory={setActiveChatsHistory} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SafeApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}