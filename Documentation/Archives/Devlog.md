# Devlog — Journal des modifications

> Ce document liste toutes les modifications et décisions par session, du plus récent au plus ancien.
> Conçu pour que l'équipe puisse voir rapidement ce qui a changé sans relire tous les documents.

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

WayRift est un serveur Minecraft Semi-RP Multivers inspiré du genre Civilisation, développé sous **Any-Way Studio** (qui gère aussi Waystone MC Event). Paper 1.21, plugins uniquement, hébergé sur OVH Game (anti-DDoS).

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
