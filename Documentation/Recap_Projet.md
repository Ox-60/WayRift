# Récapitulatif Complet du Projet WayRift

> Document de référence pour toute personne rejoignant le projet. Synthèse des 2 sessions de conception (63 échanges).

---

## Table des matières

1. [Genèse du projet](#1-genèse-du-projet)
2. [Architecture des mondes](#2-architecture-des-mondes)
3. [Déplacements & Portails](#3-déplacements--portails)
4. [Groupes, Organisations & Nations](#4-groupes-organisations--nations)
5. [Claims & Territoire](#5-claims--territoire)
6. [Mort, Coma & Revive](#6-mort-coma--revive)
7. [Joueur — Identité, Profil & Réputation](#7-joueur--identité-profil--réputation)
8. [Économie & HDV](#8-économie--hdv)
9. [Guerres & KOTH](#9-guerres--koth)
10. [Arbre de Métiers](#10-arbre-de-métiers)
11. [Quarries & Zones d'Affluence](#11-quarries--zones-dafluence)
12. [Système Entreprises](#12-système-entreprises)
13. [Communication & Nametags](#13-communication--nametags)
14. [Lore & Arc Narratif](#14-lore--arc-narratif)
15. [Plugins — État complet](#15-plugins--état-complet)
16. [Ce qui a été abandonné](#16-ce-qui-a-été-abandonné)
17. [Points ouverts](#17-points-ouverts)
18. [Équipe WayRift](#18-équipe-wayrift)

---

## 1. Genèse du projet

**Session 1 — 26 mai 2026**

Le projet démarre avec une demande simple : créer un serveur Minecraft Java en dernière version, uniquement avec des plugins (pas de mods), et rédiger un cahier des charges des plugins à développer.

### Concept — RP style Civilisation

- Serveur Minecraft RP Multivers inspiré du genre Civilisation
- Des groupes de joueurs en compétition dans un style Roleplay
- Chaque groupe peut fonder sa propre nation, choisir son système politique, développer son architecture
- Un monde vivant, façonné par ses joueurs

### Premières décisions structurantes

| Décision | Valeur retenue |
|---|---|
| Hiérarchie initiale | Nation (monde) > Faction (groupe RP) > Joueur |
| Validation admin | Toute création de faction validée par un admin |
| Monnaie | Unique sur tout le serveur (¢) |
| PvP | Libre partout sauf zones protégées |
| Mode de jeu | Joueur sans monde attitré = Mode Aventure partout |

---

## 2. Architecture des mondes

| Monde | Accès | Minerais | Rôle |
|---|---|---|---|
| Capitale | Tous, 24h/24 | Non | Hub : HDV, portails, hôpital, marché, Bas-Fonds |
| Mondes Nations | Habitants=Survie, Autres=Aventure | Non | Vie, construction, zones d'affluence (V6) |
| Monde Minier | Tous, 20h-23h | Oui | Farm de ressources |
| Mondes Factions | Faction propriétaire | Config GM | Monde privé acheté |

### Capitale — Zones définies

- **Quartier officiel** : Banque, HDV, Bureau immobilier, Salle du Trône
- **Quartier de vie** : Auberge, Hôpital (no-PvP), Marché (~15 étalages louables)
- **Échoppes de métier** : Forgeron, Herboriste, Mécanicien, Agriculteur, Guerrier, Archer
- **Skins** : Espace dédié pour voir et acheter des skins
- **Panthéon** : Classement des mondes et factions les plus riches
- **Portails** : Zone dédiée — 1 portail par monde nation
- **Bas-Fonds (V3+)** : Zone souterraine pour joueurs Infâmes

### Types de mondes factions

| Type | Coût cumulé | Limite |
|---|---|---|
| Monde plat | 250 000¢ | 4k×4k |
| Monde généré (Seed) | 350 000¢ | 4k×4k |
| Monde importé | 550 000¢ | 4k×4k |
| Monde custom (WorldPainter) | 850 000¢ | 4k×4k |

> **Décision clé lore** : Le monde minier est le passé du monde joueur. Le monde joueur est vide de minerai car son passé a été épuisé par les explorateurs du futur — les joueurs eux-mêmes.

---

## 3. Déplacements & Portails

### Les 4 types de portails

| Type | Comportement | Usage |
|---|---|---|
| **Instable** | Se referme après le passage d'un joueur | Usage unique — portails brisés du multivers |
| **Stable** | Reste ouvert tant qu'il est activé | Navigation standard entre mondes |
| **Temporel** | Accès permanent vers le passé | Monde minier uniquement — justification lore |
| **Faille** | Créé par un joueur, durée limitée | Accès à un donjon (V5+) |

### Évolution du système

| Version | Système | Statut |
|---|---|---|
| Initiale | Pierre de voyage consommable par destination | **Abandonné** |
| Version 2 | Portails dans la Capitale + commande | Partiellement retenu |
| **Finale** | **Portails physiques interconnectés Multiverse-Core** | **Retenu V1** |

### Système final

- **Technologie** : Multiverse-Core Nether Portals — paires liées bidirectionnelles. Zéro dev custom.
- **Structure** : 1 portail physique par monde, placé par les Architectes via schematic importée par GM.
- **Interconnectés** : Entrer dans le portail de Solen (Capitale) = arriver au portail de Solen (monde Solen).
- **Coma/Down** : Arrivée à 3 blocs aléatoires du portail destination.
- **Refus** : Monde banni, fermé ou archivé.
- **Bordure** : Infranchissable. Pas de menu de sélection.

### Portails en V1

| Portail | Statut | Destination | Rôle narratif |
|---|---|---|---|
| Portail minier | Actif dès le début | Passé du monde joueur | Justifie l'absence de minerai |
| Portail instable (x1-2) | Actif — instable | Map secrète (retour auto 5s) | Lore. Signe que quelque chose est cassé. |
| Monolithe | Inactif → actif fin V1 | Capitale (event GM) | Sa réparation clôture V1 |

### 4 états joueur par monde

| État | Mode de jeu | Droits |
|---|---|---|
| Habitant | Survie complète | Construction et minage selon claims |
| Visiteur | Aventure | Interaction uniquement |
| Banni | — | Portail refusé |

---

## 4. Groupes, Organisations & Nations

### Hiérarchie finale (3 niveaux)

| Niveau | Membres max | Coût | Déblocage | Droits spéciaux |
|---|---|---|---|---|
| **Groupe** | XX | Gratuit S1, 10 000¢ dès S2 | Création en jeu | Claims, guerres GM |
| **Organisation simple** | 25 | + ticket staff | 10 membres actifs + 7j activité | Item unique B2B, contenu GM |
| **Organisation avancée** | 50 | + ticket staff | 15 membres actifs + hiérarchie complète | Caisses organisation |
| **Nation** | 100 | Selon monde | Ressources + argent + ticket staff | Monde dédié, guerres inter-nations |

### Flux de création

```
1. Joueur crée la faction en jeu (paiement débité immédiatement)
2. Statut : PENDING — notification staff/GM
3. Staff valide (/faction admin validate) -> ACTIVE
   ou refuse (/faction admin refuse) -> remboursement automatique
4. Si délai 24h dépassé sans action -> chef dans Rewards Publics
```

### Dissolution

```
CONDITIONS :
  Chef inactif +14j sans responsable actif
  Inactivité générale -50% pendant 1 mois
  Chef dissout volontairement (/f dissolve)

CALENDRIER :
  Jeudi 20h  -> MODE PILLAGE (4h) — claims accessibles à tous
  Samedi 18h -> suppression définitive + régénération zone
```

---

## 5. Claims & Territoire

### 2 types de claims (OxyTowns)

| Type | Profondeur max | Limite | Reset | Usage |
|---|---|---|---|---|
| **Territoire** | Y=40 | Selon puissance faction | Non | Construction, bâtiments |
| **Farm** | Bedrock | Faction:16 / Groupe:8 / Solo:4 | 1x/semaine | Minage, farm |

### Profondeurs selon situation

| Situation | Profondeur max |
|---|---|
| Claim Territoire | Y=40 |
| Claim Farm | Bedrock (pas de limite) |
| Hors claim | Y=50 (en dessous : interdit) |
| Monde Minier | Tous les blocs minables |

### Droits d'accès

| Profil | Claim protégé | Claim ineffectif |
|---|---|---|
| Membre de la faction | Survie complète | Survie complète |
| Non-membre (neutre) | Mode Aventure | Mode Aventure |
| Ennemi (guerre GM) | Mode Aventure | Survie complète — casse et pose libre |

---

## 6. Mort, Coma & Revive

### Système final — ReviveMe

| Phase | Déclencheur | Comportement | Plugin |
|---|---|---|---|
| Avertissement | Vie < 3 cœurs | Effet visuel troublé | ReviveMe config |
| Down/Coma | Vie = 0 (PvP uniquement) | Peut bouger. Inventaire fouillable. | ReviveMe |
| Revive collègue | Accroupi sur le Down | V1 : tous. V2+ : Médecin uniquement. | ReviveMe |
| Revive GM | /revive @joueur here | Revive + TP sur place | ReviveMe |
| Hôpital | Countdown écoulé | Respawn hôpital Capitale | ReviveMe + Multiverse |
| Wipe | /wipe me | Supprime connexions sauf XP et achats | Custom léger |

> En V2 : permission ReviveMe restreinte au rang LuckPerms `medecin`. Zéro dev supplémentaire.

---

## 7. Joueur — Identité, Profil & Réputation

### Identité RP

- **Nom RP** : Prénom + Nom. La combinaison entière doit être unique (Levenshtein ≤ 2 bloquée)
- **Serment** : Livre à signer obligatoirement à la première connexion
- **Wipe** : Nouveau nom RP, nouveau personnage. Blocage 3-5 jours.

### Réputation (0-100)

| Score | Label | Nameplate | Accès | Restriction |
|---|---|---|---|---|
| 80-100 | Légendaire | Or | Zones VIP Capitale | — |
| 60-79 | Honorable | Vert clair | — | — |
| 40-59 | Neutre | Gris | — | — |
| 20-39 | Neutre bas | Gris foncé | — | — |
| 10-19 | Suspect | Orange | — | Interdit HDV officiel |
| 0-9 | **Infâme** | Rouge + tête de mort | Bas-Fonds | Interdit HDV officiel |

- **Tête de mort** : Sur joueurs Infâmes (< 10) via CustomNameplates + LuckPerms rank `infame`
- **Limite** : +10 points max par semaine
- **Vote réputation** : Payer ses impôts génère des votes attribuables à n'importe quel joueur

> La réputation Infâme est un **choix de gameplay conscient** — pas uniquement une punition.

---

## 8. Économie & HDV

### Monnaies

| Monnaie | Usage | Obtention |
|---|---|---|
| Oboles (¢) | Monnaie globale unique | En jeu |
| Rubies | VIP/prestige, casino | Euros ou beaucoup d'Oboles (sens unique) |

### HDV — AuctionHouse configuré

- Offres de vente uniquement (pas d'ordres d'achat)
- Liste blanche des items autorisés à la vente
- Taxes : 15% Capitale + 10% faction = 25%. Étalages loués : 15%
- Durée listing : 7 jours + 7 jours récupération Ender Chest
- Accès interdit aux joueurs réputation < 20

### Commerce inter-entités

```
ENTREPRISE DE PRODUCTION :
  -> Vend UNIQUEMENT à groupes, organisations, nations
  -> Prix : 75% à 125% du prix constructeur
  -> INTERDIT de vendre directement aux joueurs individuels

GROUPE / ORGA / NATION ACHETEUR :
  -> Peut revendre à joueurs individuels
  -> Prix minimum : 125% du prix constructeur
```

---

## 9. Guerres & KOTH

- **Guerres KOTH réservées aux Nations uniquement** — validées et suivies par un GM
- Les Organisations ont des événements organisés par les chefs et les GM (pas de guerres formelles)
- GM lance chaque manche avec une commande
- **1 manche gagnée = 1 point. Premier à 3 points gagne.**
- Si défaite écrasante : GM peut déclencher une attaque directe de la ville perdante
- 1 position par monde : monde de l'attaquant, monde du défenseur, monde neutre

---

## 10. Arbre de Métiers

> ⚠️ Les métiers arrivent en V2 (basiques) et se complètent en V6. Rien en V1.

| Branche | Base | Spé 1 | Spé 2 | Spé 3 |
|---|---|---|---|---|
| Mysticisme | — | Médecin / Clerc | Occultiste / Nécromancien | — |
| Guerre | — | Assassin | Éclaireur | Guerrier |
| Artisanat | Mineur | Mécanicien | Canalisateur | Forgeron |
| Culture | — | Herboriste | Agriculteur | — |
| Divers | Horloger | Vote nuit, Pantin NPC | — | — |

---

## 11. Quarries & Zones d'Affluence

> ⚠️ Les Quarries arrivent en V6.

- **Zone d'affluence** : Région WorldGuard avec flag `quarry-allowed`
- **Condition** : La quarry doit être sur un chunk claimé par sa faction dans la zone

### Probabilités

| Ressource | Chance | Condition | Pur possible |
|---|---|---|---|
| R1 | 80% | Si en zone d'affluence | Oui |
| R2 | 35% | Si R1 présente | Oui |
| R3 | 15% | Si R2 présente | Non — re-roll auto |
| R4 | 6% | Si R3 présente | Non |
| R5 | 2% | Si R4 présente | Non |

### Modules quarry (3 slots)

| Module | Effet |
|---|---|
| Vitesse | Production +1/3, consommation +1/6 |
| Rendement | Quantité +1/3, stockage -1/6 |
| Solidité | Moins de maintenance |
| Stockage | Capacité +1/3, quantité -1/6 |
| Réservoir | Capacité combustible +1/3 |
| Économie | Consommation -1/3, réservoir -1/4 |

---

## 12. Système Entreprises

| Type | Icône | Clients cibles |
|---|---|---|
| Construction | ⚒️ | Joueurs et factions |
| Ingénieurs | 💡 | Joueurs et factions (Mécanicien requis) |
| Terraform | ⛏️ | Joueurs et factions |
| Journalisme | 📰 | Staff et factions |
| **Production** | 🏭 | **Groupes, organisations, nations UNIQUEMENT** |
| Vente | 🛒 | Joueurs et factions |

**Coffre de production** :
- Producteurs : déposent uniquement
- Vendeurs : retirent uniquement
- Vendeur : limité à UNE seule organisation

---

## 13. Communication & Nametags

- **PlasmoVoice** : Proximity uniquement. Chuchotement 5 blocs.
- **Chat** : Emotes RP (/me /do /say /chuchoter) permanentes. Chat libre en journée.
- **Nametags** : Invisibles par défaut (ProAntiTab). Visibles si présentation mutuelle (CustomNameplates + LuckPerms).
- **Tête de mort** : Sur joueurs Infâmes (réputation < 10) via CustomNameplates + LuckPerms rank `infame`.
- **Prénoms RP** : Disponibles dans le Tab (complétion automatique).
- **Report** : Prénom RP OU pseudo MC.

---

## 14. Lore & Arc Narratif

> *Les joueurs sont des explorateurs du multivers ayant franchi un portail instable qui s'est refermé derrière eux. Bloqués sans ressources, ils doivent survivre et réparer le monolithe.*

| Version | Mot-clé | Description | Clôture |
|---|---|---|---|
| V1 | Construction | Arrivée, nations, réparation du monolithe | Event GM : monolithe réparé → portail Capitale actif |
| V2 | Rébellion | Exploration multivers, mondes instables, métiers basiques | Destruction scénarisée de la Capitale |
| V3 | Suprématie | Nouvelle Capitale autoritaire. Réputation. Métiers incomplets. | — |
| V4 | Conquête | Zones d'affluence corrompues. Portails miniers surchargés. | — |
| V5 | Corruption & Faille | Monde minier stable. Portails temporaires craftables. | Joueurs craftent leur premier portail → donjon |
| V6 | Spécialité & Exploitation | Quarries, plantations, branches métier complètes | — |
| V7 | Génération & Génétique | Finalisation métiers. Races possibles. Génétique machines. | — |

---

## 15. Plugins — État complet

### Confirmés

| Plugin | Rôle | Priorité |
|---|---|---|
| Vulcan 2.9.7.23 | AntiCheat secondaire | 🔴 Critique |
| CustomNameplates 3.0.39 | Nameplates RP. Tête de mort Infâme. | 🔴 Critique |
| OxyTowns 1.1.0 | Claims — 1 seul type | 🔴 Critique |
| ProAntiTab 2.3.4 | Masque joueurs dans le Tab | 🟠 Haute |
| LibsDisguises 11.0.18 | Déguisements GM | 🟠 Haute |
| AdvancedBanX 3.1.0 | Warns, mutes, bans | 🔴 Critique |
| AntiXray 3.0 | Masquage blocs côté client | 🔴 Critique |
| Axiom 5.4.2 | Éditeur monde Architectes | 🟠 Haute |
| AxMines 1.7.0 | Zones farm régénérables monde minier | 🟠 Haute |
| BetonQuest | Scripts événements, dialogues PNJ | 🟠 Haute |
| Citizens 2.0.42 | PNJ interactifs | 🟠 Haute |
| CoreProtect-CE 23.2 | Anti-grief, logs, rollback | 🔴 Critique |
| EssentialsX 2.22.1 + Chat/Discord/Link | Commandes staff + chat + Discord | 🔴 Critique |
| FastAsyncWorldEdit 2.15.3 | Terraforming admin | 🟠 Haute |
| Grimac 2.3.74 | AntiCheat principal | 🔴 Critique |
| ItemsAdder 4.0.17 | Items custom | 🟠 Haute |
| LuckPerms 5.5.55 | Rangs et permissions — central à tout | 🔴 Critique |
| Multiverse-Core 5.7.0 | Mondes + portails Nether | 🔴 Critique |
| PlaceholderAPI 2.12.2 | Variables dynamiques | 🔴 Critique |
| PlasmoVoice | Proximity voice | 🔴 Critique |
| ProtocolLib | Packets réseau / GUI | 🔴 Critique |
| SkinsRestorer | Skins custom | 🟠 Haute |
| TAB 6.0.3 | Nametags, tablist, prénoms RP | 🟠 Haute |
| Tebex 2.4.2 | Boutique en ligne | 🟠 Haute |
| Vault | API économique | 🔴 Critique |
| WorldGuard 7.0.17 | Zones protégées | 🔴 Critique |

### À valider pour V1

| Plugin | Besoin | Statut |
|---|---|---|
| ReviveMe | Down state, revive collègue, hôpital, effet visuel | ⏳ À confirmer |
| SaberFactions ou ImprovedFactions | Base groupes/factions, hiérarchie, diplomatie | ⏳ À confirmer |
| ReputationPlugin | Réputation 0-100, seuils, PlaceholderAPI | ⏳ À confirmer |
| AuctionHouse | HDV avec liste blanche items | ⏳ À confirmer |
| ChestProtect | Protection coffres individuelle (max 2/joueur) | ⏳ À confirmer |

### En suspend (versions futures)

| Plugin | Besoin | Version |
|---|---|---|
| EcoCrates | Boutique cosmétique / lootbox | V2 |
| AdvancedJobs | Arbre de métiers | V2 |
| AdvancedSkills | Skills et talents | V2 |
| CustomFishing | Pêche custom | V3 |
| DungeonMMO | Générateur de donjons | V5 |
| Quarry plugin | Machines quarry | V6 |
| Talismans | Items passifs | V6 |

---

## 16. Ce qui a été abandonné

| Mécanique | Remplacée par | Raison |
|---|---|---|
| Pierre de voyage consommable | Portails physiques Multiverse-Core | Trop complexe, portails plus immersifs |
| Agonie 3 minutes | Effet visuel < 3 cœurs + Down ReviveMe | ReviveMe couvre le besoin |
| Coma spectateur ancré 9 chunks | Down state mobile ReviveMe | Comportement natif ReviveMe |
| Matrice droits 4 profils | 2 états membre/non-membre + guerre GM | OxyTowns gère nativement |
| KOTH accord des chefs multi-semaines | GM lance chaque manche | Aucune automatisation nécessaire |
| HDV Steam Market custom | AuctionHouse configuré | Reporté en V2 |
| Pot de taxe physique | Commande /f pay simple | Reporté en V2 RP |
| Système politique (Monarchie, République...) | Joueurs font comme ils veulent | Pas de valeur ajoutée |
| Tête de mort sur joueurs tueurs | Tête de mort sur joueurs Infâmes | Plus cohérent avec la réputation |
| Quarries en V3 | Quarries en V6 | Plugin dédié nécessaire |
| Monde farm cyclique jour/nuit | Monde minier 20h-23h | Plus simple et plus narratif |

---

## 17. Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Excel fonctionnement global / saisons / économie | 🔴 Haute |
| 2 | Factions plugin — choix définitif | 🔴 Haute |
| 3 | ReviveMe — test de compatibilité | 🔴 Haute |
| 4 | Heure limite manches KOTH | 🟠 Moyenne |
| 5 | Valeurs X réputation | 🟠 Moyenne |
| 6 | Mondes instables V2 — contenu | 🟠 Moyenne |
| 7 | Bas-Fonds — fonctionnement complet | 🟠 Moyenne |
| 8 | Portails de poche — durée | 🟡 Faible |
| 9 | V7 Génétique / Races | 🟡 Faible |
| 10 | Salaires internes | 🟡 Faible |

---

## 18. Équipe WayRift

| Rôle | Pseudo | Notes |
|---|---|---|
| Chef de projet | **Ox (Ox60)** | Gestion demandes équipes, structuration, décisions stratégiques |
| Lore & Cohérence | **Hikari** | Supervision lore, cohérence narrative |
| Référent dev + dev | **ExiLie** (+ Tom_ptrs) | Vision large du projet |
| Développeur (IT + dev) | **FrozenSquid** | Site WayRift, IT projet Event |
| Développeur | Ostore | — |
| Développeur | Flobanai | — |
| Développeur | Lethariar | — |
| Développeur | DayStay | — |
| Développeur | MiroTenshi | — |
| Référent build | **Adarish** | Schémas, thèmes et jalons déjà avancés |
| Builder | MoonGlacemm | — |
| Builder + Trame RP | MisterML | Trames RP après ouverture |
| Builder | Kylow | — |
| Builder + Trame RP | Wapanda | Trames RP après ouverture |
| Responsable staff | LoupGris | Recrutement et bonne entente |
| Site web (externe) | BouhBouw | Réalisation du site web WayRift |

> En négociation avec un fournisseur/développeur : 4 VPS + aide au développement.
>
> Staffs potentiels à intégrer : Racine, Furial Primus, Wagz, Anvil0.

---

*WayRift — V3 — Confidentiel — Usage interne uniquement*
