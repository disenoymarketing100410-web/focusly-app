import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Users, Mail, ChevronLeft, Plus, Heart, MessageCircle, Megaphone,
  Home, ShoppingBag, User, Check, Search, Settings, ArrowLeft, Sprout,
  Shield, Flame, Crown, Lock, Calendar, ArrowRight, Gem, MoreVertical,
  Send, Paperclip, Smile, Trophy, ArrowDown, Minus, Play, TrendingUp,
  Target, Zap, Award, Medal, Clock, Brain, BookOpen, Gamepad2, X, RefreshCw,
  Image as ImageIcon, Edit2, LayoutGrid, Activity, Sparkles, Star, ChevronRight, Info, Palette, ChevronDown
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
  bg_inferno: { id: 'bg_inferno', name: 'Foso Infernal', css: 'bg-gradient-to-t from-[#2a0000] to-[#000000]', themeProps: { navBg: 'bg-[#2a0000]', navBorder: 'border-red-500/50', navGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]', isAgresive: true }, img: 'animated', rarity: 'mythic', price: 1500, desc: 'Solo para voluntades forjadas en el fuego más intenso. El entorno reacciona con llamas a tu progreso.' }
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

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: username || 'Tú',
        avatarId: userAvatarItem?.id || 'a_base'
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

const ProfileView = ({ inventory, setInventory, userXP, username, onOpenItem, completedCount, activityLog, selectedApps, setSelectedApps }) => {
  const [activeProfileTab, setActiveProfileTab] = useState('estado');
  const [activeTab, setActiveTab] = useState('avatars');
  const [showAppSelector, setShowAppSelector] = useState(false);

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

            <div className="mt-8">
              <button onClick={() => setShowAppSelector(!showAppSelector)} className="w-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm p-4 rounded-[20px] border border-white/10 shadow-lg flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><LayoutGrid size={18} className="text-white" /></div>
                  <h3 className="text-sm font-black uppercase tracking-tight drop-shadow-md">Selecciona otras apps</h3>
                </div>
                <ChevronDown size={20} className={`text-white/50 transition-transform duration-300 ${showAppSelector ? 'rotate-180' : ''}`} />
              </button>
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

const HomeDashboard = ({ selectedApps, activeChallenge, onSelectChallenge, onOpenActive, onOpenAll, onCompleteChallenge, onPlayMinigame, userGender, selectedCoach, setSelectedCoach, completedActivities, setCompletedActivities, userXP, setUserXP, userDiamonds, setUserDiamonds, calendarTasks, setCalendarTasks, blockedAppsConfig, setBlockedAppsConfig, onOpenAICalendar }) => {
  const [homeTab, setHomeTab] = useState('desafiate');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [coachChatOpen, setCoachChatOpen] = useState(false);
  const [coachInput, setCoachInput] = useState('');
  const [coachMessages, setCoachMessages] = useState([]);
  const [activityDone, setActivityDone] = useState(null);

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
        <div className="flex gap-1.5 bg-black/60 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md mb-8 overflow-x-auto no-scrollbar">
          <button onClick={() => setHomeTab('desafiate')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'desafiate' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Desafíate</button>
          <button onClick={() => setHomeTab('organizate')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'organizate' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Organízate</button>
          <button onClick={() => setHomeTab('crece')} className={`flex-1 py-2.5 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${homeTab === 'crece' ? 'bg-white text-black shadow-md' : 'text-white/40 hover:text-white'}`}>Crece</button>
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
              <div className="space-y-4">
                {calendarTasks.map(task => (
                  <div key={task.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-5 border border-white/10 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <Calendar size={20} className="text-indigo-400" />
                      </div>
                      <div>
                        <span className="text-[8px] font-black tracking-widest uppercase text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">{task.type}</span>
                        <h4 className="text-sm font-black uppercase tracking-tight text-white mt-1">{task.title}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{task.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* App Blocker config */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md mb-6 flex items-center gap-2"><Lock size={20} /> Bloqueador</h3>
              <div className="space-y-4">
                {selectedApps.map(appId => {
                  const appRef = APPS.find(a => a.id === appId);
                  const blockedData = blockedAppsConfig[appId] || { limit: 15 };
                  return (
                    <div key={appId} className="bg-white/5 backdrop-blur-md rounded-[24px] p-4 border border-white/10 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-4">
                        <img src={appRef.icon} className="w-8 h-8 object-contain filter invert opacity-80" alt={appRef.name} />
                        <h4 className="text-sm font-black uppercase tracking-tight text-white">{appRef.name}</h4>
                      </div>
                      <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                        <button onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { limit: Math.max(0, blockedData.limit - 5) } }))} className="text-white/40 hover:text-white"><Minus size={14} /></button>
                        <span className="text-[10px] font-black tracking-widest w-12 text-center">{blockedData.limit} m</span>
                        <button onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { limit: blockedData.limit + 5 } }))} className="text-white/40 hover:text-white"><Plus size={14} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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

      {/* Coach Chat Modal */}
      <AnimatePresence>
        {coachChatOpen && selectedCoach && (
          <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col">
            <div className="px-6 pt-14 pb-4 border-b border-white/10 flex items-center gap-4">
              <button onClick={() => setCoachChatOpen(false)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={24} className="text-white" /></button>
              <div className="text-3xl">{selectedCoach.icon}</div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tight text-white">{selectedCoach.name}</h2>
                <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">• Listo para guiarte</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scroll">
              {(coachMessages.length === 0 ? [{ id: 0, text: `Hola. Soy ${selectedCoach.name}. Entiendo que eres del tipo "${selectedCoach.type}" y las redes te afectan especialmente con ${selectedCoach.desc}. ¿Qué quieres trabajar hoy?`, sender: 'coach' }] : coachMessages).map(msg => (
                <div key={msg.id} className={`p-4 rounded-[24px] max-w-[85%] shadow-md ${msg.sender === 'user' ? 'bg-white text-black self-end rounded-tr-sm' : 'bg-white/10 self-start rounded-tl-sm border border-white/10 text-white'}`}>
                  <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="p-5 bg-black/60 border-t border-white/10 pb-8">
              <div className="flex gap-3">
                <input value={coachInput} onChange={e => setCoachInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key !== 'Enter' || !coachInput.trim()) return;
                    const userMsg = { id: Date.now(), text: coachInput, sender: 'user' };
                    const tip = selectedCoach.tips[Math.floor(Math.random() * selectedCoach.tips.length)];
                    const coachReply = { id: Date.now() + 1, text: tip, sender: 'coach' };
                    setCoachMessages(prev => [...(prev.length === 0 ? [{ id: 0, text: `Hola. Soy ${selectedCoach.name}. Entiendo que eres del tipo "${selectedCoach.type}" y las redes te afectan especialmente con ${selectedCoach.desc}. ¿Qué quieres trabajar hoy?`, sender: 'coach' }] : prev), userMsg, coachReply]);
                    setCoachInput('');
                  }}
                  placeholder="Escribe algo..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-[11px] font-bold text-white placeholder:text-white/30 outline-none" />
                <button onClick={() => {
                  if (!coachInput.trim()) return;
                  const userMsg = { id: Date.now(), text: coachInput, sender: 'user' };
                  const tip = selectedCoach.tips[Math.floor(Math.random() * selectedCoach.tips.length)];
                  const coachReply = { id: Date.now() + 1, text: tip, sender: 'coach' };
                  setCoachMessages(prev => [...(prev.length === 0 ? [{ id: 0, text: `Hola. Soy ${selectedCoach.name}. Entiendo que eres del tipo "${selectedCoach.type}" y las redes te afectan especialmente con ${selectedCoach.desc}. ¿Qué quieres trabajar hoy?`, sender: 'coach' }] : prev), userMsg, coachReply]);
                  setCoachInput('');
                }} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0"><Send size={16} className="ml-0.5" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    { id: 1, sender: 'ai', text: '¡Hola! Soy tu asistente de organización. Dime qué tareas tienes pendientes, por ejemplo: "Tengo examen de matemáticas el viernes" o "Recordarme leer el capítulo 4 mañana".' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let responseText = 'No entendí muy bien la tarea. Intenta mencionar la acción (examen, tarea) y cuándo (hoy, mañana, el viernes).';
      const textLower = userMsg.text.toLowerCase();
      
      let dateStr = new Date().toISOString().split('T')[0];
      let type = 'tarea';
      let title = userMsg.text;

      if (textLower.includes('examen')) type = 'examen';
      if (textLower.includes('proyecto')) type = 'proyecto';

      if (textLower.includes('mañana')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateStr = tomorrow.toISOString().split('T')[0];
      } else if (textLower.includes('viernes')) {
        const d = new Date();
        d.setDate(d.getDate() + ((5 + 7 - d.getDay()) % 7 || 7));
        dateStr = d.toISOString().split('T')[0];
      }

      const match = textLower.match(/(examen de|tarea de|estudiar|leer) (.*?)( el| la| hoy| mañana|)/);
      if (match && match[2]) {
        title = match[2].trim();
        title = title.charAt(0).toUpperCase() + title.slice(1);
        if (type === 'examen') title = `Examen de ${title}`;
      }

      if (textLower.includes('examen') || textLower.includes('tarea') || textLower.includes('estudiar') || textLower.includes('leer') || textLower.includes('recordarme')) {
        const newTask = { id: `t_${Date.now()}`, title: title, date: dateStr, type: type };
        setCalendarTasks(prev => [...prev, newTask]);
        responseText = `¡Listo! He añadido "${title}" a tu calendario para el ${dateStr}. ¿Algo más en lo que pueda ayudarte?`;
      }

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

  // --- Supabase auth ---
  const [supabaseUserId, setSupabaseUserId] = useState(null);
  const [dbLoaded, setDbLoaded] = useState(false);

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

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [blockedAppsConfig, setBlockedAppsConfig] = useState({});
  const [showAICalendar, setShowAICalendar] = useState(false);

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

  // --- Supabase: inicializar sesión anónima y cargar perfil ---
  useEffect(() => {
    const initSupabase = async () => {
      // Intentar obtener sesión existente
      const { data: { session } } = await supabase.auth.getSession();
      let uid = session?.user?.id;

      // Si no hay sesión, crear una anónima
      if (!uid) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error) uid = data.user?.id;
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
        setInventory(profile.inventory || {
          avatars: ['a_base'], backgrounds: ['bg_default'], skins: [],
          equippedAvatar: 'a_base', equippedBg: 'bg_default', equippedSkins: {}
        });
        setActiveChallenge(profile.active_challenge || null);
        setCompletedActivities(profile.completed_activities || []);
        setCalendarTasks(profile.calendar_tasks || []);
        setBlockedAppsConfig(profile.blocked_apps_config || {});
        // Saltar onboarding directamente al main
        setStep('main');
      } else {
        // Usuario nuevo: mostrar onboarding normal
        setCalendarTasks([
          { id: 't1', title: 'Examen de Matemáticas', date: new Date().toISOString().split('T')[0], type: 'examen' },
          { id: 't2', title: 'Leer capítulo 4', date: new Date().toISOString().split('T')[0], type: 'tarea' }
        ]);
      }

      setDbLoaded(true);
    };

    initSupabase();
  }, []);

  // --- Supabase: splash timer ---
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // --- Supabase: sincronizar XP, Diamantes e Inventario automáticamente ---
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
      });
    }, 1500); // debounce de 1.5s para no saturar la DB
    return () => clearTimeout(timeout);
  }, [userXP, userDiamonds, inventory, activeChallenge, completedActivities, calendarTasks, blockedAppsConfig, supabaseUserId, dbLoaded, step, saveProfile]);

  // --- Handler: cuando el onboarding termina, guardar perfil completo ---
  const handleOnboardingComplete = useCallback(async (name, gender) => {
    const finalName = name || 'Jugador_Nuevo';
    const finalGender = gender || 'any';
    setUsername(finalName);
    setUserGender(finalGender);
    if (supabaseUserId) {
      await saveProfile(supabaseUserId, {
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
          {step === 'auth' && <AuthScreen key="auth" onBack={() => setStep('logoReveal')} onContinue={handleOnboardingComplete} />}

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
                {mainNav === 'home' && <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><HomeDashboard selectedApps={selectedApps} activeChallenge={activeChallenge} onSelectChallenge={setShowChallengeDetail} onOpenActive={() => setShowActiveInteractive(true)} onOpenAll={() => setShowAllChallenges(true)} onCompleteChallenge={handleCompleteChallenge} onPlayMinigame={setActiveMinigame} userGender={userGender} selectedCoach={selectedCoach} setSelectedCoach={setSelectedCoach} completedActivities={completedActivities} setCompletedActivities={setCompletedActivities} userXP={userXP} setUserXP={setUserXP} userDiamonds={userDiamonds} setUserDiamonds={setUserDiamonds} calendarTasks={calendarTasks} setCalendarTasks={setCalendarTasks} blockedAppsConfig={blockedAppsConfig} setBlockedAppsConfig={setBlockedAppsConfig} onOpenAICalendar={() => setShowAICalendar(true)} /></motion.div>}
                {mainNav === 'forum' && <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Forum onSelectChat={(p) => { setChatPerson(p); setStep('chat'); }} unreadFilter={unreadFilter} setUnreadFilter={setUnreadFilter} activeTab={activeForumTab} setActiveTab={setActiveForumTab} forumPosts={forumPosts} setForumPosts={setForumPosts} userAvatarItem={SHOP_ITEMS.find(i => i.id === inventory.equippedAvatar)} username={username} /></motion.div>}
                {mainNav === 'rankings' && <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><Rankings userXP={userXP} inventory={inventory} username={username} /></motion.div>}
                {mainNav === 'shop' && <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><ShopView userDiamonds={userDiamonds} onSelectItem={openShopItem} inventory={inventory} /></motion.div>}
                {mainNav === 'profile' && <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10"><ProfileView inventory={inventory} setInventory={setInventory} userXP={userXP} username={username} onOpenItem={openInventoryItem} completedCount={completedCount} activityLog={activityLog} selectedApps={selectedApps} setSelectedApps={setSelectedApps} /></motion.div>}
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
                {activeMinigame && activeMinigame.type === 'whack' && <MinigameWhack key="modal-minigame-whack" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}
                {activeMinigame && activeMinigame.type === 'stoic' && <MinigameStoic key="modal-minigame-stoic" game={activeMinigame} onClose={() => setActiveMinigame(null)} addXP={handleAddXP} addDiamonds={handleAddDiamonds} />}

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
                {showAICalendar && <AICalendarModal key="modal-ai-calendar" onClose={() => setShowAICalendar(false)} calendarTasks={calendarTasks} setCalendarTasks={setCalendarTasks} />}
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