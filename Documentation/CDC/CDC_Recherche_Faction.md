# CDC — Recherche de Faction (EXPLORATOIRE — Post-V5)

> ⚠️ **CE DOCUMENT N'EST PAS UNE SPÉCIFICATION CONFIRMÉE.** Il s'agit d'une exploration de faisabilité, inspirée de mécaniques de jeux mobiles (Rise of Kingdoms, Lords Mobile, Clash of Clans). Rien ici n'est validé pour développement. Ne pas implémenter avant validation explicite et repositionnement dans une vraie roadmap (probablement **V5 ou plus tard**).

---

## Contexte

Suite à une comparaison des systèmes de guildes dans les jeux mobiles à forte composante alliance (Rise of Kingdoms, Lords Mobile, Clash of Clans), plusieurs mécaniques ont été identifiées comme potentiellement adaptables à WayRift : un arbre de recherche financé par la faction, une boutique d'alliance, et un système d'artefacts.

---

## 1. Boutique de Faction — Liste complète (inspirée RoK Alliance Shop)

Achetable avec des **crédits de faction** (gagnés via contribution — dons, participation aux Clan Games, aide aux autres membres) :

| Objet | Effet | Faisabilité WayRift |
|---|---|---|
| **Speedups** | Réduit un temps d'attente (craft, coma, cooldown portail) | 🟡 Possible mais peu de timers longs actuellement dans le jeu |
| **City/World Teleport** | Téléportation instantanée entre les mondes de la faction (Nation) | 🟢 Faisable — WayRift a déjà plusieurs mondes (Nation, Capitale, monde minier) |
| **Passport Pages** | Migration gratuite d'un joueur vers un autre monde de Nation | 🟢 Faisable — seulement si la faction/nation possède plusieurs mondes |
| **Points VIP / Tokens** | Convertir crédits de faction en tokens individuels | 🟡 Risque d'être redondant avec le système Tokens déjà existant |
| **Ressources brutes** | Pack de ressources (minerais, blocs) | 🟢 Simple à implémenter |
| **Boosts XP/Prestige temporaires** | +% XP compte ou +% farm pendant X temps | 🟢 Faisable |

---

## 2. Arbre de Recherche de Faction — Premier jet

### Principe

Financé par la **trésorerie collective** de la faction (argent + ressources). Chaque branche débloque des bonus **permanents** pour tous les membres. Une branche **commune** existe pour tous, et **3 branches spécialisées** reflètent l'identité de la faction (Religion/Bienveillant, Mafia/Infâme, Guerre/Neutre) — cohérent avec les types de groupes déjà définis (Gang/Mafia, Religion, Entreprise, Guilde de combat).

### Branche commune — Économie (accessible à toutes les factions)

| Palier | Coût (¢ + ressources) | Effet |
|---|---|---|
| 1 | Faible | +5% vitesse de minage pour tous les membres |
| 2 | Modéré | +5% claims autorisés (au-delà de la Puissance) |
| 3 | Modéré | -5% taxes de faction |
| 4 | Élevé | Débloque 1 recette de craft exclusive supplémentaire |
| 5 | Élevé | +1 ligne de coffre de faction (capacité stockage) |
| 6 | Très élevé | Débloque l'accès à un **2ème type d'entreprise** dans la faction |

> Un **claim peut être dédié physiquement à la recherche** (ex: un "Centre de Recherche" construit sur un claim) — cohérent avec le système de claims existant, sans ajouter de nouvelle mécanique de territoire.

### Branche Religion / Bienveillant

| Palier | Effet |
|---|---|
| 1 | +10% réputation gagnée par les votes positifs des membres |
| 2 | +1 don public gratuit supplémentaire par semaine (sans cooldown) |
| 3 | Bonus diplomatique : traités de paix plus rapides à négocier |
| 4 | Accès à des events GM bienveillants exclusifs |

### Branche Mafia / Infâme

| Palier | Effet |
|---|---|
| 1 | -10% malus de réputation sur le vol (si applicable) |
| 2 | Accès anticipé au marché noir (Bas-Fonds, avant le seuil normal) |
| 3 | Bonus sur le racket (montant récupéré +X%) |
| 4 | Accès à des events GM malveillants exclusifs |

### Branche Guerre / Neutre (Nations uniquement — guerres KOTH)

| Palier | Effet |
|---|---|
| 1 | +5% dégâts en guerre KOTH |
| 2 | Temps de préparation avant guerre réduit |
| 3 | Bonus de butin de guerre (+X% pillage) |
| 4 | Accès prioritaire aux events de guerre GM |

> Une faction peut investir dans plusieurs branches, mais celle qui correspond à son identité (déterminée par son Alignement — étoiles rouge/jaune) sera généralement la plus rentable narrativement.

---

## 3. Système d'Artefacts — Exemple concret proposé

### Comment les gagner

**Proposition retenue : liés aux Failles/Donjons (pas au Prestige).**

```
1. Un donjon difficile (Faille) a une chance de faire dropper
   un Fragment d'Artefact en récompense finale
2. Le joueur ramène le fragment à sa faction
3. Le fragment est déposé dans une "Salle des Artefacts"
   (bâtiment ou zone dédiée de la faction)
4. La faction dépense ressources + argent pour améliorer l'artefact
5. Une fois amélioré, l'artefact donne un bonus PERMANENT
   à TOUS les membres de la faction (pas juste au découvreur)
```

### Pourquoi ce choix plutôt que lier au Prestige

- Le Prestige est un système **individuel** — l'artefact doit rester une récompense **collective de faction**
- Ça donne une vraie raison de faire les donjons **en groupe organisé**, pas en solo
- Ça évite de complexifier encore le système de Prestige déjà bien calibré

### Exemple concret

```
Fragment "Écaille de Dragon" (drop rare, donjon difficile V5+)
  -> Déposé dans la Salle des Artefacts de l'Organisation
  -> Amélioration niveau 1 : coûte 500 000¢ + 200 Fer
     Effet : +3% résistance aux dégâts pour tous les membres
  -> Amélioration niveau 2 : coûte 1 000 000¢ + 500 Fer
     Effet : +5% résistance aux dégâts (cumulatif avec niveau 1)
  -> Set bonus (si 3 artefacts de la même famille) :
     Effet supplémentaire débloqué automatiquement
```

---

## Points ouverts (tous, car document exploratoire)

| # | Point |
|---|---|
| 1 | Positionnement exact dans la roadmap — V5, V6, ou VLT ? |
| 2 | Coûts précis de chaque palier de recherche — à chiffrer |
| 3 | Liste complète des artefacts et leurs effets |
| 4 | Comment les Clan Games (mentionnés en discussion) s'articulent avec ce système |
| 5 | Faisabilité technique du "2ème type d'entreprise" débloqué par recherche |

---

*WayRift — Document exploratoire — Ne pas développer sans validation — Confidentiel*
