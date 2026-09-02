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

## Prix des ressources — Modèle par rareté et marché dynamique

### Principe

Les prix ne sont pas fixes — ils sont **définis par les joueurs eux-mêmes à l'Autel des Ventes** (interface de vente), dans une fourchette calibrée par un prix de base.

### Deux catégories de prix distinctes

- **Minerais** : prix de base fixe + fluctuation marché (voir ci-dessous) — la Capitale les achète
- **Blocs classiques** (bois, pierre, terre, blocs de structures...) : prix **entièrement défini par les joueurs** à l'Hôtel des Ventes, dans une fourchette **0.01¢ à 10¢** calibrée sur leur rareté réelle dans l'overworld. Pas de fluctuation marché sur ces blocs.

### Minerais — Prix par item, rendement pris en compte

Certains minerais donnent plusieurs items par bloc miné (Redstone : 4-5 items, Lapis : 4-9 items, moyenne 6.5). Le prix à l'unité est ajusté pour que **Fer/Or/Diamant restent les plus rentables par bloc miné** malgré leur rendement de 1 item/bloc — ce sont les ressources les plus utiles (outils, armures) et doivent rester les plus chères.

| Ressource | Prix/item | Items/bloc miné | ¢/bloc miné |
|---|---|---|---|
| Charbon | 1¢ | 1 | 1¢ |
| Redstone | 1¢ | 4-5 (moy. 4.5) | 4.5¢ |
| Lapis-lazuli | 1¢ | 4-9 (moy. 6.5) | 6.5¢ |
| Cuivre | 2¢ | 1 | 2¢ |
| **Fer** | **8¢** | 1 | 8¢ |
| **Or** | **10¢** | 1 | 10¢ |
| **Diamant** | **10¢** | 1 | 10¢ |
| Émeraude | 40¢ | 1 | 40¢ |
| Débris antique (Netherite) | 120¢ | 1 | 120¢ |

> Fer, Or et Diamant sont volontairement resserrés autour de 8-10¢ : ce sont les ressources les plus utiles en jeu (outils, armures, échanges), leur valeur doit rester significative et proche entre elles. Débris antique fortement augmenté (120¢) pour refléter sa rareté extrême — bien au-delà de l'Émeraude.

### Blocs classiques — Exemples par rareté (0.01¢ à 10¢)

| Bloc | Rareté dans l'overworld | Prix indicatif |
|---|---|---|
| Pierre, Terre, Gravier, Sable | Extrêmement commun | 0.01¢ |
| Cobblestone, Andésite, Diorite, Granite | Très commun | 0.02¢ |
| Bois de Chêne | Commun | 0.05¢ |
| Bois de Bouleau, Sapin | Assez commun | 0.08¢ |
| Bois de Jungle, Acacia | Biome moins fréquent | 0.3¢ |
| Argile, Bois de Mangrove | Peu commun | 0.5¢ |
| Podzol, Mycélium | Biome rare | 1¢ |
| Mousse (Lush Caves) | Biome très rare | 1.5¢ |
| Prismarine (monuments océaniques) | Structure rare | 3¢ |
| Blackstone (bastions Nether) | Structure rare | 4¢ |
| Purpur (cités de l'End) | Structure très rare | 6¢ |
| Sculk (Deep Dark) | Biome le plus rare | 9¢ |
| Fruit du Chorus (End) | Accès End requis | 10¢ |

> Liste indicative — à étendre à tous les blocs du jeu selon la même logique de rareté.

### Marché dynamique — Achat par la Capitale

La Capitale achète les minerais à un **prix fluctuant** selon l'offre/demande récente :

```
Beaucoup de ventes récentes -> le prix BAISSE (surabondance)
Peu de ventes récentes      -> le prix REMONTE (rareté relative)
```

Le prix fluctue autour du prix de base, sans jamais totalement s'en écarter (le prix de base reste l'ancre de référence).

### Coefficient de marché — Impact sur l'économie globale

La **moyenne des prix actuels de tous les minerais** génère un **coefficient de marché**. Ce coefficient ajuste proportionnellement d'autres prix indexés sur la santé économique globale du serveur :

```
Coefficient marché = moyenne(prix actuels minerais) / moyenne(prix de base minerais)

Exemples de prix indexés sur ce coefficient :
  - Prix des tokens
  - Prix des parcelles housing
  - Autres biens liés à l'économie globale (à définir)
```

> Si l'économie est en pleine forme (minerais chers, peu vendus), le coefficient monte et les autres prix suivent légèrement à la hausse. Si le marché est saturé (minerais bradés), le coefficient baisse et les autres prix deviennent plus accessibles.

### Vitesse de minage — référence

Basée sur la mécanique vanilla : pioche en fer sur pierre = 15 ticks/bloc = 0.75s/bloc. Un inventaire plein (30 slots utiles × 64 = 1920 blocs) sert de référence pour le farm actif.

| Profil | Blocs/heure |
|---|---|
| Farm actif | 1920 |
| Farm modéré | 768 |
| Casual | 256 |

> ⚠️ Les ¢/heure exacts dépendent désormais du mix de ressources minées et de leur prix de marché fluctuant (voir modèle par rareté ci-dessus), plus du coefficient de marché en vigueur. Les simulations dans V3.Simulations_Economiques utilisent encore l'ancien modèle pondéré (1.8¢/bloc) en attendant l'intégration complète du nouveau système de prix par ressource.

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
