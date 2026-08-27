# Devlog — Journal des modifications

> Ce document liste **toutes les modifications et décisions** par session, du plus récent au plus ancien.
> Conçu pour que l'équipe puisse voir rapidement ce qui a changé sans relire tous les documents.

---

## Session 4 — 27 août 2026

### CDC Tebex — Points ouverts résolus

| Point | Décision |
|---|---|
| Housing zones | Plots définis par le responsable selon les catégories |
| Skins VIP+ et Premium | **2 skins distincts** — un skin VIP+ et un skin Premium séparés |
| Taxes par rang | Joueur : 100% / VIP : 80% / VIP+ : 70% / VIP Premium : 50% |
| Expiration contrats B2B | **2 jours** avant annulation automatique |
| Faim réduite | VIP+ : **-25%** / VIP Premium : **-50%** |
| Pets — liste complète | Commun : chat, chien, cochon, poule, mouton, lapin, perroquet<br>Rare : chèvre, poisson globe, abeille, tatou, chauve-souris<br>Légendaire : lama, sniffer, axolotl, ghast gentil, poule chevauchée |
| Prix abonnements | VIP : **12$/mois** / VIP+ : **25$/mois** / VIP Premium : **45$/mois** |

### Principe économique — Surplus VIP
Le bonus de salaire VIP est **créé ex nihilo** — non prélevé sur la trésorerie de la faction. C'est de la monnaie injectée directement en récompense de l'abonnement.

### En réflexion (pas encore validé)
Glow effect, fly mode dans les parcelles, messages custom de connexion, badges, boosts XP hebdomadaires (x1.5/x2), Gold XP (+1.2x sur ventes et crafts).

---

### CDC Entreprises — Coffre de faction finalisé

| Point | Décision |
|---|---|
| Type de coffre | Bloc physique → interface virtuelle au clic droit |
| Clic gauche | Dépôt direct crafteur **sans ouvrir l'interface** (pas besoin de `acceder-coffre-faction`) |
| Items non activés | Non échangeables, non droppables — **obligatoirement déposés en coffre** |
| Contrats non livrés | Acheteur ne valide pas → expiration après **2 jours** → annulation automatique |
| Activation des items | À la livraison validée OU au retrait par un Responsable pour distribution interne |

### Permissions coffre de faction

| Permission | Ce qu'elle autorise |
|---|---|
| `crafter-items-custom` | Dépôt clic gauche — items custom uniquement, aucun autre bloc |
| `acceder-coffre-faction` | Ouverture de l'interface coffre (clic droit) |
| `vendre-items-crafts` | Retrait des items custom pour répondre aux contrats |
| `responsable` (si chef autorise) | Retrait pour distribution interne (activation des items) |
| `magasinier` | Dépôt ET retrait de n'importe quel bloc |

---

## Session 3 — 26 août 2026

### Corrections majeures — Mort & Coma

| Avant | Après |
|---|---|
| Avertissement vie < 3 cœurs | Avertissement vie **< 2 cœurs** |
| Down/Coma PvP uniquement | Down/Coma **à 0 HP toute cause** (PvP ET mobs) |

### Guerres — Restriction aux Nations

| Avant | Après |
|---|---|
| Guerres possibles à tous les niveaux | **Guerres KOTH = Nations uniquement** |
| — | **Organisations** = événements organisés par les chefs et les GM |

### Portails — 4 types définis

| Type | Comportement |
|---|---|
| **Instable** | Se referme après le passage d'un joueur |
| **Stable** | Reste ouvert tant qu'il est activé |
| **Temporel** | Accès permanent vers le passé — Monde minier uniquement |
| **Faille** | Item acheté en jeu, posé au sol, ouvre un portail vers un autre monde à la position ciblée — durée limitée |

### Commerce B2B — Clarification

| Entité | Peut vendre aux joueurs ? | Prix minimum |
|---|---|---|
| Organisation/Nation **constructrice** | ❌ B2B uniquement | Prix constructeur |
| Organisation/Nation **non-constructrice** | ✅ Oui | Prix constructeur **+25% minimum** |

### Système de revenus — Flux complet

```
Craft -> Dépôt coffre -> Crafteur reçoit 30% du prix constructeur par item
Vente -> Vendeur reçoit 25% du montant de la vente
Reste -> Organisation (trésorerie, redistribuable)
```
- Pourcentages paramétrables par le chef (dans les fourchettes définies par les admins)
- Prix constructeur, prix vendeur, min/max définis par les admins

### Nouveau CDC créé
- **CDC_Tebex.md** — Rangs VIP, avantages, kart, housing, pets, skins, coffre banque

---

## Session 2 — Juillet 2026

### Simplifications adoptées

| Mécanique originale | Remplacée par |
|---|---|
| Agonie 3 minutes | Effet visuel < 2 cœurs + Down state ReviveMe |
| Matrice droits 4 profils | 2 états membre/non-membre + guerre GM |
| KOTH accord des chefs | GM lance chaque manche |
| HDV Steam Market custom | AuctionHouse configuré avec liste blanche |
| Pot de taxe physique | Commande `/f pay` simple |

### Hiérarchie entités finalisée

```
Groupe (XX membres) -> Organisation simple (25) -> Organisation avancée (50) -> Nation (100)
```

### Ajouts

- Lore fondateur : explorateurs du multivers, portail instable, monolithe
- Arc narratif V1→V7 formalisé
- Réputation joueur 0-100 : 6 paliers, Infâme < 10, Suspect 10-19
- Vote réputation via paiement impôts
- Répartition revenus : 30% crafteur / 25% vendeur / 45% organisation
- CDC_Entreprises : coffre de faction, contrats, permissions, logs

### Nouveaux CDC créés
- CDC_WorldModule, CDC_PortalModule, CDC_PlayerModule, CDC_FactionModule, CDC_EcoModule, CDC_ReputationModule, CDC_DisplayModule, CDC_Entreprises

---

## Session 1 — Juin 2026

### Concept fondateur

- Serveur Minecraft Semi-RP Multivers inspiré Civilisation
- Paper 1.21, plugins uniquement (pas de mods), OVH Game
- WayRift = filiale de Any-Way Studio (avec Waystone MC Event)

### Premières décisions clés

- Monnaie unique globale (Oboles ¢)
- Portails physiques Multiverse-Core Nether Portals
- Monde minier = passé du monde joueur (lore narratif)
- Monde minier 20h-23h, Jour 0 : 24h/24 pendant 48h
- Régénération terrain hors claim chaque mardi 10h
- Capitale : hub 24h/24

### Plugins confirmés (liste complète dans Roadmap_V1.md)

Vulcan, CustomNameplates, OxyTowns, ProAntiTab, LibsDisguises, AdvancedBanX, AntiXray, Axiom, AxMines, BetonQuest, Citizens, CoreProtect, EssentialsX + Chat/Discord/Link, FastAsyncWorldEdit, Grimac, ItemsAdder, LuckPerms, Multiverse-Core, PlaceholderAPI, PlasmoVoice, ProtocolLib, SkinsRestorer, TAB, Tebex, Vault, WorldGuard

---

## Points encore ouverts (à traiter)

| # | Sujet | Priorité |
|---|---|---|
| 1 | Bas-Fonds — fonctionnement détaillé | Moyenne |
| 2 | Housing / Parcelles — taille, localisation, règles achat/location | Moyenne |
| 3 | Métiers — progression, prérequis, capacités exactes | Haute |
| 4 | Réputation faction (-100 à +100) — détail mécanique | Moyenne |
| 5 | Donjons / Failles — mécaniques exactes | Moyenne |
| 6 | Saisons / Événements — Excel jamais intégré | Haute |
| 7 | Valeurs X réputation par action — calibrage | Moyenne |
| 8 | Boosts VIP — multiplicateurs exacts, fly mode, glow | En réflexion |
| 9 | Monde minier warzones (V3) et zones défendables (V5) | Faible |

---

*WayRift — filiale de Any-Way Studio — Confidentiel*
