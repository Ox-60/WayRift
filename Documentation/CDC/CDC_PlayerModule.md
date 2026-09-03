# CDC — PlayerModule

## Responsabilités

- Identité RP : nom unique, algorithme Levenshtein (distance ≤ 2 bloquée), serment obligatoire
- Cycle de vie : Down → Hôpital / Wipe / Revive GM via ReviveMe
- Profil visible selon droits (public, inspection, soi-même, staff)
- Inspection : SPYGLASS, dos, 2 blocs max, 90% inventaire aléatoire
- Wipe : suppression sélective connexions plugins sauf XP compte et achats
- Réputation 0-100 via ReputationPlugin + LuckPerms

---

## Mort & Coma

### Avertissement
- Vie < 2 cœurs (4 HP) → effet visuel troublé (Blindness partiel)

### Down / Coma
- Vie = 0 (toute cause — PvP ET mobs)
- Joueur **immobile** — ne peut pas se déplacer
- Inventaire **fouillable et volable** par tous

### Notification faction
```
V1 : alerte envoyée à toute la faction
     -> Position approximative à ~150 blocs de la vraie position

V2+ : alerte envoyée uniquement aux Médecins de la faction
      -> Médecin le plus proche notifié en priorité
```

### Revive par un collègue
```
1. Le collègue s'accroupit sur le joueur Down pendant 15 secondes
2. Le joueur en coma voit s'afficher :
   -> Coût : 250¢ débité sur son compte
   -> Lieu de respawn : position de sa mort (sur place)
   -> Bouton "Accepter le revive"
3. S'il accepte -> revive déclenché, respawn sur place

RÉPARTITION DES 250¢ :
  Joueur a >= 250¢  : 150¢ médecin + 100¢ Capitale
  Joueur a 150-249¢ : 150¢ médecin + reste à la Capitale
  Joueur a < 150¢   : tout au médecin + 0¢ Capitale
  -> Médecin payé en priorité, Capitale reçoit ce qui reste
```

> V1 : tous les joueurs peuvent reviver.
> V2+ : uniquement les Médecins (LuckPerms rang medecin).

### Revive automatique — Hôpital
Un bouton s'affiche automatiquement après le délai. Il indique le coût actuel (dégressif) et la destination "Hôpital — Capitale".

| Horaire | Délai avant bouton | Coût immédiat | Coût après 2h (-50%) |
|---|---|---|---|
| 5h - 20h | 15 minutes | 450¢ | 225¢ |
| 20h - 5h | 1 heure | 750¢ | 375¢ |

- Dégressivité linéaire sur 2h
- Le joueur clique quand il veut après le délai
- Respawn à l'hôpital de la Capitale

### Wipe
- Bouton disponible après **4 heures de coma** uniquement
- Double confirmation + message warning
- Pas de remboursement
- Supprime toutes les connexions plugins sauf XP compte et achats Tebex

### Revive GM
- `/revive @joueur here` — revive direct sur place
- `/gm coma <uuid> <minutes>` — coma prolongé (event Traque)

### Wipe staff
- `/wipe @joueur <raison>` — force un wipe

---

## Réputation (0-100)

| Score | Label | Nameplate | Accès | Restriction |
|---|---|---|---|---|
| 80-100 | Légendaire | Or | Zones VIP Capitale | — |
| 60-79 | Honorable | Vert clair | — | — |
| 40-59 | Neutre | Gris | — | — |
| 20-39 | Neutre bas | Gris foncé | — | — |
| 10-19 | Suspect | Orange | — | Interdit HDV officiel |
| 0-9 | **Infâme** | Rouge + tête de mort | Bas-Fonds | Interdit HDV officiel |

- **Tête de mort** : Sur joueurs Infâmes (< 10) via CustomNameplates + LuckPerms rank `infame`
- **Limite** : +10 points max par semaine. Excédent reporté.
- **Vote réputation** : Payer ses impôts génère des votes attribuables à n'importe quel joueur.

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/profil [joueur]` | Affiche le profil selon les droits | joueur |
| `/wipe me` | Déclenche le wipe (double confirmation) | joueur |
| `/player revive <uuid>` | Revive un joueur | GM |
| `/player gm-block <uuid>` | Bloque le choix hôpital/wipe | GM |
| `/player wipe <uuid> <raison>` | Force un wipe | admin |
| `/player setreputation <uuid> <val>` | Définit la réputation directement | admin |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `player.rp-name-levenshtein-threshold` | 2 | Int | Distance similarité nom RP max |
| `player.wipe-block-days-min` | 3 | Int | Jours blocage min après wipe |
| `player.wipe-block-days-max` | 5 | Int | Jours blocage max après wipe |
| `player.down-warning-hearts` | 2 | Int | Cœurs restants déclenchant l'avertissement visuel |
| `player.reputation-weekly-gain-limit` | 10 | Int | Gain réputation max par semaine |
| `player.reputation-infame-threshold` | 10 | Int | Seuil Infâme (< 10) |
| `player.reputation-hdv-threshold` | 20 | Int | Seuil interdiction HDV (< 20) |

---

## Coffre "Objets Perdus" — Récupération centralisée

Tout item perdu (perte de plot housing, expiration de coffre de banque, autre contexte de perte) est automatiquement stocké **par joueur individuel** dans un coffre "Objets Perdus" dédié.

```
Fonctionnement (type Ender Chest, mais RETRAIT UNIQUEMENT) :
  -> Aucun dépôt manuel possible — le système y place les items automatiquement
  -> Le joueur peut uniquement RÉCUPÉRER ce qui s'y trouve
  -> Accessible depuis n'importe où (comme un Ender Chest classique)

Sources qui alimentent ce coffre :
  - Items d'un plot housing perdu (inactivité 1 mois)
  - Items d'un coffre de banque expiré
  - Autres pertes à définir au cas par cas
```

### Commandes

| Commande | Description | Permission |
|---|---|---|
| `/objetsperdu` | Ouvre le coffre Objets Perdus du joueur | joueur |

---

## Vol & Racket — Mécaniques criminelles

### Conditions de malus réputation

Le malus s'applique **uniquement si le voleur/racketteur a une réputation > 300**.
En dessous de 300 (Infâme ou Neutre bas) : vol et racket sans malus de réputation.

```
Voleur/Racketteur > 300 pts -> malus de réputation appliqué
Voleur/Racketteur < 300 pts -> aucun malus (les Infâmes opèrent librement)
```

---

### Vol dans un claim

- **-3 pts** pour le voleur (si réputation > 300)
- Aucun lien avec la réputation de la victime
- Détecté via CoreProtect → malus automatique

---

### Racket — 2 mécaniques

**1. Racket sur joueur Down**

- Le racketteur peut prendre **1 slot** sur le joueur Down
- **-3 pts** pour le racketteur si réputation racketteur > 300 ET réputation victime > 300
- Entre joueurs < 300 pts : aucun malus des deux côtés

**2. Racket via inspection (joueur debout)**

Conditions physiques requises pour inspecter :
- Inspecteur : **SPYGLASS en main**
- Cible : **dos à l'inspecteur**, à **2 blocs max**, **mains vides** (aucun item en main)
- L'inspection est toujours possible si ces conditions sont remplies — la cible ne peut pas techniquement refuser l'inspection

**Déroulement :**
```
1. Inspecteur se place dans les conditions physiques
2. 75% de l'inventaire de la cible est révélé aléatoirement
   -> Les quantités d'items ne sont PAS affichées
   -> La cible voit qu'elle est inspectée (affichage RP)
3. La cible peut :
   a) Accepter -> l'inspecteur peut prendre 1 slot parmi les items révélés
   b) Refuser  -> l'inspecteur peut tenter de la mettre en Down
                  (si Down réussi -> retour à la mécanique Racket Down)
4. Si racket effectué :
   -> -3 pts pour le racketteur si racketteur > 300 ET victime > 300
```

---

*WayRift — V3 — Confidentiel*
