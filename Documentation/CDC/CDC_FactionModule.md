# CDC — FactionModule

## Architecture — 3 niveaux

| Niveau | Membres max | Déblocage | Droits spéciaux |
|---|---|---|---|
| **Groupe** | XX | Création en jeu (100 000¢) | Claims, minage |
| **Organisation simple** | 25 | Ticket staff + 10 membres actifs + 7j activité | Item unique B2B, événements GM, caisses orga |
| **Organisation avancée** | 50 | Ticket staff + 15 membres actifs + hiérarchie complète | Idem + hiérarchie libre |
| **Nation** | 100 | Ressources + argent + ticket staff | Monde dédié, **guerres KOTH**, caisses nation |

> ⚠️ Les **guerres KOTH sont réservées aux Nations uniquement**.
> Les Organisations ont accès à des **événements organisés par les chefs et les GM** — pas de guerres formelles.

---

## Guerres KOTH — Nations uniquement

- Nations uniquement — validées et suivies par un GM
- GM lance chaque manche avec une commande
- **1 manche gagnée = 1 point. Premier à 3 points gagne.**
- Si défaite écrasante : GM peut déclencher une attaque directe de la ville perdante
- 1 position par monde : monde de l'attaquant, monde du défenseur, monde neutre

---

## Événements — Organisations

Les organisations accèdent à des événements organisés conjointement par les chefs d'organisation et les GM. Ces événements remplacent les guerres formelles à ce niveau. Leur forme est libre (tournoi, course, défi RP, chasse au trésor...) et définie au cas par cas.

---

## Claims — OxyTowns

| Type | Profondeur max | Limite | Reset |
|---|---|---|---|
| Territoire | Y=40 | Selon puissance faction | Non |
| Farm | Bedrock | Faction:16 / Groupe:8 / Solo:4 | 1x/semaine |

| Profil | Claim protégé | Claim ineffectif |
|---|---|---|
| Membre de la faction | Survie complète | Survie complète |
| Non-membre (neutre) | Mode Aventure | Mode Aventure |
| Ennemi (guerre GM — Nations) | Mode Aventure | Survie complète — casse et pose libre |

---

## Item unique — Organisations et Nations

- Demandé via ticket. Créé par l'équipe WayRift et intégré en jeu.
- **Vendable uniquement à d'autres organisations ou nations** (jamais aux joueurs individuels).
- Prix de vente : 75% à 125% du prix constructeur.
- Les acheteurs (organisations/nations) peuvent revendre aux joueurs à 125-150% minimum.

---

## Répartition des revenus sur vente B2B

```
Ressource vendue par l'organisation :
  30% -> Farmeur (producteur de la ressource)
  25% -> Vendeur (qui a passé le contrat)
  45% -> Organisation
         (redistribuable : primes activité/production,
          achats au marché, ou conservé en trésorerie)
```

---

## Dissolution

```
CONDITIONS :
  Chef inactif +14j sans responsable actif
  Inactivité générale -50% pendant 1 mois
  Chef dissout volontairement (/f dissolve)

CALENDRIER :
  Jeudi 20h  -> MODE PILLAGE (4h)
  Samedi 18h -> suppression définitive + régénération zone
```

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/f invite <joueur>` | Invite un joueur | chef/responsable |
| `/f kick <joueur>` | Expulse un membre | chef/responsable |
| `/f settax <montant> <jours>` | Définit les impôts | chef/responsable |
| `/f pay <montant>` | Paie ses impôts (génère votes réputation) | membre |
| `/f dissolve` | Dissout la faction (double confirmation) | chef |
| `/f claim` | Claime le chunk actuel | chef/responsable |
| `/f unclaim` | Retire la protection du chunk | chef |
| `/f resetclaim` | Reset le chunk farm (1x/semaine) | chef |
| `/f top` | Classement factions par puissance | joueur |
| `/faction admin validate <nom>` | Valide une faction/organisation | admin |
| `/gm war activate <n1> <n2>` | Active physiquement la guerre (Nations) | GM |
| `/gm event create <orga>` | Crée un événement pour une organisation | GM |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `faction.creation-cost-group` | 100000 | Int | Coût création groupe (¢) |
| `faction.lead-transfer-inactivity-days` | 14 | Int | Jours inactivité chef avant transfert |
| `faction.pillage-day` | THURSDAY | String | Jour mode pillage |
| `faction.delete-day` | SATURDAY | String | Jour suppression |
| `claims.territory-min-depth` | 40 | Int | Profondeur min territoire (Y=40) |
| `claims.no-claim-max-depth` | 50 | Int | Profondeur max hors claim (Y=50) |
| `claims.solo-free` | 4 | Int | Claims gratuits solo |
| `claims.solo-max` | 12 | Int | Claims max solo |
| `claims.group-farm-max` | 8 | Int | Claims farm max groupe |
| `claims.faction-farm-max` | 16 | Int | Claims farm max faction/nation |

---

*WayRift — V3 — Confidentiel*
