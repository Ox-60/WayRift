# CDC — EcoModule

## Monnaies

| Monnaie | Usage | Obtention |
|---|---|---|
| Oboles (¢) | Monnaie globale unique | En jeu |
| Tokens | Monnaie boutique | Argent réel (Tebex) OU argent en jeu à prix élevé |
| Rubies | VIP/prestige, casino | Argent réel OU beaucoup d'Oboles (sens unique) |

---

## HDV — AuctionHouse configuré

- Offres de vente uniquement (pas d'ordres d'achat)
- **Liste blanche des items autorisés à la vente**
- Taxes : 15% Capitale + 10% faction = 25%. Étalages loués : 15%
- Durée listing : 7 jours + 7 jours récupération Ender Chest
- Accès interdit aux joueurs réputation < 20

---

## Commerce inter-entités — B2B

```
ENTREPRISE DE PRODUCTION / ORGANISATION :
  -> Vend item unique UNIQUEMENT à organisations et nations
  -> Prix : 75% à 125% du prix constructeur
  -> INTERDIT de vendre directement aux joueurs individuels

ORGANISATION / NATION ACHETEUR :
  -> Peut revendre à joueurs individuels
  -> Prix minimum : 125% du prix constructeur
```

### Répartition des revenus B2B

```
Sur chaque vente par l'organisation :
  30% -> Farmeur (producteur de la ressource)
  25% -> Vendeur (qui a passé le contrat)
  45% -> Organisation (trésorerie, redistribuable)
```

---

## Progression du farm

Les ressources s'obtiennent selon 3 niveaux de progression :

| Niveau | Méthode | Version |
|---|---|---|
| 1 — Basique | Minage dans le monde minier (20h-23h) | V1 |
| 2 — Avancé | Zones d'affluence (gardées par les organisations) | V1+ |
| 3 — Industriel | Machines / Quarries dans les zones d'affluence | V6 |

---

## Skins — Système Tokens

### Catégories

| Catégorie | Condition d'accès | Version dédiée possible |
|---|---|---|
| Skin classique | Tous les joueurs | Oui (plus cher) |
| Skin groupe | Membre d'un groupe **actuellement** | Oui |
| Skin organisation | Membre d'une organisation **actuellement** | Oui |
| Skin nation | Membre d'une nation **actuellement** | Oui |

> Le skin de groupe/organisation/nation ne peut être utilisé que si le joueur appartient encore à l'entité correspondante au moment de l'équiper.

### Achat des Tokens

| Méthode | Détail |
|---|---|
| Argent réel | Via Tebex — conversion en tokens |
| Argent en jeu | Conversion Oboles → tokens à prix élevé |
| Skins dédiés | **Argent réel uniquement** — non achetable en jeu |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `market.listing-duration-days` | 7 | Int | Durée listing avant expiration |
| `market.tax-capitale` | 0.15 | Float | Taxe Capitale (15%) |
| `market.tax-faction` | 0.10 | Float | Taxe faction (10%) |
| `market.price-avg-days` | 30 | Int | Jours référence prix moyen |
| `market.hdv-min-reputation` | 20 | Int | Réputation minimale pour accéder à l'HDV |
| `eco.b2b-min-price-ratio` | 0.75 | Float | Prix min vente B2B (75% prix constructeur) |
| `eco.b2b-max-price-ratio` | 1.25 | Float | Prix max vente B2B (125% prix constructeur) |
| `eco.b2c-min-price-ratio` | 1.25 | Float | Prix min revente B2C (125% prix constructeur) |
| `eco.revenue-farmer-ratio` | 0.30 | Float | Part du farmeur (30%) |
| `eco.revenue-seller-ratio` | 0.25 | Float | Part du vendeur (25%) |
| `eco.revenue-org-ratio` | 0.45 | Float | Part de l'organisation (45%) |

---

*WayRift — V3 — Confidentiel*
