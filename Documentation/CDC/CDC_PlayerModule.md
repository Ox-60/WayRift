# CDC — PlayerModule

## Responsabilités

- Identité RP : nom unique, algorithme Levenshtein (distance ≤ 2 bloquée), serment obligatoire
- Cycle de vie : Down → Hôpital / Wipe / Revive GM via ReviveMe
- Profil visible selon droits (public, inspection, soi-même, staff)
- Inspection : SPYGLASS, dos, 2 blocs max, 90% inventaire aléatoire
- Wipe : suppression sélective connexions plugins sauf XP compte et achats
- Réputation 0-100 via ReputationPlugin + LuckPerms

---

## Mort & Coma — ReviveMe

| Phase | Déclencheur | Comportement | Plugin |
|---|---|---|---|
| Avertissement | Vie < 2 cœurs (4 HP) | Effet visuel troublé (Blindness partiel) | ReviveMe config |
| Down / Coma | Vie = 0 (toute cause — PvP ET mobs) | Peut bouger. Inventaire fouillable par tous. | ReviveMe |
| Revive collègue | Accroupi sur le joueur Down | V1 : tous. V2+ : Médecin uniquement (LuckPerms). | ReviveMe |
| Revive GM | `/revive @joueur here` | Revive + TP sur place | ReviveMe |
| Hôpital | Countdown ReviveMe écoulé | Respawn coordonnées hôpital Capitale | ReviveMe + Multiverse |
| Wipe | `/wipe me` (double confirmation) | Supprime connexions plugins sauf XP et achats | Custom léger |
| Wipe staff | `/wipe @joueur <raison>` | Même effet — décision staff | Custom léger |

> En V2 : permission ReviveMe restreinte au rang LuckPerms `medecin`. Zéro dev supplémentaire.

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

*WayRift — V3 — Confidentiel*
