import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Users, Mail, ChevronLeft, Plus, Heart, MessageCircle, Megaphone,
  Home, ShoppingBag, User, Check, Search, Settings, ArrowLeft, Sprout,
  Shield, Flame, Crown, Lock, Calendar, ArrowRight, Gem, MoreVertical,
  Send, Paperclip, Smile, Trophy, ArrowDown, Minus, Play, TrendingUp,
  Target, Zap, Award, Medal, Clock, Brain, BookOpen, Gamepad2, X, RefreshCw,
  Image as ImageIcon, Edit2, LayoutGrid, Activity, Sparkles, Star, ChevronRight, Info, Palette
} from 'lucide-react';

// --- DATA ---
const SLIDES = [
  { title: "Focus", subtitle: "EL ARTE DE LA ATENCIÓN PLENA.", image: "https://images.unsplash.com/photo-1492539161849-b2b18e79c85f?q=80&w=1000&auto=format&fit=crop" },
  { title: "Drive", subtitle: "LA DISCIPLINA ES EL ÚNICO CAMINO.", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop" },
  { title: "Strength", subtitle: "CONSTRUYE TU VOLUNTAD DE ACERO.", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1000&auto=format&fit=crop" },
  { title: "Silence", subtitle: "ENCUENTRA PODER EN LA QUIETUD.", image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=1000&auto=format&fit=crop" }
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
  { id: 'ch_wa_3', appId: 'wa', gender: 'any', title: 'Limpieza de Grupos', subtitle: 'Silencio total', xp: 150, diamonds: 50, duration: 3, desc: 'Archiva y silencia permanentemente todos los grupos que no sean de trabajo/estudio urgente.' }
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
  { id: '1', author: { name: 'FocusMaster', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' }, text: '¡Acabo de completar 7 días en Modo Monje! La claridad mental es increíble.', likes: 24, time: 'Hace 2h', liked: false, comments: [] },
  { id: '2', author: { name: 'ZenSeeker', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' }, text: '¿Algún consejo para resistir la tentación de abrir TikTok en la mañana?', likes: 12, time: 'Hace 5h', liked: false, comments: [{ id: 'c1', author: 'FocusMaster', text: 'Guarda el teléfono en otra habitación al dormir.' }] }
];

const MESSAGES_DATA = [
  { id: 'm_crono', name: 'Crono', role: 'Vigilante de Arena', type: 'animated', avatarId: 'a_crono', unread: true, time: '10:00 AM', isBot: true, botId: 'crono' },
  { id: 'm_icaro', name: 'Ícaro', role: 'Fénix de la Atención', type: 'animated', avatarId: 'a_icaro', unread: true, time: '09:30 AM', isBot: true, botId: 'icaro' },
  { id: 'm_sophia', name: 'Sophia', role: 'Diosa del Silencio', type: 'animated', avatarId: 'a_sophia', unread: false, time: 'Ayer', isBot: true, botId: 'sophia' },
  { id: 'm_atlas', name: 'Atlas', role: 'Guardián del Saber', type: 'animated', avatarId: 'a_atlas', unread: false, time: 'Lun', isBot: true, botId: 'atlas' },
  { id: 'm_vento', name: 'Vento', role: 'Dragón de Papel', type: 'animated', avatarId: 'a_vento', unread: false, time: 'Dom', isBot: true, botId: 'vento' },
  { id: 'm2', name: 'Alex_99', role: 'Usuario Nivel 12', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', type: 'image', unread: false, time: 'Ayer', isBot: false }
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
  bg_default: { id: 'bg_default', name: 'El Vacío', css: 'bg-[#050505]', themeProps: { navBg: 'bg-[#181818]', navBorder: 'border-white/5' }, img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=400&fit=crop', rarity: 'common', price: 0, desc: 'El comienzo de todo. Simple y oscuro. Ideal para mentes que necesitan un reinicio total.' },
  bg_grid: { id: 'bg_grid', name: 'Matriz Cyber', css: 'bg-[#000814] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:30px_30px]', themeProps: { navBg: 'bg-[#001122]', navBorder: 'border-blue-500/30', navGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' }, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&fit=crop', rarity: 'rare', price: 150, desc: 'Fondo de cuadrícula analítica. Activa el escáner neuronal para mentes calculadoras.' },
  bg_zen: { id: 'bg_zen', name: 'Jardín Zen', css: 'bg-gradient-to-b from-[#02120a] to-[#000000]', themeProps: { navBg: 'bg-[#051a0f]', navBorder: 'border-emerald-500/30', navGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' }, img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=400&fit=crop', rarity: 'epic', price: 300, desc: 'Para aquellos que buscan la paz interior extrema. Incluye orbes de calma para sincronizar tu respiración.' },
  bg_ocean: { id: 'bg_ocean', name: 'Abismo Oceánico', css: 'bg-gradient-to-b from-[#000b18] to-[#000000]', themeProps: { navBg: 'bg-[#001429]', navBorder: 'border-cyan-500/30', navGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.2)]' }, img: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=400&fit=crop', rarity: 'epic', price: 450, desc: 'La presión de las profundidades forja diamantes. Ideal para concentración extrema.' },
  bg_nebula: { id: 'bg_nebula', name: 'Nebulosa Cósmica', css: 'bg-gradient-to-br from-[#120524] to-[#000000]', themeProps: { navBg: 'bg-[#1a0b2e]', navBorder: 'border-purple-500/40', navGlow: 'shadow-[0_0_25px_rgba(168,85,247,0.2)]' }, img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&fit=crop', rarity: 'legendary', price: 800, desc: 'Un viaje por las estrellas oscuras. Tu disciplina expande la galaxia. Activa el campo estelar.' },
  bg_inferno: { id: 'bg_inferno', name: 'Foso Infernal', css: 'bg-gradient-to-t from-[#2a0000] to-[#000000]', themeProps: { navBg: 'bg-[#2a0000]', navBorder: 'border-red-500/50', navGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]', isAgresive: true }, img: 'https://images.unsplash.com/photo-1473976340520-22fb18967b5e?q=80&w=400&fit=crop', rarity: 'mythic', price: 1500, desc: 'Solo para voluntades forjadas en el fuego más intenso. El entorno reacciona con llamas a tu progreso.' }
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
  { id: 'mg_5', type: 'sequence', title: 'Secuencia Lógica', subtitle: 'Orden y Enfoque', desc: 'Toca los números en orden ascendente. Entrena tu concentración y memoria de trabajo.', icon: LayoutGrid, color: 'from-indigo-500 to-purple-600', rewardXP: 35, rewardDia: 10 }
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
  'a_vento': MascotVento
};

const AvatarDisplay = ({ id, src, className, freeStanding = false, isLocked = false, skinFilters = null }) => {
  const Anim = ANIMATED_AVATARS[id];
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
      <div className={`w-full h-full flex items-center justify-center transition-all ${isLocked ? 'brightness-0 opacity-40 grayscale pointer-events-none' : ''}`}>
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
  // Avatares Base
  { id: 'a_base', category: 'avatar', name: 'NÚCLEO BASE', price: 0, rarity: 'common', img: 'animated', desc: 'Tu primer paso en el vacío. Sencillo, estable.' },
  { id: 'a_bot', category: 'avatar', name: 'UNIDAD OMEGA', price: 200, rarity: 'rare', img: 'animated', desc: 'Precisión robótica. Cero distracciones.' },
  { id: 'a_ninja', category: 'avatar', name: 'SOMBRA', price: 400, rarity: 'rare', img: 'animated', desc: 'Silencioso y letal contra las notificaciones e impulsos.' },
  { id: 'a_flame', category: 'avatar', name: 'FUEGO INTERNO', price: 600, rarity: 'epic', img: 'animated', desc: 'La llama de la voluntad. Quema la procrastinación.' },
  { id: 'a_hacker', category: 'avatar', name: 'GLITCH', price: 800, rarity: 'epic', img: 'animated', desc: 'Hackea tus propios hábitos. Reescribe el código de tu mente.' },
  { id: 'a_brain', category: 'avatar', name: 'MENTE CÓSMICA', price: 1200, rarity: 'legendary', img: 'animated', desc: 'Consciencia expandida. Tu mente domina el espacio y tiempo.' },

  // Avatares Mentores IA
  { id: 'a_vento', category: 'avatar', name: 'VENTO', price: 800, rarity: 'rare', img: 'animated', desc: 'Dragón de Papel. Fluye con gracia sobre la procrastinación.' },
  { id: 'a_crono', category: 'avatar', name: 'CRONO', price: 1000, rarity: 'epic', img: 'animated', desc: 'Vigilante de Arena. Domina el flujo del tiempo y tu enfoque absoluto.' },
  { id: 'a_sophia', category: 'avatar', name: 'SOPHIA', price: 1200, rarity: 'epic', img: 'animated', desc: 'Diosa del Silencio. Su presencia invoca una paz incorruptible.' },
  { id: 'a_icaro', category: 'avatar', name: 'ÍCARO', price: 1500, rarity: 'legendary', img: 'animated', desc: 'Fénix de la Atención. Renace más fuerte tras cada distracción.' },
  { id: 'a_atlas', category: 'avatar', name: 'ATLAS', price: 2000, rarity: 'mythic', img: 'animated', desc: 'Guardián del Saber. Soporta el inmenso peso de la disciplina total.' },

  // Fondos
  ...Object.values(BACKGROUNDS).map(bg => ({
    id: bg.id, category: 'background', name: bg.name, price: bg.price, rarity: bg.rarity, img: bg.img, desc: bg.desc
  }))
];

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } };

// --- ANIMACIONES DE TEMAS GLOBALES ---
const GlobalThemeEffects = ({ themeId }) => {
  if (themeId === 'bg_inferno') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-red-600/20 to-transparent"></div>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`fire-${i}`} initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: Math.random() * 1.5 + 0.5 }} animate={{ y: '-10vh', opacity: [0, 0.8, 0], scale: [1, 0.5] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'easeIn', delay: Math.random() * 2 }} className="absolute bottom-0 w-3 h-3 rounded-full bg-red-500 blur-[2px] shadow-[0_0_10px_#ef4444]" />
        ))}
      </div>
    );
  }
  if (themeId === 'bg_nebula') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={`star-${i}`} initial={{ opacity: Math.random(), scale: Math.random() * 1.5 }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute rounded-full bg-white blur-[1px]" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px` }} />
        ))}
        <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08)_0%,transparent_60%)]" />
      </div>
    );
  }
  if (themeId === 'bg_zen') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={`orb-${i}`} animate={{ y: ['100vh', '-10vh'], x: ['0px', '20px', '-20px', '0px'], opacity: [0, 0.4, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }} className="absolute w-12 h-12 rounded-full bg-emerald-400/20 blur-xl" style={{ left: `${Math.random() * 100}%` }} />
        ))}
      </div>
    );
  }
  if (themeId === 'bg_grid') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={`code-${i}`} initial={{ y: '-10vh', opacity: 0 }} animate={{ y: '110vh', opacity: [0, 0.5, 0] }} transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: 'linear', delay: Math.random() * 3 }} className="absolute w-px h-24 bg-gradient-to-b from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]" style={{ left: `${(i + 1) * 10}%` }} />
        ))}
      </div>
    );
  }
  if (themeId === 'bg_ocean') {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={`bubble-${i}`} initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: Math.random() * 0.5 + 0.2 }} animate={{ y: '-10vh', x: `${Math.random() * 100}vw`, opacity: [0, 0.6, 0] }} transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }} className="absolute rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]" style={{ width: `${Math.random() * 20 + 5}px`, height: `${Math.random() * 20 + 5}px` }} />
        ))}
      </div>
    );
  }
  return null;
};

// --- COMPONENTES BASE ---
const Splash = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#050505] z-50 flex items-center justify-center">
    <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-20 h-20 border-4 border-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center bg-white/5 backdrop-blur-md">
      <motion.span animate={{ rotate: [0, -90, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="text-4xl font-black text-white drop-shadow-lg">F</motion.span>
    </motion.div>
  </motion.div>
);

const Onboarding = ({ onFinish }) => {
  const [slide, setSlide] = useState(0);

  const handleTap = () => {
    if (slide < SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-50 text-white cursor-pointer overflow-hidden" onClick={handleTap}>
      <AnimatePresence mode="wait">
        <motion.img
          key={slide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          src={SLIDES[slide].image}
          className="absolute inset-0 w-full h-full object-cover"
          alt="slide"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

      <div className="absolute bottom-12 left-8 right-8 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          <motion.div key={slide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
            <h2 className="text-5xl font-black uppercase mb-3 drop-shadow-2xl tracking-tighter">{SLIDES[slide].title}</h2>
            <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">{SLIDES[slide].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? 'w-8 bg-white shadow-[0_0_10px_white]' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LogoReveal = ({ onContinue, onBack }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black z-50 flex flex-col text-white px-8 pt-20 pb-10">
    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onClick={onBack} className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity -ml-2 w-max text-white">
      <ChevronLeft size={24} />
    </motion.button>
    <div className="flex-1 flex flex-col items-center justify-center -mt-10">
      <motion.h1 initial={{ scale: 0.8, filter: "blur(10px)" }} animate={{ scale: 1, filter: "blur(0px)" }} transition={{ duration: 1 }} className="text-6xl font-black uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Focusly</motion.h1>
    </div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full">
      <button onClick={onContinue} className="w-full bg-white text-black py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">Entrar al Vacío</button>
    </motion.div>
  </motion.div>
);

const AuthScreen = ({ onBack, onContinue }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [localName, setLocalName] = useState('');
  const [localGender, setLocalGender] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#050505] z-40 overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-white/5 blur-[100px] rounded-[100%] pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full px-8 pt-20 pb-10">
        <button onClick={onBack} className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity mb-8 -ml-2 w-max text-white"><ChevronLeft size={24} /></button>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col flex-1">
          <motion.div variants={staggerItem} className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-3 leading-[1.1] text-white">{isLogin ? 'Acceso' : 'Forja tu Destino'}</h1>
            <p className="text-white/40 text-[10px] tracking-[0.3em] font-black uppercase italic">{isLogin ? 'Retoma tu enfoque.' : 'La disciplina empieza aquí.'}</p>
          </motion.div>
          <div className="flex-1 overflow-y-auto custom-scroll space-y-4 pb-4 px-1">
            {!isLogin && (
              <motion.div variants={staggerItem} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><User size={18} /></div>
                <input value={localName} onChange={e => setLocalName(e.target.value)} placeholder="NOMBRE DE USUARIO" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" />
              </motion.div>
            )}

            {!isLogin && (
              <motion.div variants={staggerItem} className="flex gap-3 mb-2">
                <button onClick={() => setLocalGender('M')} className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${localGender === 'M' ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg' : 'bg-[#0c0c0c]/80 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}>
                  <User size={24} /> <span className="text-[10px] font-black uppercase">Hombre</span>
                </button>
                <button onClick={() => setLocalGender('F')} className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${localGender === 'F' ? 'bg-pink-600/20 border-pink-500 text-white shadow-lg' : 'bg-[#0c0c0c]/80 border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}>
                  <User size={24} /> <span className="text-[10px] font-black uppercase">Mujer</span>
                </button>
              </motion.div>
            )}

            <motion.div variants={staggerItem} className="relative group"><div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Mail size={18} /></div><input type="email" placeholder="CORREO ELECTRÓNICO" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" /></motion.div>
            {!isLogin && <motion.div variants={staggerItem} className="relative group"><div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Calendar size={18} /></div><input type="date" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white/50 outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" /></motion.div>}
            <motion.div variants={staggerItem} className="relative group"><div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Lock size={18} /></div><input type="password" placeholder="CONTRASEÑA" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" /></motion.div>
            {!isLogin && <motion.div variants={staggerItem} className="relative group"><div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-white transition-colors"><Lock size={18} /></div><input type="password" placeholder="CONFIRMAR CONTRASEÑA" className="w-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black tracking-widest text-white outline-none focus:border-white/50 focus:bg-white/10 transition-all shadow-inner" /></motion.div>}
          </div>
          <motion.div variants={staggerItem} className="pt-4 mt-auto">
            <button onClick={() => onContinue(localName, localGender)} disabled={!isLogin && !localGender} className={`group relative w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-3 ${(!isLogin && !localGender) ? 'bg-white/20 text-white/40 cursor-not-allowed' : 'bg-white text-black'}`}>
              <span className="relative z-10">{isLogin ? 'Iniciar Sesión' : 'Comenzar Viaje'}</span><ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center mt-8"><button onClick={() => setIsLogin(!isLogin)} className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{isLogin ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}</button></div>
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
  const activeSkinId = previewSkinId || inventory.equippedSkins[item.id] || null;
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
                  {inventory.equippedSkins[item.id] === undefined || inventory.equippedSkins[item.id] === null ? <Check size={10} className="text-green-500 mt-1" /> : null}
                </div>
                {availableSkins.map(skin => {
                  const sOwned = inventory.skins.includes(skin.id);
                  const sEquipped = inventory.equippedSkins[item.id] === skin.id;
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
                  <button onClick={() => onAction('equip_skin', { baseId: item.id, skinId: null })} disabled={!isOwned || inventory.equippedSkins[item.id] == null} className="w-full bg-[#1e293b] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50">Equipar Original</button>
                ) : (
                  (() => {
                    const s = ALL_SKINS.find(x => x.id === previewSkinId);
                    const sOwned = inventory.skins.includes(s.id);
                    if (sOwned) {
                      return <button onClick={() => onAction('equip_skin', { baseId: item.id, skinId: s.id })} disabled={inventory.equippedSkins[item.id] === s.id} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:bg-[#1e293b] disabled:text-green-500">Equipar Aspecto</button>
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
          <div className="w-[90%] h-[40vh] relative z-10 flex items-center justify-center mb-8 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <img src={item.img} className="absolute inset-0 w-full h-full object-cover z-20 opacity-90" alt={item.name} />
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

const ChatView = ({ person, onBack }) => {
  const BOT_RESPONSES = {
    crono: ["El tiempo es el único recurso que no puedes recuperar. Úsalo sabiamente.", "Tick, tock... cada segundo que pasas aquí es una elección.", "No midas el tiempo en minutos, mídelo en enfoque.", "La arena cae, pero tu voluntad se mantiene."],
    icaro: ["¡Quema tus distracciones hasta que solo quede ceniza!", "Renace de tus hábitos tóxicos. Eres fuego, no humo.", "Vuela alto, pero mantén la vista en tu objetivo.", "Que la pasión por tu meta sea más fuerte que la tentación."],
    sophia: ["En el silencio encontrarás las respuestas que el ruido te oculta.", "Respira. Pausa. Observa el vacío de tu mente.", "La mayor fortaleza a veces es simplemente no reaccionar.", "Deja que el mundo gire; tú eres el centro inamovible."],
    atlas: ["El conocimiento requiere paciencia. No hay atajos para la sabiduría.", "Carga el peso de tu disciplina hoy para disfrutar la ligereza de tu éxito mañana.", "Cada desafío superado es un libro más en tu biblioteca mental.", "Soporta la presión. Estás construyendo un imperio."],
    vento: ["Fluye como el viento. Que las distracciones te atraviesen sin moverte.", "Eres ligero como el papel, pero fuerte como un dragón.", "Vuela por encima de la procrastinación.", "Adapta tu forma, pero nunca cambias tu dirección."],
    default: ["La disciplina es un músculo. Sigue entrenando.", "Tu atención es tu moneda más valiosa. Invierte bien.", "Mantén el rumbo. La claridad mental es tu mayor arma."]
  };

  const [messages, setMessages] = useState(() => {
    if (person.isBot) {
      return [{ id: 1, text: `Saludos. Soy ${person.name}, ${person.role}. ¿En qué fase de tu disciplina te encuentras hoy?`, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    }
    return [
      { id: 1, text: '¡Hey! ¿Qué tal vas con los desafíos de hoy?', sender: 'other', time: '10:42 AM' },
      { id: 2, text: 'Excelente. No he tocado las redes en todo el día.', sender: 'user', time: '10:45 AM' }
    ];
  });

  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setShowEmojis(false);

    // Simular respuesta del bot
    if (person.isBot) {
      const responses = BOT_RESPONSES[person.botId] || BOT_RESPONSES['default'];
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000 + Math.random() * 1500);
    }
  };

  const EMOJIS = ["🔥", "💪", "🧘", "👑", "⚔️", "💎", "⏳", "👁️"];

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
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> En línea</span>
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

const Forum = ({ onSelectChat, unreadFilter, setUnreadFilter, activeTab, setActiveTab, forumPosts, setForumPosts, userAvatarItem }) => {
  const [expandedPost, setExpandedPost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: 'Tú',
        avatar: userAvatarItem?.img || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
      },
      text: newPostText,
      likes: 0,
      time: 'Justo ahora',
      liked: false,
      comments: []
    };
    setForumPosts([newPost, ...forumPosts]);
    setNewPostText('');
  };

  const toggleLike = (postId) => {
    setForumPosts(posts => posts.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handleAddComment = (postId) => {
    if (!newCommentText.trim()) return;
    setForumPosts(posts => posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now().toString(), author: 'Tú', text: newCommentText }]
        };
      }
      return p;
    }));
    setNewCommentText('');
  };

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden pb-[100px] bg-black/40 backdrop-blur-sm">
      <div className="px-6 pt-16 pb-4 bg-gradient-to-b from-black/80 to-transparent border-b border-white/5">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-lg">Comunicaciones</h1>
        <div className="flex gap-2 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
          <button onClick={() => setActiveTab('avisos')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'avisos' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Avisos</button>
          <button onClick={() => setActiveTab('comunidad')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'comunidad' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Comunidad</button>
          <button onClick={() => setActiveTab('chats')} className={`flex-1 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'chats' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Chats</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scroll space-y-4">
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
                  <img src={post.author.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight">{post.author.name}</h4>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm font-medium mb-5 text-white/80 leading-relaxed">{post.text}</p>

                <div className="flex gap-6 border-t border-white/5 pt-4">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                    <Heart size={16} fill={post.liked ? "currentColor" : "none"} className={post.liked ? "text-red-500" : ""} />
                    <span className="text-[10px] font-black">{post.likes}</span>
                  </button>
                  <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} className={`flex items-center gap-2 transition-colors ${expandedPost === post.id ? 'text-blue-400' : 'text-white/40 hover:text-white'}`}>
                    <MessageCircle size={16} /> <span className="text-[10px] font-black">{post.comments.length}</span>
                  </button>
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

const Rankings = ({ userXP, username }) => {
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

    let players = mockNames.map((name, i) => {
      const xp = minXP + Math.floor((range * (mockNames.length - i)) / (mockNames.length + 2));
      return { id: `mock_${i}`, name, xp, isUser: false, avatar: `https://i.pravatar.cc/150?u=${name}${viewLeagueIndex}` };
    });

    if (isUserLeague) {
      players[7] = { id: 'user', name: username || 'Tú', xp: userXP, isUser: true, avatar: null };
    } else {
      players[7] = { id: 'bot_middle', name: 'FocusBot', xp: minXP + Math.floor(range / 2), isUser: false, avatar: `https://i.pravatar.cc/150?u=bot${viewLeagueIndex}` };
    }

    return players.sort((a, b) => b.xp - a.xp);
  }, [viewLeagueIndex, isUserLeague, userXP, username, viewingLeague]);

  return (
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden pb-[100px] bg-black/40 backdrop-blur-sm">
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
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scroll">
        <div className="bg-black/50 backdrop-blur-md rounded-[32px] p-2 border border-white/10 shadow-lg flex flex-col">
          {leaderboard.map((p, i) => {
            return (
              <React.Fragment key={p.id}>
                <div className={`flex items-center justify-between p-3 transition-all ${p.isUser ? 'bg-white border-2 border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-[20px] my-2 scale-[1.02]' : 'hover:bg-white/5 rounded-[20px]'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-black w-6 text-center ${p.isUser ? 'text-black' : i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-white/30'}`}>{i + 1}</span>
                    {p.avatar ? <img src={p.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-white/10" /> : <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-black text-sm font-black text-white shadow-inner">{p.name.charAt(0)}</div>}
                    <span className={`text-xs font-black tracking-wide ${p.isUser ? 'text-black' : 'text-white'}`}>{p.name}</span>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${p.isUser ? 'bg-black text-white' : 'text-[#8ab4f8] bg-[#8ab4f8]/10 border border-[#8ab4f8]/20'}`}>{p.xp} XP</span>
                </div>
                {i === 2 && viewLeagueIndex < LEAGUES.length - 1 && (
                  <div className="h-[2px] w-full bg-green-500/30 my-3 relative flex items-center justify-center">
                    <span className="absolute bg-green-950 text-green-400 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-green-500/50 tracking-widest z-10 shadow-[0_0_10px_rgba(34,197,94,0.3)]">Zona de Ascenso</span>
                  </div>
                )}
                {i === leaderboard.length - 4 && viewLeagueIndex > 0 && (
                  <div className="h-[2px] w-full bg-red-500/30 my-3 relative flex items-center justify-center">
                    <span className="absolute bg-red-950 text-red-400 text-[8px] font-black uppercase px-3 py-1 rounded-full border border-red-500/50 tracking-widest z-10 shadow-[0_0_10px_rgba(239,68,68,0.3)]">Zona de Descenso</span>
                  </div>
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
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden pb-[100px] bg-black/40 backdrop-blur-sm">
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
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scroll relative z-10">
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
                      <div className="w-1/3 relative overflow-hidden">
                        <img src={item.img} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" alt={item.name} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80"></div>
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

const ProfileView = ({ inventory, setInventory, userXP, username, onOpenItem, completedCount, activityLog, selectedApps }) => {
  const [activeProfileTab, setActiveProfileTab] = useState('estado');
  const [activeTab, setActiveTab] = useState('avatars');

  const equippedAvatarItem = SHOP_ITEMS.find(i => i.id === inventory.equippedAvatar);
  const activeSkinId = inventory.equippedSkins[equippedAvatarItem?.id];
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
    <div className="absolute inset-0 flex flex-col z-10 text-white overflow-hidden pb-[100px] bg-black/20 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto custom-scroll">
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
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight drop-shadow-md">Métricas</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-[24px] border border-white/10 flex flex-col justify-between shadow-lg">
                  <Calendar size={18} className="text-white/50 mb-3" />
                  <span className="text-3xl font-black text-white">0</span>
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
                    const Icon = act.icon;
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
                      const skinForAvatar = inventory.equippedSkins[item.id];
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
                          <img src={item.img} className={`absolute inset-0 w-full h-full object-cover z-0 ${isOwned ? 'grayscale-[0.4]' : 'brightness-0 opacity-30'}`} alt="bg" />
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

const HomeDashboard = ({ selectedApps, activeChallenge, onSelectChallenge, onOpenActive, onOpenAll, onCompleteChallenge, onPlayMinigame, userGender }) => {
  const [homeTab, setHomeTab] = useState('desafios');

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
    <div className="absolute inset-0 flex flex-col z-40 text-white overflow-hidden pb-[100px] bg-black/10 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-10 custom-scroll">
        <div className="flex gap-2 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md mb-8">
          <button onClick={() => setHomeTab('desafios')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${homeTab === 'desafios' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Desafíos</button>
          <button onClick={() => setHomeTab('minijuegos')} className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${homeTab === 'minijuegos' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Minijuegos</button>
        </div>

        {homeTab === 'desafios' && (
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
          </motion.div>
        )}

        {homeTab === 'minijuegos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
      </div>
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

const BottomNav = ({ activeTab, onChange, currentThemeBg }) => {
  const navItems = [
    { id: 'forum', icon: Megaphone },
    { id: 'rankings', icon: Trophy },
    { id: 'home', icon: Home },
    { id: 'shop', icon: ShoppingBag },
    { id: 'profile', icon: User }
  ];

  const themeProps = BACKGROUNDS[currentThemeBg]?.themeProps || BACKGROUNDS['bg_default'].themeProps;
  const isAgresive = themeProps.isAgresive;

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
                <motion.div layoutId="nav-selector" className={`absolute w-[76px] h-[76px] rounded-full shadow-lg ${isAgresive ? 'bg-red-600/90 shadow-[0_0_20px_red]' : 'bg-white'}`} transition={{ type: "spring", stiffness: 300, damping: 25 }} />
              )}
              <Icon size={24} className={`relative z-20 transition-colors duration-300 ${isActive ? (isAgresive ? 'text-white' : 'text-black') : 'text-white/40 group-hover:text-white'}`} fill={isActive ? (isAgresive ? 'white' : 'black') : 'none'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- APP COMPONENT ---
export default function App() {
  const [step, setStep] = useState('splash');

  const [username, setUsername] = useState('');
  const [userGender, setUserGender] = useState('any');
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [userXP, setUserXP] = useState(0);
  const [userDiamonds, setUserDiamonds] = useState(0);

  const [mainNav, setMainNav] = useState('home');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [forumPosts, setForumPosts] = useState(INITIAL_FORUM_POSTS);

  const [completedCount, setCompletedCount] = useState(0);
  const [activityLog, setActivityLog] = useState([
    { id: 'start_1', title: 'Viaje Iniciado', subtitle: 'Bienvenido a Focusly', time: 'Hoy', icon: Activity }
  ]);

  const [inventory, setInventory] = useState({
    avatars: ['a_base'],
    backgrounds: ['bg_default'],
    skins: [],
    equippedAvatar: 'a_base',
    equippedBg: 'bg_default',
    equippedSkins: { 'a_base': null }
  });

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

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStartChallenge = (challenge) => {
    setActiveChallenge({ ...challenge, currentDay: 0 });
    setShowChallengeDetail(null);
    setShowAllChallenges(false);
  };

  const handleCompleteChallenge = () => {
    if (!activeChallenge) return;
    setCompletedCount(prev => prev + 1);
    setActivityLog(prev => [{ id: Date.now().toString(), title: 'Sesión completada', subtitle: activeChallenge.title, time: 'Hace un momento', icon: Target }, ...prev]);

    setUserXP(prev => prev + (activeChallenge.xp || 150));
    setUserDiamonds(prev => prev + (activeChallenge.diamonds || 50));

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
    <div className="flex items-center justify-center min-h-screen bg-[#000] selection:bg-red-500 selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 0px; display: none; }
        body { background-color: #000; color: white; font-family: 'Inter', sans-serif; overflow: hidden; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
      `}} />

      <div className={`w-full h-screen sm:w-[390px] sm:h-[844px] sm:rounded-[60px] sm:border-[10px] sm:border-[#1a1a1a] relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] transition-colors duration-1000 ${BACKGROUNDS[inventory.equippedBg].css}`}>
        <GlobalThemeEffects themeId={inventory.equippedBg} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-[2rem] z-[110]" />

        <AnimatePresence mode="wait">
          {step === 'splash' && <Splash key="splash" />}
          {step === 'onboarding' && <motion.div key="onboarding" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }} className="absolute inset-0 z-40"><Onboarding onFinish={() => setStep('logoReveal')} /></motion.div>}
          {step === 'logoReveal' && <LogoReveal key="logoReveal" onContinue={() => setStep('auth')} onBack={() => setStep('onboarding')} />}
          {step === 'auth' && <AuthScreen key="auth" onBack={() => setStep('logoReveal')} onContinue={(name, gender) => { setUsername(name || 'Jugador_Nuevo'); setUserGender(gender || 'any'); setStep('apps'); }} />}

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
              <div className="absolute bottom-8 left-8 right-8 z-50"><button onClick={() => setStep('main')} disabled={!selectedLevel} className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all ${selectedLevel ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>Confirmar Reto</button></div>
            </motion.div>
          )}

          {step === 'main' && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40">
              <AnimatePresence mode="wait">
                {mainNav === 'home' && <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><HomeDashboard selectedApps={selectedApps} activeChallenge={activeChallenge} onSelectChallenge={setShowChallengeDetail} onOpenActive={() => setShowActiveInteractive(true)} onOpenAll={() => setShowAllChallenges(true)} onCompleteChallenge={handleCompleteChallenge} onPlayMinigame={setActiveMinigame} userGender={userGender} /></motion.div>}
                {mainNav === 'forum' && <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Forum onSelectChat={(p) => { setChatPerson(p); setStep('chat'); }} unreadFilter={unreadFilter} setUnreadFilter={setUnreadFilter} activeTab={activeForumTab} setActiveTab={setActiveForumTab} forumPosts={forumPosts} setForumPosts={setForumPosts} userAvatarItem={SHOP_ITEMS.find(i => i.id === inventory.equippedAvatar)} /></motion.div>}
                {mainNav === 'rankings' && <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Rankings userXP={userXP} inventory={inventory} username={username} /></motion.div>}
                {mainNav === 'shop' && <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><ShopView userDiamonds={userDiamonds} onSelectItem={openShopItem} inventory={inventory} /></motion.div>}
                {mainNav === 'profile' && <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><ProfileView inventory={inventory} setInventory={setInventory} userXP={userXP} username={username} onOpenItem={openInventoryItem} completedCount={completedCount} activityLog={activityLog} selectedApps={selectedApps} /></motion.div>}
              </AnimatePresence>

              <BottomNav activeTab={mainNav} onChange={setMainNav} currentThemeBg={inventory.equippedBg} />

              <AnimatePresence>
                {showChallengeDetail && <ChallengeDetail key="modal-challenge" challenge={showChallengeDetail} onClose={() => setShowChallengeDetail(null)} onStart={handleStartChallenge} />}
                {showAllChallenges && <AllChallengesView key="modal-all-challenges" selectedApps={selectedApps} onClose={() => setShowAllChallenges(false)} onSelectChallenge={setShowChallengeDetail} userGender={userGender} />}
                {showActiveInteractive && activeChallenge && <ActiveChallengeInteractive key="modal-active" challenge={activeChallenge} onClose={() => setShowActiveInteractive(false)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}

                {activeMinigame && activeMinigame.type === 'reflex' && <MinigameReflex key="modal-minigame-reflex" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'memory' && <MinigameMemory key="modal-minigame-memory" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'millionaire' && <MinigameMillionaire key="modal-minigame-millionaire" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'math' && <MinigameMath key="modal-minigame-math" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'sequence' && <MinigameSequence key="modal-minigame-sequence" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}

                {selectedInventoryItem && <UniversalDetailModal key="modal-item" item={selectedInventoryItem} userDiamonds={userDiamonds} onClose={() => setSelectedInventoryItem(null)} onAction={handleItemAction} inventory={inventory} isShopMode={isShopMode} />}

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
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'chat' && chatPerson && (
            <ChatView key="chat" person={chatPerson} onBack={() => setStep('main')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}