# CDC — EcoModule

## Monnaies

| Monnaie | Usage | Obtention |
|---|---|---|
| Oboles (¢) | Monnaie globale unique | En jeu |
| Rubies | VIP/prestige, casino | Euros ou beaucoup d'Oboles (sens unique) |

---

## HDV — AuctionHouse configuré

- Offres de vente uniquement (pas d'ordres d'achat)
- **Liste blanche des items autorisés à la vente**
- Taxes : 15% Capitale + 10% faction = 25%. Étalages loués : 15%
- Durée listing : 7 jours + 7 jours récupération Ender Chest
- Accès interdit aux joueurs réputation < 20

---

## Commerce inter-entités

```
VENTE B2B (Entreprise de production) :
  -> Vend UNIQUEMENT à groupes, organisations, nations
  -> Prix : 75% à 125% du prix constructeur
  -> INTERDIT de vendre directement aux joueurs individuels

REVENTE B2C (tout groupe/orga/nation acheteur) :
  -> Peut revendre à joueurs individuels
  -> Prix minimum : 125% du prix constructeur
```

---

## Caisses & Skins

| Type | Accessible par | Achat via |
|---|---|---|
| Caisse solo | Tous les joueurs | Argent réel ou en jeu |
| Caisse groupe | Membres d'un groupe | Argent réel ou en jeu |
| Caisse organisation | Membres d'une organisation | Argent réel ou en jeu |
| Caisse nation | Membres d'une nation | Argent réel ou en jeu |

- Certains skins utilisables uniquement si le joueur appartient à l'entité correspondante
- Échange argent en jeu → skins uniquement (pas l'inverse)

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `market.listing-duration-days` | 7 | Int | Durée listing avant expiration |
| `market.tax-capitale` | 0.15 | Float | Taxe Capitale (15%) |
| `market.tax-faction` | 0.10 | Float | Taxe faction (10%) |
| `market.price-avg-days` | 30 | Int | Jours référence prix moyen |
| `market.hdv-min-reputation` | 20 | Int | Réputation minimale pour accéder à l'HDV |

---

*WayRift — V3 — Confidentiel*
