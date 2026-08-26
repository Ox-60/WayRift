const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, Header, Footer, VerticalAlign
} = require('docx');
const fs = require('fs');

const NOW = new Date();
const DS = `${NOW.getDate().toString().padStart(2,'0')}/${(NOW.getMonth()+1).toString().padStart(2,'0')}/${NOW.getFullYear()} ${NOW.getHours().toString().padStart(2,'0')}:${NOW.getMinutes().toString().padStart(2,'0')}`;
const V = "V3";

const C = {
  gold:"C9A84C",dg:"8B6508",dark:"1A1A2E",
  bg:"FDF6E3",bgm:"F0E4C2",wh:"FFFFFF",gr:"666666",
  red:"C0392B",or:"D35400",gn:"1E8449",bl:"1A5276",
  pu:"6C3483",te:"0E6655",am:"9A7D0A",co:"1E1E2E",
  v1:"1E8449",v2:"1A5276",v3:"6C3483",v4:"7D3C98"
};

const bds = {style:BorderStyle.SINGLE,size:1,color:C.gold};
const BORDERS = {top:bds,bottom:bds,left:bds,right:bds};
const NB = {style:BorderStyle.NONE,size:0,color:C.wh};

function sp(n){
  return new Paragraph({spacing:{before:n||100,after:0},children:[new TextRun("")]});
}

function h2(t,color){
  return new Paragraph({
    heading:HeadingLevel.HEADING_2,
    spacing:{before:300,after:100},
    children:[new TextRun({text:t,bold:true,size:28,color:color||C.dg,font:"Arial"})]
  });
}

function p(t,bold){
  return new Paragraph({
    spacing:{before:60,after:60},
    children:[new TextRun({text:t,size:22,font:"Arial",color:"333333",bold:bold||false})]
  });
}

function bl(t){
  return new Paragraph({
    numbering:{reference:"bullets",level:0},
    spacing:{before:50,after:50},
    children:[new TextRun({text:t,size:21,color:"333333",font:"Arial"})]
  });
}

function blb(label,text){
  return new Paragraph({
    numbering:{reference:"bullets",level:0},
    spacing:{before:50,after:50},
    children:[
      new TextRun({text:label+" ",bold:true,size:21,font:"Arial",color:C.dark}),
      new TextRun({text:text,size:21,font:"Arial",color:"444444"})
    ]
  });
}

function note(text,color,icon){
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:{top:NB,bottom:NB,right:NB,left:{style:BorderStyle.SINGLE,size:16,color:color}},
      shading:{fill:"FFFDF5",type:ShadingType.CLEAR},
      margins:{top:80,bottom:80,left:220,right:120},
      children:[new Paragraph({children:[
        new TextRun({text:icon+"  ",bold:true,size:20,color:color,font:"Arial"}),
        new TextRun({text:text,size:20,color:"444444",font:"Arial"})
      ]})]
    })]})
  ]});
}

function code(lines){
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:BORDERS,
      shading:{fill:C.co,type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:lines.map(function(l){
        return new Paragraph({
          spacing:{before:0,after:0},
          children:[new TextRun({text:l,size:18,font:"Courier New",color:"A8D8A8"})]
        });
      })
    })]})
  ]});
}

function tbl(headers,cw,rows,cfn,bold){
  var hcells = headers.map(function(h,i){
    return new TableCell({
      borders:BORDERS,
      width:{size:cw[i],type:WidthType.DXA},
      shading:{fill:C.dark,type:ShadingType.CLEAR},
      margins:{top:70,bottom:70,left:110,right:80},
      children:[new Paragraph({children:[new TextRun({text:h,bold:true,size:19,color:C.gold,font:"Arial"})]})]
    });
  });
  var hrow = new TableRow({tableHeader:true,children:hcells});

  var drows = rows.map(function(row,ri){
    var dcells = row.map(function(cell,ci){
      var color = cfn ? cfn(cell,ci,ri) : "333333";
      var isbold = bold && bold.indexOf(ci) !== -1;
      return new TableCell({
        borders:BORDERS,
        width:{size:cw[ci],type:WidthType.DXA},
        shading:{fill:ri%2===0?C.bg:C.bgm,type:ShadingType.CLEAR},
        margins:{top:55,bottom:55,left:110,right:80},
        children:[new Paragraph({children:[new TextRun({text:cell,size:19,font:"Arial",color:color,bold:isbold})]})]
      });
    });
    return new TableRow({children:dcells});
  });

  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:cw,rows:[hrow].concat(drows)});
}

function cfg(rows){
  var cfn = function(cell,ci){
    if(ci===0) return "FFD700";
    if(ci===1) return "A8D8A8";
    if(ci===2) return "A8D8E8";
    return "BBBBBB";
  };
  return tbl(["Variable YAML","Défaut","Type","Description"],[2800,1400,1000,4160],rows,cfn);
}

function cmd(rows){
  var cfn = function(cell,ci){
    if(ci===0) return C.bl;
    if(ci===2) return C.or;
    return "333333";
  };
  return tbl(["Commande","Description","Permission"],[2400,5200,1760],rows,cfn,[0]);
}

function banner(num,title,color){
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[1400,7960],
    rows:[new TableRow({children:[
      new TableCell({
        borders:BORDERS,
        width:{size:1400,type:WidthType.DXA},
        shading:{fill:color,type:ShadingType.CLEAR},
        margins:{top:100,bottom:100,left:0,right:0},
        verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:num,bold:true,size:44,color:C.wh,font:"Arial"})]})]
      }),
      new TableCell({
        borders:BORDERS,
        width:{size:7960,type:WidthType.DXA},
        shading:{fill:C.dark,type:ShadingType.CLEAR},
        margins:{top:100,bottom:100,left:240,right:160},
        verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({children:[new TextRun({text:title,bold:true,size:34,color:color,font:"Arial"})]})]
      })
    ]})]
  });
}

var numbering = {config:[{reference:"bullets",levels:[
  {level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}},
  {level:1,format:LevelFormat.BULLET,text:"◦",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:1080,hanging:360}}}}
]}]};

var styles = {
  default:{document:{run:{font:"Arial",size:22}}},
  paragraphStyles:[
    {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:40,bold:true,font:"Arial",color:C.dark},paragraph:{spacing:{before:480,after:160},outlineLevel:0}},
    {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:28,bold:true,font:"Arial",color:C.dg},paragraph:{spacing:{before:300,after:100},outlineLevel:1}},
    {id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:24,bold:true,font:"Arial",color:C.dark},paragraph:{spacing:{before:200,after:80},outlineLevel:2}}
  ]
};

function mkhdr(n){
  return new Header({children:[new Paragraph({
    border:{bottom:{style:BorderStyle.SINGLE,size:2,color:C.gold}},
    children:[
      new TextRun({text:"WAYSTONE — "+n+" — "+V,bold:true,size:18,color:C.gold,font:"Arial"}),
      new TextRun({text:"   |   "+DS,size:18,color:C.gr,font:"Arial"})
    ]
  })]});
}

function mkftr(){
  return new Footer({children:[new Paragraph({
    border:{top:{style:BorderStyle.SINGLE,size:2,color:C.gold}},
    alignment:AlignmentType.RIGHT,
    children:[
      new TextRun({text:"Page ",size:18,color:C.gr,font:"Arial"}),
      new TextRun({children:[PageNumber.CURRENT],size:18,color:C.gr,font:"Arial"})
    ]
  })]});
}

function cover(title,sub,color){
  return [
    sp(100),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:"⚑",bold:true,size:100,color:C.gold,font:"Arial"})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:"WAYSTONE",bold:true,size:86,color:C.dark,font:"Arial"})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:title,bold:true,size:40,color:color,font:"Arial"})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:20},children:[new TextRun({text:sub,size:22,color:C.gr,font:"Arial",italics:true})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:80},children:[new TextRun({text:V+"  •  "+DS,size:20,color:C.gr,font:"Arial"})]}),
    new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:8,color:C.gold}},spacing:{before:40,after:200},children:[new TextRun("")]})
  ];
}

function ending(){
  return [
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:300,after:60},border:{top:{style:BorderStyle.SINGLE,size:6,color:C.gold}},children:[new TextRun({text:"⚑  WAYSTONE  ⚑",bold:true,size:48,color:C.gold,font:"Arial"})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:0},children:[new TextRun({text:V+" — "+DS+" — Confidentiel",size:19,color:C.gr,font:"Arial"})]})
  ];
}

function mkdoc(children,docName){
  return new Document({
    numbering:numbering,
    styles:styles,
    sections:[{
      properties:{page:{size:{width:11906,height:16838},margin:{top:1100,right:1100,bottom:1100,left:1100}}},
      headers:{default:mkhdr(docName)},
      footers:{default:mkftr()},
      children:children
    }]
  });
}

// ═══ CDC WORLDMODULE ═══
function makeWorld(){
  var ch = cover("CDC — WorldModule","Gestion des mondes, import, horaires, régénération",C.v1);
  ch = ch.concat([
    banner("01","Responsabilités",C.v1),sp(60),
    bl("Import mondes via formulaire staff (TaxCapital, type, propriétaire, avantages, inconvénients, commentaire GM)"),
    bl("Régénération automatique terrain hors claim — chaque mardi à 10h"),
    bl("Gestion horaires monde minier (20h-23h, Jour 0 : 24h/24 pendant 48h)"),
    bl("Intégration AxMines pour zones de farm régénérables"),
    bl("Archivage des mondes inactifs"),
    bl("API interne : getTaxRate, isWorldOpen, getType, getOwner, getSpawn"),sp(80),
    banner("02","Commandes",C.bl),sp(60),
    cmd([
      ["/wm import <dossier>","Formulaire : TaxCapital, type, propriétaire, avantage, inconvénient, commentaireGM","staff"],
      ["/wm regenerate <monde>","Force la régénération du terrain hors claim","staff"],
      ["/wm archive <monde>","Archive un monde (double confirmation)","staff"],
      ["/wm info <monde>","Paramètres + commentaire GM","GM"],
      ["/wm list","Liste tous les mondes avec statut","staff"],
      ["/wm setmining <preset>","Configure les minerais du monde minier pour la session","GM"],
      ["/wm day0 activate","Mode Jour 0 (48h ouverture complète)","GM"],
    ]),sp(80),
    banner("03","Configuration",C.dark),sp(60),
    cfg([
      ["worlds.regen-day","TUESDAY","String","Jour de régénération terrain hors claim"],
      ["worlds.regen-time","10:00","String","Heure de régénération"],
      ["worlds.mining-open-start","20:00","String","Heure ouverture monde minier"],
      ["worlds.mining-open-end","23:00","String","Heure fermeture monde minier"],
      ["worlds.mining-day0-hours","48","Int","Durée Jour 0 (heures)"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"WorldModule");
}

// ═══ CDC PORTALMODULE ═══
function makePortal(){
  var ch = cover("CDC — PortalModule","Portails interconnectés, états joueur, exil",C.te);
  ch = ch.concat([
    banner("01","Responsabilités",C.te),sp(60),
    bl("Portails physiques via Multiverse-Core Nether Portals — zéro dev custom pour les portails stables"),
    bl("4 états joueur par monde : Habitant, Visiteur, Exilé, Banni"),
    bl("Vérifications avant TP : banni, fermé, archivé"),
    bl("Arrivée à 3 blocs aléatoires si joueur en Down/Coma"),
    bl("Délai d'exil : 1 mois avant re-habitation"),sp(60),
    code([
      "PORTAILS V1 SUR LA MAP :",
      "  [ACTIF]    Portail minier     -> Passé du monde joueur",
      "  [INSTABLE] Portail lore x1-2  -> Map secrète, retour auto 5s",
      "  [INACTIF]  Monolithe          -> Actif fin V1 par event GM -> Capitale",
      "",
      "VÉRIFICATIONS :",
      "  Monde banni      -> REFUSÉ",
      "  Monde fermé      -> REFUSÉ",
      "  Monde archivé    -> REFUSÉ",
      "  Joueur Down/Coma -> AUTORISÉ, arrivée 3 blocs aléatoires",
    ]),sp(80),
    banner("02","Commandes",C.bl),sp(60),
    cmd([
      ["/wtp <monde>","TP direct vers le spawn d'un monde","GM/staff"],
      ["/capital","TP direct vers la Capitale","GM/staff"],
      ["/habite <monde>","Définit le monde attitré d'un joueur","joueur"],
      ["/portal link <a> <b>","Crée le lien entre deux portails","admin"],
      ["/portal ban <uuid> <monde>","Bannit un joueur d'un monde","admin"],
    ]),sp(80),
    banner("03","Configuration",C.dark),sp(60),
    cfg([
      ["portal.exile-rehab-days","30","Int","Jours avant re-habitation après exil"],
      ["portal.coma-arrival-radius","3","Int","Rayon blocs arrivée si Down/Coma"],
      ["portal.adventure-mode-visitors","true","Boolean","Mode Aventure pour les non-habitants"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"PortalModule");
}

// ═══ CDC PLAYERMODULE ═══
function makePlayer(){
  var ch = cover("CDC — PlayerModule","Identité RP, mort, coma, wipe, profil, réputation",C.gn);
  ch = ch.concat([
    banner("01","Responsabilités",C.gn),sp(60),
    bl("Identité RP : nom unique, algorithme Levenshtein (distance <= 2 bloquée), serment obligatoire"),
    bl("Cycle de vie : Down -> Hôpital / Wipe / Revive GM via ReviveMe"),
    bl("Profil visible selon droits (public, inspection, soi-même, staff)"),
    bl("Inspection : SPYGLASS, dos, 2 blocs max, 90% inventaire aléatoire"),
    bl("Wipe : suppression sélective connexions plugins sauf XP compte et achats"),
    bl("Réputation 0-100 via ReputationPlugin + LuckPerms"),sp(80),
    banner("02","Mort & Coma — ReviveMe",C.red),sp(60),
    tbl(
      ["Phase","Déclencheur","Comportement","Plugin"],
      [1600,2200,3800,1760],
      [
        ["Avertissement","Vie < 3 coeurs","Effet visuel troublé (Blindness partiel)","ReviveMe config"],
        ["Down/Coma","Vie = 0 (PvP uniquement)","Peut bouger. Inventaire fouillable.","ReviveMe"],
        ["Revive collègue","Accroupi sur le joueur Down","V1 : tous. V2+ : Médecin uniquement (LuckPerms).","ReviveMe"],
        ["Revive GM","/revive @joueur here","Revive + TP sur place","ReviveMe"],
        ["Hôpital","Countdown écoulé","Respawn coordonnées hôpital Capitale","ReviveMe + Multiverse"],
        ["Wipe","/wipe me (double confirmation)","Supprime connexions sauf XP et achats","Custom léger"],
      ],
      null,[0]
    ),sp(80),
    banner("03","Réputation",C.am),sp(60),
    tbl(
      ["Score","Label","Nameplate","Accès","Restriction"],
      [1400,1800,1800,2000,2360],
      [
        ["80-100","Légendaire","Or","Zones VIP Capitale","—"],
        ["60-79","Honorable","Vert clair","—","—"],
        ["40-59","Neutre","Gris","—","—"],
        ["20-39","Neutre bas","Gris foncé","—","—"],
        ["10-19","Suspect","Orange","—","Interdit HDV officiel"],
        ["0-9","Infâme","Rouge + tête de mort","Bas-Fonds","Interdit HDV officiel"],
      ],
      null,null
    ),sp(40),
    blb("Tête de mort :","Sur joueurs Infâmes (réputation < 10) via CustomNameplates + LuckPerms rank infame."),
    blb("Limite montée :","Maximum +10 points/semaine. Excédent reporté à la semaine suivante."),sp(80),
    banner("04","Commandes",C.bl),sp(60),
    cmd([
      ["/profil [joueur]","Affiche le profil selon les droits","joueur"],
      ["/wipe me","Déclenche le wipe (double confirmation)","joueur"],
      ["/player revive <uuid>","Revive un joueur","GM"],
      ["/player gm-block <uuid>","Bloque le choix hôpital/wipe","GM"],
      ["/player wipe <uuid> <raison>","Force un wipe","admin"],
      ["/player setreputation <uuid> <val>","Définit la réputation directement","admin"],
    ]),sp(80),
    banner("05","Configuration",C.dark),sp(60),
    cfg([
      ["player.rp-name-levenshtein-threshold","2","Int","Distance similarité nom RP max"],
      ["player.wipe-block-days-min","3","Int","Jours blocage min après wipe"],
      ["player.wipe-block-days-max","5","Int","Jours blocage max après wipe"],
      ["player.inspect-range-blocks","2","Int","Distance max inspection (blocs)"],
      ["player.reputation-weekly-gain-limit","10","Int","Gain réputation max par semaine"],
      ["player.reputation-infame-threshold","10","Int","Seuil Infâme (< 10)"],
      ["player.reputation-hdv-threshold","20","Int","Seuil interdiction HDV (< 20)"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"PlayerModule");
}

// ═══ CDC FACTIONMODULE ═══
function makeFaction(){
  var ch = cover("CDC — FactionModule","Groupes, organisations, nations, claims, diplomatie, guerres",C.pu);
  ch = ch.concat([
    banner("01","Architecture — 3 niveaux",C.dark),sp(60),
    tbl(
      ["Niveau","Membres max","Déblocage","Droits spéciaux"],
      [1800,1600,3200,2760],
      [
        ["Groupe","XX","Création en jeu (100 000¢)","Claims, guerres GM"],
        ["Organisation simple","25","Ticket staff + 10 membres actifs + 7j activité","Item unique B2B, contenu GM"],
        ["Organisation avancée","50","Ticket staff + 15 membres actifs + hiérarchie complète","Caisses organisation"],
        ["Nation","100","Ressources + argent + ticket staff","Monde dédié, guerres inter-nations"],
      ],
      null,[0]
    ),sp(80),
    banner("02","Claims — OxyTowns",C.te),sp(60),
    tbl(
      ["Type","Profondeur max","Limite","Reset"],
      [1600,1800,2800,1400],
      [
        ["Territoire","Y=40","Selon puissance faction","Non"],
        ["Farm","Bedrock","Faction:16 / Groupe:8 / Solo:4","1x/semaine"],
      ],
      null,[0]
    ),sp(40),
    tbl(
      ["Profil","Claim protégé","Claim ineffectif"],
      [2400,3480,3480],
      [
        ["Membre de la faction","Survie complète","Survie complète"],
        ["Non-membre (neutre)","Mode Aventure","Mode Aventure"],
        ["Ennemi (guerre GM)","Mode Aventure","Survie complète — casse et pose libre"],
      ],
      null,null
    ),sp(80),
    banner("03","Guerres KOTH",C.red),sp(60),
    bl("Guerres possibles à tous les niveaux — validées et suivies par un GM"),
    bl("GM lance chaque manche avec une commande"),
    bl("1 manche gagnée = 1 point. Premier à 3 points gagne"),
    bl("Si défaite écrasante : GM peut déclencher attaque directe de la ville perdante"),
    bl("1 position par monde : attaquant, défenseur, neutre"),sp(80),
    banner("04","Dissolution",C.am),sp(60),
    code([
      "CONDITIONS :",
      "  Chef inactif +14j sans responsable actif",
      "  Inactivité générale -50% pendant 1 mois",
      "  Chef dissout volontairement (/f dissolve)",
      "",
      "CALENDRIER :",
      "  Jeudi 20h  -> MODE PILLAGE (4h) — claims accessibles à tous",
      "  Samedi 18h -> suppression définitive + régénération zone",
    ]),sp(80),
    banner("05","Commandes",C.bl),sp(60),
    cmd([
      ["/f invite <joueur>","Invite un joueur dans la faction","chef/responsable"],
      ["/f kick <joueur>","Expulse un membre","chef/responsable"],
      ["/f settax <montant> <jours>","Définit les impôts","chef/responsable"],
      ["/f pay <montant>","Paie ses impôts (génère votes réputation)","membre"],
      ["/f dissolve","Dissout la faction (double confirmation)","chef"],
      ["/f claim","Claime le chunk actuel","chef/responsable"],
      ["/f unclaim","Retire la protection du chunk","chef"],
      ["/f resetclaim","Reset le chunk farm (1x/semaine)","chef"],
      ["/f top","Classement factions par puissance","joueur"],
      ["/faction admin validate <nom>","Valide une faction/organisation","admin"],
      ["/gm war activate <f1> <f2>","Active physiquement la guerre","GM"],
    ]),sp(80),
    banner("06","Configuration",C.dark),sp(60),
    cfg([
      ["faction.creation-cost-group","100000","Int","Coût création groupe (¢)"],
      ["faction.lead-transfer-inactivity-days","14","Int","Jours inactivité chef avant transfert"],
      ["faction.pillage-day","THURSDAY","String","Jour mode pillage"],
      ["faction.delete-day","SATURDAY","String","Jour suppression"],
      ["claims.territory-min-depth","40","Int","Profondeur min territoire (Y=40)"],
      ["claims.no-claim-max-depth","50","Int","Profondeur max hors claim (Y=50)"],
      ["claims.solo-free","4","Int","Claims gratuits solo"],
      ["claims.solo-max","12","Int","Claims max solo"],
      ["claims.group-farm-max","8","Int","Claims farm max groupe"],
      ["claims.faction-farm-max","16","Int","Claims farm max faction/nation"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"FactionModule");
}

// ═══ CDC ECOMODULE ═══
function makeEco(){
  var ch = cover("CDC — EcoModule","Monnaie, HDV, taxes, trésorerie, Rubies, commerce inter-entités",C.am);
  ch = ch.concat([
    banner("01","Monnaies",C.dark),sp(60),
    blb("Oboles (¢) :","Monnaie unique globale. Gérée via Vault."),
    blb("Rubies :","Monnaie VIP/prestige. Item physique à déposer dans un réceptacle. Utilisé au casino. Achetable en euros OU en beaucoup d'Oboles. Échange dans un sens uniquement."),sp(80),
    banner("02","HDV — AuctionHouse",C.v1),sp(60),
    bl("Plugin : AuctionHouse avec liste blanche des items autorisés"),
    bl("Offres de vente uniquement (pas d'ordres d'achat)"),
    bl("Taxes : 15% Capitale + 10% faction = 25%. Étalages : 15% uniquement"),
    bl("Durée listing : 7 jours + 7 jours récupération Ender Chest"),
    bl("Accès interdit aux joueurs réputation < 20"),sp(80),
    banner("03","Commerce inter-entités",C.pu),sp(60),
    code([
      "VENTE B2B (Entreprise de production) :",
      "  -> Vend UNIQUEMENT à groupes, organisations, nations",
      "  -> Prix : 75% à 125% du prix constructeur",
      "  -> INTERDIT de vendre directement aux joueurs individuels",
      "",
      "REVENTE B2C (tout groupe/orga/nation acheteur) :",
      "  -> Peut revendre à joueurs individuels",
      "  -> Prix minimum : 125% du prix constructeur",
    ]),sp(80),
    banner("04","Caisses & Skins",C.pu),sp(60),
    tbl(
      ["Type","Accessible par","Achat via"],
      [2000,4200,3160],
      [
        ["Caisse solo","Tous les joueurs","Argent réel ou en jeu"],
        ["Caisse groupe","Membres d'un groupe","Argent réel ou en jeu"],
        ["Caisse organisation","Membres d'une organisation","Argent réel ou en jeu"],
        ["Caisse nation","Membres d'une nation","Argent réel ou en jeu"],
      ],
      null,null
    ),sp(40),
    blb("Skins exclusifs :","Certains skins utilisables uniquement si le joueur appartient à l'entité correspondante."),
    blb("Échange argent/skins :","Argent en jeu -> skins. Pas l'inverse."),sp(80),
    banner("05","Configuration",C.dark),sp(60),
    cfg([
      ["market.listing-duration-days","7","Int","Durée listing avant expiration"],
      ["market.tax-capitale","0.15","Float","Taxe Capitale (15%)"],
      ["market.tax-faction","0.10","Float","Taxe faction (10%)"],
      ["market.price-avg-days","30","Int","Jours référence prix moyen"],
      ["market.hdv-min-reputation","20","Int","Réputation minimale pour accéder à l'HDV"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"EcoModule");
}

// ═══ CDC DISPLAYMODULE ═══
function makeDisplay(){
  var ch = cover("CDC — DisplayModule","Nametags, affichages RP, tête de mort",C.te);
  ch = ch.concat([
    banner("01","Responsabilités",C.te),sp(60),
    bl("Nametags invisibles par défaut (ProAntiTab)"),
    bl("Nametags visibles si présentation mutuelle (CustomNameplates + LuckPerms)"),
    bl("Tête de mort sur joueurs Infâmes via LuckPerms rank infame -> CustomNameplates"),
    bl("Prénoms RP accessibles dans le Tab (complétion automatique)"),
    bl("Affichages RP automatiques avec portée configurable"),sp(80),
    banner("02","Affichages RP automatiques",C.pu),sp(60),
    tbl(
      ["Événement","Message affiché","Portée"],
      [2800,3800,2760],
      [
        ["Joueur tombe en Down","[Nom] est tombé(e)...","30 blocs"],
        ["Joueur fouillé","[A] fouille [B]","20 blocs"],
        ["Joueur revivé","[Nom] a été relevé(e) par [Joueur]","30 blocs"],
        ["Joueur inspecté","[A] observe attentivement [B]","10 blocs"],
        ["Guerre déclarée","La guerre entre [A] et [B] est déclarée","Serveur entier"],
        ["Nation fondée","La nation [X] a été fondée","Serveur entier"],
        ["Nouveau personnage","Un voyageur sans passé arrive...","Serveur entier"],
      ],
      null,null
    ),sp(80),
    banner("03","Configuration",C.dark),sp(60),
    cfg([
      ["display.down-range","30","Int","Portée affichage Down (blocs)"],
      ["display.fouille-range","20","Int","Portée affichage fouille (blocs)"],
      ["display.revive-range","30","Int","Portée affichage revive (blocs)"],
      ["display.inspect-range","10","Int","Portée affichage inspection (blocs)"],
      ["display.war-range","-1","Int","Portée guerre (-1 = serveur entier)"],
      ["display.infame-rank-name","infame","String","Nom du rank LuckPerms pour les Infâmes"],
    ])
  ]);
  return mkdoc(ch.concat(ending()),"DisplayModule");
}

// ═══ ROADMAP COMPLÈTE ═══
function makeRoadmap(){
  var ch = cover("Roadmap Complète","V1 à V7 + Vision Long Terme",C.gold);
  ch = ch.concat([
    banner("PLAN","Vue d'ensemble",C.dark),sp(60),
    tbl(
      ["Phase","Mot-clé","Contenu principal"],
      [1000,1800,6560],
      [
        ["V1","Construction","Portails Multiverse-Core, Factions+OxyTowns, ReviveMe, AuctionHouse HDV, ReputationPlugin"],
        ["V2","Rébellion","Métiers AdvancedJobs+Skills, KOTH GM, boutique EcoCrates, mondes instables, destruction Capitale"],
        ["V3","Suprématie","Nouvelle Capitale, réputation faction, métiers incomplets, EcoItems, CustomFishing"],
        ["V4","Conquête","Zones d'affluence corrompues, portails miniers surchargés, commerce B2B actif"],
        ["V5","Corruption & Faille","Monde minier stable, portails temporaires craftables, DungeonMMO donjons"],
        ["V6","Spécialité & Exploitation","Quarries, plantations, branches métier complètes, parcelles immobilières"],
        ["V7","Génération & Génétique","Races possibles, génétique machines/plantations, finalisation métiers"],
        ["VLT","Vision","Catastrophes GM, tribunal RP, héritage, saisons politiques"],
      ],
      null,[0,1]
    ),sp(80),
    banner("V1","Construction",C.v1),sp(60),
    blb("Mondes :","Capitale (24h/24), Nations (pas de minerai), Monde Minier (20h-23h), Mondes Factions."),
    blb("Portails :","Multiverse-Core Nether Portals. 1 minier actif + 1-2 instables lore + 1 monolithe inactif."),
    blb("Groupes :","Créés en jeu. Organisations via ticket staff. Nations via ressources + ticket."),
    blb("Claims :","OxyTowns. Territoire (Y=40) et Farm (bedrock, resetable 1x/semaine)."),
    blb("Mort :","ReviveMe — effet visuel < 3 coeurs, Down, revive collègue, hôpital, wipe."),
    blb("HDV :","AuctionHouse liste blanche. Taxes 15%+10%."),
    blb("Réputation :","ReputationPlugin + LuckPerms. 0-100. Infâme <10, Suspect 10-19."),sp(80),
    banner("V2+","Phases suivantes",C.v2),sp(60),
    blb("V2 :","Métiers basiques. KOTH GM. Boutique. Mondes instables. Destruction Capitale."),
    blb("V3 :","Nouvelle Capitale. Réputation faction. Métiers incomplets."),
    blb("V4 :","Zones d'affluence corrompues. Commerce B2B actif."),
    blb("V5 :","Monde minier stable. Portails temporaires -> donjons DungeonMMO."),
    blb("V6 :","Quarries. Plantations. Branches métier complètes."),
    blb("V7 :","Races (peut-être). Génétique. Finalisation métiers.")
  ]);
  return mkdoc(ch.concat(ending()),"Roadmap Complète");
}

// ═══ ROADMAP V1 ═══
function makeRoadmapV1(){
  var priCfn = function(cell,ci){
    if(ci===2){
      if(cell==="Critique") return C.red;
      if(cell==="Haute") return C.or;
      if(cell==="Moyenne") return C.am;
      return C.te;
    }
    return ci===0?C.dark:"333333";
  };
  var ch = cover("Roadmap V1","Détail complet des fonctionnalités à livrer pour l'ouverture",C.v1);
  ch = ch.concat([
    banner("V1","Plugins confirmés",C.dark),sp(60),
    tbl(
      ["Plugin","Rôle","Priorité"],
      [3000,4800,1560],
      [
        ["Vulcan 2.9.7.23","AntiCheat secondaire","Critique"],
        ["CustomNameplates 3.0.39","Nameplates RP. Tête de mort Infâme.","Critique"],
        ["OxyTowns 1.1.0","Claims 2 types (Territoire/Farm)","Critique"],
        ["ProAntiTab 2.3.4","Masque joueurs dans le Tab","Haute"],
        ["LibsDisguises 11.0.18","Déguisements GM","Haute"],
        ["AdvancedBanX 3.1.0","Warns, mutes, bans","Critique"],
        ["AntiXray 3.0","Masquage blocs côté client","Critique"],
        ["AxInventoryRestore 3.13.0","Restauration inventaire staff (urgences)","Moyenne"],
        ["Axiom 5.4.2","Éditeur monde Architectes","Haute"],
        ["AxMines 1.7.0","Zones farm régénérables monde minier","Haute"],
        ["BetonQuest","Scripts événements, dialogues PNJ","Haute"],
        ["Citizens 2.0.42","PNJ interactifs","Haute"],
        ["CoreProtect-CE 23.2","Anti-grief, logs, rollback","Critique"],
        ["EssentialsX 2.22.1 + Chat/Discord/Link","Commandes staff + chat + Discord","Critique"],
        ["FastAsyncWorldEdit 2.15.3","Terraforming admin","Haute"],
        ["Grimac 2.3.74","AntiCheat principal","Critique"],
        ["ItemsAdder 4.0.17","Items custom","Haute"],
        ["LuckPerms 5.5.55","Rangs et permissions — central à tout","Critique"],
        ["Multiverse-Core 5.7.0","Mondes + portails Nether","Critique"],
        ["PlaceholderAPI 2.12.2","Variables dynamiques","Critique"],
        ["PlasmoVoice","Proximity voice","Critique"],
        ["ProtocolLib","Packets réseau / GUI","Critique"],
        ["SkinsRestorer","Skins custom","Haute"],
        ["TAB 6.0.3","Nametags, tablist, prénoms RP","Haute"],
        ["Tebex 2.4.2","Boutique en ligne","Haute"],
        ["Vault","API économique","Critique"],
        ["WorldGuard 7.0.17","Zones protégées","Critique"],
      ],
      priCfn,[0]
    ),sp(80),
    banner("V1","Plugins à valider",C.am),sp(60),
    tbl(
      ["Plugin","Besoin","Statut"],
      [2200,5200,1960],
      [
        ["ReviveMe","Down state, revive collègue, hôpital, effet visuel","À confirmer"],
        ["SaberFactions ou ImprovedFactions","Base groupes/factions, hiérarchie, diplomatie","À confirmer"],
        ["ReputationPlugin","Réputation 0-100, seuils, PlaceholderAPI","À confirmer"],
        ["AuctionHouse","HDV avec liste blanche items","À confirmer"],
        ["ChestProtect","Protection coffres individuelle (max 2/joueur)","À confirmer"],
      ],
      function(cell,ci){ return ci===2?C.or:"333333"; },[0]
    ),sp(80),
    banner("V1","Ce qui est custom obligatoire",C.red),sp(60),
    tbl(
      ["Élément","Pourquoi","Complexité"],
      [3200,4400,1760],
      [
        ["Identité RP (nom unique)","Levenshtein, serment, combinaison prénom+nom unique","Moyenne"],
        ["Wipe joueur","Suppression sélective connexions plugins sauf compte et achats","Légère"],
        ["Regen monde joueur hors claim","FAWE + API OxyTowns pour chunks libres vs claimés","Légère"],
        ["Hooks FactionModule","Validation GM, dissolution calendrier, KOTH score","Légère"],
        ["Vote réputation via impôts","Hook FactionModule -> ReputationPlugin","Légère"],
      ],
      function(cell,ci){ return ci===2?(cell==="Moyenne"?C.or:C.te):"333333"; },null
    )
  ]);
  return mkdoc(ch.concat(ending()),"Roadmap V1");
}

// ═══ EQUIPE ═══
function makeEquipe(){
  var ch = cover("Structure de l'Équipe","Rôles, responsabilités et organisation du projet Waystone",C.dark);
  ch = ch.concat([
    banner("01","Direction & Coordination",C.dark),sp(60),
    tbl(
      ["Pseudo","Rôle","Responsabilités"],
      [2400,2800,4160],
      [
        ["Ox (Ox60)","Chef de projet","Gestion des demandes des équipes, structuration, décisions stratégiques"],
        ["Hikari","Lore & Cohérence","Supervision lore, cohérence narrative, contact équipes"],
        ["FrozenSquid","Responsable IT + Dev","Site Waystone, IT projet Event, aide dev WayRift"],
      ],
      null,[0]
    ),sp(80),
    banner("02","Développement — 7 devs",C.v1),sp(60),
    tbl(
      ["Pseudo","Statut","Notes"],
      [2400,2000,4960],
      [
        ["ExiLie","Référent dev principal","Vision large du projet. Accompagné de Tom_ptrs."],
        ["Ostore","Développeur","—"],
        ["FrozenSquid","Développeur (aussi IT)","Également responsable IT et site"],
        ["Flobanai","Développeur","—"],
        ["Lethariar","Développeur","—"],
        ["DayStay","Développeur","—"],
        ["MiroTenshi","Développeur","—"],
      ],
      null,[0]
    ),sp(40),
    note("En négociation avec un fournisseur/développeur souhaitant investir : 4 VPS + aide au développement.",C.bl,"ℹ"),sp(80),
    banner("03","Build — 5 builders",C.v2),sp(60),
    tbl(
      ["Pseudo","Statut","Notes"],
      [2400,2000,4960],
      [
        ["Adarish","Référent build","Responsable build. Schémas, thèmes et jalons déjà avancés."],
        ["MoonGlacemm","Builder","—"],
        ["MisterML","Builder + Référent Trame RP","Trames RP après ouverture (projet personnel)"],
        ["Kylow","Builder","—"],
        ["Wapanda","Builder + Trame RP","Trames RP après ouverture"],
      ],
      null,[0]
    ),sp(80),
    banner("04","Staff & Externes",C.v3),sp(60),
    tbl(
      ["Pseudo","Rôle","Notes"],
      [2400,2800,4160],
      [
        ["LoupGris","Responsable staff","Recrutement et bonne entente de l'équipe"],
        ["BouhBouw","Site web (externe)","Réalisation du site web Waystone"],
      ],
      null,[0]
    ),sp(80),
    banner("05","Staffs potentiels à intégrer",C.am),sp(60),
    tbl(
      ["Pseudo","Statut"],
      [3000,6360],
      [
        ["Racine","En contact"],
        ["Furial Primus","En contact"],
        ["Wagz","En contact"],
        ["Anvil0","En contact"],
      ],
      null,[0]
    )
  ]);
  return mkdoc(ch.concat(ending()),"Equipe");
}

// ═══ PERSPECTIVES JOUEUR ═══
function makePerspectives(){
  var ch = cover("Perspectives du Joueur","Tout ce qu'un joueur peut faire et devenir sur Waystone",C.gold);
  ch = ch.concat([
    banner("01","Le joueur solo",C.v1),sp(60),
    bl("Miner dans le monde minier (20h-23h) sans claim requis"),
    bl("Construire dans sa nation (4 claims gratuits, max 12)"),
    bl("Vendre et acheter sur l'HDV (si réputation >= 20)"),
    bl("Construire sa réputation (0-100)"),
    bl("Acheter des skins et ouvrir des caisses solo"),
    bl("Casino — utiliser des Rubies"),sp(40),
    blb("Réputation :","De Neutre à Légendaire (zones VIP) ou Infâme (Bas-Fonds). Deux chemins, deux avantages."),
    blb("Skins :","Achetables en argent réel ou en jeu. Caisses solo accessibles à tous."),sp(80),
    banner("02","Le groupe — Premier palier collectif",C.v2),sp(60),
    bl("Claims partagés pour sécuriser un territoire"),
    bl("Accès aux zones d'affluence gardées par le groupe"),
    bl("Guerres KOTH possibles (validées GM)"),
    bl("Missions internes et caisses groupe"),sp(40),
    blb("Gang/Mafia :","Réputation Infâme, Bas-Fonds, marché noir. Puissance dans l'ombre."),
    blb("Religion :","Réputation positive, zones VIP, influence diplomatique."),
    blb("Entreprise :","Focus économique, production d'items, commerce B2B."),
    blb("Guilde :","Focus guerres KOTH, territoire, défense."),sp(80),
    banner("03","L'organisation",C.v3),sp(60),
    blb("Item unique exclusif :","Seule cette organisation peut le fabriquer. Vendu uniquement aux entités (B2B)."),
    blb("Commerce B2B :","Contrats avec d'autres groupes/orgas/nations. Prix : 75-125% du prix constructeur."),
    blb("Contenu GM exclusif :","Événements, scènes RP, missions organisées par les GM."),
    blb("Caisses organisation :","Skins exclusifs utilisables uniquement par les membres."),sp(80),
    banner("04","La nation",C.v4),sp(60),
    blb("Monde dédié :","Un monde Minecraft appartenant à la nation (4k×4k max)."),
    blb("100 membres max :","Double la capacité de l'organisation avancée."),
    blb("Guerres inter-nations :","Guerres KOTH à grande échelle orchestrées par les GM."),
    blb("Caisses nation :","Skins exclusifs nation."),
    blb("Revente B2C :","Items achetés revendus aux joueurs à 125-150% minimum."),sp(80),
    banner("05","Économie personnelle",C.am),sp(60),
    tbl(
      ["Source de revenus","Accessible dès","Détail"],
      [2800,2000,4560],
      [
        ["Vente sur l'HDV","Arrivée (réputation >= 20)","Items farmés ou craftés"],
        ["Commerce B2B","Organisation","Item unique vendu à 75-125% prix constructeur"],
        ["Revente B2C","Groupe/Orga/Nation","Items achetés revendus à 125-150% minimum"],
        ["Étalages loués","Arrivée","Stand Capitale, taxe réduite 15%"],
        ["Casino / Rubies","Arrivée","Jeux avec les Rubies (monnaie prestige)"],
      ],
      null,null
    )
  ]);
  return mkdoc(ch.concat(ending()),"Perspectives du Joueur");
}

async function main(){
  var docs = [
    {fn:makeWorld,   name:"V3.CDC_WorldModule.docx"},
    {fn:makePortal,  name:"V3.CDC_PortalModule.docx"},
    {fn:makePlayer,  name:"V3.CDC_PlayerModule.docx"},
    {fn:makeFaction, name:"V3.CDC_FactionModule.docx"},
    {fn:makeEco,     name:"V3.CDC_EcoModule.docx"},
    {fn:makeDisplay, name:"V3.CDC_DisplayModule.docx"},
    {fn:makeRoadmap, name:"V3.Roadmap_Complete.docx"},
    {fn:makeRoadmapV1, name:"V3.Roadmap_V1.docx"},
    {fn:makeEquipe,  name:"V3.Equipe.docx"},
    {fn:makePerspectives, name:"V3.Perspectives_Joueur.docx"},
  ];
  for(var i=0;i<docs.length;i++){
    var d = docs[i];
    var buf = await Packer.toBuffer(d.fn());
    fs.writeFileSync("/mnt/user-data/outputs/"+d.name, buf);
    console.log("OK "+d.name);
  }
  console.log("Terminé — "+docs.length+" documents.");
}
main().catch(function(e){console.error(e.message);process.exit(1);});
