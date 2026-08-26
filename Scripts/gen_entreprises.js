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
  v1:"1E8449", v2:"1A5276", v3:"6C3483"
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
function cmdTbl(rows){return tbl(["Commande","Description","Permission"],[2400,5200,1760],rows,
  {hFill:C.code,hColor:C.gold,colorFn:(cell,ci)=>ci===0?C.blue:ci===2?C.orange:"333333",bold:[0]})}
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

// ══════════════════════════════════════════
// DOC 1 — GROUPES/ORGAS/NATIONS (corrigé)
// ══════════════════════════════════════════
function makeGroupes(){
  return makeDoc([
    ...makeCover("Groupes, Organisations & Nations","Hiérarchie des entités — progression et fonctionnement",C.gold),

    banner("01","Vue d'ensemble — 3 niveaux",C.dark),sp(60),
    tbl(["Niveau","Membres max","Accès","Déblocage"],
      [1800,1800,3600,2160],
      [
        ["Groupe","XX (à définir)","Claims, minage, guerres GM","Création en jeu (100 000¢)"],
        ["Organisation simple","25","Item unique B2B, contenu GM, guerres","Ticket staff + 10 membres actifs + 7j activité"],
        ["Organisation avancée","50","Hiérarchie libre, caisses organisation","Ticket staff + 15 membres actifs + hiérarchie complète"],
        ["Nation","100","Monde dédié, guerres inter-nations, caisses nation","Ressources + argent + ticket staff"],
      ],{bold:[0],colorFn:(cell,ci,ri)=>ci===0?[C.v1,C.v2,C.v2,C.v3][ri]:"333333"}
    ),sp(60),
    info("Les guerres sont possibles à tous les niveaux, mais doivent être validées et suivies par un GM."),sp(80),

    banner("02","Groupe — Niveau 1",C.v1),sp(60),
    p("Le groupe est la cellule de base. Créé directement en jeu sans validation préalable."),sp(40),
    h2("Création & Adhésion"),
    codeBlock([
      "Conditions d'accès :",
      "  → Être un joueur actif (présent dans le monde joueur)",
      "  → Avoir moins de 2 groupes actuellement",
      "  → Payer 100 000¢",
      "",
      "Processus d'adhésion :",
      "  1. Demande via Discord ou discussion RP",
      "  2. Présentation brève (rôle prévu, intentions)",
      "  3. Chef valide avec /groupe invite <joueur>",
      "  4. Adhésion immédiate — les obligations commencent",
    ]),sp(40),
    h2("Hiérarchie & Obligations"),
    blb("Chef :","1 seul. Autorité maximale."),
    blb("Responsables :","Bras Droit / Bras Gauche (obligatoires à la création)."),
    blb("Membres :","Joueurs standard selon les règles internes."),sp(20),
    bl("Respecter la hiérarchie interne"),
    bl("Participer aux activités du groupe"),
    bl("Être actif (présence régulière attendue)"),sp(20),
    warn("Non-respect = virement. Cooldown de 48h avant de rejoindre un autre groupe."),sp(80),

    banner("03","Organisation — Niveau 2",C.v2),sp(60),
    p("Une organisation est un groupe qui a évolué via ticket staff. Elle débloque des fonctionnalités supplémentaires et un item unique exclusif."),sp(40),
    h2("Types"),
    tbl(["Type","Exemples","Membres max","Conditions de déblocage"],
      [2000,2400,1600,3360],
      [
        ["Organisation simple","Religion, Gang/Mafia, Entreprise","25","Ticket staff + 10 membres actifs + 7j d'activité minimum"],
        ["Organisation avancée","Grandes guildes, consortiums","50","Ticket staff + 15 membres actifs + hiérarchie complète (rôles libres)"],
      ]
    ),sp(40),
    h2("Ce que débloque l'Organisation"),
    blb("Item unique exclusif :","Demandé via ticket. Créé par l'équipe Waystone et intégré en jeu. Fabricable uniquement par cette organisation."),
    blb("Commerce B2B :","Les constructeurs (entreprises de production) vendent leur item unique UNIQUEMENT à des groupes, organisations ou nations — jamais à des joueurs individuels. Prix : 75% à 125% du prix constructeur."),
    blb("Revente B2C :","Tout groupe, organisation ou nation ayant acheté un item peut le revendre à d'autres entités ou aux joueurs individuels. Prix minimum : 125% du prix constructeur."),
    blb("Contenu GM :","Accès à des événements et scènes RP exclusifs organisés par les GM."),
    blb("Guerres :","Possibles à ce niveau, validées et suivies par un GM."),
    blb("Caisses organisation :","Lootbox exclusives membres de l'organisation."),sp(40),
    warn("Les salaires internes et la gestion des items par joueur sont prévus via un plugin dédié — non officiel pour l'instant, laissé de côté."),sp(80),

    banner("04","Nation — Niveau 3",C.v3),sp(60),
    p("Une nation possède son propre monde dédié et devient un acteur majeur de l'économie et des conflits du serveur."),sp(40),
    h2("Types de mondes"),
    tbl(["Type","Coût cumulé","Description","Limite"],
      [2400,1800,3400,1760],
      [
        ["Monde plat","250 000¢","Monde vierge, personnalisation complète","4k×4k max"],
        ["Monde généré (Seed)","350 000¢","Monde généré selon une seed renseignée","4k×4k max"],
        ["Monde importé","550 000¢","Monde pré-existant importé et téléchargeable","4k×4k max"],
        ["Monde custom (WorldPainter)","850 000¢","Monde entièrement façonné par l'équipe","4k×4k max"],
      ],{colorFn:(cell,ci)=>ci===1?C.amber:"333333"}
    ),sp(40),
    h2("Ce que débloque la Nation"),
    blb("Monde dédié :","Un monde Minecraft appartenant à la nation (4k×4k maximum)."),
    blb("100 joueurs max :","Double la capacité de l'organisation avancée."),
    blb("Guerres inter-nations :","Guerres KOTH orchestrées par les GM."),
    blb("Caisses nation :","Lootbox exclusives membres de la nation."),
    blb("Skins nation :","Utilisables uniquement par les membres de cette nation."),sp(80),

    banner("05","Commerce — Règles d'échange",C.amber),sp(60),
    p("Le commerce entre entités est au cœur de l'économie de Waystone. Chaque niveau peut acheter et revendre."),sp(40),
    codeBlock([
      "RÈGLE DE BASE :",
      "",
      "  Entreprise de production (organisation/nation)",
      "    → VEND UNIQUEMENT à : groupes, organisations, nations",
      "    → INTERDIT de vendre directement aux joueurs individuels",
      "    → Prix de vente : 75% à 125% du prix constructeur",
      "",
      "  Groupe / Organisation / Nation acheteur",
      "    → PEUT REVENDRE à : autres groupes, organisations, nations, joueurs",
      "    → Prix de revente minimum : 125% du prix constructeur",
      "",
      "EXEMPLE :",
      "  Organisation A produit l'item X au prix constructeur 1000¢",
      "  → Vend à Nation B entre 750¢ et 1250¢",
      "  Nation B revend aux joueurs à minimum 1250¢",
    ]),sp(40),
    info("Tout groupe, organisation ou nation peut acheter ET revendre des items. Seuls les constructeurs (entreprises de production) ont l'interdiction de vendre directement aux joueurs individuels."),sp(80),

    banner("06","Caisses & Skins — par niveau",C.purple),sp(60),
    tbl(["Type de caisse","Accessible par","Contenu","Achat via"],
      [2200,2600,2800,1760],
      [
        ["Caisse solo","Tous les joueurs","Skins et cosmétiques communs","Argent réel ou en jeu"],
        ["Caisse groupe","Membres d'un groupe","Skins et cosmétiques groupe","Argent réel ou en jeu"],
        ["Caisse organisation","Membres d'une organisation","Skins exclusifs organisation","Argent réel ou en jeu"],
        ["Caisse nation","Membres d'une nation","Skins exclusifs nation","Argent réel ou en jeu"],
      ]
    ),sp(40),
    blb("Skins exclusifs :","Certains skins ne peuvent être utilisés que si le joueur appartient à l'entité correspondante. Cela pousse la progression dans la hiérarchie."),
    blb("Items de collection :","Items customs rares à collectionner, créés par l'équipe Waystone."),
    blb("Échange argent/skins :","Achetables en argent réel OU en argent en jeu. Sens unique : argent en jeu → skins (pas l'inverse)."),
    sp(180),...makeEnd()
  ],"Groupes, Organisations & Nations");
}

// ══════════════════════════════════════════
// DOC 2 — CDC ENTREPRISES
// ══════════════════════════════════════════
function makeEntreprises(){
  return makeDoc([
    ...makeCover("CDC — Système Entreprises","Cahier des charges — Types d'entreprises, contrats, production, vente",C.purple),

    banner("00","Vue d'ensemble",C.dark),sp(60),
    p("Le système Entreprises est une couche au-dessus des groupes/organisations. Une entreprise est une structure spécialisée avec un type défini, un QG physique sur la map, et des rôles internes (producteurs, vendeurs, acheteurs). Elle s'intègre dans l'économie B2B de Waystone."),sp(40),
    info("Les salaires internes (rémunération par item produit ou vendu) sont prévus dans un plugin dédié — non officiel à ce stade. Laissé de côté pour l'instant."),sp(40),
    tbl(["Type d'entreprise","Icône","Clients cibles","Plugin requis"],
      [2800,800,3200,2560],
      [
        ["Entreprise de construction","⚒️","Joueurs et factions","Zéro — gestion RP + commandes de base"],
        ["Entreprise d'ingénieurs","💡","Joueurs et factions","Mécanicien (LuckPerms perm requis)"],
        ["Entreprise de terraform","⛏️","Joueurs et factions","FastAsyncWorldEdit (admin) + RP"],
        ["Entreprise de journalisme","📰","Staff et factions","Zéro — contenu créatif externe"],
        ["Entreprise de production","🏭","Groupes, organisations, nations UNIQUEMENT","Custom (coffre production, contrats)"],
        ["Entreprise de vente","🛒","Joueurs et factions","AuctionHouse + étalages Capitale"],
      ],{bold:[0]}
    ),sp(80),

    banner("01","Entreprise de Construction ⚒️",C.v1),sp(60),
    p("Entreprise chargée de construire des bâtiments ou ouvrages sur commande."),sp(40),
    blb("Clients :","Joueurs ou factions ayant besoin de construire quelque chose à un emplacement donné dans un laps de temps défini."),
    blb("Type de contrat :","Standard — accord RP entre les parties, suivi par le chef d'entreprise."),
    blb("Livrables :","Bâtiment, structure, ouvrage physique sur la map du client."),
    blb("Compétences requises :","Aucune spéciale. Bons constructeurs."),
    blb("Paiement :","Négocié librement entre les parties. Versé à la livraison."),sp(80),

    banner("02","Entreprise d'Ingénieurs 💡",C.v2),sp(60),
    p("Entreprise spécialisée dans la réalisation de systèmes complexes sur commande."),sp(40),
    blb("Clients :","Joueurs ou factions nécessitant des pièges, systèmes redstone, salles à spawner, mécanismes automatiques."),
    blb("Type de contrat :","Standard."),
    blb("Compétences requises :","Mécanicien (LuckPerms permission). Les blocs redstone avancés nécessitent le rang Mécanicien."),
    blb("Livrables :","Système fonctionnel installé sur la map du client."),
    blb("Paiement :","Négocié librement. Acompte possible à la commande."),sp(80),

    banner("03","Entreprise de Terraform ⛏️",C.v1),sp(60),
    p("Entreprise chargée de réaliser de gros travaux sur le terrain pour le compte de joueurs ou de factions."),sp(40),
    blb("Clients :","Joueurs ou factions nécessitant des modifications majeures du terrain."),
    blb("Exemples de contrats :","Trous, montagnes à façonner, forêts à raser, plaines à créer, rivières à rediriger."),
    blb("Type de contrat :","Standard."),
    blb("Outils :","FastAsyncWorldEdit (staff accompagnant si besoin), outils manuels pour les petites modifications."),
    blb("Paiement :","Négocié selon l'ampleur des travaux."),sp(80),

    banner("04","Entreprise de Journalisme 📰",C.v3),sp(60),
    p("Entreprise en capacité de répondre à des demandes de communication pour le staff ou les factions."),sp(40),
    blb("Clients :","Staff, factions, joueurs importants."),
    blb("Prestations :","Comptes rendus écrits, interviews, montages photos, trailers ou cinématiques vidéo."),
    blb("Type de contrat :","Standard — payé par les demandeurs."),
    blb("Compétences requises :","Aucune in-game. Compétences créatives externes (montage, rédaction, capture)."),
    blb("Paiement :","Négocié selon la prestation. Peut être payé en argent en jeu ou en avantages."),sp(80),

    banner("05","Entreprise de Production 🏭",C.purple),sp(60),
    p("L'entreprise de production est le coeur de l'économie B2B de Waystone. Elle crée des items avancés et les vend exclusivement à d'autres entités — jamais aux joueurs individuels."),sp(40),
    h2("Règle fondamentale"),
    warn("Une entreprise de production ne peut JAMAIS vendre directement à un joueur individuel. Elle vend UNIQUEMENT à des groupes, organisations ou nations."),sp(40),
    h2("Fonctionnement interne"),
    codeBlock([
      "RÔLES INTERNES :",
      "  Producteur : dépose les items fabriqués dans le coffre de production",
      "               ne peut PAS retirer des items du coffre",
      "  Vendeur    : retire les items du coffre pour livrer au client",
      "               ne peut PAS déposer dans le coffre",
      "               limité à être vendeur d'une SEULE organisation (pas 2)",
      "  Owner      : gère les permissions, les rôles, le QG",
      "",
      "COFFRE DE PRODUCTION :",
      "  → Protégé : producteurs déposent, vendeurs retirent",
      "  → Évite le vol interne par séparation des droits",
      "  → Seul le owner peut voir et gérer les deux côtés",
    ]),sp(40),
    h2("Flux de contrat de vente"),
    codeBlock([
      "1. Le VENDEUR (rôle défini par le owner) contacte un acheteur",
      "   (groupe, organisation ou nation)",
      "",
      "2. L'ACHETEUR dispose d'un rôle 'acheteur' défini par son propre owner",
      "   L'acheteur signe le contrat avec le vendeur",
      "",
      "3. Le vendeur reçoit une MISSION :",
      "   → Récupérer dans le coffre de production le nombre d'items vendus",
      "   → Livrer physiquement à l'acheteur",
      "",
      "4. Une fois la livraison effectuée : contrat terminé",
      "   → Le montant convenu est débité automatiquement",
      "   → Prix de vente : 75% à 125% du prix constructeur",
      "",
      "L'acheteur peut ensuite revendre les items à d'autres entités",
      "ou aux joueurs individuels — prix minimum : 125% du prix constructeur",
    ]),sp(80),

    banner("06","Entreprise de Vente 🛒",C.amber),sp(60),
    p("Entreprise spécialisée dans la vente d'items aux joueurs ou aux factions. Contrairement à l'entreprise de production, elle peut vendre directement aux joueurs."),sp(40),
    blb("Clients :","Joueurs individuels et factions."),
    blb("Items vendus :","Boissons, consommables, items craftés, items achetés à d'autres organisations."),
    blb("Canal de vente :","Étalages dans le marché de la Capitale (louables) + AuctionHouse HDV."),
    blb("Prix :","Libre pour les items standard. Minimum 125% du prix constructeur pour les items achetés en B2B."),sp(80),

    banner("07","Commandes — Module Entreprises",C.dark),sp(60),
    p("Ces commandes constituent la base du module Entreprises à développer dans WaystoneCore."),sp(40),
    cmdTbl([
      ["/e","Affiche le menu principal d'entreprise","Joueur"],
      ["/e list","Liste toutes les entreprises existantes","Joueur"],
      ["/e <nom>","Ouvre l'interface d'une entreprise spécifique","Joueur"],
      ["/e create","Crée une nouvelle entreprise (formulaire : nom, type, description)","Joueur"],
      ["/e invite <joueur> <nom>","Invite un joueur dans une entreprise","Chef d'entreprise"],
      ["/e join <nom>","Rejoindre une entreprise (si ouverte)","Joueur"],
      ["/e leave <nom>","Quitter une entreprise","Membre"],
      ["/e e <joueur>","Liste les entreprises dans lesquelles se trouve le joueur","Joueur"],
      ["/e disband <nom>","Supprime définitivement une entreprise (double confirmation)","Chef d'entreprise"],
      ["/e setqg","Définit la position du QG de l'entreprise à la position actuelle","Chef d'entreprise"],
      ["/e kick <joueur>","Exclure un joueur de l'entreprise","Chef d'entreprise"],
      ["/e setrole <joueur> <rôle>","Définit le rôle d'un membre (producteur, vendeur, acheteur)","Chef d'entreprise"],
      ["/e stock","Ouvre l'interface du coffre de production","Producteur / Vendeur (selon droits)"],
      ["/e contrat create <entité> <montant>","Crée un contrat de vente avec une entité","Vendeur"],
      ["/e contrat list","Liste les contrats actifs de l'entreprise","Chef / Vendeur"],
      ["/e contrat complete <id>","Marque un contrat comme livré et déclenche le paiement","Vendeur"],
    ]),sp(80),

    banner("08","Structure des données — entreprises-data.yml",C.code),sp(60),
    codeBlock([
      "# entreprises-data.yml",
      "entreprises:",
      "  forge-du-nord:",
      "    type: production",
      "    owner: uuid-du-chef",
      "    qg: {world: solen, x: 120, y: 64, z: -45}",
      "    membres:",
      "      uuid-joueur-1:",
      "        role: producteur",
      "        date-adhesion: 2026-06-15",
      "      uuid-joueur-2:",
      "        role: vendeur",
      "        date-adhesion: 2026-06-17",
      "    contrats:",
      "      contrat-001:",
      "        acheteur-entite: nation-pyrhos",
      "        items: 64",
      "        item-id: epee-de-nord",
      "        montant: 8000",
      "        statut: en_cours",
      "        date-creation: 2026-08-20",
      "    coffre-production:",
      "      slot-1: {item: epee-de-nord, qty: 32}",
    ]),sp(80),

    banner("09","Points ouverts",C.red),sp(60),
    tbl(["#","Point","Priorité","Détail"],
      [600,2800,1400,4560],
      [
        ["1","Salaires internes","Faible","Plugin dédié non officiel — laissé de côté pour l'instant"],
        ["2","Limite d'entreprises par joueur","Moyenne","Définir combien d'entreprises un joueur peut créer/rejoindre"],
        ["3","Coût de création d'une entreprise","Moyenne","Montant à définir"],
        ["4","Validation staff pour création","Moyenne","Faut-il une validation GM pour créer une entreprise ou c'est libre ?"],
        ["5","Interface contrats","Haute","GUI ou commande ? Quel niveau de détail dans le suivi ?"],
        ["6","Coffre de production — plugin","Haute","ChestProtect peut gérer les permissions de dépôt/retrait ? À vérifier."],
      ],{colorFn:(cell,ci)=>ci===2?cell==="Haute"?C.red:cell==="Moyenne"?C.orange:C.teal:"333333",bold:[0,1]}
    ),
    sp(180),...makeEnd()
  ],"CDC Entreprises");
}

async function generate(){
  const docs=[
    {doc:makeGroupes(),      name:`WS_${VERSION}_${DATE_FILE}_Groupes_Organisations_Nations.docx`},
    {doc:makeEntreprises(),  name:`WS_${VERSION}_${DATE_FILE}_CDC_Entreprises.docx`},
  ];
  for(const {doc,name} of docs){
    const buf=await Packer.toBuffer(doc);
    fs.writeFileSync(`/mnt/user-data/outputs/${name}`,buf);
    console.log(`OK ${name}`);
  }
}
generate().catch(e=>{console.error(e.message);process.exit(1);});
