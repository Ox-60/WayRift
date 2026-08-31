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

**1 seul type de claim.** Pas de distinction Territoire/Farm.

| Profil | Claim protégé | Claim ineffectif |
|---|---|---|
| Membre de la faction | Pose/casse selon permissions de faction | Pose/casse selon permissions de faction |
| Non-membre | Uniquement ce qu'accorde la permission de faction | Uniquement ce qu'accorde la permission de faction |
| Ennemi (guerre GM — Nations) | Échelles et échafaudages uniquement. Redstone autorisée (pas pose/destruction). Pas de coffres. Pas de casse. | Idem |

Le nombre de claims autorisés dépend de la **Puissance** de la faction (voir section dédiée ci-dessous).

---

## Puissance & Alignement — Réputation de faction

Une faction possède deux jauges **indépendantes**, qui ne se comparent jamais entre elles :

- **Puissance** : combien la faction pèse militairement. Détermine les claims autorisés.
- **Alignement** : quel camp la faction incarne (bienveillant ou malveillant). Purement narratif/cosmétique — n'affecte jamais l'accès aux claims.

> Cette séparation garantit l'équité : une mafia peut être très puissante et très malveillante sans contradiction. Une nation vertueuse peut être puissante et bienveillante. Les deux jauges progressent indépendamment.

### Puissance — Calcul

La Puissance **ne dépend jamais du nombre de claims** — ce serait circulaire puisque les claims dépendent de la Puissance. Elle se calcule uniquement via les guerres et les pertes de membres.

```
Puissance = 100 (base de départ)
          + (Victoires de guerre × 50, permanent)
          - (Défaites de guerre × 30, permanent)
          - (Morts de membres × 10, temporaire — décroît sur 7 jours)
```

> Une mort de membre est un malus **temporaire** : il s'efface progressivement sur 7 jours si la faction ne subit pas d'autres pertes.

### Claims autorisés selon la Puissance

| Puissance | Claims autorisés |
|---|---|
| 0-99 | 3 |
| 100-299 | 8 |
| 300-599 | 15 |
| 600-899 | 25 |
| 900+ | 40 |

### Warning & Pénalité — Puissance en chute

Si la Puissance chute (défaites, morts de membres) et que le nombre de claims **posés dépasse** le nombre de claims **autorisés** :

```
1. La Puissance chute sous le seuil du palier actuel
2. Claims posés > Claims autorisés
3. Le Responsable reçoit un WARNING en jeu
   -> Doit agir : augmenter la Puissance OU retirer des claims en excès

4. Si aucune action après 24h :
   -> Pénalité quotidienne : 5% de l'argent total de faction
   -> Argent transféré à la Capitale
   -> Répété chaque jour tant que le déséquilibre persiste
   -> S'arrête dès que claims posés <= claims autorisés
```

### Alignement — Calcul (Étoiles)

L'alignement se calcule sur la **moyenne de réputation individuelle des membres** (même échelle 0-1200 que la réputation joueur). Il détermine une notation par étoiles, symétrique entre malveillant (rouge) et bienveillant (jaune).

| Moyenne réputation membres | Notation |
|---|---|
| 0 - 99 | ★★★★★ rouge — Faction infâme notoire |
| 100 - 199 | ★★★★☆ rouge — Faction suspecte |
| 200 - 299 | ★★★☆☆ rouge |
| 300 - 399 | ★★☆☆☆ rouge |
| 400 - 499 | ★☆☆☆☆ rouge |
| 500 (exact) | Neutre — aucune étoile |
| 501 - 639 | ★☆☆☆☆ jaune |
| 640 - 779 | ★★☆☆☆ jaune |
| 780 - 919 | ★★★☆☆ jaune |
| 920 - 1059 | ★★★★☆ jaune |
| 1060 - 1200 | ★★★★★ jaune — Faction légendaire |

> Exemple : si tous les membres d'une faction ont une réputation de 0, la moyenne est 0 → la faction affiche ★★★★★ rouge.

L'alignement est **purement cosmétique et narratif** — il n'accorde ni ne retire d'accès aux claims. En revanche il peut débloquer du contenu narratif propre (accès Bas-Fonds collectif si très rouge, diplomatie prestige si très jaune — détails en V3).

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
| `/f top` | Classement factions par Puissance | joueur |
| `/f info <nom>` | Affiche Puissance, Alignement (étoiles), claims autorisés/posés | joueur |
| `/f claims` | Affiche claims posés vs autorisés pour sa faction | membre |
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
| `claims.solo-free` | 4 | Int | Claims gratuits solo |
| `claims.solo-max` | 12 | Int | Claims max solo |
| `faction.power-base` | 100 | Int | Puissance de départ pour toute nouvelle faction |
| `faction.power-war-win` | 50 | Int | Puissance gagnée par victoire de guerre |
| `faction.power-war-loss` | -30 | Int | Puissance perdue par défaite de guerre |
| `faction.power-member-death` | -10 | Int | Puissance perdue par mort de membre (temporaire) |
| `faction.power-death-decay-days` | 7 | Int | Jours avant que le malus de mort s'efface |
| `faction.claims-warning-delay-hours` | 24 | Int | Délai avant pénalité si claims posés > autorisés |
| `faction.claims-penalty-percent` | 5 | Int | % de l'argent de faction prélevé par jour de dépassement |

---

*WayRift — V3 — Confidentiel*
