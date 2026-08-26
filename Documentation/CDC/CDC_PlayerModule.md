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
| Avertissement | Vie < 3 cœurs | Effet visuel troublé | ReviveMe config |
| Down/Coma | Vie = 0 (PvP uniquement) | Peut bouger. Inventaire fouillable. | ReviveMe |
| Revive collègue | Accroupi sur le Down | V1 : tous. V2+ : Médecin uniquement. | ReviveMe |
| Revive GM | `/revive @joueur here` | Revive + TP sur place | ReviveMe |
| Hôpital | Countdown écoulé | Respawn hôpital Capitale | ReviveMe + Multiverse |
| Wipe | `/wipe me` | Supprime connexions sauf XP et achats | Custom léger |

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

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/profil [joueur]` | Affiche le profil selon les droits | joueur |
| `/wipe me` | Déclenche le wipe (double confirmation) | joueur |
| `/player revive <uuid>` | Revive un joueur | GM |
| `/player gm-block <uuid>` | Bloque le choix hôpital/wipe | GM |
| `/player wipe <uuid> <raison>` | Force un wipe | admin |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `player.rp-name-levenshtein-threshold` | 2 | Int | Distance similarité nom RP max |
| `player.wipe-block-days-min` | 3 | Int | Jours blocage min après wipe |
| `player.wipe-block-days-max` | 5 | Int | Jours blocage max après wipe |
| `player.reputation-weekly-gain-limit` | 10 | Int | Gain réputation max par semaine |
| `player.reputation-infame-threshold` | 10 | Int | Seuil Infâme (< 10) |
| `player.reputation-hdv-threshold` | 20 | Int | Seuil interdiction HDV (< 20) |

---

*WayRift — V3 — Confidentiel*
