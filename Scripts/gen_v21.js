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

// ═══════════════════════════════
// DOC 1 — GROUPES / ORGAS / NATIONS
// ═══════════════════════════════
function makeGroupes(){
  return makeDoc([
    ...makeCover("Groupes, Organisations & Nations","Hiérarchie des entités — progression et fonctionnement",C.gold),

    banner("01","Vue d'ensemble — 3 niveaux",C.dark),sp(60),
    tbl(["Niveau","Ancien nom","Membres max","Accès","Déblocage"],
      [1600,1800,1600,2600,1760],
      [
        ["Groupe","Groupe","XX (à définir)","Claims basiques, minage, salaires internes","Création en jeu"],
        ["Organisation","Faction","Simple: 25 / Avancée: 50","Item unique (ticket), contenu GM supplémentaire, guerres","Ticket staff + conditions"],
        ["Nation","Faction avec monde","100","Monde dédié, guerres inter-nations, caisses nation","Ressources + argent + ticket"],
      ],{bold:[0],colorFn:(cell,ci,ri)=>ci===0?[C.v1,C.v2,C.v3][ri]:"333333"}
    ),sp(60),
    info("Un joueur peut appartenir à plusieurs groupes/organisations simultanément, sous certaines conditions (max 2 groupes actifs par joueur à définir)."),sp(80),

    banner("02","Groupe — Niveau 1",C.v1),sp(60),
    p("Le groupe est la cellule de base. Il se crée directement en jeu sans validation préalable. C'est le point d'entrée de tout joueur qui veut s'organiser."),sp(40),
    h2("Conditions de création"),
    bl("Être un joueur actif (présent dans le monde joueur)"),
    bl("Avoir moins de 2 groupes actuellement"),
    bl("Payer le coût de création en jeu (100 000¢)"),sp(40),
    h2("Processus d'adhésion"),
    codeBlock([
      "1. Demande d'adhésion via Discord ou discussion RP",
      "2. Présentation brève (rôle prévu, intentions)",
      "3. Chef valide avec /groupe invite <joueur>",
      "4. Adhésion immédiate — les obligations commencent",
    ]),sp(40),
    h2("Hiérarchie"),
    blb("Chef :","1 seul. Autorité maximale."),
    blb("Responsable :","Sous le chef (appelé Bras Droit / Bras Gauche selon le contexte). Obligatoires."),
    blb("Membre :","Joueurs standard."),sp(40),
    h2("Obligations des membres"),
    bl("Respecter la hiérarchie interne"),
    bl("Participer aux activités du groupe"),
    bl("Respecter la discipline (règles internes du groupe)"),
    bl("Être actif (présence régulière attendue)"),sp(40),
    warn("Non-respect = virement. Le chef peut retirer un membre à tout moment. Nouveau cooldown de 48h avant de rejoindre un autre groupe."),sp(80),

    banner("03","Organisation — Niveau 2",C.v2),sp(60),
    p("Une organisation est un groupe qui a évolué. Elle nécessite une validation staff via ticket pour réunir plus de monde et accéder à du contenu GameMaster supplémentaire."),sp(40),
    h2("Types d'organisation"),
    tbl(["Type","Exemples","Membres max","Conditions"],
      [1800,2400,1600,3560],
      [
        ["Organisation simple","Religion, Gang/Mafia, Entreprise","25","7 jours d'activité, 10 membres actifs, ticket staff"],
        ["Organisation avancée","Grandes guildes, consortiums","50","7 jours d'activité minimum, 15 joueurs actifs, hiérarchie complète (création libre de rôles)"],
      ]
    ),sp(40),
    h2("Ce que débloque le statut Organisation"),
    blb("Item unique exclusif :","Demandé via ticket. Créé par l'équipe Waystone et intégré en jeu. Fabricable uniquement par cette organisation."),
    blb("Commerce B2B :","Vente de l'item unique uniquement à d'autres organisations/nations. Prix : 75% à 125% du prix constructeur."),
    blb("Contenu GM :","Accès à du contenu GameMaster exclusif (événements, scènes RP, batailles organisées)."),
    blb("Guerres :","Possibles à ce niveau, validées et suivies par un GM."),
    blb("Salaires internes :","Rémunération des membres selon objets fabriqués et chiffre d'affaires par joueur."),sp(40),
    warn("Inactivité prolongée = risque de dissolution. Une organisation doit montrer du sérieux et de l'activité."),sp(80),

    banner("04","Nation — Niveau 3",C.v3),sp(60),
    p("Une nation est une organisation qui a évolué au maximum. Elle possède son propre monde dédié et devient un acteur majeur de l'économie et des conflits du serveur."),sp(40),
    h2("Types de mondes disponibles"),
    tbl(["Type","Coût cumulé","Description","Limite"],
      [2400,1800,3600,1560],
      [
        ["Monde plat","250 000¢","Monde vierge, idéal pour personnalisation complète","4k×4k"],
        ["Monde généré (Minecraft Seed)","350 000¢","Monde généré selon une seed spécifique renseignée","4k×4k"],
        ["Monde importé","550 000¢","Monde customisé pré-existant importé et téléchargeable","4k×4k"],
        ["Monde custom (WorldPainter)","850 000¢","Monde entièrement façonné et custom par l'équipe","4k×4k"],
      ],{colorFn:(cell,ci)=>ci===1?C.amber:"333333"}
    ),sp(40),
    h2("Ce que débloque le statut Nation"),
    blb("Monde dédié :","Un monde Minecraft appartenant à la nation (selon le type choisi)."),
    blb("100 joueurs max :","Double la capacité de l'organisation avancée."),
    blb("Guerres inter-nations :","Guerres KOTH orchestrées par les GM."),
    blb("Caisses nation :","Accès aux caisses lootbox exclusives niveau Nation."),
    blb("Skins de nation :","Skins utilisables uniquement par les membres de cette nation."),
    blb("Commerce élargi :","Revente des items achetés aux organisations au prix de 125-150% minimum aux joueurs."),sp(40),
    info("Le GM avec organisation préalable peut aider dans la création de scènes (guerre, bataille, rencontre, suicide et mort RP)."),sp(80),

    banner("05","Économie Inter-Entités",C.amber),sp(60),
    p("Chaque organisation et nation possède un item unique exclusif créé par l'équipe Waystone. Cet item est au cœur d'un système d'échange B2B qui crée une dépendance économique entre les entités."),sp(40),
    codeBlock([
      "FLUX ÉCONOMIQUE DE L'ITEM UNIQUE :",
      "",
      "  Organisation A fabrique l'item X (elle seule peut le faire)",
      "       ↓",
      "  Vend à Organisation B ou Nation C",
      "  Prix : 75% à 125% du prix constructeur",
      "       ↓",
      "  Organisation B / Nation C revend aux joueurs",
      "  Prix : 125% à 150% minimum du prix constructeur",
      "",
      "SALAIRES INTERNES :",
      "  Rémunération par objet fabriqué (par joueur)",
      "  Rémunération par chiffre d'affaires généré (par joueur)",
      "  Définis librement par le chef de l'organisation",
    ]),sp(80),

    banner("06","Caisses & Lootbox — par niveau",C.purple),sp(60),
    p("Les caisses (lootbox) sont accessibles selon le niveau d'appartenance du joueur. Elles récompensent la progression dans la hiérarchie du serveur."),sp(40),
    tbl(["Type de caisse","Accessible par","Contenu","Achat possible via"],
      [2200,2400,3200,1560],
      [
        ["Caisse solo","Tous les joueurs","Skins et cosmétiques communs","Argent réel ou en jeu"],
        ["Caisse groupe","Membres d'un groupe","Skins et cosmétiques groupe","Argent réel ou en jeu"],
        ["Caisse organisation","Membres d'une organisation","Skins et cosmétiques organisation","Argent réel ou en jeu"],
        ["Caisse nation","Membres d'une nation","Skins exclusifs nation","Argent réel ou en jeu"],
      ]
    ),sp(40),
    blb("Skins exclusifs :","Certains skins ne peuvent être utilisés que si le joueur appartient à l'entité correspondante (organisation ou nation). Cela pousse les joueurs à progresser dans la hiérarchie."),
    blb("Items de collection :","Items customs rares à collectionner. Créés par l'équipe Waystone."),
    blb("Échange argent/skins :","Achetables en argent réel OU en argent en jeu. Sens unique uniquement : argent en jeu → skins (pas l'inverse)."),
    sp(180),...makeEnd()
  ],"Groupes, Organisations & Nations");
}

// ═══════════════════════════════
// DOC 2 — PROGRESSION JOUEUR
// ═══════════════════════════════
function makeProgression(){
  return makeDoc([
    ...makeCover("Progression du Joueur","Gameplay évolutif — du solo à la nation",C.v1),

    banner("01","Vision — Deux gameplays parallèles",C.dark),sp(60),
    p("Waystone propose deux axes de progression indépendants mais interconnectés : la progression individuelle du joueur, et la progression collective du groupe. Chacun peut avancer à son rythme, mais la collaboration amplifie les deux."),sp(80),

    banner("02","Progression Individuelle",C.v1),sp(60),
    tbl(["Étape","Ce que le joueur fait","Ce qu'il débloque"],
      [1400,4000,3960],
      [
        ["1 — Arrivée","Découverte du monde. Minage classique dans le monde de sa nation.","Items de base. Connaissance du terrain."],
        ["2 — Groupe","Rejoint ou crée un groupe. Claims partagés. Missions internes.","Zones de farm protégées. Salaire interne. Claims Farm."],
        ["3 — Zones d'affluence","Accès aux zones gardées par les organisations. Minage intensif.","Ressources rares. Matériaux pour crafts avancés."],
        ["4 — Métier (V2+)","Choisit une branche de métier. Se spécialise.","Capacités exclusives (revive, poison, forge, récolte...)."],
        ["5 — Organisation","Appartient à une organisation. Fabrique l'item unique.","Commerce B2B. Skins organisation. Contenu GM exclusif."],
        ["6 — Nation","Appartient à une nation. Participe aux guerres.","Monde dédié. Skins nation. Guerres KOTH."],
      ],{bold:[0]}
    ),sp(80),

    banner("03","Progression Collective du Groupe",C.v2),sp(60),
    tbl(["Étape","Ce que le groupe fait","Ce qu'il débloque"],
      [1400,4000,3960],
      [
        ["1 — Groupe","Création en jeu. Claims basiques. Organisation interne.","Protection du territoire. Salaires. Missions."],
        ["2 — Organisation simple","Ticket staff. 10 membres actifs. 7 jours d'activité.","25 membres max. Item unique. Commerce B2B. Contenu GM."],
        ["3 — Organisation avancée","15 membres actifs. Hiérarchie complète créée librement.","50 membres max. Guerres. Caisses organisation."],
        ["4 — Nation","Accumulation de ressources et d'argent. Ticket staff.","Monde dédié. 100 membres. Guerres inter-nations. Skins nation."],
      ],{bold:[0]}
    ),sp(60),
    info("Ces deux progressions sont indépendantes mais liées. Un joueur progresse personnellement dans ses métiers, sa réputation et son niveau de compte. Son groupe progresse via son activité collective, ses ressources et ses contrats."),sp(80),

    banner("04","Zones d'affluence — Catalyseur de groupe",C.v3),sp(60),
    p("Les zones d'affluence sont le point de bascule qui pousse les joueurs solitaires à rejoindre un groupe."),sp(40),
    codeBlock([
      "JOUEUR SOLO :",
      "  → Monde joueur : terrain vide de minerai",
      "  → Monde minier (20h-23h) : minage classique libre",
      "  → Ressources suffisantes pour survivre et crafter les bases",
      "",
      "AVEC UN GROUPE :",
      "  → Accès aux zones d'affluence (gardées et exploitées)",
      "  → Minage intensif de ressources rares",
      "  → Claims Farm pour sécuriser les zones",
      "  → Protection collective contre les raids",
      "",
      "AVEC UNE ORGANISATION :",
      "  → Quarries dans les zones d'affluence (V6)",
      "  → Production industrielle d'item unique",
      "  → Commerce B2B avec d'autres nations",
      "",
      "La progression est naturelle — personne n'est forcé",
      "mais chaque niveau débloque clairement plus de contenu.",
    ]),sp(80),

    banner("05","Gameplay Solo — Ce qui reste accessible sans groupe",C.v1),sp(60),
    bl("Minage dans le monde minier (20h-23h) sans claim requis sous Y=50"),
    bl("Construction dans le monde de sa nation (sans zone d'affluence)"),
    bl("HDV — achat et vente d'items standards"),
    bl("Réputation individuelle — progression vers Légendaire"),
    bl("Caisses solo — lootbox accessibles à tous"),
    bl("Niveau de compte — succès, achievements, quêtes (V2+)"),
    bl("Métiers solo (V2+) — Mineur, Horloger, Éclaireur..."),
    sp(180),...makeEnd()
  ],"Progression du Joueur");
}

// ═══════════════════════════════
// DOC 3 — MESSAGE DE PUB
// ═══════════════════════════════
function makePub(){
  return makeDoc([
    ...makeCover("Message de Présentation Joueur","Document de communication — À destination des joueurs",C.gold),

    h1("Version longue — Présentation complète"),sp(40),

    new Paragraph({spacing:{before:60,after:60},children:[new TextRun({text:"⚑  WAYSTONE  ⚑",bold:true,size:32,color:C.gold,font:"Arial"})]}),
    new Paragraph({spacing:{before:20,after:40},children:[new TextRun({text:"Un serveur Minecraft Semi-RP Multimonde, inspiré des grands jeux de civilisation.",size:24,color:C.dark,font:"Arial",italics:true})]}),
    sp(40),

    h2("L'histoire commence ici",C.v1),
    p("Vous avez franchi un portail instable. Il s'est refermé derrière vous. Vous êtes bloqué dans un monde inconnu, sans ressources, sans repères, sans retour possible."),
    p("Ce monde est vide de minerai. Le sous-sol a été épuisé bien avant votre arrivée — par d'autres explorateurs, dans un autre temps. Votre seule option pour miner : un portail temporel qui mène vers le passé de ce monde, ouvert chaque soir."),
    p("Sur la map, une structure ancienne attend. Sa réparation sera le premier grand acte collectif du serveur."),sp(40),

    h2("Votre progression — à votre rythme",C.v1),
    p("Waystone se joue seul ou en groupe, au choix. Mais chaque pallier débloque plus de contenu, plus de liberté, plus de pouvoir."),sp(20),
    blb("En solo :","Vous minez, vous craftez, vous explorez. Le monde est à vous. Mais certaines zones sont gardées par des groupes organisés — et ce qu'elles contiennent vaut le détour."),
    blb("En groupe :","Vous protégez un territoire, partagez les ressources, montez ensemble vers quelque chose de plus grand. Les zones d'affluence s'ouvrent à ceux qui s'organisent."),
    blb("En organisation :","Votre groupe obtient un statut officiel. Vous fabriquez un item que personne d'autre ne peut créer. Vous vendez. Vous négociez. Vous bâtissez une économie."),
    blb("En nation :","Vous possédez votre propre monde. Vous menez des guerres. Vous êtes un acteur majeur de l'histoire de Waystone."),sp(40),

    h2("Un monde façonné par ses joueurs",C.v2),
    p("Les Game Masters ne vous donnent pas un scénario à suivre. Ils créent des opportunités, des événements, des crises — et vous décidez comment y répondre."),
    p("Les alliances se forment et se brisent. Les guerres éclatent. Les économies s'effondrent ou prospèrent. Tout ce qui arrive sur Waystone est le résultat de vos choix."),sp(40),

    h2("Ce que vous ne trouverez pas ailleurs",C.v3),
    blb("La mort a du poids :","Tomber en combat ne vous renvoie pas au spawn. Vous tombez. Vos affaires sont accessibles à tous. Quelqu'un peut vous relever — ou vous laisser."),
    blb("Voyager, c'est physique :","Pour aller d'un monde à l'autre, vous entrez dans un portail. Pas de commande. Pas de menu. Les mondes sont séparés par des portails que vos factions ont construits."),
    blb("La réputation se mérite :","Votre nom RP, votre réputation, votre rang — tout se construit par vos actions. Les Légendaires ont des accès spéciaux. Les Infâmes ont leurs propres zones."),
    blb("L'économie est réelle :","Chaque transaction a du sens. Les items rares viennent de groupes qui ont travaillé pour les produire. L'offre et la demande fonctionnent."),
    sp(80),

    new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:4,color:C.gold}},spacing:{before:40,after:40},children:[new TextRun("")]}),
    sp(80),

    h1("Version courte — Annonce Discord/Réseaux"),sp(40),

    new Paragraph({spacing:{before:40,after:20},children:[new TextRun({text:"⚑  WAYSTONE  ⚑",bold:true,size:28,color:C.gold,font:"Arial"})]}),
    new Paragraph({spacing:{before:0,after:40},children:[new TextRun({text:"Serveur Minecraft Semi-RP Multimonde  •  Java 1.21",size:22,color:C.gray,font:"Arial"})]}),
    sp(20),

    p("Vous arrivez seul dans un monde inconnu. Pas de minerai. Pas de retour. Un portail temporel s'ouvre chaque soir vers le passé de votre monde — c'est là que vous minez."),
    p("La suite ? Elle dépend de vous."),sp(20),

    blb("Solo","Explorez, craftez, bâtissez votre réputation."),
    blb("Groupe","Protégez un territoire, partagez les ressources."),
    blb("Organisation","Créez un empire économique avec votre item unique."),
    blb("Nation","Possédez un monde. Faites la guerre. Écrivez l'histoire."),sp(20),

    p("Les Game Masters créent les événements. Les joueurs écrivent l'histoire."),sp(20),
    new Paragraph({spacing:{before:20,after:60},children:[new TextRun({text:"Rejoignez Waystone. ⚑",bold:true,size:26,color:C.gold,font:"Arial"})]}),

    new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:4,color:C.gold}},spacing:{before:40,after:40},children:[new TextRun("")]}),
    sp(80),

    h1("Version ultra-courte — Accroche"),sp(40),
    p("Un monde sans minerai. Des portails vers d'autres réalités. Des groupes qui s'organisent, des guerres qui éclatent, des économies qui se font et se défont."),
    p("Sur Waystone, tout ce qui arrive est le résultat de vos choix.", {bold:true}),
    sp(40),
    new Paragraph({spacing:{before:20,after:20},children:[new TextRun({text:"⚑ WAYSTONE — Multimonde Semi-RP Minecraft Java 1.21 ⚑",bold:true,size:24,color:C.gold,font:"Arial"})]}),

    sp(180),...makeEnd()
  ],"Message de Présentation Joueur");
}

async function generate(){
  const docs=[
    {doc:makeGroupes(),     name:`WS_${VERSION}_${DATE_FILE}_Groupes_Organisations_Nations.docx`},
    {doc:makeProgression(), name:`WS_${VERSION}_${DATE_FILE}_Progression_Joueur.docx`},
    {doc:makePub(),         name:`WS_${VERSION}_${DATE_FILE}_Message_Presentation_Joueur.docx`},
  ];
  for(const {doc,name} of docs){
    const buf=await Packer.toBuffer(doc);
    fs.writeFileSync(`/mnt/user-data/outputs/${name}`,buf);
    console.log(`OK ${name}`);
  }
}
generate().catch(e=>{console.error(e.message);process.exit(1);});
