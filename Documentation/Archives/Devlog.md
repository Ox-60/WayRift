# Devlog — Journal des modifications

> Ce document liste toutes les modifications et décisions par session, du plus récent au plus ancien.
> Conçu pour que l'équipe puisse voir rapidement ce qui a changé sans relire tous les documents.

---

## Session 5 — 28 août 2026

### Réputation — Nouvelles actions et calibrage final

**Échelle 0-1000 adoptée** (neutre 500, Légendaire 800, Infâme < 100)

Nouvelles actions ajoutées :

| Action | Effet | Limite |
|---|---|---|
| Créer des potions positives | +1 pt | Max +5 pts/jour |
| Nourrir des animaux | +1 pt | Max 3 fois/jour (1 fois/2h) |
| Planter et récolter | +1 pt | Max 3 fois/jour |
| Pêcher (Pêcheur V3+) | +1 pt | Max 3 fois/jour |
| Contrat entreprise | +5 pts | Max 1 fois/jour |
| Acheter une parcelle | +5 pts | Par achat (V3+) |
| Attaque sans Down hors guerre | -1 pt | Max 3 fois/jour |

- Plafond micro-actions combinées : **+10 pts/jour max**
- Warn ×10 (-50 pts vers 500) / Mute ×10 (-100) / Ban ×10 (-200)
- Revive : +4 pts / Don public : +6 pts

**Logique factions Infâmes** — état assumé et voulu, pas une punition. Les Infâmes ont leurs propres avantages (Bas-Fonds V3, events malveillants GM, vol/racket sans malus entre eux).

### Métier Pêcheur ajouté

- Branche Culture, spécialisation 3
- Disponible en V3+
- Pêche de poissons rares, poissons custom ItemsAdder
- Bonus réputation +1 (max 3/jour)

### Vol & Racket — Mécaniques documentées

**Règle centrale** : le malus s'applique uniquement si le **voleur/racketteur a une réputation > 300**.

| Mécanique | Malus | Condition |
|---|---|---|
| Vol dans un claim | -3 pts (voleur) | Si voleur > 300 pts |
| Racket sur Down (1 slot) | -3 pts (racketteur) | Si racketteur > 300 ET victime > 300 |
| Racket via inspection (1 slot) | -3 pts (racketteur) | Si racketteur > 300 ET victime > 300 |

**Inspection — conditions physiques** :
- Inspecteur : SPYGLASS en main
- Cible : dos à l'inspecteur, 2 blocs max, mains vides
- 75% de l'inventaire révélé aléatoirement (quantités non affichées)
- La cible peut accepter (1 slot pris) ou refuser (risque de se faire mettre en Down)

---

## Session 4 — 27 août 2026

### CDC Tebex — Détails finalisés

**Housing — Système de plots par catégorie**
La Capitale dispose de zones de logement (housing) divisées en parcelles appelées "plots". Ces plots sont définis et délimités physiquement par le responsable builder sur la map. Chaque plot appartient à une catégorie (1, 2 ou 3) qui détermine sa taille et son emplacement dans la Capitale. L'accès à chaque catégorie dépend du rang VIP du joueur :
- **Catégorie 1** : Joueur et VIP — plots standard, zone dédiée aux joueurs sans rang premium
- **Catégorie 2** : VIP+ — plots plus grands ou mieux situés
- **Catégorie 3** : VIP Premium — plots premium, meilleur emplacement et/ou surface

| Point | Décision |
|---|---|
| Skins VIP+ et Premium | **2 skins distincts** — un skin VIP+ et un skin Premium séparés |
| Taxes par rang | Joueur : 100% / VIP : 80% / VIP+ : 70% / VIP Premium : 50% |
| Expiration contrats B2B | **2 jours** avant annulation automatique |
| Faim réduite | VIP+ : **-25%** / VIP Premium : **-50%** (consommation de nourriture passive réduite) |
| Prix abonnements | VIP : **12$/mois** / VIP+ : **25$/mois** / VIP Premium : **45$/mois** |

**Pets — Bébés animaux qui suivent le joueur**
Les pets sont des versions bébé d'animaux qui suivent le joueur partout comme un animal de compagnie. Chaque rang VIP débloque un niveau de pet supérieur. Un joueur VIP+ a accès aux pets Commun ET Rare.

| Niveau | Disponible dès | Animaux |
|---|---|---|
| Commun | Joueur | Chat, Chien, Cochon, Poule, Mouton, Lapin, Perroquet |
| Rare | VIP+ | Chèvre, Poisson globe, Abeille, Tatou, Chauve-souris |
| Légendaire | VIP Premium | Lama, Sniffer, Axolotl, Ghast gentil, Poule chevauchée |

**Principe économique — Surplus VIP**
Le bonus de salaire lié au rang VIP (ex : +10% pour VIP) est **créé ex nihilo** par le serveur — il n'est pas prélevé sur la trésorerie de la faction ou du serveur. C'est une injection de monnaie directe en récompense de l'abonnement.

**En réflexion (pas encore validé)**
Glow effect (halo lumineux selon le rang), fly mode dans les parcelles housing, messages custom de connexion, badges de rang, boosts XP hebdomadaires (x1.5 ou x2 selon rang, 1h/semaine), Gold XP (+1.2x sur ventes et crafts).

---

### CDC Entreprises — Coffre de faction finalisé

**Coffre de faction — fonctionnement physique**
Le coffre de faction est un bloc physique placé dans le QG de l'organisation. Il donne accès à une interface virtuelle de stockage. Deux interactions possibles :
- **Clic gauche** : dépose immédiatement les items custom sans ouvrir l'interface (pour les crafteurs — ils n'ont pas besoin de voir le contenu du coffre, juste de déposer leur production)
- **Clic droit** : ouvre l'interface complète du coffre

Les crafteurs n'ont besoin que de la permission `crafter-items-custom` pour déposer via clic gauche — pas de la permission d'accès au coffre.

**Items non activés**
Les items craftés sont dans un état "non activé" à leur sortie. Ils ne peuvent pas être droppés, échangés entre joueurs ou utilisés. Ils doivent obligatoirement être déposés dans le coffre de faction. Ils s'activent soit lors d'une livraison de contrat validée par l'acheteur, soit quand un Responsable les retire du coffre pour les distribuer en interne.

**Contrats non livrés**
Si le vendeur ne livre pas, l'acheteur ne valide pas le contrat. Le contrat expire automatiquement après **2 jours** et est annulé sans transaction.

| Permission | Ce qu'elle autorise |
|---|---|
| `crafter-items-custom` | Dépôt clic gauche — items custom uniquement, aucun autre bloc |
| `acceder-coffre-faction` | Ouverture de l'interface coffre (clic droit) |
| `vendre-items-crafts` | Retrait des items custom pour répondre aux contrats |
| `responsable` (si chef autorise) | Retrait pour distribution interne et activation des items |
| `magasinier` | Dépôt ET retrait de n'importe quel bloc |

---

## Session 3 — 26 août 2026

### Corrections majeures — Mort & Coma

| Avant | Après |
|---|---|
| Avertissement vie < 3 cœurs | Avertissement vie **< 2 cœurs** (effet visuel troublé) |
| Down/Coma PvP uniquement | Down/Coma **à 0 HP toute cause** (PvP ET mobs) |

### Guerres — Restriction aux Nations uniquement

Les guerres formelles de type KOTH (King of the Hill) sont désormais **réservées aux Nations** (niveau 3 de la hiérarchie). Les organisations (niveau 2) n'ont pas accès aux guerres formelles — elles ont à la place des **événements organisés conjointement par les chefs d'organisation et les GM** (tournoi, défi RP, chasse au trésor, etc.).

| Avant | Après |
|---|---|
| Guerres possibles à tous les niveaux | Guerres KOTH = **Nations uniquement** |
| — | Organisations = **événements GM + chefs** (pas de guerres) |

### Portails — 4 types définis

| Type | Comportement | Usage |
|---|---|---|
| **Instable** | Se referme après le passage d'un joueur — usage unique | Portails brisés du lore |
| **Stable** | Reste ouvert tant qu'il est activé | Navigation standard entre mondes |
| **Temporel** | Accès permanent vers le passé du monde joueur | Monde minier uniquement — justifie l'absence de ressources dans le monde actuel |
| **Faille** | Item acheté en jeu, posé au sol à une position ciblée, ouvre un portail temporaire vers un autre monde | Accès aux donjons (V5+) — item consommé à la pose |

### Commerce B2B — Clarification

Les organisations possédant un item unique (appelées "constructrices") ne peuvent le vendre qu'à d'autres organisations ou nations. Les organisations et nations qui achètent cet item pour le revendre (non-constructrices) peuvent le vendre aux joueurs individuels, mais à un prix minimum de **prix constructeur + 25%**.

| Entité | Peut vendre aux joueurs ? | Prix minimum |
|---|---|---|
| Organisation/Nation **constructrice** | ❌ B2B uniquement | Prix constructeur |
| Organisation/Nation **non-constructrice** | ✅ Oui | Prix constructeur **+25% minimum** |

### Système de revenus — Flux complet

Sur chaque vente d'item custom par une organisation :

```
30% -> Crafteur (reçu à chaque item déposé dans le coffre)
25% -> Vendeur (reçu à la validation de la livraison)
45% -> Organisation (trésorerie — redistribuable en primes ou achats)
```

Les pourcentages sont paramétrables par le chef d'organisation dans les fourchettes définies par les admins. Les admins définissent aussi le prix constructeur min/max global.

### Nouveau CDC créé cette session
**CDC_Tebex.md** — Rangs VIP complets avec avantages, kart, housing, pets, skins, coffre banque, prix.

---

## Session 2 — Juillet 2026

### Simplifications adoptées

| Mécanique originale | Remplacée par | Raison |
|---|---|---|
| Agonie 3 minutes (Slowness/Blindness/timer) | Effet visuel < 2 cœurs + Down state ReviveMe | ReviveMe couvre le besoin nativement |
| Matrice droits 4 profils (Habitant/Ennemi/Visiteur/V-Ennemi) | 2 états : membre / non-membre + guerre GM | OxyTowns gère nativement |
| KOTH avec accord des chefs et manches multi-semaines | GM lance chaque manche avec commande | Aucune automatisation nécessaire |
| HDV Steam Market custom (graphique, paliers) | AuctionHouse configuré avec liste blanche | Reporté en V2 quand le serveur a des données |
| Pot de taxe physique | Commande `/f pay` simple | Reporté en V2 comme élément RP |

### Hiérarchie entités finalisée

```
Groupe (XX membres max)
  └-> Organisation simple (25 membres max) — ticket staff + 10 membres actifs + 7j activité
        └-> Organisation avancée (50 membres max) — ticket staff + 15 membres actifs + hiérarchie libre
              └-> Nation (100 membres max) — ressources + argent + ticket staff + monde dédié
```

### Ajouts session 2

- Lore fondateur formalisé : explorateurs du multivers, portail instable, monolithe à réparer
- Arc narratif V1→V7 avec mots-clés et clôtures de version
- Réputation joueur 0-100 : 6 paliers (Légendaire / Honorable / Neutre / Neutre bas / Suspect / Infâme)
- Vote réputation via paiement impôts de faction
- Système entreprises : coffre de faction, contrats, permissions, logs horodatés

### CDC créés cette session
WorldModule, PortalModule, PlayerModule, FactionModule, EcoModule, ReputationModule, DisplayModule, Entreprises

---

## Session 1 — Juin 2026

### Concept fondateur

WayRift est un serveur Minecraft RP Multivers inspiré du genre Civilisation, développé sous **Any-Way Studio** (qui gère aussi Waystone MC Event). Paper 1.21, plugins uniquement, hébergé sur OVH Game (anti-DDoS).

### Premières décisions clés

- Monnaie unique globale : les Oboles (¢)
- Déplacements via portails physiques Multiverse-Core Nether Portals (pas de TP par commande pour les joueurs)
- **Lore clé** : le monde minier est le passé du monde joueur — les joueurs vont dans le passé miner, ce qui explique pourquoi le monde actuel est vide de ressources
- Monde minier ouvert 20h-23h chaque soir. Jour 0 (ouverture du serveur) : 24h/24 pendant 48h
- Régénération automatique du terrain hors claim chaque mardi à 10h
- Capitale : hub central ouvert 24h/24 avec tous les services

### Plugins confirmés (liste complète dans Roadmap_V1.md)

Vulcan, CustomNameplates, OxyTowns, ProAntiTab, LibsDisguises, AdvancedBanX, AntiXray, Axiom, AxMines, BetonQuest, Citizens, CoreProtect, EssentialsX + Chat/Discord/Link, FastAsyncWorldEdit, Grimac, ItemsAdder, LuckPerms, Multiverse-Core, PlaceholderAPI, PlasmoVoice, ProtocolLib, SkinsRestorer, TAB, Tebex, Vault, WorldGuard

---

## Points encore ouverts (à traiter en priorité)

| # | Sujet | Priorité | Description |
|---|---|---|---|
| 1 | Métiers | Haute | Arbre défini mais aucun détail sur la progression, les prérequis, les capacités exactes de chaque métier |
| 2 | Saisons / Événements | Haute | Un fichier Excel avec ces données n'a jamais été intégré dans la documentation |
| 3 | Bas-Fonds | Moyenne | Mentionné dans tous les docs mais fonctionnement jamais détaillé (items, règles, accès exact) |
| 4 | Housing / Parcelles | Moyenne | Catégories 1/2/3 définies mais pas la taille des plots, localisation, règles d'achat/location |
| 5 | Réputation faction | Moyenne | Système -100 à +100 mentionné mais jamais documenté en détail |
| 6 | Donjons / Failles | Moyenne | Concept posé (Faille V5+) mais aucune mécanique de donjon définie |
| 7 | Valeurs X réputation | Moyenne | Les deltas de réputation par action (vote fiscal, agonie, etc.) ne sont pas calibrés |
| 8 | Boosts VIP | En réflexion | Multiplicateurs exacts, fly mode parcelles, glow effect — pas encore validés |
| 9 | Monde minier V3/V5 | Faible | Warzones (V3) et zones défendables (V5) pas encore documentées |

---

*WayRift — filiale de Any-Way Studio — Confidentiel*

---

## Session 6 — 30 août 2026

### Réputation — Calibrage final (échelle 0-1200)

| Paramètre | Valeur |
|---|---|
| Départ | 500 pts |
| Limite hebdo | ±150 pts cumulés |
| Infâme | < 100 pts |
| Suspect | < 200 pts |
| Honorable | ≥ 750 pts |
| Légendaire | ≥ 1000 pts |
| Maximum | 1200 pts |

Trajectoires validées :
- Modéré bienveillant (+80/sem) → Légendaire en ~6-7 semaines (S6-S7)
- Modéré mafia (-80/sem) → Infâme en ~5 semaines (S5)
- Urgence event GM : +100 pts possible en 1 semaine pour repasser au-dessus de 100

### Tokens & Prestige — Calibrage final

| Paramètre | Valeur |
|---|---|
| Prix token en jeu | ~150¢ |
| Prix token Tebex | 5€ pour 100 tokens |
| Lootbox | 100 tokens = 5€ |
| Wipe prestige | 250 tokens |
| Farm actif (250 tokens) | ~8 semaines |
| Farm modéré −40% (250 tokens) | ~10 semaines |

Wipe prestige conditions : 250 tokens + niveau de compte (10/20/30/40/50 puis tous les 5) OU mort RP sur demande.
Points de prestige et tokens gardés à la mort.

### Permissions — Corrections

- Suppression système monde attitré, exil, /habite
- PvP toujours actif (sauf zones protégées définies)
- Modéré : surveillance silencieuse uniquement
- Modérateur RP : peut intervenir physiquement en jeu
- CM : Discord et hors jeu uniquement, aucune commande en jeu

---

## Session 7 — 2 septembre 2026

### Prix définis — Économie complète

| Élément | Prix/Règle |
|---|---|
| Prix constructeur item unique | Référence 8¢, fourchette ×3 (2.7¢ à 24¢) |
| Prix vendeur B2B/B2C | Référence 12¢, fourchette ×3 (4¢ à 36¢) |
| Location housing | 35% du prix d'achat/semaine (⚠️ élevé — 66% revenu hebdo modéré) |
| Kart boutique | 2 500-3 000¢ selon rang (corrigé depuis 125¢, jugé trop bas) |
| Coffre banque — cases | 250¢ base, ×2-10% par case suivante, plafond 10 000¢ |
| Arbre de prestige | +5% par point investi (sauf Vie : +1 cœur/point, max +2) |

### Rééquilibrage économique complet (suite session 6)

- Groupe (S2+) : 35 000¢ (5 membres actifs, 3 jours)
- Nation : semaines cibles 7/9/12/16, coût réduit à 10% trésorerie (4x moins cher, pré-quarries)
- Housing : 4 catégories, prix ronds 30k/45k/55k/60k¢
- Token : 500¢/token (recalculé pour cible 8-10 semaines)

### Point ouvert restant
- Prix des blocs individuels (Excel dédié, à travailler ensemble)

### Ajustements — même session

- Kart : prix unique **2 500¢** pour tous les rangs VIP (au lieu de 3 paliers)
- Location housing : **15%** du prix d'achat/semaine (comparé à 20%, jugé trop élevé — 76% du revenu hebdo en Cat.4)
- Prix constructeur : **16-22¢** (fourchette directe, remplace la formule ×3)
- Prix vendeur : **24-32¢** (fourchette directe, remplace la formule ×3)

---

## Session 8 — 2 septembre 2026 (suite)

### Nouveau système de prix — Rareté + Marché dynamique

Remplace le modèle pondéré flat (80% commun/20% rare) par un système plus riche :

**Prix de base par rareté** — calibré sur le taux de spawn Minecraft vanilla :
Charbon 1¢, Cuivre/Fer 2¢, Redstone 6¢, Lapis 12¢, Or 20¢, Diamant 25¢, Émeraude 40¢, Débris antique 50¢.

**Marché dynamique** — la Capitale achète à prix fluctuant : beaucoup de ventes → prix baisse, peu de ventes → prix remonte (autour du prix de base).

**Coefficient de marché** — la moyenne des prix actuels de tous les minerais génère un coefficient qui ajuste proportionnellement d'autres prix indexés (tokens, parcelles housing).

**Prix définis par les joueurs** — à l'Autel des Ventes (nouvelle interface), dans la fourchette calibrée par le prix de base.

> ⚠️ Ce nouveau système remplace conceptuellement le modèle plat 1.8¢/bloc utilisé dans les simulations économiques précédentes. Une refonte complète des simulations avec ce système sera nécessaire une fois la liste complète des ressources et leurs taux de spawn définie.

### Précisions — Minerais vs Blocs classiques

- **Fluctuation marché** : réservée aux minerais uniquement (Charbon, Fer, Or, Diamant, etc.)
- **Blocs classiques** (bois, pierre, terre...) : prix fixé librement par les joueurs à l'Hôtel des Ventes, fourchette 0.01¢-10¢ selon rareté overworld
- **Rendements réels intégrés** : Redstone (4-5 items/bloc) et Lapis (4-9 items/bloc, moy 6.5) — prix/item ajusté à 1¢ pour ces deux ressources afin de préserver Fer/Or/Diamant (8-10¢) comme les plus rentables par bloc miné
- **Débris antique** fortement augmenté à 120¢/item (bien au-delà de l'Émeraude à 40¢) pour refléter sa rareté extrême

### Farmabilité — Nouveau critère de prix

Principe ajouté : **une ressource farmable (renouvelable) doit coûter moins cher** qu'une ressource équivalente en rareté mais finie, pour éviter les abus de farm infini.

Ajustements appliqués :
- **Mycélium** (se propage) : 2.5¢ → 0.6¢
- **Prismarine** (ferme à Gardiens) : 3¢ → 1.2¢
- **Corail** (non-farmable confirmé) : 3.5¢ → 4¢ (légère hausse)
- **Sculk** (non-farmable confirmé) : 10¢ → 12¢ (légère hausse)
- **Améthyste bourgeonnante** (bloc source, génère mais se détruit si miné) : 18¢ → **28¢**
- **Éclat d'Améthyste** (item, drop des grappes, renouvelable) : nouveau, 3¢ — distinct du bloc source

### Bloc suspect — Reclassé

Ce n'est pas un bloc minable/revendable — c'est un mécanisme d'archéologie (brossage de structures rares donnant un loot aléatoire). Sorti du tableau de prix. Point ouvert : définir sa propre table de loot.

### Recalibrage final — Minage sauvage vs cibles horaires

Comparaison minage sauvage (mix réaliste selon spawn) vs farming industriel (bois, mycélium, améthyste — Gardiens exclus) :

| Approche | Revenu/h (avant recalibrage) |
|---|---|
| Minage sauvage | 565¢/h |
| Farming industriel (moyenne, sans Gardiens) | ~265¢/h |

**Règle serveur clarifiée : fermes autorisées uniquement si réalistes.** Fermes à mobs automatisées (tours à mobs, Gardiens optimisés) interdites — non RP. Ferme à Gardiens retirée des exemples de farming industriel.

**Prix minerais recalibrés ×9.5** pour que le minage sauvage atteigne les revenus horaires cibles (actif 3656¢/h, modéré 1582¢/h, casual 661¢/h) :

Charbon 10¢, Redstone 10¢ (45¢/bloc), Lapis 10¢ (65¢/bloc), Cuivre 19¢, **Fer 76¢**, **Or 95¢**, **Diamant 95¢**, Émeraude 380¢, Débris antique 1 140¢.

Résultats obtenus : Actif ~3482¢/h, Modéré ~1513¢/h, Casual ~638¢/h — proches des cibles.

---

## Session 9 — 2 septembre 2026 (suite)

### Nation — Semaines cibles ajustées

Nouvelles cibles : 6 / 7.5 / 10 / 14 semaines (au lieu de 7/9/12/16).

| Monde | Semaines | 40 membres | 75 membres |
|---|---|---|---|
| Plat | 6 | 250 000¢ | 480 000¢ |
| Généré | 7.5 | 320 000¢ | 600 000¢ |
| Importé | 10 | 420 000¢ | 800 000¢ |
| Custom | 14 | 600 000¢ | 1 120 000¢ |

> ⚠️ Confirmé explicitement : ce sont des montants **collectifs** (28 à 53 membres actifs), pas solo.

### Tokens — Nouvel usage

Les tokens servent désormais aussi à **acheter des parcelles housing**, en plus du wipe prestige.

### Rubies — Système clarifié

- **Non achetables** en jeu ni en argent réel — monnaie de jeu de hasard uniquement
- Obtenues via les **machines à sous** du casino
- Servent à tenter sa chance pour gagner skins et **pets**
- Les pets gagnés sont utilisables **uniquement si le joueur a un rang VIP actif** au moment de l'utilisation

### Kart — Règles renforcées

- **Nécessite un abonnement VIP actif pour être utilisé** (peu importe comment il a été acquis)
- Durabilité uniformisée à **24 utilisations** (au lieu des anciennes valeurs tiered 5/10/20)
- Joueur sans VIP : kart totalement inutilisable

### Skins dédiés de faction

Un skin dédié de groupe/organisation/nation débloque le skin pour **tous les membres actuels et futurs** de la faction (pas juste l'acheteur) — d'où un prix plus élevé qu'un skin individuel classique.

### HDV — Seuil confirmé

Seuil de réputation 200 (déjà en place) confirmé comme excluant à la fois Infâme (0-99) et Suspect (100-199) — un joueur doit être au minimum Neutre bas pour accéder à l'HDV.

### B2B — Prix et flux de paiement clarifiés

**Fourchette de prix B2B : 125% à 150% du prix constructeur** (remplace l'ancienne fourchette implicite).

**Nouveau flux de paiement précis :**
```
Au dépôt (instantané) : Crafteur reçoit 30% du prix CONSTRUCTEUR par item
À la vente : Vendeur reçoit 25% du prix CONSTRUCTEUR
La faction reçoit tout le reste du prix de VENTE RÉEL (125-150%)
```
Vendre au prix maximum (150%) profite directement à la faction — crafteur et vendeur touchent un montant fixe peu importe le prix de vente final.

---

## Session 10 — 2 septembre 2026 (suite)

### Corrections majeures — Membres, Nation, Paiement crafteur

**Membres max révisés :**
- Groupe : 15 (inchangé)
- Organisation simple : **30** (était 25)
- Organisation avancée : 50 (inchangé), condition simplifiée à **18 membres différents connectés/semaine** (au lieu de 15 actifs + hiérarchie)
- Nation : **aucun minimum requis** — une faction de 30 joueurs peut devenir Nation si elle remplit les conditions standard (ressources+argent+ticket). Capacité max **75** (50 gratuit + achat places 51-75)

**Erreur corrigée — "hiérarchie libre" :** cette liberté existe **dès le niveau Groupe**, ce n'est pas une exclusivité de l'Organisation avancée. Sa seule vraie différence = plus de capacité (50 vs 30).

**Nation — Prix FIXE (pas de fourchette) :**
- Calculé sur référence **50 membres actifs (35 réels)**
- Dédicace du revenu passée de 10% à **50%** (rend la Nation bien plus significative face au Prestige individuel)

| Monde | Prix fixe | Semaines @ 50mb |
|---|---|---|
| Plat | 1 590 000¢ | 6 |
| Généré | 1 990 000¢ | 7.5 |
| Importé | 2 650 000¢ | 10 |
| Custom | 3 710 000¢ | 14 |

Temps réel selon taille réelle de la nation (prix identique) :
- 30 membres : 10 à 23.4 semaines
- 50 membres (référence) : 6 à 14 semaines
- 75 membres : 4 à 9.4 semaines

**Paiement crafteur — précision importante :** l'argent versé au crafteur (30% prix constructeur, instantané au dépôt) est **créé par le serveur (ex nihilo)** — jamais déduit de la banque de faction. Seuls le vendeur (25%) et la faction (le reste) touchent de l'argent issu de la vraie transaction de vente.

### Ajustements — même session (suite)

- **Capacité Nation revue** : 75 membres gratuits (au lieu de 50), extension payante jusqu'à **100** (au lieu de 75). Référence de calcul prix (50 membres) inchangée — c'est un paramètre séparé de la capacité.
- **Token vérifié** : 500¢/token toujours valide après recalibrage minerais — 8.3 semaines en farm modéré (cible 8-10 respectée)
- **Location Cat.4 (9000¢/sem)** : faisable en farm actif (25.8% revenu hebdo) ou avec revenus d'entreprise en plus. Serré mais possible en farm modéré seul (59.5%)
- Organisation avancée ajoutée à la table de synthèse (gratuite, seuil 18 membres connectés/semaine)

---

## Session 11 — 2 septembre 2026

### Failles/Donjons — Mécanique de mort clarifiée

Suite à une discussion avec un partenaire externe sur un système de mini-jeu donjon, la gestion de la mort en instance a été précisée :

- **Aucun équipement fourni** par le donjon — les joueurs apportent leur propre stuff
- **Mort en instance = éjection simple**, PAS le cycle Down/Coma/Wipe standard du serveur RP
- Le donjon reste un espace de jeu séparé, avec ses propres enjeux, sans mélanger les conséquences RP lourdes
- Justification narrative à rédiger ultérieurement (pourquoi la mort "éjecte" plutôt que de déclencher le système normal)

Point ouvert restant : que se passe-t-il si le portail se ferme (15 min écoulées) pendant qu'un joueur vivant est encore dans l'instance ?
