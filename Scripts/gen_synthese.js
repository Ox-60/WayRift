const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, Header, Footer, VerticalAlign
} = require('docx');
const fs = require('fs');

const NOW = new Date();
const DATE_STR = `${NOW.getDate().toString().padStart(2,'0')}/${(NOW.getMonth()+1).toString().padStart(2,'0')}/${NOW.getFullYear()} ${NOW.getHours().toString().padStart(2,'0')}:${NOW.getMinutes().toString().padStart(2,'0')}`;
const DATE_FILE = `${NOW.getDate().toString().padStart(2,'0')}${(NOW.getMonth()+1).toString().padStart(2,'0')}${NOW.getFullYear()}`;
const VERSION = "V2.1";

const C = {
  gold:"C9A84C", darkGold:"8B6508", dark:"1A1A2E",
  bg:"FDF6E3", bgMid:"F0E4C2", white:"FFFFFF", gray:"666666",
  red:"C0392B", orange:"D35400", green:"1E8449", blue:"1A5276",
  purple:"6C3483", teal:"0E6655", amber:"9A7D0A", code:"1E1E2E",
  v1:"1E8449", v2:"1A5276", v3:"6C3483", v4:"7D3C98", v5:"8B4513", v6:"8B0000"
};

const bd={style:BorderStyle.SINGLE,size:1,color:C.gold};
const borders={top:bd,bottom:bd,left:bd,right:bd};
const nb={style:BorderStyle.NONE,size:0,color:C.white};

function sp(n=100){return new Paragraph({spacing:{before:n,after:0},children:[new TextRun("")]})}
function h1(t){return new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:480,after:160},border:{bottom:{style:BorderStyle.SINGLE,size:8,color:C.gold}},children:[new TextRun({text:t,bold:true,size:40,color:C.dark,font:"Arial"})]})}
function h2(t,color=C.darkGold){return new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:300,after:100},children:[new TextRun({text:t,bold:true,size:28,color,font:"Arial"})]})}
function h3(t){return new Paragraph({heading:HeadingLevel.HEADING_3,spacing:{before:200,after:80},children:[new TextRun({text:t,bold:true,size:24,color:C.dark,font:"Arial"})]})}
function p(t,opts={}){return new Paragraph({spacing:{before:60,after:60},children:[new TextRun({text:t,size:22,font:"Arial",color:opts.color||"333333",bold:opts.bold||false,italics:opts.italic||false})]})}
function bl(t,level=0){return new Paragraph({numbering:{reference:"bullets",level},spacing:{before:50,after:50},children:[new TextRun({text:t,size:21,color:"333333",font:"Arial"})]})}
function blb(label,text){return new Paragraph({numbering:{reference:"bullets",level:0},spacing:{before:50,after:50},children:[new TextRun({text:label+" ",bold:true,size:21,font:"Arial",color:C.dark}),new TextRun({text,size:21,font:"Arial",color:"444444"})]})}

function callout(text,color,icon){
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],rows:[
    new TableRow({children:[new TableCell({
      borders:{top:nb,bottom:nb,right:nb,left:{style:BorderStyle.SINGLE,size:16,color}},
      shading:{fill:"FFFDF5",type:ShadingType.CLEAR},
      margins:{top:80,bottom:80,left:220,right:120},
      children:[new Paragraph({children:[
        new TextRun({text:`${icon}  `,bold:true,size:20,color,font:"Arial"}),
        new TextRun({text,size:20,color:"444444",font:"Arial"})
      ]})]
    })]})
  ]});
}
const warn=t=>callout(t,C.red,"⚠");
const info=t=>callout(t,C.blue,"ℹ");
const tip=t=>callout(t,C.green,"✓");
const pending=t=>callout(t,C.orange,"○");

function codeBlock(lines){
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],rows:[
    new TableRow({children:[new TableCell({
      borders,shading:{fill:C.code,type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:lines.map(l=>new Paragraph({spacing:{before:0,after:0},
        children:[new TextRun({text:l,size:18,font:"Courier New",color:"A8D8A8"})]}))
    })]})
  ]});
}

function tbl(headers,colWidths,rows,opts={}){
  const hRow=new TableRow({tableHeader:true,children:headers.map((h,i)=>
    new TableCell({borders,width:{size:colWidths[i],type:WidthType.DXA},
      shading:{fill:opts.hFill||C.dark,type:ShadingType.CLEAR},
      margins:{top:70,bottom:70,left:110,right:80},
      children:[new Paragraph({children:[new TextRun({text:h,bold:true,size:19,color:opts.hColor||C.gold,font:"Arial"})]})]}))});
  const dRows=rows.map((row,ri)=>new TableRow({children:row.map((cell,ci)=>{
    const color=opts.colorFn?opts.colorFn(cell,ci,ri):"333333";
    return new TableCell({borders,width:{size:colWidths[ci],type:WidthType.DXA},
      shading:{fill:ri%2===0?C.bg:C.bgMid,type:ShadingType.CLEAR},
      margins:{top:55,bottom:55,left:110,right:80},
      children:[new Paragraph({children:[new TextRun({text:cell,size:19,font:"Arial",color,bold:opts.bold&&opts.bold.includes(ci)})]})]})})}));
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:colWidths,rows:[hRow,...dRows]});
}

function banner(num,title,color){
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[1400,7960],rows:[
    new TableRow({children:[
      new TableCell({borders,width:{size:1400,type:WidthType.DXA},shading:{fill:color,type:ShadingType.CLEAR},
        margins:{top:100,bottom:100,left:0,right:0},verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:num,bold:true,size:44,color:C.white,font:"Arial"})]})]
      }),
      new TableCell({borders,width:{size:7960,type:WidthType.DXA},shading:{fill:C.dark,type:ShadingType.CLEAR},
        margins:{top:100,bottom:100,left:240,right:160},verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({children:[new TextRun({text:title,bold:true,size:34,color,font:"Arial"})]})]
      })
    ]})
  ]});
}

const numbering={config:[{reference:"bullets",levels:[
  {level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}},
  {level:1,format:LevelFormat.BULLET,text:"◦",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:1080,hanging:360}}}},
]}]};
const styles={default:{document:{run:{font:"Arial",size:22}}},paragraphStyles:[
  {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:40,bold:true,font:"Arial",color:C.dark},paragraph:{spacing:{before:480,after:160},outlineLevel:0}},
  {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:28,bold:true,font:"Arial",color:C.darkGold},paragraph:{spacing:{before:300,after:100},outlineLevel:1}},
  {id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:24,bold:true,font:"Arial",color:C.dark},paragraph:{spacing:{before:200,after:80},outlineLevel:2}},
]};
function makeHeader(n){return new Header({children:[new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:2,color:C.gold}},children:[new TextRun({text:`WAYSTONE — ${n} — ${VERSION}`,bold:true,size:18,color:C.gold,font:"Arial"}),new TextRun({text:`   |   ${DATE_STR}`,size:18,color:C.gray,font:"Arial"})]})]})}
function makeFooter(){return new Footer({children:[new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:2,color:C.gold}},alignment:AlignmentType.RIGHT,children:[new TextRun({text:"Page ",size:18,color:C.gray,font:"Arial"}),new TextRun({children:[PageNumber.CURRENT],size:18,color:C.gray,font:"Arial"})]})]})}
function makeCover(title,subtitle,color){return [
  sp(100),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:"⚑",bold:true,size:100,color:C.gold,font:"Arial"})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:"WAYSTONE",bold:true,size:86,color:C.dark,font:"Arial"})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:title,bold:true,size:40,color,font:"Arial"})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:subtitle,size:22,color:C.gray,font:"Arial",italics:true})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:80},children:[new TextRun({text:`${VERSION}  •  ${DATE_STR}`,size:20,color:C.gray,font:"Arial"})]}),
  new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:8,color:C.gold}},spacing:{before:40,after:200},children:[new TextRun("")]}),
]}
function makeEnd(){return [
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:300,after:60},border:{top:{style:BorderStyle.SINGLE,size:6,color:C.gold}},children:[new TextRun({text:"⚑  WAYSTONE  ⚑",bold:true,size:48,color:C.gold,font:"Arial"})]}),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:0},children:[new TextRun({text:`${VERSION} — ${DATE_STR} — Confidentiel`,size:19,color:C.gray,font:"Arial"})]}),
]}
function makeDoc(children,docName){return new Document({numbering,styles,sections:[{
  properties:{page:{size:{width:11906,height:16838},margin:{top:1100,right:1100,bottom:1100,left:1100}}},
  headers:{default:makeHeader(docName)},footers:{default:makeFooter()},children
}]})}

// ═══════════════════════════════════
// DOCUMENT SYNTHÈSE COMPLÈTE
// ═══════════════════════════════════
function makeSynthese(){
  return makeDoc([
    ...makeCover("Synthèse Complète du Projet","Toutes les décisions prises et laissées de côté — Référence pour l'équipe",C.gold),

    // TABLE DES MATIÈRES
    h1("Table des matières"),
    bl("01 — Concept & Vision du serveur"),
    bl("02 — Architecture des mondes"),
    bl("03 — Système de portails et déplacements"),
    bl("04 — Factions et groupes"),
    bl("05 — Claims et territoire"),
    bl("06 — Mort, Coma, Revive"),
    bl("07 — Joueur — Identité, Profil, Réputation"),
    bl("08 — Économie & HDV"),
    bl("09 — Guerres & KOTH"),
    bl("10 — Arbre de métiers"),
    bl("11 — Quarries & Ressources"),
    bl("12 — Communication & Nametags"),
    bl("13 — Lore & Arc narratif"),
    bl("14 — Plugins confirmés / à valider / en suspend"),
    bl("15 — Ce qui a été laissé de côté (avec raisons)"),
    bl("16 — Points ouverts à traiter"),
    sp(200),

    // ═══ 01 CONCEPT ═══
    banner("01","Concept & Vision",C.v1),sp(60),
    p("Waystone est un serveur Minecraft Semi-RP Multivers inspiré du genre Civilisation. Les joueurs fondent des nations, créent des groupes politiques, construisent des villes et façonnent l'histoire à travers leurs décisions. Pas de scénario imposé — tout émerge des alliances, trahisons et conquêtes."),sp(40),
    h2("Piliers fondamentaux"),
    blb("Semi-RP :","Immersion narrative sans obligation de roleplay strict. Les mécaniques justifient le lore."),
    blb("Multivers :","Chaque nation est un monde Minecraft séparé. Les déplacements entre mondes sont physiques (portails)."),
    blb("Inspiré Civilisation :","Nations en compétition, diplomatie, économie, guerres territoriales, progression culturelle."),
    blb("History émergente :","Pas de script imposé. Les GM orchestrent des événements mais les joueurs écrivent l'histoire."),
    blb("Long terme :","Conçu pour évoluer pendant des années (V1 → V7+)."),sp(40),
    h2("Serveur cible"),
    blb("Version :","Minecraft Java 1.21.x (Paper)"),
    blb("Hébergement :","OVH Game (anti-DDoS intégré)"),
    blb("Communauté cible :","~50 joueurs investis au lancement, croissance progressive"),
    blb("Boutique :","Cosmétiques uniquement (Tebex) — aucun avantage gameplay"),
    sp(180),

    // ═══ 02 ARCHITECTURE MONDES ═══
    banner("02","Architecture des Mondes",C.v1),sp(60),
    tbl(["Monde","Nb","Accès","Minerais","Builds","Rôle"],
      [1600,700,1800,1200,1200,2860],
      [
        ["Capitale","1","Tous, 24h/24","Non","Staff","Hub : HDV, portails, hôpital, marché, Bas-Fonds"],
        ["Monde Nation","X","Habitants=Survie, Autres=Aventure","Non","Joueurs","Vie, construction, zones d'affluence (V6)"],
        ["Monde Minier","1","Tous, 20h-23h","Oui","Non","Farm de ressources, Warzones (V3)"],
        ["Monde Faction","X","Faction propriétaire","Config GM","Faction","Monde privé acheté via Tebex ou en jeu"],
      ],{bold:[0]}
    ),sp(60),
    h2("Capitale — Zones"),
    blb("Quartier officiel :","Banque, HDV, Bureau immobilier, Salle du Trône"),
    blb("Quartier de vie :","Auberge, Hôpital (no-PvP), Marché (~15 étalages louables)"),
    blb("Portails :","Zone dédiée — 1 portail par monde nation"),
    blb("Échoppes de métier :","Forgeron, Herboriste, Mécanicien, Agriculteur, Guerrier, Archer, etc."),
    blb("Skins :","Espace dédié pour voir et acheter des skins"),
    blb("Panthéon :","Classement des mondes et factions les plus riches"),
    blb("Bas-Fonds (V3+) :","Zone souterraine pour joueurs Infâmes — Dark Market, casino, informateur"),sp(40),
    h2("Monde Minier"),
    blb("Horaires :","20h-23h IRL tous les jours"),
    blb("Jour 0 :","Ouvert 24h/24 pendant 48h pour équiper les joueurs"),
    blb("Taux minerais :","Définis par le GM avant chaque session"),
    blb("Régénération :","AxMines pour les zones régénérables"),
    blb("Minage :","Libre sous Y=50 sans claim requis"),
    sp(180),

    // ═══ 03 PORTAILS ═══
    banner("03","Portails & Déplacements",C.v1),sp(60),
    p("Système basé sur Multiverse-Core Nether Portals. Paires liées bidirectionnelles. Zéro développement custom pour les portails stables."),sp(40),
    h2("Portails en V1 sur la map"),
    tbl(["Portail","Statut","Destination","Rôle narratif"],
      [2000,1600,2000,3760],
      [
        ["Portail minier","Actif dès le début","Passé du monde joueur","Justifie l'absence de minerai dans le monde actuel"],
        ["Portail instable (x1-2)","Actif — instable","Map secrète (retour auto 5s)","Lore. Signe que quelque chose est cassé."],
        ["Monolithe","Inactif → actif fin V1","Capitale (event GM)","Sa réparation clôture V1."],
      ]
    ),sp(40),
    h2("Règles de déplacement"),
    blb("Interconnectés :","Entrer dans le portail de Solen (Capitale) → arriver au portail de Solen (monde Solen). Et inversement."),
    blb("Down/Coma :","Arrivée à 3 blocs aléatoires du portail destination."),
    blb("Refus :","Monde banni, fermé ou archivé."),
    blb("Bordure :","Infranchissable. Pas de menu. Pas de TP automatique."),
    blb("Commandes TP :","Réservées au staff/GM uniquement."),sp(40),
    h2("Portails Instables (V2+)"),
    tbl(["Type","Pose","Durée","Contenu","Récupérable"],
      [1800,2000,1400,3000,1160],
      [
        ["Portail instable GM","Par le GM","Variable","Défini par GM (donjon, farm, zone secrète...)","N/A"],
        ["Portail de poche (V5)","Joueur (item au sol, perdu)","XX min (à définir)","Aléatoire liste GM — monde régénéré à chaque ouverture","Non"],
        ["Portail stable faction","Acheté (Tebex ou en jeu)","Permanent","Monde dédié à la faction","Oui"],
      ]
    ),
    sp(180),

    // ═══ 04 FACTIONS ═══
    banner("04","Factions & Groupes",C.v2),sp(60),
    tbl(["Type","Membres","Coût","Droits spéciaux"],
      [1600,1600,2200,3960],
      [
        ["Groupe","1 à 14","100 000¢","Pas de guerre de faction, pas d'achat de monde"],
        ["Faction","15+","100 000¢ + 150 000¢ évolution","Guerres de faction (GM), achat de monde, warzones"],
      ],{bold:[0]}
    ),sp(40),
    h2("Création — Flux"),
    codeBlock([
      "1. Joueur remplit le formulaire : Nom, Description, Nation, Objectif, Lore",
      "2. Paiement débité immédiatement",
      "3. Statut : PENDING — notification staff/GM",
      "4. GM valide (/faction admin validate) → ACTIVE",
      "   ou refuse → remboursement automatique",
      "5. Si délai 24h dépassé sans action → chef/responsables dans Rewards Publics",
      "6. Pendant validation : 1 chunk temporaire claimable par le chef",
    ]),sp(40),
    h2("Hiérarchie"),
    tbl(["Rôle","Limite","Notes"],
      [1800,1800,5760],
      [
        ["Chef","1 par entité","Ne peut être chef que dans 1 entité. Max 2 rôles à responsabilité."],
        ["Responsable","Config","Max 2 rôles chef+responsable total toutes factions."],
        ["Membre","Illimité","Multi-faction autorisé."],
      ]
    ),sp(40),
    h2("Diplomatie & Vote"),
    blb("Vote interne :","Chef ×3 voix, responsables ×2 voix (modifiable par le chef)"),
    blb("Durée :","24h max, se termine si majorité atteinte"),
    blb("Nouveau membre :","Ne peut pas voter (paramétrable)"),
    blb("Factions alliées dans une guerre :","Si une faction rejoint une guerre et accepte, elle entre en conflit permanent avec la faction adverse pendant ET après la guerre"),sp(40),
    h2("Dissolution"),
    codeBlock([
      "Conditions de dissolution :",
      "  Chef inactif +14j sans responsable actif",
      "  Inactivité générale -50% pendant 1 mois",
      "  Faction < 15 membres actifs 1 mois → rétrogradation Groupe (garde monde faction)",
      "  /f dissolve (chef, double confirmation)",
      "",
      "Calendrier :",
      "  Jeudi 20h → MODE PILLAGE (4h) — claims accessibles à tous",
      "  Samedi 18h → suppression définitive + régénération zone",
    ]),
    sp(180),

    // ═══ 05 CLAIMS ═══
    banner("05","Claims & Territoire",C.v1),sp(60),
    tbl(["Type","Profondeur max","Limite","Reset","Usage"],
      [1600,1800,2200,1400,2360],
      [
        ["Territoire","Y=40","Selon puissance faction","Non","Construction, bâtiments, ville"],
        ["Farm","Bedrock","Faction:16 / Groupe:8 / Solo:4","1x/semaine","Minage, farm, ressources"],
      ],{bold:[0]}
    ),sp(40),
    tbl(["Situation","Profondeur max"],
      [4000,5360],
      [
        ["Dans un claim Territoire","Jusqu'à Y=40"],
        ["Dans un claim Farm","Pas de limite (jusqu'au bedrock)"],
        ["Hors claim","Jusqu'à Y=50 (en dessous : interdit)"],
        ["Monde Minier (20h-23h)","Tous les blocs minables, sans claim"],
      ]
    ),sp(40),
    h2("Droits d'accès — V1 simplifié"),
    tbl(["Profil","Claim protégé","Claim ineffectif"],
      [2400,3480,3480],
      [
        ["Membre de la faction","Survie complète","Survie complète"],
        ["Non-membre (neutre)","Mode Aventure — pas de pose/casse","Mode Aventure — pas de pose/casse"],
        ["Ennemi (guerre GM activée)","Mode Aventure — pas de pose/casse","Survie complète — casse et pose libre"],
      ]
    ),sp(40),
    h2("Règles de pose"),
    blb("Règle des 3 :","Bloc de 9 chunks minimum pour groupes/factions (pas solo)."),
    blb("Solo :","4 claims gratuits, max 12. 4 farm + 8 territoire. Pas de colocation."),
    blb("Coût progressif :","Plus une faction a de claims, plus le suivant coûte cher."),
    blb("Claims solo + faction :","Si rejoint une faction, claims protégés jusqu'au mardi+3j minimum puis supprimés."),
    blb("Coffres :","Sécurisables avec cadenas personnel (max 2 par joueur) — ChestProtect."),
    sp(180),

    // ═══ 06 MORT ═══
    banner("06","Mort, Coma & Revive",C.red),sp(60),
    tbl(["Phase","Déclencheur","Comportement","Plugin"],
      [1600,2200,3800,1760],
      [
        ["Avertissement","Vie < 3 coeurs (6 HP)","Effet visuel troublé (Blindness partiel)","ReviveMe config"],
        ["Down / Coma","Vie = 0 (PvP uniquement, mobs JAMAIS)","Joueur peut bouger, inventaire fouillable par tous","ReviveMe"],
        ["Revive collègue","Accroupi sur le joueur Down","V1 : accessible à tous. V2+ : Médecin uniquement (LuckPerms).","ReviveMe"],
        ["Revive GM","/revive @joueur here","Revive + TP sur place — commande staff","ReviveMe"],
        ["Hôpital","Countdown ReviveMe écoulé","Respawn aux coordonnées hôpital en Capitale","ReviveMe + Multiverse"],
        ["Wipe","/wipe me (double confirmation)","Supprime connexions plugins sauf XP compte et achats","Custom léger"],
        ["Wipe staff","/wipe @joueur <raison>","Même effet — décision staff","Custom léger"],
      ]
    ),sp(40),
    info("En V2, quand les métiers arrivent : permission ReviveMe restreinte au rang LuckPerms 'medecin'. Zéro dev supplémentaire."),
    sp(180),

    // ═══ 07 JOUEUR ═══
    banner("07","Identité, Profil & Réputation",C.v1),sp(60),
    h2("Identité RP"),
    blb("Nom RP :","Prénom + Nom. Le prénom seul ou le nom seul peut être réutilisé mais pas la combinaison."),
    blb("Unicité :","Combinaison prénom+nom unique sur tout le serveur. Algorithme Levenshtein (distance ≤ 2 bloquée)."),
    blb("Serment :","Livre à signer obligatoirement à la première connexion."),
    blb("Wipe :","Nouveau nom RP + nouveau personnage. Blocage 3-5 jours avant retour."),sp(40),
    h2("Profil — Visibilité"),
    tbl(["Information","Public","Via inspection","Soi-même","Staff"],
      [2800,1600,1800,1600,1560],
      [
        ["Nom RP","✓","✓","✓","✓"],
        ["Statut (vivant/down/wipe)","✓","✓","✓","✓"],
        ["Nation de résidence","✓","✓","✓","✓"],
        ["Niveau de compte","✓","✓","✓","✓"],
        ["Réputation (score+label)","✗","✓","✓","✓"],
        ["90% inventaire (aléatoire)","✗","✓","✓","✓"],
        ["Pseudo Minecraft","✗","✗","✓ (fenêtre profil)","✓"],
        ["Factions et rang","✗","✗","✓","✓"],
        ["Solde ¢","✗","✗","✓","✓"],
      ]
    ),sp(40),
    h2("Réputation Joueur (0-100) — ReputationPlugin + LuckPerms"),
    tbl(["Score","Label","Nameplate","Accès","Restriction"],
      [1400,1800,1800,2000,2360],
      [
        ["80-100","Légendaire","Or","Zones VIP Capitale","—"],
        ["60-79","Honorable","Vert clair","—","—"],
        ["40-59","Neutre","Gris","—","—"],
        ["20-39","Neutre bas","Gris foncé","—","—"],
        ["10-19","Suspect","Orange","—","Interdit HDV officiel"],
        ["0-9","Infâme","Rouge + tête de mort","Bas-Fonds","Interdit HDV officiel"],
      ]
    ),sp(40),
    h3("Facteurs de modification"),
    tbl(["Événement","Impact","Condition"],
      [3600,1800,3960],
      [
        ["Vote fiscal positif reçu","+X points","Paiement impôts par un autre joueur"],
        ["Vote fiscal négatif reçu","-X points","Paiement impôts par un autre joueur"],
        ["Payer ses impôts à temps","+1 point","Bonus passif par période payée"],
        ["Mettre joueur en Down","-X points","UNIQUEMENT hors guerre déclarée"],
        ["Victoire de guerre","+ bonus temporaire","Répercuté sur les membres"],
        ["Warn / Mute / Ban","-X pts","Temporaire (durée variable)"],
        ["Se faire raider sa ville","-X points","Sur le chef de la faction perdante"],
        ["Participation event GM","+ configurable","Décision GM"],
      ]
    ),sp(40),
    blb("Limite montée :","Maximum +10 points/semaine. Excédent reporté à la semaine suivante."),
    blb("Priorité :","Votes de membres de sa faction comptent en premier dans le quota."),
    blb("Bas-Fonds :","Accès retiré si réputation remonte au-dessus de 10."),
    sp(180),

    // ═══ 08 ÉCONOMIE ═══
    banner("08","Économie & HDV",C.amber),sp(60),
    h2("Monnaie"),
    blb("Oboles (¢) :","Monnaie unique globale par joueur."),
    blb("Rubies :","Monnaie VIP/prestige. Item physique à déposer dans un réceptacle (style OriginRealms). Utilisé au casino. Achetable en euros ou en beaucoup d'Oboles."),sp(40),
    h2("HDV — AuctionHouse configuré"),
    blb("Style :","Offres de vente uniquement (pas d'ordres d'achat). Prix moyen 30 jours."),
    blb("Liste blanche :","Seuls les items de la liste autorisée peuvent être mis en vente."),
    blb("Taxes :","15% Capitale + 10% faction = 25%. Étalages loués : 15% uniquement."),
    blb("Accès :","Interdit aux joueurs réputation < 20 (Suspect et Infâme)."),
    blb("Durée listing :","7 jours + 7 jours récupération Ender Chest puis suppression."),
    blb("Ender Chest :","Boîte aux lettres. Bouton inventaire + bloc physique en Capitale."),
    blb("Classements :","Top acheteur et top vendeur — par semaine et par mois."),sp(40),
    h2("Impôts de faction"),
    blb("Paiement :","Commande /f pay <montant> — débité sur le solde du joueur vers la trésorerie."),
    blb("Vote réputation :","Payer ses impôts génère X votes de réputation attribuables à n'importe quel joueur."),
    blb("Chef exclu :","Le chef ne peut pas être payé par sa propre faction."),
    sp(180),

    // ═══ 09 GUERRES ═══
    banner("09","Guerres & KOTH",C.red),sp(60),
    p("Les guerres sont entièrement orchestrées par les GM. Aucune automatisation."),sp(40),
    tbl(["Règle","Détail"],
      [3000,6360],
      [
        ["Déclenchement","Le GM lance chaque manche avec une commande."],
        ["Score","1 manche gagnée = 1 point de victoire."],
        ["Victoire","Premier à 3 points gagne la guerre."],
        ["Positions","1 position par monde : attaquant, défenseur, neutre."],
        ["Manche spéciale","Si défaite écrasante, le GM peut déclencher une attaque directe de la ville perdante."],
        ["Fin de guerre","3 points atteints, abandon volontaire, ou traité de paix."],
        ["Alliances","Factions alliées peuvent rejoindre une guerre — elles entrent en conflit permanent avec l'adversaire."],
      ]
    ),sp(40),
    h2("Assaut — Mécanique de base"),
    blb("Objectif :","Capturer et maintenir la zone KOTH."),
    blb("Joueur en agonie :","Non comptabilisé dans la zone de capture."),
    blb("Joueur en coma :","Réapparaît après 10 secondes au respawn de sa faction."),
    blb("Traités :","Paix (neutre + no-war X temps) ou non-agression (assauts suspendus X temps). Peuvent inclure contreparties : argent, power, claims."),
    sp(180),

    // ═══ 10 MÉTIERS ═══
    banner("10","Arbre de Métiers — V2+",C.v2),sp(60),
    warn("Les métiers arrivent en V2 (basiques) et se complètent en V6. Rien en V1."),sp(40),
    tbl(["Branche","Métier de base","Spécialisation 1","Spécialisation 2","Spécialisation 3"],
      [1800,2000,2000,2000,1560],
      [
        ["Mysticisme","—","Médecin / Clerc (soins, revive)","Occultiste / Nécromancien (poisons)","—"],
        ["Guerre / Combat","—","Assassin (furtivité, rapidité)","Éclaireur (vision, agilité, archerie)","Guerrier (force, robustesse)"],
        ["Artisanat","Mineur (base)","Mécanicien (machines, quarries)","Canalisateur (redstone)","Forgeron (forge)"],
        ["Culture","—","Herboriste (plantes, fleurs, herbes, drogues V3+)","Agriculteur (nourriture, céréales)","—"],
        ["Divers","Horloger","Vote nuit Minecraft. Contrôle d'un Pantin NPC.","—","—"],
      ]
    ),sp(40),
    h2("Points clés par métier"),
    blb("Médecin V2+ :","Seul à pouvoir reviver avec item custom (ReviveMe + LuckPerms). Soins en Down."),
    blb("Occultiste :","Fabrication poisons/drogues. Marché noir (Bas-Fonds) pour distribution."),
    blb("Mécanicien :","Construction et réparation quarries. Clé de réparation, rouages."),
    blb("Agriculteur :","Vente céréales au marché de la Capitale. Prix fluctuant offre/demande."),
    blb("Herboriste :","Cultures génétiques. Poisons, drogues, remèdes. Marché noir pour drogues."),
    blb("Assassin :","Utilise les poisons de l'Occultiste au combat."),
    blb("Plugins V2 :","AdvancedJobs + AdvancedSkills (à confirmer)."),
    sp(180),

    // ═══ 11 QUARRIES ═══
    banner("11","Quarries & Ressources — V6",C.v3),sp(60),
    warn("Les Quarries arrivent en V6. En V1/V2, le minage se fait uniquement dans le monde minier (20h-23h)."),sp(40),
    h2("Fonctionnement"),
    blb("Emplacement :","Uniquement dans les zones d'affluence (WorldGuard flag quarry-allowed)."),
    blb("Configuration GM :","Ressource d'entrée (item fixe ou liste), sorties R1-R5 par zone."),
    blb("Scan mécanicien :","Item consommable → révèle les ressources présentes et leur pureté exacte."),sp(40),
    h2("Probabilités de présence (conditionnelles)"),
    tbl(["Ressource","Chance","Condition","Pur possible"],
      [1400,1400,3400,3160],
      [
        ["R1","80%","Si en zone d'affluence (sinon 0%)","Oui"],
        ["R2","35%","Si R1 présente","Oui"],
        ["R3","15%","Si R2 présente","Non — re-roll auto"],
        ["R4","6%","Si R3 présente","Non — re-roll auto"],
        ["R5","2%","Si R4 présente","Non — re-roll auto"],
      ]
    ),sp(40),
    h2("Pureté & Transformation"),
    tbl(["Pureté","Multiplicateur","Chance","Coût transformation"],
      [1600,1800,1400,4560],
      [
        ["Pauvre","×1","45%","10 blocs → 4 ressources"],
        ["Standard","×2","35%","8 blocs → 4 ressources"],
        ["Riche","×3","15%","6 blocs → 4 ressources"],
        ["Pur","×4","5%","4 blocs → 4 ressources"],
      ]
    ),sp(40),
    h2("Modules quarry (3 slots)"),
    blb("Vitesse :","Production +1/3, consommation +1/6"),
    blb("Rendement :","Quantité +1/3, stockage -1/6"),
    blb("Solidité :","Moins de maintenance"),
    blb("Stockage :","Capacité +1/3, quantité -1/6"),
    blb("Réservoir :","Capacité combustible +1/3"),
    blb("Économie :","Consommation -1/3, réservoir -1/4"),
    blb("Combustibles :","Charbon (4 items), Magma (8), Biocarburant (16)"),
    sp(180),

    // ═══ 12 COMMUNICATION ═══
    banner("12","Communication & Nametags",C.v1),sp(60),
    blb("PlasmoVoice :","Proximity uniquement. Chuchotement 5 blocs. Atténuation murs."),
    blb("Chat :","Emotes RP (/me /do /say /chuchoter) en permanence. Chat libre en journée par monde."),
    blb("Nametags :","Invisibles par défaut (ProAntiTab). Visibles si présentation mutuelle (CustomNameplates + LuckPerms)."),
    blb("Tête de mort :","Sur les joueurs Infâmes (réputation < 10) via CustomNameplates + LuckPerms rank 'infame'."),
    blb("Prénoms RP :","Disponibles dans le Tab (TAB plugin) pour complétion automatique."),
    blb("Report :","Prénom RP OU pseudo MC (pas obligatoire de connaître le pseudo)."),
    sp(180),

    // ═══ 13 LORE ═══
    banner("13","Lore & Arc Narratif",C.gold),sp(60),
    p("Les joueurs sont des explorateurs du multivers ayant franchi un portail instable qui s'est refermé derrière eux. Bloqués sans ressources, ils doivent survivre et réparer le monolithe.",{italic:true}),sp(40),
    tbl(["Version","Mot-clé","Résumé","Clôture"],
      [900,1800,4200,2460],
      [
        ["V1","Construction","Arrivée, nations, réparation du monolithe.","Event GM : monolithe réparé → portail Capitale actif"],
        ["V2","Rébellion","Exploration multivers, mondes instables, métiers basiques.","Destruction scénarisée de la Capitale par les joueurs"],
        ["V3","Suprématie","Nouvelle Capitale autoritaire. Réputation. Métiers incomplets.","—"],
        ["V4","Conquête","Zones d'affluence corrompues. Portails miniers surchargés.","—"],
        ["V5","Corruption & Faille","Monde minier stable. Portails temporaires craftables.","Joueurs craftent leur premier portail → donjon"],
        ["V6","Spécialité & Exploitation","Quarries, plantations, branches métier complètes.","—"],
        ["V7","Génération & Génétique","Finalisation métiers. Races possibles. Génétique machines.","—"],
      ],{bold:[0,1]}
    ),
    sp(180),

    // ═══ 14 PLUGINS ═══
    banner("14","Plugins — État complet",C.blue),sp(60),
    h2("Plugins confirmés"),
    tbl(["Plugin","Rôle","Priorité"],
      [3200,4800,1360],
      [
        ["Vulcan 2.9.7.23","AntiCheat secondaire","Critique"],
        ["CustomNameplates 3.0.39","Nameplates RP conditionnels. Tête de mort Infâme.","Critique"],
        ["OxyTowns 1.1.0","Claims 2 types (Territoire/Farm)","Critique"],
        ["ProAntiTab 2.3.4","Masque joueurs dans le Tab","Haute"],
        ["LibsDisguises 11.0.18","Déguisements GM","Haute"],
        ["AdvancedBanX 3.1.0","Warns, mutes, bans","Critique"],
        ["AntiXray 3.0","Masquage blocs côté client","Critique"],
        ["AxInventoryRestore 3.13.0","Restauration inventaire staff (urgences uniquement)","Moyenne"],
        ["Axiom 5.4.2","Éditeur monde avancé Architectes","Haute"],
        ["AxMines 1.7.0","Zones farm régénérables monde minier","Haute"],
        ["BetonQuest","Scripts événements, dialogues PNJ","Haute"],
        ["Citizens 2.0.42","PNJ interactifs","Haute"],
        ["CoreProtect-CE 23.2","Anti-grief, logs, rollback","Critique"],
        ["EssentialsX 2.22.1","Commandes staff/GM de base","Critique"],
        ["EssentialsXChat/Discord/Link 2.22.1","Chat + liaison Discord","Haute"],
        ["FastAsyncWorldEdit 2.15.3","Terraforming admin","Haute"],
        ["fast-leaf-decay 2.1.0","Chute rapide des feuilles (QoL)","Faible"],
        ["Grimac 2.3.74","AntiCheat principal","Critique"],
        ["ItemsAdder 4.0.17","Items custom","Haute"],
        ["LuckPerms 5.5.55","Rangs et permissions. Central à tous les modules.","Critique"],
        ["MapArt 1.0.0","Art sur cartes Capitale","Faible"],
        ["Multiverse-Core 5.7.0","Gestion mondes + portails Nether","Critique"],
        ["PlaceholderAPI 2.12.2","Variables dynamiques inter-plugins","Critique"],
        ["PlasmoVoice","Proximity voice","Critique"],
        ["ProtocolLib","Packets réseau / GUI custom","Critique"],
        ["SkinsRestorer","Skins custom","Haute"],
        ["TAB 6.0.3","Nametags, tablist, prénoms RP","Haute"],
        ["Tebex 2.4.2","Boutique en ligne","Haute"],
        ["Vault","API économique","Critique"],
        ["WorldGuard 7.0.17","Zones protégées, flags custom","Critique"],
      ],{colorFn:(cell,ci)=>ci===2?cell==="Critique"?C.red:cell==="Haute"?C.orange:cell==="Moyenne"?C.amber:C.teal:"333333",bold:[0]}
    ),sp(60),
    h2("Plugins à valider pour V1"),
    tbl(["Plugin","Besoin","Statut"],
      [2200,5200,1960],
      [
        ["ReviveMe","Down state, revive collègue, hôpital, effet visuel < 3 coeurs","À confirmer"],
        ["SaberFactions ou ImprovedFactions","Base groupes/factions, hiérarchie, diplomatie, claims","À confirmer"],
        ["ReputationPlugin","Réputation 0-100, seuils, PlaceholderAPI","À confirmer"],
        ["AuctionHouse","HDV avec liste blanche items","À confirmer"],
        ["ChestProtect","Protection coffres individuelle (max 2/joueur)","À confirmer"],
      ],{colorFn:(cell,ci)=>ci===2?C.orange:"333333",bold:[0]}
    ),sp(60),
    h2("Plugins en suspend (versions futures)"),
    tbl(["Plugin","Besoin couvert","Version cible"],
      [2400,4400,2560],
      [
        ["EcoCrates","Boutique cosmétique / lootbox","V2"],
        ["AdvancedJobs","Arbre de métiers : 20 jobs, créer les siens","V2"],
        ["AdvancedSkills","14 skills, 30 talents, branches de métier","V2"],
        ["CustomFishing","Pêche custom — métier Pêcheur potentiel","V3"],
        ["DungeonMMO","Générateur de donjons — portails temporaires","V5"],
        ["Quarry plugin","Machines quarry (ItemsAdder compatible)","V6"],
        ["Talismans","Items passifs avec effets — métiers avancés","V6"],
        ["EcoItems","Items custom avec niveaux et raretés","V3-V4"],
        ["MC Pets","Pets 3D avec montures","V3"],
        ["DeluxeMenus","GUI custom avancé","V1 potentiel"],
      ],{bold:[0]}
    ),
    sp(180),

    // ═══ 15 LAISSÉ DE CÔTÉ ═══
    banner("15","Ce qui a été laissé de côté",C.gray),sp(60),
    p("Ces mécaniques ont été discutées puis simplifiées ou reportées. Les détails complets sont dans le document Archives_Techniques.",{italic:true}),sp(40),
    tbl(["Mécanique","Remplacée par","Raison"],
      [2800,3200,3360],
      [
        ["Agonie 3 minutes (Slowness, Blindness, timer, 1/3 survie)","Effet visuel < 3 coeurs + Down state ReviveMe","Complexe à dev, ReviveMe couvre le besoin"],
        ["Matrice droits 4 profils (Habitant/Ennemi/Visiteur/V-Ennemi)","2 états : membre / non-membre + guerre GM","Simplification OxyTowns natif"],
        ["KOTH avec accord des chefs et manches multi-semaines","GM lance chaque manche avec commande","Aucune automatisation nécessaire"],
        ["HDV Steam Market custom (graphique, paliers, prix médians)","AuctionHouse configuré avec liste blanche","Trop complexe pour V1, reporté en V2"],
        ["Pot de taxe physique","Commande /f pay simple","Reporté en V2 comme élément RP"],
        ["Coma spectateur ancré 9 chunks","Down state mobile ReviveMe","ReviveMe gère nativement"],
        ["Système politique (Monarchie, Empire, République...)","Les joueurs font comme ils veulent","Trop complexe, pas de valeur ajoutée concrète"],
        ["Tête de mort sur joueurs tueurs","Tête de mort sur joueurs Infâmes (réputation < 10)","Plus cohérent avec le système de réputation"],
        ["Quarries en V3","Quarries en V6","Priorité au reste — quarries nécessitent dev plugin dédié"],
      ],{bold:[0]}
    ),
    sp(180),

    // ═══ 16 POINTS OUVERTS ═══
    banner("16","Points Ouverts — À Traiter",C.red),sp(60),
    tbl(["#","Point","Priorité","Détail"],
      [600,2800,1400,4560],
      [
        ["1","Excel fonctionnement global / saisons / économie","Haute","Fichier Excel jamais intégré — données à importer"],
        ["2","Factions plugin — choix définitif","Haute","SaberFactions vs ImprovedFactions — tester Paper 1.21"],
        ["3","ReviveMe — test de compatibilité","Haute","Valider comportement Down sur Paper 1.21 + Vulcan"],
        ["4","Heure limite manches KOTH","Moyenne","Définir l'heure max de début d'une manche (XXh)"],
        ["5","Valeurs X réputation","Moyenne","Delta de réputation par action à calibrer"],
        ["6","Mondes instables V2 — contenu","Moyenne","Liste des contenus possibles et fréquence"],
        ["7","Bas-Fonds — fonctionnement complet","Moyenne","Zone alternative Infâme (reporté)"],
        ["8","Portails de poche — durée","Faible","Durée XX des portails temporaires craftables (V5)"],
        ["9","Instance vs monde temporaire","Faible","Décision technique portails instables (avec dev)"],
        ["10","V7 Génétique / Races","Faible","Mécaniques exactes à définir"],
        ["11","Document développeur (brief)","Haute","Document succinct pour briefer un dev externe"],
        ["12","Excel saisons / fêtes / événements","Haute","À intégrer quand disponible"],
      ],{colorFn:(cell,ci)=>ci===2?cell==="Haute"?C.red:cell==="Moyenne"?C.orange:C.teal:"333333",bold:[0,1]}
    ),
    sp(180),...makeEnd()
  ],"Synthèse Complète du Projet");
}

async function generate(){
  const doc = makeSynthese();
  const buf = await Packer.toBuffer(doc);
  const name = `WS_${VERSION}_${DATE_FILE}_Synthese_Complete.docx`;
  fs.writeFileSync(`/mnt/user-data/outputs/${name}`, buf);
  console.log(`OK ${name}`);
}
generate().catch(e=>{console.error(e.message);process.exit(1);});
