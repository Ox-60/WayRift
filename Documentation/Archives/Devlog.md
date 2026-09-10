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

---

## Session 12 — 2 septembre 2026

### Exploration — Mécaniques inspirées de jeux mobiles (RoK, Lords Mobile, CoC)

⚠️ **Tout ce qui suit est EXPLORATOIRE, post-V5, non confirmé.** Nouveau document séparé créé : `CDC_Recherche_Faction.md`, marqué comme non-développable sans validation.

**Boutique de Faction** — liste complète proposée (Speedups, City/World Teleport, Passport Pages, Points VIP/Tokens, ressources, boosts XP).

**Arbre de Recherche de Faction** — 1 branche commune (Économie : vitesse minage, claims, taxes, recettes craft, coffre, 2ème type d'entreprise) + 3 branches spécialisées selon l'identité de faction : Religion/Bienveillant, Mafia/Infâme, Guerre/Neutre (Nations). Financé par la trésorerie collective.

**Système d'Artefacts** — lié aux Failles/Donjons (pas au Prestige, pour rester une récompense collective de faction plutôt qu'individuelle). Drop rare en donjon difficile → amélioration via ressources+argent → bonus permanent pour toute la faction.

**Décision de documentation** : ce document est isolé des CDC confirmés (section distincte dans le README, disclaimer en en-tête) pour éviter toute confusion avec les spécifications validées pour développement.

---

## Session 13 — 2 septembre 2026

### Pilier de design majeur — Deux couches de gameplay

Nouveau document fondamental créé : **CDC_Gameplay_Layers.md**

**Le problème résolu** : les GM ne peuvent pas créer du RP intime pour une Nation de 100 membres comme ils le font pour un Groupe de 15. Solution : deux gameplay distincts selon le niveau.

**Couche 1 — Groupe & Organisation (monde joueur)** : Free RP + Events RP orchestrés par GM, attention dédiée et intime. Pas d'accès à Recherche/Boutique/Artefacts (volontairement gardé simple).

**Couche 2 — Nation (monde nation)** : Guerre, Politique, organisation interne. L'attention GM bascule à l'échelle de la Nation (événements de guerre, politique inter-nations). Accès complet à Recherche/Boutique/Artefacts.

**Confirmé** : les membres de Nation gardent le Free RP entre eux sans limite — seule l'attention GM dédiée bascule vers l'échelle Nation.

**Nouveaux éléments** :
- **Rôle Émissaire** : seul point de contact officiel entre Nation et petites factions — membres désignés qui traversent les mondes joueurs pour négocier les achats B2B
- **Argent = indicateur de Puissance** (Nation uniquement) — justifie les systèmes de Recherche/Boutique comme puits monétaires
- **Système de Tier (1-5)** — lecture simplifiée de la Puissance existante (0-1000+), pas un nouveau score
- **Avertissement ticket Nation obligatoire** — le joueur doit être prévenu du changement de gameplay avant de valider le passage en Nation

**CDC_Recherche_Faction reclassé** : n'est plus "exploratoire" — statut confirmé comme réservé exclusivement aux Nations, positionné V5+. Coûts précis encore à chiffrer.

### Corrections — Nation totalement hors du système Puissance/Alignement

**Correction majeure** : les Nations sortent COMPLÈTEMENT du système Puissance & Alignement (étoiles rouge/jaune) — ce système reste réservé au Groupe et à l'Organisation uniquement. Les Nations ont leur **propre classement Tier (1-5), totalement indépendant**, basé sur : guerres KOTH gagnées/perdues, paliers de Recherche débloqués, artefacts possédés, trésorerie investie.

**Règles de progression confirmées :**
- Passage en Nation **jamais obligatoire** — une Organisation peut rester à ce palier indéfiniment, transition uniquement via ticket quand la faction le décide
- Recherche débloquée = **acquise définitivement**, pas de rollback si la puissance Nation redescend
- Un joueur ne peut appartenir qu'à **une seule Nation maximum** — s'il a 2 factions et que les deux deviennent Nation, il est éjecté de la dernière à avoir franchi le palier (empêche le cumul de bonus)

**Idées validées** : Émissaire, Saison Nation, Diplomatie inter-nations — toutes confirmées bonnes pistes à détailler plus tard (V5+).

---

## Session 14 — 2 septembre 2026

### Extraction Nation — Nouveau module séparé

**CDC_NationModule.md créé** — toute la mécanique Nation extraite de CDC_FactionModule.md dans son propre document séparé (capacité, mondes, guerres KOTH, Tier, Émissaire, item unique). CDC_FactionModule.md recentré sur Groupe/Organisation uniquement, sans aucune référence Nation restante.

### Réponses V1 intégrées

| # | Sujet | Décision |
|---|---|---|
| 1 | Inactivité réputation | 7 jours consécutifs avec <20% de connexions uniques dans la semaine |
| 2 | Votes top-serveur | Comptent bien dans la limite hebdomadaire ±150 pts |
| 3 | Prix place Nation supplémentaire | 10% du revenu hebdomadaire de la faction au moment de l'achat |
| 4 | Récupération items perdus | Nouveau coffre "Objets Perdus" par joueur — type Ender Chest, retrait uniquement (pas de dépôt manuel), alimenté automatiquement par toute perte (plot, banque, autre) |
| 5 | Durée location housing | Confirmée : par semaine |
| 6 | Gestion plots | Plugin de gestion de plots existant (pas de dev custom), taille max 16×16 (1 chunk), définie à la création |
| 7 | Politique de sauvegarde | Simple : 1 sauvegarde automatique chaque matin, pas de snapshot pré-event pour l'instant |

Tous les points ouverts correspondants nettoyés dans CDC_ReputationModule, CDC_Housing, CDC_Permissions.

### Arbre de Prestige développé — 7 branches

**Correction au passage** : la condition de wipe affichait encore "50 000¢" (ancienne valeur), corrigée en "250 tokens" (valeur actuelle depuis plusieurs sessions).

**7 branches complètes**, +5%/point sauf Robustesse (+1 cœur/point, plafonné à 2 points) :
- **Richesse** — +5% revenus passifs + ventes
- **Savoir** — +5% XP de compte
- **Endurance** — -5% consommation de faim
- **Robustesse** — +1 cœur/point (max 2 points utiles)
- **Combat** — +5% dégâts PvP
- **Charisme** — +5% gains/pertes de réputation (accélère Légendaire OU Infâme)
- **Prospérité** — +2% revenus pour TOUTE la faction du joueur (branche altruiste)

Robustesse plafonnée à 2 points utiles force un joueur à 5 points à diversifier sur au moins 2 branches — renforce le côté "vrai choix" plutôt qu'optimisation unique. Exemples de builds documentés (Magnat, Vétéran, Altruiste, Ambitieux).

---

## Session 15 — 2 septembre 2026

### Réputation — Bonus votes top-serveur

+10 pts/semaine supplémentaires réservés exclusivement aux votes top-serveur, au-delà de la limite générale de ±150. Total max théorique via votes seuls : 160 pts/semaine.

### Arbre de Prestige — Refonte (8 branches, plafond 3 points)

- **Toutes les branches plafonnées à 3 points** (règle uniforme, remplace le cas spécial Robustesse à 2)
- **Nouvelle branche Intelligence** : +5%/point sur l'XP de personnage (métiers/skills) — distincte de Savoir (XP de compte)
- **Prospérité entièrement redesignée** : au lieu de bonus faction, devient un cashback au moment du wipe — chaque point = +10% de l'argent possédé avant le wipe, reversé après. **Seule branche sans plafond** (investissement utile uniquement au wipe suivant, pas de bonus immédiat)
- Robustesse alignée sur la règle commune : +3 cœurs max (au lieu de +2)

### Note sur les vérifications automatiques

Claude ne peut pas se déclencher lui-même à minuit dans ce chat. Pour un contrôle quotidien automatique de cohérence sur le repo GitHub, **Claude Cowork** propose des "Scheduled Tasks" (tâches planifiées récurrentes, tournent même app fermée) — c'est l'outil adapté pour ce besoin, disponible sur les plans payants.

### Prestige — Combat scindé PvP/PvE

- **Combat (PvP)** : plafonné à **1 point seulement** (+5% max) — évite qu'un bonus de dégâts prestige casse l'équilibre PvP entre joueurs
- **Nouvelle branche Chasse (PvE)** : +5%/point sur mobs, plafond normal à 3 points (+15% max)
- Arbre de prestige = 9 branches au total désormais

---

## Session 16 — 2 septembre 2026

### Restructuration majeure du repo

**Tous les CDC renommés avec préfixe de version** (convention alignée sur le reste du repo) :
- 13 CDC → `V1.` (fondations)
- CDC_Housing → `V3.`
- CDC_Recherche_Faction → `V5.`

**Section "Dépendances & Liaisons" ajoutée en bas de chaque CDC** (15 fichiers) — référencement croisé clair entre modules liés.

### Puissance Nation — remplace le Tier 1-5

Le Tier à paliers fixes (1 à 5) est remplacé par un **score compétitif illimité**, cohérent avec l'esprit de compétition permanente entre Nations : nombre de membres actifs + réputation cumulée + argent trésorerie + argent cumulé des membres + guerres KOTH + recherche débloquée + artefacts. Pas de plafond — toujours un objectif à viser, comme un vrai classement.

### Wipe — Ce que le joueur perd (clarification complète)

Ajouté au PlayerModule : le joueur perd son groupe, son logement, et ses relations RP construites au wipe. Mécanique de reconnaissance partielle documentée ("un cousin m'a parlé de vous" — vague, sans détails précis). Intention de design explicitée : pousser les joueurs à accepter la mort et à recommencer, pour prolonger la durée de vie du serveur.

### Ticket Nation — gains ET pertes présentés

Le message d'avertissement du ticket est réécrit pour présenter les deux faces : ce que la faction gagne (Recherche, politique, guerres, Puissance Nation) autant que ce qu'elle perd (attention GM dédiée). Évite l'effet "punition" pour un choix qui doit rester valorisant.

### Corrections mineures
- CDC_Permissions : hiérarchie corrigée (Nation 100 → 75+achat jusqu'à 100, Organisation simple 25 → 30)
- Nettoyage d'un caractère d'encodage parasite dans PlayerModule

---

## Session 17 — 2 septembre 2026

### Dépendances CDC réécrites — focus équilibrage

Les sections "Dépendances & Liaisons" ont été retravaillées : au lieu de simples références croisées, elles précisent maintenant **quoi vérifier et pourquoi** en cas de modification. Chaîne de dépendance économique identifiée : EcoModule (prix blocs/minerais) → FactionModule (coût Groupe), NationModule (prix mondes), Housing (prix plots), Tebex (prix token/kart/coffre banque). Toute modification des prix de base doit déclencher une revérification de tous ces montants dérivés.

### Archétypes de réincarnation — EN SUSPENS

Idée retenue en discussion (nouveau titre narratif à chaque wipe, points cumulés jamais perdus) mais **non confirmée pour développement** — documentée dans CDC_Permissions comme suspendue, pourrait être abandonnée.

---

## Session 18 — 2 septembre 2026

### Trou majeur trouvé et corrigé — Prix items uniques vs coût minerais

**Problème identifié** : le prix constructeur des items uniques (16-22¢) était incohérent avec les prix minerais recalibrés (Fer 76¢, Or/Diamant 95¢) — un crafteur utilisant ces minerais perdrait de l'argent.

**Résolution** : abandon de la fourchette fixe universelle. Le prix constructeur et la recette de chaque item unique sont désormais **gérés manuellement par un GM**, au cas par cas, adaptés à l'utilité réelle de l'item. Nouvelles commandes GM ajoutées (`/e admin create/setprice/setrecipe/editprice`).

### Nouveau principe structurant — Feuille de route par saison dans chaque CDC

Suite à une demande explicite : chaque CDC doit désormais avoir une section **"Feuille de route"** en tête de document, précisant ce qui est nécessaire Saison 1 vs Saison 2+ vs plus tard. Objectif : ne pas surcharger le développement initial avec des systèmes qui ne servent à rien avant plusieurs mois.

**Appliqué à V1.CDC_Entreprises** : tout le système (items customs, coffre, contrats) marqué **non actif en Saison 1-3**, activation prévue Saison 4+ seulement.

**Appliqué à V1.CDC_Tebex** : les 5 points "en réflexion" (glow, fly mode, boosts, Gold XP, messages custom) clairement repoussés en Saison 2+.

> Ce principe devra être étendu progressivement aux autres CDC au fil des prochaines sessions.

### Autres corrections de cette session
- **Contrats B2B** : plus de délai d'expiration fixe — annulation libre à tout moment par n'importe quelle partie (`/e contrat cancel`)
- **Commandes HDV** ajoutées (`/ah sell/list/buy/my/cancel/collect/history/stats`) — utilisables uniquement dans la zone dédiée de la Capitale
- **Incohérence "réputation < 20"** trouvée et corrigée dans EcoModule ET Recap_Projet (ancienne échelle 0-100, doit être < 200 sur l'échelle actuelle 0-1200)
- **Saison Nation fixée à 3 mois**

---

## Session 19 — 2 septembre 2026

### Puissance Nation — Formule de pondération proposée (déséquilibre détecté)

```
Puissance = (argent/10 000) + (victoires×10) + (égalités×5) + (défaites×3)
          + (membres×5) + (|réputation-500|×3) + (artefacts×10) + (recherches×5)
```

⚠️ **Déséquilibre trouvé par simulation** : le facteur réputation domine 4 à 5× tous les autres facteurs combinés (une Nation extrême Infâme/Légendaire écrase une Nation neutre indépendamment de ses guerres/recherche/argent). Asymétrie supplémentaire : distance max au neutre = 500 côté Infâme vs 700 côté Légendaire, avantage mécanique non voulu pour les Nations vertueuses. **Multiplicateur réputation à revoir avant calibrage final.**

### Reset saisonnier Nation — CONFIRMÉ complet

Tous les 3 mois (Saison Nation) : argent trésorerie, recherche débloquée (bonus inclus), artefacts (effets inclus), points de guerre → **remis à zéro intégralement**. Seuls les membres et leur réputation individuelle persistent (appartiennent aux joueurs, pas à la Nation). Chaque saison = vrai nouveau départ compétitif, aucun effet boule de neige permanent entre saisons.

Clarification ajoutée dans Gameplay_Layers pour distinguer ce reset PROGRAMMÉ du principe "pas de rollback organique" (deux mécanismes différents, pas contradictoires).

### Prix constructeur — Correction : la fourchette existe toujours

Précision importante : le système précédent (GM fixe tout manuellement, sans fourchette) était incorrect. En réalité : **le GM fixe un prix initial** par item (adapté à sa recette/utilité), **une fourchette d'ajustement existe autour de cette valeur**, et le chef d'organisation peut l'ajuster dans cette marge. Tous les prix dérivés (vendeur, B2B, majoration) continuent de se calculer automatiquement en % du prix constructeur actuel. Nouvelle commande chef ajoutée (`/e setprice`).

---

## Session 20 — 2 septembre 2026

### Réputation — Correction inactivité (2 règles distinctes)

Correction d'une erreur de fusion précédente :
- **Joueur individuel** : 7 jours sans connexion
- **Faction** : moins de 40% de membres uniques connectés dans la semaine

Ces deux règles avaient été incorrectement fusionnées en une seule ("7j avec <20%") — maintenant clairement séparées entre CDC_ReputationModule (joueur) et CDC_FactionModule (faction).

### Vol de coffre — Nouvelle mécanique item-based

Vol désormais géré via un **item consommable dédié**, sur le principe de l'inspection joueur : révèle 75% du contenu du coffre (aléatoire), le voleur peut prendre jusqu'à 25% du révélé. **Malus de réputation par PILE prise** (-3 pts/pile), pas un malus fixe unique — un vol massif coûte proportionnellement plus cher.

### Claims — Refonte complète du système (Groupe/Organisation)

**Remplace entièrement le système lié à la Puissance.** Nouveau système :
- Claims **achetés** avec de l'argent (prix à définir)
- Nombre max déterminé par la **taille du groupe** : 1 claim pour 2 membres (Groupe 15mb→7 claims, Org. simple 30mb→15, Org. avancée 50mb→25)
- **Règle de contiguïté** : nouveau claim doit être adjacent à un claim existant
- **Zones d'affluence non-claimables**
- Un claim acheté **ne peut plus être retiré** par une chute de Puissance (le système de warning/pénalité 5%/jour est supprimé)

**Nouvelle mécanique — Capture de territoire ("claim sur claim")** : possible uniquement en contexte de conflit validé (événement Organisation ou guerre KOTH Nation). L'attaquant doit rester présent sur la zone pendant un délai (façon point KOTH) pour capturer le claim ennemi. Défenseur peut interrompre en repoussant l'attaquant.

**Conséquence** : la Puissance de Groupe/Organisation perd sa fonction mécanique principale (déterminer les claims). Son nouvel usage reste à définir — probablement un simple indicateur de classement affiché, sans effet mécanique direct pour l'instant (point ouvert prioritaire).

### Puissance Groupe/Organisation — Usage confirmé

**Résolu : purement cosmétique.** Affichée dans `/f top` comme indicateur de prestige, aucun effet mécanique sur le jeu. Cohérent avec le fait que Groupe/Organisation fonctionnent sur du Free RP + events GM, pas sur des mécaniques économiques dures comme les Nations.

### Correction — Puissance PAS purement cosmétique finalement

**Retour en arrière sur la décision précédente** : la Puissance Groupe/Organisation débloque bien des events GM aux extrêmes — **< 200** (contenu "underdog/faction en difficulté") et **> 1000** (contenu "faction dominante") — en plus d'être affichée dans `/f top`.

### Marché noir — Double condition précisée

Accès nécessite : réputation INDIVIDUELLE Infâme (< 100) **ET** appartenance à une faction d'Alignement Infâme (★★★★★ rouge). Les deux doivent être alignés — un joueur Infâme dans une faction vertueuse n'y a pas accès, ni l'inverse.

---

## Session 21 — 2 septembre 2026

### Claims — Nouveau modèle de prix (plafond absolu par palier)

Remplace le modèle "5% à 20% du revenu" par : croissance exponentielle à partir de 5% du revenu hebdo, **plafonnée en ¢ absolus** selon le palier (Groupe 10 000¢, Org simple 20 000¢, Org avancée 30 000¢). Le nombre de claims accessibles n'est plus fixé par le nombre de membres — il se déduit du nombre de claims avant d'atteindre le plafond.

**Résultat observé (à valider)** : Groupe obtient 6 claims, Org simple 5, Org avancée seulement 4 — contre-intuitif (la plus grosse faction a le moins de territoire). Flag ajouté dans la doc pour ajustement futur si besoin.

**Nouvelle condition de montée de palier** : une faction doit avoir acheté tous ses claims accessibles au palier actuel avant de pouvoir passer au palier suivant.

### Idées RP Nations — Confirmées

- **Chroniques de Nation** : lié au rôle Journaliste déjà existant (CDC_Entreprises), pas un nouveau système
- **Sommets de dirigeants** : confirmé, organisé par les GM
- **Trophées de guerre narratifs** : confirmé
- **Blason** : pas besoin de nouveau système — déjà couvert par les bannières Minecraft des joueurs. Piste à creuser : afficher les bannières à plusieurs endroits (ambassade, entrée du monde, documents diplomatiques)

### Claims — Système final validé (12 gratuits + 3×12 payants)

Résultat final choisi : **24-36-48** (plus propre que 24-32-44). Système :
- 12 claims gratuits pour toute nouvelle faction
- Groupe : 12 claims payants de 2 500¢ à 10 000¢
- Organisation simple : 12 claims payants de 10 000¢ à 25 000¢ (reprend où Groupe s'arrête)
- Organisation avancée : 12 claims payants de 25 000¢ à 34 032¢ (reprend où Org. simple s'arrête)

Une seule courbe exponentielle continue traverse les 3 paliers. Totaux cumulés : Groupe 24, Organisation simple 36, Organisation avancée 48.

---

## Session 22 — 2 septembre 2026

### Nettoyage de points ouverts — nombreuses résolutions

- **Contrats B2B** : confirmé aucune limite de contrats actifs simultanés
- **Logs entreprise** : interface scrollable (GUI), pas une commande texte
- **Ajustement prix constructeur** : fourchette fixée à ±10% autour du prix initial GM
- **Coût capture de claim** : confirmé perdu définitivement si la capture échoue
- **Diplomatie inter-nations** : résolu — pas de système dédié, gérée par déplacement physique des joueurs + sommets de dirigeants organisés par GM
- **Mort RP** : confirmé via ticket (pas de contact direct GM)
- **Redistribution prestige** : fixé à 25 tokens (12 500¢ — 10% du coût d'un point neuf, bien calibré)
- **Housing** : revente de plot entre joueurs IMPOSSIBLE, construction interdite hors des plots

### Recherche Nation — Coût évolutif par catégorie

Confirmé : système de coût progressif façon jeux mobiles (RoK/Lords Mobile) — chaque palier coûte plus cher, catégories de recherche avec coûts de base différents (Économie mineure < Identité spécialisée < Ultime).

### Artefacts — Catégories détaillées

Bijoux/colliers (bonus passif, lore fort), armes/armures décoratives (**inutilisables en combat**, symboles de prestige), gemmes, sets multi-pièces avec bonus supplémentaire. Exemples : "Collier du Sage", "Lame du Roi Déchu", "Regalia de l'Ancien Monde".

### Nouveau document — V3.CDC_BasFonds.md

Marché noir (items exclusifs non-HDV), Receleur (rachat d'items volés à prix réduit), Casino (machines à sous, lien avec Rubies déjà établi). Accès double condition (réputation individuelle Infâme + faction Alignement Infâme). Point ouvert : le Casino nécessite-t-il la même double condition que le marché noir, ou est-il ouvert à tous ?

### Nouveau document — V2.CDC_MetiersModule.md

Première vraie pièce du chantier V2 : les 5 branches de métiers (Mysticisme, Guerre, Artisanat, Culture, Divers) déjà établies dans les sessions précédentes, formalisées en CDC dédié avec feuille de route. Confirme que Herboriste/Pêcheur nécessitent V3+ pour leurs mécaniques complètes.

### Scope V2 confirmé

Métiers, Boutique Tebex, HDV, Économie générale, Market — pas de Bas-Fonds en V2 (repoussé V3 avec marché noir/casino). Plugin Events GM doit arriver au plus tard en V2 — déjà satisfait (V1.CDC_Events_GM existe depuis longtemps).

---

## Session 23 — 2 septembre 2026

### Casino — Deux niveaux résolus

Confirmé : **Casino du Bas-Fonds** (double condition Infâme, mises modestes) et **Casino de la Ville Haute** (ouvert à tous, mises plus importantes) — deux versions du même système Rubies/machines à sous pour deux publics différents.

### Métiers — Clarification technique des deux plugins

Recherche effectuée sur AdvancedJobs et AdvancedSkills (documentation officielle) :
- **AdvancedJobs** : système de jobs entièrement personnalisable, aucun nom de métier fixe imposé — nos métiers custom (Médecin, Assassin, etc.) sont construits ici
- **AdvancedSkills** : 14 compétences RPG **natives et fixes** (Mining, Excavation, Fishing, Herbalism, Woodcutting, Swords, Axes, Archery, Crossbow, Trident, Defense, Acrobatics, Alchemy, Elytra) qui montent en niveau passivement en arrière-plan, indépendamment du métier choisi

Table de correspondance ajoutée entre nos branches de métiers custom et les 14 compétences natives (ex: Guerrier ↔ Swords/Axes/Defense, Éclaireur ↔ Archery/Acrobatics, Herboriste ↔ Herbalism/Alchemy).

---

## Session 24 — 2 septembre 2026

### Métiers — Piste Expertise documentée EN DISCUSSION (non décidé)

Idée explorée mais **pas encore validée par l'équipe Ox** : 2 métiers max (3 VIP, 4 Premium), mais 1 seule Expertise active à la fois (changement possible toutes les 2 semaines). Chaque métier divisé en partie Commune (toujours accessible) et Expertise (spécialisation verrouillée).

Vérifié techniquement : compatibilité Expertise/AdvancedSkills faisable via PlaceholderAPI, personnalisation du plugin AdvancedSkills confirmée possible ("Create Your Own Skills").

Documenté dans CDC_MetiersModule avec bandeau "EN DISCUSSION" clair — à ne pas développer avant confirmation explicite de l'équipe.

---

## Session 25 — 2 septembre 2026

### Réorganisation — "CDC" réservé aux vrais développements

Suite à une demande explicite : le préfixe "CDC" doit être réservé uniquement aux documents décrivant du contenu à développer (plugin, mécaniques codées). Le reste devient de simples documents descriptifs.

**Renommé** : `CDC_Gameplay_Layers.md` → `Gameplay_Layers.md` (aucune commande, aucune config — pur pilier de design conceptuel, jamais eu de dev associé).

**Nouveau document** : `Ajouts_Narratifs_V2.md` (pas un CDC) — regroupe Mondes Instables et Destruction de la Capitale, deux éléments purement narratifs/GM sans aucun développement requis. Évite de créer des CDC vides de contenu technique pour du pur RP.

### Confirmations rapides

- Passage d'accès au Bas-Fonds : géré par les builders (level design), pas de documentation nécessaire
- Marché noir : pas d'idée de contenu pour l'instant, à définir plus tard
- HDV : aucun changement prévu entre V1 et V2
- Coût recherche Nation (15% → 45% du revenu hebdo, +5%/recherche) : validé, bien calibré face aux autres coûts établis (79k¢ à 238k¢, proportionné face aux mondes à 1.59M-3.71M¢)
- "Économie générale/Market" : pas de trou réel identifié, déjà entièrement couvert par CDC_EcoModule
