# CDC — NationModule

> Système **séparé** du FactionModule (Groupe/Organisation). Les Nations ont leurs propres mécaniques, leur propre classement (Tier), et sortent du système Puissance/Alignement classique. Voir CDC_Gameplay_Layers.md pour la justification structurelle complète (pourquoi les Nations ont un gameplay différent).

---

## Passage en Nation

- **Jamais obligatoire.** Une Organisation (simple ou avancée) peut rester à ce palier indéfiniment.
- Transition **via ticket staff, quand la faction le décide** — aucune promotion automatique.
- **Aucun minimum de membres requis** pour devenir Nation — seules les conditions standard s'appliquent (ressources + argent + ticket staff). Une faction de 30 joueurs peut devenir Nation si elle remplit ces conditions.
- Le ticket doit **avertir explicitement** le joueur/la faction du changement de gameplay (voir CDC_Gameplay_Layers.md — avertissement obligatoire).

---

## Capacité de membres

- **Capacité de base : 75 membres, gratuite**
- **Extension payante : jusqu'à 100 membres maximum** — chaque place au-delà de 75 s'achète avec de l'argent
- **100 = plafond absolu**, jamais un seuil obligatoire à atteindre
- **Prix par place supplémentaire : 10% du revenu hebdomadaire de la faction** (au moment de l'achat — le prix suit donc la richesse actuelle de la Nation)

---

## Un joueur = une seule Nation maximum

Un joueur peut appartenir à 2 factions maximum (règle générale). Mais si **les deux** factions d'un joueur deviennent Nation (simultanément ou l'une après l'autre), le joueur est **automatiquement éjecté de la dernière faction à avoir franchi le palier Nation**.

```
Exemple :
  Joueur membre du Groupe A et de l'Organisation B
  -> Organisation B devient Nation en premier : le joueur reste dans les deux
  -> Groupe A devient Nation ensuite : le joueur est éjecté du Groupe A/Nation
     (la dernière transition perd le joueur)
  -> Le joueur ne peut jamais cumuler l'appartenance à 2 Nations
     (empêche l'accumulation de bonus Nation)
```

---

## Mondes de Nation — Prix fixe selon 50% de la trésorerie collective

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

## Guerres KOTH — Réservées aux Nations

- Nations uniquement — validées et suivies par un GM
- GM lance chaque manche avec une commande
- **1 manche gagnée = 1 point. Premier à 3 points gagne.**
- Si défaite écrasante : GM peut déclencher une attaque directe de la ville perdante
- 1 position par monde : monde de l'attaquant, monde du défenseur, monde neutre

---

## Système de Tier (1 à 5) — Classement indépendant

**Le Tier n'est PAS lié à la Puissance de faction (réservée Groupe/Organisation).** C'est un classement totalement séparé, propre aux Nations.

```
Tier Nation = basé sur des facteurs propres aux Nations uniquement :
  - Guerres KOTH gagnées/perdues (au niveau Nation)
  - Paliers de Recherche débloqués
  - Artefacts possédés et leur niveau d'amélioration
  - Trésorerie investie dans le développement national
```

| Tier | Statut |
|---|---|
| Tier 1 | Nation naissante |
| Tier 2 | Nation reconnue |
| Tier 3 | Nation influente |
| Tier 4 | Nation majeure |
| Tier 5 | Nation dominante |

Le Tier détermine l'accès progressif aux paliers de Recherche et aux objets de la Boutique de faction (plus le Tier est élevé, plus de contenu est débloqué). Seuils exacts et pondération des facteurs — à calibrer (point ouvert).

---

## Item unique — Vente B2B

- Demandé via ticket. Créé par l'équipe WayRift et intégré en jeu.
- **Vendable uniquement à d'autres organisations ou nations** (jamais aux joueurs individuels) si constructeur.
- Prix de vente B2B : 125% à 150% du prix constructeur.
- Les acheteurs non-constructeurs peuvent revendre aux joueurs à 125-150% minimum.

Voir CDC_Entreprises.md pour le détail complet du flux de paiement (crafteur/vendeur/faction).

---

## Rôle Émissaire — Contact avec le monde joueur

Le seul canal officiel entre Nation et petites factions (Groupe/Organisation) : des membres désignés **Émissaires**, qui traversent les mondes joueurs pour négocier les achats B2B. Voir CDC_Gameplay_Layers.md pour le détail complet du rôle.

---

## Recherche, Boutique & Artefacts — Réservé Nations

Voir **CDC_Recherche_Faction.md** pour le détail complet (arbre de recherche, boutique de faction, système d'artefacts). Positionnement roadmap : V5 ou plus tard.

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/nation info` | Affiche Tier, guerres, recherche débloquée | membre |
| `/nation buyslot` | Achète une place membre supplémentaire (10% revenu hebdo) | chef/responsable |
| `/nation top` | Classement des Nations par Tier | joueur |
| `/gm war activate <n1> <n2>` | Active physiquement la guerre KOTH | GM |
| `/gm nation validate <nom>` | Valide le passage en Nation après ticket | admin |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `nation.base-capacity-free` | 75 | Int | Membres gratuits inclus |
| `nation.max-capacity` | 100 | Int | Plafond absolu (avec places payantes) |
| `nation.slot-price-percent` | 10 | Int | % du revenu hebdo pour 1 place supplémentaire |
| `nation.world-reference-members` | 50 | Int | Référence pour le calcul du prix des mondes |
| `nation.world-dedication-percent` | 50 | Int | % du revenu collectif dédié au fonds monde |
| `nation.tier-max` | 5 | Int | Nombre de paliers de Tier |

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Seuils exacts de Tier (quels chiffres de guerres/recherche/artefacts/trésorerie pour chaque palier) | Haute |
| 2 | Fréquence de la Saison Nation | Moyenne |
| 3 | Mécaniques précises de diplomatie inter-nations | Faible (V5+) |

---

*WayRift — V3 — Confidentiel*
