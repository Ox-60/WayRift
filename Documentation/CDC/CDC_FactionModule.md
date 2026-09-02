# CDC — FactionModule

## Architecture — 3 niveaux

| Niveau | Membres max | Déblocage | Droits spéciaux |
|---|---|---|---|
| **Groupe** | 15 (+ adhérents illimités) | Création en jeu (gratuit S1, 35 000¢ dès S2 — collectif) | Claims, minage, hiérarchie libre de sous-groupes/titres |
| **Organisation simple** | 30 | Ticket staff + 10 membres actifs + 7j activité | + Item unique B2B, événements GM, caisses orga |
| **Organisation avancée** | 50 | Ticket staff + **18 membres différents connectés par semaine** | Identique à Organisation simple — uniquement plus de capacité (50 vs 30) |
| **Nation** | Jusqu'à 75 (50 gratuit + achat de places 51-75) — **aucun minimum requis** | Ressources + argent + ticket staff | Monde dédié, **guerres KOTH**, caisses nation |

> La hiérarchie libre de sous-groupes (titres, permissions personnalisées) est disponible **dès le niveau Groupe** — ce n'est pas une exclusivité de l'Organisation avancée. La seule vraie différence entre Organisation simple et avancée est la capacité maximale de membres.

> ⚠️ Les **guerres KOTH sont réservées aux Nations uniquement**.
> Les Organisations ont accès à des **événements organisés par les chefs et les GM** — pas de guerres formelles.

---

## Coûts économiques — Calibrage détaillé (V1, hors quarries V6)

### Groupe — 3 jours de farm collectif

```
Hypothèse : 5 membres actifs contribuant
Rythme : farm modéré, 10h/semaine par membre (1.43h/jour)
Sur 3 jours : 5 actifs x 1.43h/jour x 3 jours x ¢/h (farm modéré)

Coût Saison 2+ : 35 000¢ (arrondi)
```

### Organisation — délai d'activité ajusté

```
Organisation simple requiert 10 membres actifs.
Avec -30% d'inactifs statistiques, il faut environ 14 membres bruts
pour garantir 10 actifs de façon fiable.

Délai d'activité ajusté : 1.5 semaine (10-11 jours) au lieu de 7 jours
-> Laisse le temps aux 30% d'inactifs de se manifester ou d'être remplacés
```

### Nation — Capacité de membres

- **Aucun minimum de membres requis** pour devenir Nation — seules les conditions standard s'appliquent (ressources + argent + ticket staff). Une faction de 30 joueurs peut devenir Nation si elle remplit ces conditions.
- **Capacité de base : 50 membres** (continuité directe avec le plafond Organisation avancée)
- **Extension payante : jusqu'à 75 membres maximum** — chaque place au-delà de 50 s'achète avec de l'argent (¢)
- **75 = plafond absolu**, jamais un seuil obligatoire à atteindre
- Prix par place supplémentaire : **à définir** (point ouvert)

### Nation — mondes selon 50% de la trésorerie collective

**Prix FIXE, calculé sur une référence de 50 membres actifs** (peu importe la taille réelle de la nation — un plus grand nombre de membres atteint le prix plus vite, un plus petit nombre met plus de temps).

```
Référence : 50 membres (35 actifs après -30% inactifs)
Revenu collectif hebdomadaire : 529 550¢/semaine (farm modéré, 10h/sem/membre)
Part dédiée au fonds monde : 50% du revenu = 264 775¢/semaine

Coût monde = 50% x (35 actifs x 10h/sem x ¢/h farm modéré) x semaines cibles
```

| Type de monde | Semaines cibles (@ 50 membres) | Prix fixe |
|---|---|---|
| Monde plat | 6 semaines | **1 590 000¢** |
| Monde généré (Seed) | 7.5 semaines | **1 990 000¢** |
| Monde importé | 10 semaines | **2 650 000¢** |
| Monde custom (WorldPainter) | 14 semaines | **3 710 000¢** |

### Temps réel selon la taille de la nation (prix fixe, ne change pas)

| Taille de nation | Monde plat | Monde généré | Monde importé | Monde custom |
|---|---|---|---|---|
| 30 membres (21 actifs) | 10.0 sem | 12.5 sem | 16.7 sem | 23.4 sem |
| 50 membres (35 actifs) — référence | 6.0 sem | 7.5 sem | 10.0 sem | 14.0 sem |
| 75 membres (52 actifs) | 4.0 sem | 5.1 sem | 6.7 sem | 9.4 sem |

> ⚠️ **Ces durées sont un calcul COLLECTIF, pas solo.** Elles supposent des dizaines de membres actifs contribuant ensemble à la trésorerie de la nation. Une fois les quarries disponibles (V6), la production collective augmentera fortement — ces durées cibles resteront réalistes voire optimistes à ce stade du jeu.

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
| `faction.creation-cost-group-s1` | 0 | Int | Coût création groupe en Saison 1 (gratuit) |
| `faction.creation-cost-group-s2` | 10000 | Int | Coût création groupe dès Saison 2 (¢) |
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
