# CDC — Permissions & Grades

## Infrastructure technique

| Paramètre | Valeur |
|---|---|
| Serveur | Java Paper/Purpur — dédié |
| Import mondes WorldPainter | Accès FTP obligatoire (FileZilla) |
| Sauvegardes | Quotidienne à 00h00 |
| Restauration | Admin et Développeur uniquement |
| Optimisation | Pré-génération des chunks, view-distance réduite, minerais à 0 dans les mondes importés, déchargement des mondes inactifs |
| PvP | Toujours actif — pas de zone sans PvP sauf hôpital et zones protégées définies |

> Point ouvert : snapshots ponctuels avant events GM — à définir.

---

## Grades staff — 8 niveaux

| Grade | Rôle principal | Accès jeu | Accès Discord |
|---|---|---|---|
| **Admin** | Gestion globale du serveur, décisions finales | Complet | Complet |
| **Développeur** | Accès technique uniquement (code, plugins, config) | Technique uniquement — aucun pouvoir de sanction | Technique |
| **Modérateur** | Surveillance silencieuse — texte/chat, spectateur | Spectateur + commandes staff non intrusives | Oui |
| **Modérateur RP** | Correction comportements déplacés ou non RP | Peut interagir et déranger les joueurs si nécessaire | Oui |
| **Builder** | Construction et aménagement des mondes | Build + WorldEdit | Non (usage interne) |
| **GameMaster (GM RP)** | Orchestration des events, guerres, scènes RP | Toutes commandes GM | Annonces |
| **CM** | Relation joueurs hors jeu | Aucune commande en jeu | Complet |
| **Joueur** | Joueur standard | Selon rang VIP | Selon accès |

### Précisions par grade

**Modérateur**
- Surveillance texte/chat et Discord
- Mode spectateur pour observer sans être vu
- Commandes staff passives (logs, historique)
- Ne peut pas intervenir directement sur les joueurs en jeu

**Modérateur RP**
- Peut intervenir directement en jeu pour corriger un comportement déplacé ou non RP
- Peut déranger un joueur si nécessaire (tp, avertissement en jeu, gel temporaire)
- Pas de pouvoir de sanction définitive (warn/mute/ban = Modérateur ou Admin)

**CM (Community Manager)**
- Interaction joueurs sur Discord et hors jeu uniquement
- Aucune commande en jeu — jamais connecté en tant que staff
- Gestion de la communauté, annonces, relations publiques

**Développeur**
- Accès technique complet (plugins, config, FTP, base de données)
- Aucun pouvoir de sanction ou d'intervention sur les joueurs
- Ne peut pas warn, mute, ban ou interagir avec les joueurs en jeu

---

## Hiérarchie des entités joueur

```
Groupe (max 15 membres + adhérents illimités)
  └-> Organisation simple (25 membres) — déblocage Admin/GM après ticket
        └-> Organisation avancée (50 membres) — déblocage Admin/GM après ticket
              └-> Nation (100 membres) — déblocage Admin/GM après ticket
```

### Commandes de création et déblocage

| Action | Commande | Qui | Coût |
|---|---|---|---|
| Créer un groupe | `/creategroupe` | Joueur | Payant en jeu (S1 : gratuit, S2 : 10 000¢) |
| Passer Groupe → Organisation | Commande Admin/GM après ticket | Admin/GM | Conditions remplies |
| Passer Organisation → Nation | Commande Admin/GM après ticket | Admin/GM | Conditions remplies |
| Créer un sous-groupe (titre) | `/createtitle` ou équivalent | Chef de groupe | Gratuit |
| Attribuer un titre à un membre | Chef de groupe | Chef | — |

> Pas de `/createfaction` — la création directe d'une organisation ou d'une nation n'est pas accessible aux joueurs.

---

## Sous-groupes (Titres) — Système de permissions

### Principe

Un **groupe** est le regroupement de joueurs. Un **sous-groupe** (ou titre) est un rôle interne créé par le chef, avec ses propres permissions. Un joueur peut appartenir à **plusieurs titres** dans son groupe.

- Un joueur peut appartenir à **maximum 2 groupes simultanément**
- Dans chaque groupe, il peut cumuler **plusieurs titres**
- Le serveur n'impose aucune permission par défaut — le chef configure librement
- Permission spéciale **"Gérer les permissions acquises"** : permet d'attribuer/retirer à d'autres uniquement les permissions qu'on possède soi-même, jamais au-delà

---

## Catalogue des permissions attribuables aux titres

### Administration du groupe & titres

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Gérer les permissions acquises | Groupe | Oui | Ne peut donner que ce qu'on possède soi-même |
| Créer un sous-groupe (titre) | Groupe | Non — chef uniquement | — |
| Supprimer un sous-groupe | Groupe | Non — chef uniquement | — |
| Inviter un joueur dans le groupe | Groupe | Oui | — |
| Exclure un membre | Groupe | Oui | — |
| Attribuer un titre à un membre | Groupe | Oui | Si permission accordée |
| Modifier les permissions d'un titre | Groupe | Oui | Dans la limite de ses propres permissions |

### Claim — Construction

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Poser des blocs | Groupe | Oui | Dans le claim du groupe |
| Casser des blocs | Groupe | Oui | Dans le claim du groupe |
| Poser du feu | Groupe | Oui | — |
| Utiliser des explosifs | Groupe | Oui | — |
| Créer une sous-zone protégée | Groupe | Oui | Zone dans le claim |

### Claim — Interactions

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Ouvrir les portes | Groupe | Oui | — |
| Ouvrir les trappes | Groupe | Oui | — |
| Utiliser les boutons | Groupe | Oui | — |
| Utiliser les leviers | Groupe | Oui | — |
| Utiliser les plaques de pression | Groupe | Oui | — |
| Interagir avec la redstone | Groupe | Oui | — |
| Utiliser les fourneaux | Groupe | Oui | — |
| Utiliser les tables de craft | Groupe | Oui | — |
| Interagir avec les PNJ (Citizens) | Groupe | Oui | — |
| Interagir avec les animaux | Groupe | Oui | — |
| Utiliser les montures | Groupe | Oui | — |
| Récolter les cultures | Groupe | Oui | — |

### Stockage

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Accéder au coffre de faction | Groupe | Oui | Ouvrir l'interface (clic droit) |
| Déposer des items custom (crafteur) | Groupe | Oui | Clic gauche uniquement — pas besoin d'ouvrir le coffre |
| Retirer des items custom (vendeur) | Groupe | Oui | Pour répondre aux contrats uniquement |
| Retirer tout bloc (magasinier) | Groupe | Oui | Dépôt et retrait de n'importe quel bloc |
| Accéder aux logs du coffre | Groupe | Oui | Lecture uniquement |

### Argent & Économie

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Payer avec l'argent de faction | Groupe | Oui | Avec plafond défini par le chef |
| Gérer les impôts (/settax) | Groupe | Oui | — |
| Voir les impôts (/whotaxe) | Groupe | Oui | — |
| Passer un contrat de vente | Groupe | Oui | Rôle Vendeur |
| Signer un contrat d'achat | Groupe | Oui | Rôle Acheteur — débite le compte du groupe |
| Acheter un terrain/parcelle (/WorldBuy) | Nation | Non — chef uniquement | — |
| Poster une annonce sur le panneau de la Capitale | Tous | Oui | Accessible à tous les joueurs |

### Diplomatie & Contrats

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Passer un contrat B2B | Organisation | Oui | — |
| Rompre un contrat | Organisation | Non — chef uniquement | — |
| Modifier le statut diplomatique | Organisation | Non — chef uniquement | — |
| Déclarer la guerre | Nation | Non — chef uniquement | — |
| Voter pour une décision interne | Groupe | Oui | — |

### Territoire

| Permission | Niveau minimum | Attribuable | Notes |
|---|---|---|---|
| Revendiquer un chunk (claim) | Groupe | Oui | — |
| Abandonner un chunk | Groupe | Oui | — |
| Créer une sous-zone | Groupe | Oui | — |
| Définir le spawn du groupe | Groupe | Non — chef uniquement | — |
| Inviter un joueur temporaire dans le claim | Groupe | Oui | Durée limitée |

---

## Wipe personnage — Rang de prestige

Le wipe personnage peut être utilisé par le joueur **sur lui-même uniquement** pour passer un rang de prestige.

```
Le joueur garde :
  -> XP de compte (niveau de compte, achievements)
  -> Achats Tebex (skins, rangs VIP)

Le joueur repart à zéro sur :
  -> Tout le reste (argent, factions, connexions plugins)
```

---

## Snapshots

Commande déclenchée manuellement par un GM ou Admin avant un event pour permettre un retour arrière si nécessaire.

| Commande | Description | Permission |
|---|---|---|
| `/snapshot create <nom>` | Crée un snapshot du monde actuel | Admin/GM |
| `/snapshot restore <nom>` | Restaure un snapshot | Admin uniquement |
| `/snapshot list` | Liste les snapshots disponibles | Admin/GM |

---

## Rang de Prestige — Arbre de compétences

### Conditions pour wiper et obtenir un point de prestige

Deux chemins possibles — au choix du joueur :

```
OPTION 1 — Wipe volontaire :
  -> Niveau de compte minimum : 20
  -> Payer 50 000¢ à la Capitale
  -> Wipe complet du personnage (sauf XP compte et achats Tebex)

OPTION 2 — Mort RP :
  -> Le joueur en fait la demande (ticket ou contact GM)
  -> Le GM valide et orchestre la scène de mort RP
  -> Wipe complet du personnage (sauf XP compte et achats Tebex)

Récompense (dans les deux cas) :
  -> +1 point de prestige à attribuer dans l'arbre
```

### Fonctionnement de l'arbre

- Chaque point de prestige s'attribue à **UN seul avantage** parmi une liste
- Le choix est **définitif** — sauf si le joueur paie des **tokens** pour redistribuer
- Les points s'accumulent à chaque wipe (wipe 1 = 1 pt, wipe 2 = 2 pts cumulés, etc.)

### Avantages disponibles (arbre — à compléter)

| Avantage | Effet par point | Maximum |
|---|---|---|
| Argent gagné | +X% sur les revenus passifs | À définir |
| XP gagné | +X% sur l'XP de compte | À définir |
| Faim diminuée | -X% de consommation de nourriture | À définir |
| Vie augmentée | +1 cœur par point | +2 cœurs maximum |
| (autres à définir) | — | — |

> Le maximum de vie est de +2 cœurs (4 HP) quelle que soit la somme des points investis.

---

## Sanctions — Procédure de médiation

### Qui peut sanctionner

| Grade | Peut sanctionner |
|---|---|
| Admin | Oui — toutes sanctions |
| Modérateur | Oui — warn, mute, ban |
| Modérateur RP | Oui — warn, mute, ban |
| Développeur | Non |
| Builder | Non |
| GM | Non |
| CM | Non |

### Procédure de médiation

```
1. Le Modérateur demande au joueur de s'éloigner du groupe
   ou de se mettre à l'écart discrètement

2. Mise à l'écart du joueur :
   -> En jeu : TP dans une zone isolée (si la situation le permet)
   -> Discord : si nécessite une preuve vidéo ou une contestation

3. Pendant la mise à l'écart :
   -> Le joueur n'a aucune interaction RP avec les autres
   -> Le Modérateur discute avec le joueur
   -> Vérification des antécédents et notes du joueur
   -> Débat sur la situation

4. Décision de sanction adéquate :
   -> Avertissement (warn) : -50 pts réputation (vers 500)
   -> Mute : -100 pts réputation (vers 500)
   -> Ban temporaire : -200 pts réputation (vers 500)
   -> Ban définitif : Admin uniquement
```

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Hébergeur — non encore choisi | Haute |
| 2 | Mort RP — format de la demande (ticket ?) et délai de traitement | Faible |
| 3 | Valeurs exactes des bonus prestige par point (%) | Moyenne |
| 4 | Autres avantages de l'arbre de prestige à définir | Moyenne |
| 5 | Coût en tokens pour redistribuer les points de prestige | Faible |

---

*WayRift — V3 — Confidentiel*
