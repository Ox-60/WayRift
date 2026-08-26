# CDC — ReputationModule

## Seuils

| Score | Label | Nameplate | Accès | Restriction |
|---|---|---|---|---|
| 80-100 | Légendaire | Or | Zones VIP Capitale | — |
| 60-79 | Honorable | Vert clair | — | — |
| 40-59 | Neutre | Gris | — | — |
| 20-39 | Neutre bas | Gris foncé | — | — |
| 10-19 | Suspect | Orange | — | Interdit HDV officiel |
| 0-9 | **Infâme** | Rouge + tête de mort | Bas-Fonds | Interdit HDV officiel |

---

## Facteurs de modification

| Événement | Impact | Condition |
|---|---|---|
| Vote fiscal positif reçu | +X points | Paiement impôts par un autre joueur |
| Vote fiscal négatif reçu | -X points | Paiement impôts par un autre joueur |
| Payer ses impôts à temps | +1 point | Bonus passif par période payée |
| Mettre joueur en Down | -X points | **UNIQUEMENT hors guerre déclarée** |
| Victoire de guerre | + bonus temporaire | Répercuté temporairement sur les membres |
| Warn de modération | -X pts (1 semaine) | Temporaire |
| Mute de modération | -X pts (1 mois) | Temporaire |
| Ban temporaire | -X pts (3 mois) | Temporaire |
| Se faire raider sa ville | -X points | Sur le chef de la faction perdante |
| Participation event GM | + configurable | Décision GM |

- **Limite** : +10 points max par semaine
- **Priorité** : Votes de membres de sa propre faction comptent en premier

---

## Intégration LuckPerms

```
Réputation passe sous 10
  -> ReputationPlugin : lp user <uuid> parent set infame
  -> CustomNameplates affiche la tête de mort

Réputation remonte au-dessus de 10
  -> ReputationPlugin : lp user <uuid> parent unset infame
  -> CustomNameplates retire la tête de mort
```

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/reputation info [joueur]` | Affiche la réputation et le label | joueur |
| `/reputation top` | Classement des joueurs | joueur |
| `/reputation vote <joueur> up/down` | Vote (coûte des votes fiscaux) | joueur |
| `/reputation set <uuid> <valeur>` | Définit la réputation directement | admin |
| `/reputation add <uuid> <valeur> <raison>` | Ajoute/retire des points | admin/GM |
| `/reputation history <uuid>` | Historique des modifications | admin/GM |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `reputation.infame-threshold` | 10 | Int | Seuil Infâme (< 10) |
| `reputation.hdv-threshold` | 20 | Int | Seuil interdiction HDV (< 20) |
| `reputation.legendary-threshold` | 80 | Int | Seuil Légendaire (>= 80) |
| `reputation.weekly-gain-limit` | 10 | Int | Gain max par semaine |
| `reputation.infame-rank` | infame | String | Nom du rang LuckPerms Infâme |
| `reputation.down-penalty` | 3 | Int | Malus pour avoir mis un joueur en Down (hors guerre) |
| `reputation.war-victory-bonus` | 5 | Int | Bonus temporaire victoire de guerre |
| `reputation.tax-payment-bonus` | 1 | Int | Bonus paiement impôts à temps |

---

*WayRift — V3 — Confidentiel*
